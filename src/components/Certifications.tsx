import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GlassSpotlight } from './GlassSpotlight';

export const Certifications: React.FC = () => {
  const { certifications } = portfolioData;

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container perspective-viewport">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <ShieldCheck size={14} />
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="text-gradient">Training</span>
          </h2>
          <p className="section-subtitle">
            Professional industry certifications across Artificial Intelligence, Machine Learning, Cloud Architecture, and Software Engineering.
          </p>
        </div>

        {/* Certifications Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {certifications.map((cert) => (
            <GlassSpotlight key={cert.title} style={{ padding: '1.8rem' }} size={280} strength={0.14}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--accent-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: 'var(--shadow-glow)',
                    flexShrink: 0,
                  }}
                >
                  <Award size={22} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.3rem', lineHeight: 1.35 }}>
                    {cert.title}
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 size={14} />
                    <span>Issued by {cert.issuer}</span>
                  </div>
                </div>

              </div>
            </GlassSpotlight>
          ))}
        </div>

      </div>
    </section>
  );
};
