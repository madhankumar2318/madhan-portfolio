import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';
import { GlassSpotlight } from './GlassSpotlight';

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

        {/* Education Grid — stretch so both cards are equal height */}
        <div className="grid-2" style={{ maxWidth: '950px', margin: '0 auto', alignItems: 'stretch' }}>
          {education.map((edu) => (
            <GlassSpotlight
              key={edu.id}
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
              }}
              size={280}
              strength={0.12}
            >
              {/* Icon + Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '1rem' }}>
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
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>{edu.degree}</h3>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                    {edu.institution}
                  </div>
                </div>
              </div>

              {/* Period & Location row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.2rem' }}>
                <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={13} />
                  {edu.period}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={13} />
                  {edu.location}
                </div>
              </div>

              {/* Score badge — pushed to bottom so both cards align */}
              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', border: '1px solid var(--accent-emerald)', fontWeight: 700, fontSize: '0.88rem' }}>
                  <Award size={14} />
                  <span>{edu.score}</span>
                </div>
              </div>

            </GlassSpotlight>
          ))}
        </div>

      </div>
    </section>
  );
};
