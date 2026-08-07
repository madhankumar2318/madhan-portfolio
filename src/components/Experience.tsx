import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

export const Experience: React.FC = () => {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="section" style={{ background: 'rgba(18, 24, 36, 0.45)' }}>
      <div className="container perspective-viewport">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <Briefcase size={14} />
            <span>Career Path</span>
          </div>
          <h2 className="section-title">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-subtitle">
            My engineering journey building scalable web software across high-growth teams.
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
          
          {/* Vertical Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '24px',
              width: '2px',
              background: 'var(--border-color)',
            }}
          />

          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              style={{
                position: 'relative',
                paddingLeft: '60px',
                marginBottom: idx === experiences.length - 1 ? 0 : '2.5rem',
              }}
            >
              {/* Timeline Indicator Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '13px',
                  top: '6px',
                  width: '24px',
                  height: '24px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-primary)',
                  border: '2px solid var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: 'var(--radius-full)', background: 'var(--accent-primary)' }} />
              </div>

              {/* 3D Timeline Glass Card */}
              <div className="glass-card card-3d" style={{ padding: '2rem' }}>
                
                {/* Header info */}
                <div className="layer-pop-1" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {exp.role}
                    </h3>
                    <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                      {exp.company}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={14} />
                      {exp.period}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="layer-pop-1" style={{ marginBottom: '1.4rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Award size={14} color="var(--accent-cyan)" />
                    Key Accomplishments
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {exp.keyAchievements.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div className="layer-pop-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
