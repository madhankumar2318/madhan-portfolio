import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { X, Printer, Mail, MapPin, Globe, Phone, GraduationCap, Award, Briefcase, Code2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { personal, experiences, projects, education, certifications, skillCategories } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        background: 'rgba(0, 0, 0, 0.85)',
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
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '92vh',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-3d)',
          position: 'relative',
          border: '1px solid var(--border-glow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'var(--bg-tertiary)',
            padding: '1rem 1.8rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700 }}>
            <span>{personal.name} — Official Resume / CV</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button onClick={handlePrint} className="btn btn-outline" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
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
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Content Container */}
        <div style={{ padding: '2.5rem 2rem' }}>
          
          {/* Header */}
          <div style={{ borderBottom: '2px solid var(--accent-primary)', paddingBottom: '1.5rem', marginBottom: '1.8rem' }}>
            <h1 style={{ fontSize: '2.4rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              {personal.name}
            </h1>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              {personal.title}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} color="var(--accent-cyan)" /> {personal.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={14} color="var(--accent-cyan)" /> {personal.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="var(--accent-cyan)" /> {personal.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Globe size={14} color="var(--accent-cyan)" /> github.com/madhankumar2318
              </span>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={18} /> Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ background: 'var(--bg-tertiary)', padding: '1rem 1.2rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{edu.institution}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{edu.period}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
                    <span>{edu.degree}</span>
                    <strong>{edu.score}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={18} /> Technical Skills
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {skillCategories.map((cat) => (
                <div key={cat.category} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {cat.category}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {cat.skills.map((s) => s.name).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={18} /> Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                      {exp.role} — <span style={{ color: 'var(--accent-cyan)' }}>{exp.company}</span> ({exp.location})
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{exp.period}</span>
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', marginTop: '0.4rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {exp.keyAchievements.map((ach, i) => (
                      <li key={i} style={{ marginBottom: '0.4rem', lineHeight: 1.5 }}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={18} /> Key Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ background: 'var(--bg-tertiary)', padding: '1rem 1.2rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    {proj.title} <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>({proj.techStack.join(', ')})</span>
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {proj.impactMetrics.map((m, i) => (
                      <li key={i} style={{ marginBottom: '0.2rem' }}>{m}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} /> Certifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem', fontSize: '0.9rem' }}>
              {certifications.map((c) => (
                <div key={c.title} style={{ background: 'var(--bg-tertiary)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.88rem' }}>{c.title}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>{c.issuer}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
