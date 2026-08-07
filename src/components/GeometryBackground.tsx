import React, { useEffect, useRef } from 'react';

type Vec3 = [number, number, number];

const rotX = ([x, y, z]: Vec3, a: number): Vec3 => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
const rotY = ([x, y, z]: Vec3, a: number): Vec3 => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
const rotZ = ([x, y, z]: Vec3, a: number): Vec3 => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), z];

const project = ([x, y, z]: Vec3, cx: number, cy: number, fov: number): [number, number, number] => {
  const d = fov + z;
  if (d <= 0) return [cx, cy, 0];
  const s = fov / d;
  return [x * s + cx, y * s + cy, s];
};

// Cube
const CUBE_V: Vec3[] = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
const CUBE_E: [number,number][] = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

// Octahedron
const OCTA_V: Vec3[] = [[0,-1,0],[1,0,0],[0,0,1],[-1,0,0],[0,0,-1],[0,1,0]];
const OCTA_E: [number,number][] = [[0,1],[0,2],[0,3],[0,4],[5,1],[5,2],[5,3],[5,4],[1,2],[2,3],[3,4],[4,1]];

// Ring
const RING_N = 48;
const RING_V: Vec3[] = Array.from({length: RING_N}, (_, i) => {
  const a = (i / RING_N) * Math.PI * 2;
  return [Math.cos(a), Math.sin(a), 0];
});
const RING_E: [number,number][] = Array.from({length: RING_N}, (_, i) => [i, (i+1) % RING_N]);

interface Shape {
  type: 'cube' | 'octa' | 'ring';
  pos: Vec3;
  scale: number;
  rx: number; ry: number; rz: number;
  sx: number; sy: number; sz: number; // rotation speeds
  color: string;
  alpha: number;
  parallax: number;
}

const SHAPES: Shape[] = [
  { type: 'cube',  pos: [-380, -160, 200], scale: 160, rx:0.5, ry:0.8, rz:0.2, sx:0.004, sy:0.006, sz:0.003, color:'#6366f1', alpha:0.55, parallax:0.06 },
  { type: 'cube',  pos: [ 340,  180, 100], scale: 110, rx:1.0, ry:0.4, rz:0.6, sx:0.005, sy:0.004, sz:0.007, color:'#8b5cf6', alpha:0.50, parallax:0.10 },
  { type: 'cube',  pos: [-280,  320,  80], scale:  70, rx:1.3, ry:0.7, rz:0.1, sx:0.007, sy:0.005, sz:0.004, color:'#06b6d4', alpha:0.45, parallax:0.15 },
  { type: 'cube',  pos: [ 280, -300, 150], scale:  55, rx:0.2, ry:1.5, rz:0.9, sx:0.008, sy:0.006, sz:0.005, color:'#8b5cf6', alpha:0.42, parallax:0.07 },
  { type: 'ring',  pos: [  60, -180, 250], scale: 200, rx:1.2, ry:0.4, rz:0.6, sx:0.003, sy:0.005, sz:0.002, color:'#6366f1', alpha:0.50, parallax:0.04 },
  { type: 'ring',  pos: [ 350,  260,  50], scale: 140, rx:0.7, ry:0.9, rz:0.3, sx:0.004, sy:0.003, sz:0.006, color:'#06b6d4', alpha:0.48, parallax:0.12 },
  { type: 'ring',  pos: [-320,  120, -20], scale:  95, rx:0.4, ry:1.3, rz:0.8, sx:0.006, sy:0.004, sz:0.003, color:'#8b5cf6', alpha:0.44, parallax:0.09 },
  { type: 'octa',  pos: [ 260, -120, 100], scale: 130, rx:0.6, ry:0.8, rz:0.4, sx:0.005, sy:0.007, sz:0.004, color:'#6366f1', alpha:0.52, parallax:0.08 },
  { type: 'octa',  pos: [-230,  280, 120], scale:  80, rx:1.2, ry:0.5, rz:0.7, sx:0.006, sy:0.004, sz:0.008, color:'#06b6d4', alpha:0.46, parallax:0.14 },
];

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
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let mxT = 0, myT = 0, mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mxT = (e.clientX - W / 2) / W;
      myT = (e.clientY - H / 2) / H;
    };
    window.addEventListener('mousemove', onMouse);

    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const angles = SHAPES.map(s => ({ rx: s.rx, ry: s.ry, rz: s.rz }));

    // ── Particles ────────────────────────────────────────────────────────────
    const PCOLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];
    const particles = Array.from({ length: 60 }, () => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1200,
      z: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      r: Math.random() * 1.6 + 0.5,
      color: PCOLORS[Math.floor(Math.random() * PCOLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      ps: 0.018 + Math.random() * 0.018,
    }));

    const FOV = 600;

    // ── Draw 3D perspective grid ──────────────────────────────────────────────
    const drawGrid = (cx: number, scrollOff: number) => {
      const GRID_Y = H * 0.72 - scrollOff * 0.04;  // horizon line moves slightly with scroll
      const COLS = ['#6366f1', '#8b5cf6', '#06b6d4'];
      const STEPS = 12;
      const SPREAD = 1400;
      const DEPTH = 900;

      ctx.lineWidth = 0.7;

      // Horizontal grid lines (receding into distance)
      for (let i = 0; i <= STEPS; i++) {
        const t = i / STEPS;
        const ease = t * t; // perspective easing
        const y = GRID_Y + ease * (H - GRID_Y + 60);
        const xLeft = cx - SPREAD * (1 - ease * 0.85);
        const xRight = cx + SPREAD * (1 - ease * 0.85);

        ctx.globalAlpha = 0.25 * (1 - t * 0.6);
        ctx.strokeStyle = COLS[i % COLS.length];
        ctx.beginPath();
        ctx.moveTo(xLeft, y);
        ctx.lineTo(xRight, y);
        ctx.stroke();
      }

      // Vertical grid lines (perspective rays from vanishing point)
      const VP_X = cx + mx * 60;
      const NUM_V = 14;
      for (let i = 0; i <= NUM_V; i++) {
        const t = i / NUM_V;
        const xBottom = cx - SPREAD + t * SPREAD * 2;
        const farT = (xBottom - VP_X) / DEPTH;
        const xFar = VP_X + farT * 0.12 * DEPTH;

        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = COLS[i % COLS.length];
        ctx.beginPath();
        ctx.moveTo(xBottom, H + 60);
        ctx.lineTo(xFar + cx * 0.02, GRID_Y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    // ── Draw one wireframe shape ──────────────────────────────────────────────
    const drawShape = (shape: Shape, ang: {rx:number;ry:number;rz:number}, cx: number, cy: number, scrollOff: number) => {
      let verts: Vec3[], edges: [number,number][];
      if (shape.type === 'cube')     { verts = CUBE_V; edges = CUBE_E; }
      else if (shape.type === 'octa'){ verts = OCTA_V; edges = OCTA_E; }
      else                           { verts = RING_V; edges = RING_E; }

      const t2d: [number,number,number][] = verts.map(v => {
        let p: Vec3 = [v[0] * shape.scale, v[1] * shape.scale, v[2] * shape.scale];
        p = rotX(p, ang.rx + my * 0.5);
        p = rotY(p, ang.ry + mx * 0.5);
        p = rotZ(p, ang.rz);
        p = [p[0] + shape.pos[0], p[1] + shape.pos[1] - scrollOff, p[2] + shape.pos[2]];
        return project(p, cx, cy, FOV);
      });

      ctx.lineWidth = 1.2;
      for (const [a, b] of edges) {
        const [ax, ay, as_] = t2d[a];
        const [bx, by] = t2d[b];
        if (as_ <= 0) continue;
        const eff = shape.alpha * Math.min(1, as_ + 0.5); // stay bright even at distance
        ctx.globalAlpha = eff;
        ctx.strokeStyle = shape.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = shape.color;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    };

    // ── Main render loop ──────────────────────────────────────────────────────
    const render = () => {
      mx += (mxT - mx) * 0.04;
      my += (myT - my) * 0.04;

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;
      const cosX = Math.cos(my * 0.5), sinX = Math.sin(my * 0.5);
      const cosY = Math.cos(mx * 0.5), sinY = Math.sin(mx * 0.5);

      // 1. Draw perspective grid
      drawGrid(cx, scrollY);

      // 2. Draw 3D wireframe shapes
      SHAPES.forEach((shape, i) => {
        angles[i].rx += shape.sx;
        angles[i].ry += shape.sy;
        angles[i].rz += shape.sz;
        drawShape(shape, angles[i], cx, cy, scrollY * shape.parallax);
      });

      // 3. Draw particles
      const proj: {x:number;y:number;s:number;color:string;a:number}[] = [];
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.pulse += p.ps;
        p.z -= 0.5;
        if (p.z <= 0) { p.z = 800; p.x = (Math.random()-0.5)*1600; p.y = (Math.random()-0.5)*1200; }
        if (p.x > 850) p.x = -850; if (p.x < -850) p.x = 850;
        if (p.y > 650) p.y = -650; if (p.y < -650) p.y = 650;

        const rx = p.x*cosY - p.z*sinY;
        const rz1 = p.x*sinY + p.z*cosY;
        const ry = p.y*cosX - rz1*sinX;
        const rz = p.y*sinX + rz1*cosX;
        const sc = FOV / (FOV + rz);
        const x2 = rx*sc + cx, y2 = ry*sc + cy;
        const pa = Math.min(0.85, Math.max(0.1, sc * 0.75)) * (0.7 + 0.3 * Math.sin(p.pulse));
        proj.push({x:x2, y:y2, s:sc, color:p.color, a:pa});

        if (sc > 0.05) {
          const r = Math.max(0.4, p.r * sc);
          ctx.beginPath(); ctx.arc(x2, y2, r*4, 0, Math.PI*2);
          const g = ctx.createRadialGradient(x2,y2,0,x2,y2,r*4);
          g.addColorStop(0, p.color+'bb'); g.addColorStop(1, p.color+'00');
          ctx.fillStyle = g; ctx.globalAlpha = pa*0.35; ctx.fill();
          ctx.beginPath(); ctx.arc(x2, y2, r, 0, Math.PI*2);
          ctx.fillStyle = p.color; ctx.globalAlpha = pa;
          ctx.shadowBlur = 10*sc; ctx.shadowColor = p.color; ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Particle lines
      for (let i = 0; i < proj.length; i++) {
        for (let j = i+1; j < proj.length; j++) {
          const a = proj[i], b = proj[j];
          const dx = a.x-b.x, dy = a.y-b.y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 110) {
            const g2 = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            g2.addColorStop(0, a.color); g2.addColorStop(1, b.color);
            ctx.strokeStyle = g2;
            ctx.globalAlpha = (1 - d/110) * 0.22 * Math.min(a.a, b.a);
            ctx.lineWidth = 0.6; ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
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
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
