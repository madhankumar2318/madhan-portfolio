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

interface AuroraOrb {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export const GeometryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Smooth subtle mouse tracking
    let mxT = 0, myT = 0, mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mxT = (e.clientX - W / 2) * 0.0005;
      myT = (e.clientY - H / 2) * 0.0005;
    };
    window.addEventListener('mousemove', onMouse);

    // Scroll tracking
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 3D Aurora Orbs ────────────────────────────────────────────────────────
    const SHADE_COLORS = [
      'rgba(99, 102, 241, ',  // Indigo
      'rgba(139, 92, 246, ',  // Violet
      'rgba(6, 182, 212, ',   // Cyan
      'rgba(16, 185, 129, ',  // Emerald
    ];

    const orbs: AuroraOrb[] = [
      { x: W * 0.2, y: H * 0.25, z: 100, radius: 320, color: SHADE_COLORS[0], vx: 0.15, vy: 0.1 },
      { x: W * 0.8, y: H * 0.45, z: 200, radius: 280, color: SHADE_COLORS[1], vx: -0.12, vy: 0.14 },
      { x: W * 0.3, y: H * 0.75, z: 150, radius: 300, color: SHADE_COLORS[2], vx: 0.1, vy: -0.12 },
      { x: W * 0.7, y: H * 0.15, z: 80,  radius: 250, color: SHADE_COLORS[3], vx: -0.14, vy: -0.08 },
    ];

    // ── Tiny Star Dust Particles ──────────────────────────────────────────────
    const NUM_DUST = 55;
    const dustParticles: Particle[] = Array.from({ length: NUM_DUST }, () => ({
      x: (Math.random() - 0.5) * W * 1.5,
      y: (Math.random() - 0.5) * H * 1.5,
      z: Math.random() * W,
      vx: (Math.random() - 0.5) * 0.1,
      vy: -0.15 - Math.random() * 0.2, // gentle upward float
      radius: Math.random() * 1.6 + 0.6,
      color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.015,
    }));

    const FOV = 450;

    const render = () => {
      // Smooth interpolation
      mx += (mxT - mx) * 0.03;
      my += (myT - my) * 0.03;

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      // 1. Render Soft Ambient Aurora Light Mesh Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce gently off boundaries
        if (orb.x < W * 0.1 || orb.x > W * 0.9) orb.vx *= -1;
        if (orb.y < H * 0.1 || orb.y > H * 0.9) orb.vy *= -1;

        // Perspective position adjusting for scroll & mouse
        const drawX = orb.x + mx * 50;
        const drawY = orb.y + my * 50 - (scrollY * 0.05) % H;

        const rad = orb.radius;
        const grd = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, rad);
        grd.addColorStop(0, orb.color + '0.14)');
        grd.addColorStop(0.5, orb.color + '0.06)');
        grd.addColorStop(1, orb.color + '0)');

        ctx.beginPath();
        ctx.arc(drawX, drawY, rad, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // 2. Render 3D Floating Star Dust & Constellation
      const projected: { x: number; y: number; scale: number; color: string; alpha: number }[] = [];
      const cosX = Math.cos(my);
      const sinX = Math.sin(my);
      const cosY = Math.cos(mx);
      const sinY = Math.sin(mx);

      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around vertically
        if (p.y < -H * 0.75) {
          p.y = H * 0.75;
          p.x = (Math.random() - 0.5) * W * 1.5;
        }

        const rx = p.x * cosY - p.z * sinY;
        const rz1 = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz1 * sinX;
        const rz = p.y * sinX + rz1 * cosX;

        const scale = FOV / (FOV + rz);
        const x2d = rx * scale + cx;
        const y2d = ry * scale + cy;

        const alpha = Math.min(0.6, Math.max(0.08, scale * 0.5)) * (0.7 + 0.3 * Math.sin(p.pulse));
        projected.push({ x: x2d, y: y2d, scale, color: p.color, alpha });

        if (scale > 0.05) {
          const r = Math.max(0.5, p.radius * scale);

          // Subtle glow
          ctx.beginPath();
          ctx.arc(x2d, y2d, r * 3, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, r * 3);
          g.addColorStop(0, p.color + '66');
          g.addColorStop(1, p.color + '00');
          ctx.fillStyle = g;
          ctx.globalAlpha = alpha * 0.4;
          ctx.fill();

          // Particle Core
          ctx.beginPath();
          ctx.arc(x2d, y2d, r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      });

      // 3. Subtle distance connections between dust particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const lineAlpha = (1 - dist / 90) * 0.12 * Math.min(a.alpha, b.alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.color;
            ctx.globalAlpha = lineAlpha;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
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
      }}
    />
  );
};
