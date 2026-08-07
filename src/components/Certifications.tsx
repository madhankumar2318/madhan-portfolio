import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Tilt3D } from './Tilt3D';

export const Certifications: React.FC = () => {
  const { certifications } = portfolioData;

  return (
    <section className="section" style={{ background: 'rgba(10, 13, 20, 0.45)' }}>
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
            Professional industry certifications across Machine Learning, Java, Cloud Computing, and Anthropic Claude.
          </p>
        </div>

        {/* Certifications Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {certifications.map((cert) => (
            <Tilt3D key={cert.title} maxTilt={8} style={{ padding: '1.8rem' }}>
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
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    {cert.title}
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={14} />
                    <span>Issued by {cert.issuer}</span>
                  </div>
                </div>

              </div>
            </Tilt3D>
          ))}
        </div>

      </div>
    </section>
  );
};
