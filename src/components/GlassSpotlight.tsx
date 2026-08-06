import React, { useRef, useCallback } from 'react';

interface GlassSpotlightProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string;       // spotlight tint, default indigo
  size?: number;        // spotlight radius in px, default 280
  strength?: number;    // opacity 0-1, default 0.12
}

/**
 * Wraps any card with an ambient glass spotlight:
 * as the cursor moves over the card, a soft radial light beam follows
 * the mouse under the glass surface — Apple VisionOS-style.
 * The card frame stays 100% still and aligned.
 */
export const GlassSpotlight: React.FC<GlassSpotlightProps> = ({
  children,
  className = '',
  style = {},
  color = '99, 102, 241',    // indigo RGB
  size = 280,
  strength = 0.12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const spot = spotRef.current;
    if (!el || !spot) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spot.style.left = `${x}px`;
    spot.style.top = `${y}px`;
    spot.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (spotRef.current) spotRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={containerRef}
      className={`glass-card ${className}`}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight radial beam */}
      <div
        ref={spotRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          width: `${size * 2}px`,
          height: `${size * 2}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle at center, rgba(${color}, ${strength}) 0%, rgba(${color}, 0) 70%)`,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
        }}
      />

      {/* Content sits above the spotlight */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
