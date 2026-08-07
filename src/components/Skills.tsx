import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Cpu, Code2, Server, Cloud, CheckCircle2 } from 'lucide-react';
import { Tilt3D } from './Tilt3D';

export const Skills: React.FC = () => {
  const { skillCategories } = portfolioData;

  const categoryIcons = [Code2, Server, Cloud];

  return (
    <section id="skills" className="section" style={{ background: 'rgba(18, 24, 36, 0.45)' }}>
      <div className="container perspective-viewport">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <Cpu size={14} />
            <span>Technical Stack</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Core programming languages, AI/ML frameworks, cloud infrastructure, and developer tools I work with.
          </p>
        </div>

        {/* Categories Grid - Option 1 Clean Tech Badges Grid */}
        <div className="grid-3">
          {skillCategories.map((cat, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            return (
              <Tilt3D key={cat.category} maxTilt={6} style={{ padding: '2rem' }}>
                
                {/* Category Header */}
                <div className="layer-pop-1" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(99, 102, 241, 0.12)',
                      border: '1px solid var(--border-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{cat.category}</h3>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.6rem' }}>
                  {cat.description}
                </p>

                {/* Clean Tech Pills Grid (No ratings, No percentages) */}
                <div className="layer-pop-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 0.95rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-glow)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.25)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <CheckCircle2 size={15} color="var(--accent-cyan)" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>

              </Tilt3D>
            );
          })}
        </div>

      </div>
    </section>
  );
};
