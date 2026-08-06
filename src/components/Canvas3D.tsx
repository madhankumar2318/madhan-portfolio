import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

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

    // Smooth mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.0012;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.0012;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particles config
    const NUM_PARTICLES = 90;
    const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#a78bfa'];
    const particles: Particle[] = [];

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: Math.random() * width,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 2.2 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    const FOV = 420;
    const MAX_DIST = 130;

    const render = () => {
      // Smooth lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const cosX = Math.cos(mouseY);
      const sinX = Math.sin(mouseY);
      const cosY = Math.cos(mouseX);
      const sinY = Math.sin(mouseX);

      // Project each particle into 2D
      const projected: { x: number; y: number; scale: number; color: string; alpha: number }[] = [];

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const p = particles[i];

        // Gentle drift
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Slow forward movement
        p.z -= 0.6;
        if (p.z <= 0) {
          p.z = width;
          p.x = (Math.random() - 0.5) * width * 1.6;
          p.y = (Math.random() - 0.5) * height * 1.6;
        }

        // Wrap horizontal/vertical drift
        const hw = width * 0.85;
        const hh = height * 0.85;
        if (p.x > hw) p.x = -hw;
        if (p.x < -hw) p.x = hw;
        if (p.y > hh) p.y = -hh;
        if (p.y < -hh) p.y = hh;

        // 3D rotation matrix
        const rx = p.x * cosY - p.z * sinY;
        const rz1 = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz1 * sinX;
        const rz = p.y * sinX + rz1 * cosX;

        // Perspective projection
        const scale = FOV / (FOV + rz);
        const x2d = rx * scale + cx;
        const y2d = ry * scale + cy;
        const alpha = Math.min(0.9, Math.max(0.08, scale * 0.75));
        const pulseAlpha = alpha * (0.75 + 0.25 * Math.sin(p.pulse));

        projected.push({ x: x2d, y: y2d, scale, color: p.color, alpha: pulseAlpha });

        if (scale > 0.05) {
          const r = Math.max(0.4, p.radius * scale);

          // Outer glow
          const grd = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, r * 5);
          grd.addColorStop(0, p.color + 'cc');
          grd.addColorStop(1, p.color + '00');

          ctx.beginPath();
          ctx.arc(x2d, y2d, r * 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.globalAlpha = pulseAlpha * 0.35;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(x2d, y2d, r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = pulseAlpha;
          ctx.shadowBlur = 10 * scale;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Connection lines with gradient fade
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.25 * Math.min(a.alpha, b.alpha);
            const grd = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grd.addColorStop(0, a.color);
            grd.addColorStop(1, b.color);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grd;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
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
        opacity: 0.9,
      }}
    />
  );
};
