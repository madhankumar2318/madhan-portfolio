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
        padding: '2.5rem 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '1.2rem',
        }}
      >
        
        {/* Brand & Name */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontWeight: 700 }}>
          <Code size={18} color="var(--accent-primary)" />
          <span>{portfolioData.personal.name}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} • Built for performance
          </span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.2rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <span>Back to top</span>
          <ArrowUp size={14} />
        </button>

      </div>
    </footer>
  );
};
