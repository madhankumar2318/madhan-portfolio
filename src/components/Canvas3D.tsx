import React, { useEffect, useRef } from 'react';

export const Canvas3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D perspective rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.001;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate 3D Particles
    const numParticles = 65;
    const particles: { x: number; y: number; z: number; radius: number; color: string }[] = [];
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: Math.random() * width,
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const fov = 350; // Field of view depth

    const render = () => {
      // Smooth interpolation of mouse input
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Project and draw particles
      const projected: { x: number; y: number; scale: number; color: string }[] = [];

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // Rotate in 3D space based on mouse & time
        p.z -= 0.8;
        if (p.z <= 0) p.z = width;

        // Apply 3D perspective rotation matrix
        const cosX = Math.cos(mouseY);
        const sinX = Math.sin(mouseY);
        const cosY = Math.cos(mouseX);
        const sinY = Math.sin(mouseX);

        const rx = p.x * cosY - p.z * sinY;
        const rz1 = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz1 * sinX;
        const rz = p.y * sinX + rz1 * cosX;

        // 3D to 2D projection calculation
        const scale = fov / (fov + rz);
        const x2d = rx * scale + centerX;
        const y2d = ry * scale + centerY;

        projected.push({ x: x2d, y: y2d, scale, color: p.color });

        // Draw particle node with glow
        if (scale > 0) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, Math.max(0.5, p.radius * scale), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, Math.max(0.1, scale * 0.8));
          ctx.shadowBlur = 12 * scale;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      }

      // Draw 3D distance connection lines between nearby nodes
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = projected[i].color;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
};
