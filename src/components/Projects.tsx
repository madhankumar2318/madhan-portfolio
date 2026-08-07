import React from 'react';
import { portfolioData, type Project } from '../data/portfolioData';
import { ExternalLink, Layers, TrendingUp } from 'lucide-react';
import { GithubIcon } from './Icons';
import { GlassSpotlight } from './GlassSpotlight';

export const Projects: React.FC = () => {
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container perspective-viewport">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <Layers size={14} />
            <span>Featured Work</span>
          </div>
          <h2 className="section-title">
            Production <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world applications showcasing AI engineering, full-stack architecture, and measured user impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid-3">
          {projects.map((project: Project) => (
            <GlassSpotlight
              key={project.id}
              className=""
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
              size={300}
              strength={0.13}
              color="99, 102, 241"
            >
              {/* Image Preview Container */}
              <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.4rem', lineHeight: 1.6 }}>
                  {project.description}
                </p>

                {/* Measured Impact Bullets */}
                <div style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    <TrendingUp size={14} /> Measured Impact
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {project.impactMetrics.map((metric, idx) => (
                      <li key={idx} style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.4 }}>
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>✓</span>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.8rem', marginTop: 'auto' }}>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links Footer - View Code & Live Demo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem', gap: '0.8rem' }}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.5rem 0.8rem', fontSize: '0.85rem', width: project.liveUrl ? 'auto' : '100%' }}
                  >
                    <GithubIcon size={16} />
                    <span>View Code</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '0.5rem 0.8rem', fontSize: '0.85rem' }}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

              </div>
            </GlassSpotlight>
          ))}
        </div>

      </div>
    </section>
  );
};
