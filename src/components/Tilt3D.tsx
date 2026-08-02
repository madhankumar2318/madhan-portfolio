import React, { useState } from 'react';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
}

export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  className = '',
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-card ${className}`}
      style={{
        ...style,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        borderColor: isHovered ? 'var(--accent-primary)' : 'var(--border-color)',
        boxShadow: isHovered ? '0 12px 30px -10px rgba(99, 102, 241, 0.35)' : 'var(--shadow-sm)',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};
