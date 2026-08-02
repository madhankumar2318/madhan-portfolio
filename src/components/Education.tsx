import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';
import { Tilt3D } from './Tilt3D';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container perspective-viewport">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <GraduationCap size={14} />
            <span>Academic Excellence</span>
          </div>
          <h2 className="section-title">
            Education & <span className="text-gradient">Background</span>
          </h2>
          <p className="section-subtitle">
            Formal technical education in Artificial Intelligence, Data Science, and Computer Science.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid-2" style={{ maxWidth: '950px', margin: '0 auto' }}>
          {education.map((edu) => (
            <Tilt3D key={edu.id} maxTilt={8} style={{ padding: '2rem' }}>
              
              <div className="layer-pop-1" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
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
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{edu.degree}</h3>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                    {edu.institution}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.2rem 0', padding: '0.8rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} />
                  {edu.period}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} />
                  {edu.location}
                </div>
              </div>

              <div className="layer-pop-2" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', border: '1px solid var(--accent-emerald)', fontWeight: 700, fontSize: '0.88rem' }}>
                <Award size={14} />
                <span>{edu.score}</span>
              </div>

            </Tilt3D>
          ))}
        </div>

      </div>
    </section>
  );
};
