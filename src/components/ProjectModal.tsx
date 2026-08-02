import React from 'react';
import { type Project } from '../data/portfolioData';
import { X, ExternalLink, TrendingUp, CheckCircle, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card card-3d"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-lg)',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-3d)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'var(--bg-tertiary)',
            padding: '1.2rem 1.8rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '1.1rem' }}>
            <Cpu size={20} color="var(--accent-primary)" />
            <span>Project Deep Inspection</span>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '2rem' }}>
          
          {/* Cover Image */}
          <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.8rem', border: '1px solid var(--border-color)' }}>
            <img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(10, 13, 20, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                border: '1px solid var(--border-glow)',
              }}
            >
              {project.category}
            </div>
          </div>

          {/* Title & Description */}
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
            {project.title}
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.8rem', lineHeight: 1.6 }}>
            {project.description}
          </p>

          {/* Measured Impact Section */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.4rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.8rem' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={16} /> Measured Impact & Key Results
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.impactMetrics.map((metric, idx) => (
                <li key={idx} style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Matrix */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem' }}>
              Technologies Used
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    padding: '0.35rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--accent-primary)',
                    border: '1px solid var(--border-glow)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <ExternalLink size={16} />
              <span>Launch Live Demo</span>
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              <GithubIcon size={16} />
              <span>View Source Code</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
