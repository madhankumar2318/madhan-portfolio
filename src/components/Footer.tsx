import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        
        {/* Left: Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700 }}>
          <Code size={18} color="var(--accent-primary)" />
          <span>{portfolioData.personal.name}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} • Built for performance
          </span>
        </div>

        {/* Center: Tech Tag */}
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          Crafted with React, TypeScript & Vite
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <span>Back to top</span>
          <ArrowUp size={14} />
        </button>

      </div>
    </footer>
  );
};
