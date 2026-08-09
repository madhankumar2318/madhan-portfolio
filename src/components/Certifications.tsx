import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {certifications.map((cert) => (
            <GlassSpotlight key={cert.title} style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', height: '100%' }} size={280} strength={0.14}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem' }}>
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

                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.3rem', lineHeight: 1.35 }}>
                    {cert.title}
                  </h3>
                  <div style={{ fontSize: '0.86rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={14} />
                    <span>Issued by {cert.issuer}</span>
                  </div>
                </div>
              </div>

              {/* Category Tag */}
              {cert.category && (
                <div style={{ marginTop: 'auto', paddingTop: '0.8rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      display: 'inline-block',
                      marginBottom: cert.link ? '0.8rem' : '0',
                    }}
                  >
                    {cert.category}
                  </span>
                </div>
              )}

              {/* Verified Credential PDF Button */}
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{
                    marginTop: 'auto',
                    padding: '0.45rem 0.8rem',
                    fontSize: '0.82rem',
                    width: '100%',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>View Verified Certificate</span>
                  <ExternalLink size={14} />
                </a>
              )}

            </GlassSpotlight>
          ))}
        </div>

      </div>
    </section>
  );
};
