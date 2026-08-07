import React, { useEffect, useRef } from 'react';

type Vec3 = [number, number, number];

// ─── Rotation helpers ────────────────────────────────────────────────────────
const rotX = ([x, y, z]: Vec3, a: number): Vec3 => [
  x,
  y * Math.cos(a) - z * Math.sin(a),
  y * Math.sin(a) + z * Math.cos(a),
];
const rotY = ([x, y, z]: Vec3, a: number): Vec3 => [
  x * Math.cos(a) + z * Math.sin(a),
  y,
  -x * Math.sin(a) + z * Math.cos(a),
];
const rotZ = ([x, y, z]: Vec3, a: number): Vec3 => [
  x * Math.cos(a) - y * Math.sin(a),
  x * Math.sin(a) + y * Math.cos(a),
  z,
];

// ─── Perspective projection ───────────────────────────────────────────────────
const project = (
  [x, y, z]: Vec3,
  cx: number,
  cy: number,
  fov: number
): [number, number, number] => {
  const scale = fov / (fov + z + 600);
  return [x * scale + cx, y * scale + cy, scale];
};

// ─── Shape definitions ────────────────────────────────────────────────────────
const CUBE_VERTS: Vec3[] = [
  [-1, -1, -1], [1, -1, -1], [1,  1, -1], [-1,  1, -1],
  [-1, -1,  1], [1, -1,  1], [1,  1,  1], [-1,  1,  1],
];
const CUBE_EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7],
];

const OCTA_VERTS: Vec3[] = [
  [0, -1, 0], [1, 0, 0], [0, 0, 1],
  [-1, 0, 0], [0, 0, -1], [0, 1, 0],
];
const OCTA_EDGES: [number, number][] = [
  [0,1],[0,2],[0,3],[0,4],
  [5,1],[5,2],[5,3],[5,4],
  [1,2],[2,3],[3,4],[4,1],
];

function ringVerts(n: number): Vec3[] {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [Math.cos(a), Math.sin(a), 0] as Vec3;
  });
}
const RING_N = 32;
const RING_VERTS = ringVerts(RING_N);
const RING_EDGES: [number, number][] = Array.from({ length: RING_N }, (_, i) => [i, (i + 1) % RING_N]);

// ─── Shape instances ──────────────────────────────────────────────────────────
interface ShapeInstance {
  type: 'cube' | 'octa' | 'ring';
  pos: Vec3;
  scale: number;
  rx: number; ry: number; rz: number;
  speedX: number; speedY: number; speedZ: number;
  color: string;
  alpha: number;
  parallax: number; // how much scroll affects this shape's Y
}

const SHAPES: ShapeInstance[] = [
  // Large cube — top left deep
  { type: 'cube', pos: [-420, -180, 100], scale: 90, rx: 0.4, ry: 0.6, rz: 0.2, speedX: 0.003, speedY: 0.005, speedZ: 0.002, color: '#6366f1', alpha: 0.18, parallax: 0.08 },
  // Medium cube — right side
  { type: 'cube', pos: [380, 200, -80], scale: 55, rx: 0.9, ry: 0.3, rz: 0.5, speedX: 0.004, speedY: 0.003, speedZ: 0.006, color: '#8b5cf6', alpha: 0.16, parallax: 0.12 },
  // Small cube — bottom left
  { type: 'cube', pos: [-300, 350, 50], scale: 38, rx: 1.2, ry: 0.7, rz: 0.1, speedX: 0.006, speedY: 0.004, speedZ: 0.003, color: '#06b6d4', alpha: 0.14, parallax: 0.18 },
  // Tiny cube — top right
  { type: 'cube', pos: [300, -280, 120], scale: 30, rx: 0.1, ry: 1.4, rz: 0.8, speedX: 0.007, speedY: 0.005, speedZ: 0.004, color: '#8b5cf6', alpha: 0.13, parallax: 0.06 },
  // Large ring — center top
  { type: 'ring', pos: [80, -200, 200], scale: 130, rx: 1.1, ry: 0.3, rz: 0.5, speedX: 0.002, speedY: 0.004, speedZ: 0.001, color: '#6366f1', alpha: 0.2, parallax: 0.05 },
  // Medium ring — lower right
  { type: 'ring', pos: [360, 280, 0], scale: 85, rx: 0.6, ry: 0.8, rz: 0.2, speedX: 0.003, speedY: 0.002, speedZ: 0.005, color: '#06b6d4', alpha: 0.17, parallax: 0.14 },
  // Small ring — left side
  { type: 'ring', pos: [-350, 100, -50], scale: 60, rx: 0.3, ry: 1.2, rz: 0.7, speedX: 0.005, speedY: 0.003, speedZ: 0.002, color: '#8b5cf6', alpha: 0.14, parallax: 0.1 },
  // Octahedron — right deep
  { type: 'octa', pos: [280, -100, 60], scale: 80, rx: 0.5, ry: 0.7, rz: 0.3, speedX: 0.004, speedY: 0.006, speedZ: 0.003, color: '#6366f1', alpha: 0.18, parallax: 0.09 },
  // Octahedron — left bottom
  { type: 'octa', pos: [-250, 300, 80], scale: 50, rx: 1.1, ry: 0.4, rz: 0.6, speedX: 0.005, speedY: 0.003, speedZ: 0.007, color: '#06b6d4', alpha: 0.15, parallax: 0.16 },
];

// ─── Particle constellation ───────────────────────────────────────────────────
interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number;
  radius: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}
const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];

export const GeometryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Mouse
    let mxTarget = 0, myTarget = 0, mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mxTarget = (e.clientX - width / 2) / width * 0.8;
      myTarget = (e.clientY - height / 2) / height * 0.8;
    };
    window.addEventListener('mousemove', onMouse);

    // Scroll
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Shape rotation state
    const angles = SHAPES.map((s) => ({ rx: s.rx, ry: s.ry, rz: s.rz }));

    // Particles
    const NUM = 70;
    const particles: Particle[] = [];
    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: Math.random() * width,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.8 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.02,
      });
    }

    const FOV = 500;
    const MAX_DIST = 120;

    // ── Draw one shape ─────────────────────────────────────────────────────────
    const drawShape = (
      shape: ShapeInstance,
      ang: { rx: number; ry: number; rz: number },
      cx: number,
      cy: number,
      scrollOff: number,
    ) => {
      let verts: Vec3[];
      let edges: [number, number][];
      if (shape.type === 'cube') { verts = CUBE_VERTS; edges = CUBE_EDGES; }
      else if (shape.type === 'octa') { verts = OCTA_VERTS; edges = OCTA_EDGES; }
      else { verts = RING_VERTS; edges = RING_EDGES; }

      // Transform vertices
      const transformed: [number, number, number][] = verts.map((v) => {
        let p: Vec3 = [v[0] * shape.scale, v[1] * shape.scale, v[2] * shape.scale];
        p = rotX(p, ang.rx + mx * 0.4);
        p = rotY(p, ang.ry + my * 0.4);
        p = rotZ(p, ang.rz);
        // Translate to world position with parallax scroll offset
        p = [p[0] + shape.pos[0], p[1] + shape.pos[1] - scrollOff, p[2] + shape.pos[2]];
        return project(p, cx, cy, FOV);
      });

      // Draw edges
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 0.8;

      for (const [a, b] of edges) {
        const [ax, ay, as_] = transformed[a];
        const [bx, by] = transformed[b];
        if (as_ <= 0) continue;

        const grd = ctx.createLinearGradient(ax, ay, bx, by);
        grd.addColorStop(0, shape.color + Math.round(shape.alpha * 255 * as_).toString(16).padStart(2, '0'));
        grd.addColorStop(1, shape.color + '00');
        ctx.strokeStyle = grd;
        ctx.globalAlpha = shape.alpha * Math.min(1, as_ * 1.2);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    };

    // ── Render loop ────────────────────────────────────────────────────────────
    const render = () => {
      mx += (mxTarget - mx) * 0.04;
      my += (myTarget - my) * 0.04;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      // Draw 3D shapes
      SHAPES.forEach((shape, i) => {
        angles[i].rx += shape.speedX;
        angles[i].ry += shape.speedY;
        angles[i].rz += shape.speedZ;

        const scrollOff = scrollY * shape.parallax;
        drawShape(shape, angles[i], cx, cy, scrollOff);
      });

      // Draw particles
      ctx.globalAlpha = 1;
      const projected: { x: number; y: number; scale: number; color: string; alpha: number }[] = [];

      const cosX = Math.cos(my * 0.6);
      const sinX = Math.sin(my * 0.6);
      const cosY = Math.cos(mx * 0.6);
      const sinY = Math.sin(mx * 0.6);

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.pulse += p.pulseSpeed;
        p.z -= 0.55;
        if (p.z <= 0) { p.z = width; p.x = (Math.random() - 0.5) * width * 1.6; p.y = (Math.random() - 0.5) * height * 1.6; }
        const hw = width * 0.85, hh = height * 0.85;
        if (p.x > hw) p.x = -hw; if (p.x < -hw) p.x = hw;
        if (p.y > hh) p.y = -hh; if (p.y < -hh) p.y = hh;

        const rx = p.x * cosY - p.z * sinY;
        const rz1 = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz1 * sinX;
        const rz = p.y * sinX + rz1 * cosX;
        const scale = FOV / (FOV + rz);
        const x2d = rx * scale + cx;
        const y2d = ry * scale + cy;
        const alpha = Math.min(0.8, Math.max(0.06, scale * 0.65));
        const pa = alpha * (0.75 + 0.25 * Math.sin(p.pulse));
        projected.push({ x: x2d, y: y2d, scale, color: p.color, alpha: pa });

        if (scale > 0.05) {
          const r = Math.max(0.4, p.radius * scale);
          ctx.beginPath(); ctx.arc(x2d, y2d, r * 4.5, 0, Math.PI * 2);
          const grd2 = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, r * 4.5);
          grd2.addColorStop(0, p.color + 'aa'); grd2.addColorStop(1, p.color + '00');
          ctx.fillStyle = grd2; ctx.globalAlpha = pa * 0.3; ctx.fill();
          ctx.beginPath(); ctx.arc(x2d, y2d, r, 0, Math.PI * 2);
          ctx.fillStyle = p.color; ctx.globalAlpha = pa;
          ctx.shadowBlur = 8 * scale; ctx.shadowColor = p.color; ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Particle connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i], b = projected[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const op = (1 - dist / MAX_DIST) * 0.18 * Math.min(a.alpha, b.alpha);
            const grd3 = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grd3.addColorStop(0, a.color); grd3.addColorStop(1, b.color);
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grd3; ctx.globalAlpha = op; ctx.lineWidth = 0.6; ctx.stroke();
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
        opacity: 1,
      }}
    />
  );
};
