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
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderColor: isHovered ? 'var(--accent-primary)' : 'var(--border-color)',
        boxShadow: isHovered
          ? '0 8px 30px -5px rgba(99, 102, 241, 0.3), inset 0 0 15px rgba(99, 102, 241, 0.05)'
          : 'var(--shadow-sm)',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};
