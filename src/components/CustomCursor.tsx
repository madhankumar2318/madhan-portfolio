import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.card-3d') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hide on mobile touch devices
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Outer Glowing Ring */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          width: isHovered ? '44px' : '26px',
          height: isHovered ? '44px' : '26px',
          borderRadius: '50%',
          border: '1.5px solid var(--accent-cyan)',
          background: isHovered ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease, transform 0.05s linear',
          boxShadow: isHovered ? '0 0 20px var(--accent-cyan)' : '0 0 10px rgba(99, 102, 241, 0.3)',
        }}
      />
      {/* Inner Glowing Core Dot */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          boxShadow: '0 0 8px var(--accent-primary)',
        }}
      />
    </>
  );
};
