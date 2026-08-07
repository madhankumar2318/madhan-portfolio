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
  phase: number;
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
      mxT = (e.clientX - W / 2) * 0.0006;
      myT = (e.clientY - H / 2) * 0.0006;
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
      'rgba(168, 85, 247, ',  // Purple
    ];

    // Distributed 6 glowing mesh orbs across full depth & vertical space
    const orbs: AuroraOrb[] = [
      { x: W * 0.15, y: H * 0.2, z: 100, radius: 360, color: SHADE_COLORS[0], vx: 0.18, vy: 0.12, phase: 0 },
      { x: W * 0.82, y: H * 0.35, z: 200, radius: 320, color: SHADE_COLORS[1], vx: -0.15, vy: 0.16, phase: 1.2 },
      { x: W * 0.25, y: H * 0.65, z: 150, radius: 340, color: SHADE_COLORS[2], vx: 0.14, vy: -0.15, phase: 2.4 },
      { x: W * 0.75, y: H * 0.85, z: 180, radius: 300, color: SHADE_COLORS[3], vx: -0.16, vy: -0.11, phase: 3.6 },
      { x: W * 0.5,  y: H * 0.45, z: 120, radius: 380, color: SHADE_COLORS[4], vx: 0.12, vy: -0.14, phase: 4.8 },
      { x: W * 0.88, y: H * 0.12, z: 90,  radius: 280, color: SHADE_COLORS[0], vx: -0.13, vy: 0.15, phase: 5.5 },
    ];

    // ── Tiny Star Dust Particles ──────────────────────────────────────────────
    const NUM_DUST = 75;
    const dustParticles: Particle[] = Array.from({ length: NUM_DUST }, () => ({
      x: (Math.random() - 0.5) * W * 1.6,
      y: (Math.random() - 0.5) * H * 1.6,
      z: Math.random() * W,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.12 - Math.random() * 0.2, // gentle upward float
      radius: Math.random() * 1.8 + 0.6,
      color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#a855f7'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.015,
    }));

    const FOV = 480;

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
        orb.phase += 0.008;

        // Bounce gently off boundaries
        if (orb.x < -W * 0.1 || orb.x > W * 1.1) orb.vx *= -1;
        if (orb.y < -H * 0.1 || orb.y > H * 1.1) orb.vy *= -1;

        // Perspective position adjusting for scroll & mouse
        const pulseScale = 1 + Math.sin(orb.phase) * 0.08;
        const drawX = orb.x + mx * 60;
        const drawY = orb.y + my * 60 - (scrollY * 0.08) % H;

        const rad = orb.radius * pulseScale;
        const grd = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, rad);
        grd.addColorStop(0, orb.color + '0.22)');
        grd.addColorStop(0.4, orb.color + '0.10)');
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
          p.x = (Math.random() - 0.5) * W * 1.6;
        }

        const rx = p.x * cosY - p.z * sinY;
        const rz1 = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz1 * sinX;
        const rz = p.y * sinX + rz1 * cosX;

        const scale = FOV / (FOV + rz);
        const x2d = rx * scale + cx;
        const y2d = ry * scale + cy;

        const alpha = Math.min(0.7, Math.max(0.12, scale * 0.55)) * (0.7 + 0.3 * Math.sin(p.pulse));
        projected.push({ x: x2d, y: y2d, scale, color: p.color, alpha });

        if (scale > 0.05) {
          const r = Math.max(0.6, p.radius * scale);

          // Subtle glow
          ctx.beginPath();
          ctx.arc(x2d, y2d, r * 3.5, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, r * 3.5);
          g.addColorStop(0, p.color + '88');
          g.addColorStop(1, p.color + '00');
          ctx.fillStyle = g;
          ctx.globalAlpha = alpha * 0.45;
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
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.16 * Math.min(a.alpha, b.alpha);
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
