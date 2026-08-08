import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { X, Printer, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { personal, experiences, projects, certifications, softSkills } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
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
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '94vh',
          background: '#0d1117',
          borderRadius: '16px',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.2)',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Control Bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'rgba(22, 27, 34, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '1rem 1.8rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: '#f0f6fc', fontSize: '1rem' }}>
            <span>📄 Official Resume — {personal.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              onClick={handleDownloadPDF}
              className="btn btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              <Download size={16} />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn btn-outline"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              <Printer size={16} />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f0f6fc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Official Paper Document View */}
        <div
          id="printable-resume"
          style={{
            padding: '3rem 3.5rem',
            background: '#ffffff',
            color: '#111111',
            fontFamily: '"Computer Modern", "Times New Roman", Times, Georgia, serif',
            lineHeight: '1.45',
            fontSize: '10.5pt',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '0.5px', color: '#000000', fontFamily: 'inherit' }}>
              {personal.name}
            </h1>
            <div style={{ fontSize: '10pt', color: '#222222' }}>
              {personal.phone} |{' '}
              <a href={`mailto:${personal.email}`} style={{ color: '#111111', textDecoration: 'underline' }}>
                {personal.email}
              </a>{' '}
              |{' '}
              <a href={personal.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: '#111111', textDecoration: 'underline' }}>
                LinkedIn
              </a>{' '}
              |{' '}
              <a href={personal.socials.github} target="_blank" rel="noreferrer" style={{ color: '#111111', textDecoration: 'underline' }}>
                GitHub
              </a>{' '}
              |{' '}
              <a href="#hero" onClick={onClose} style={{ color: '#111111', textDecoration: 'underline' }}>
                Portfolio
              </a>
            </div>
          </div>

          {/* Section: Education */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #111111', paddingBottom: '2px', marginBottom: '6px' }}>
              EDUCATION
            </div>
            
            {/* College */}
            <div style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>J.J.College of Engineering and Technology</span>
                <span>Trichy</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic' }}>
                <span>B.Tech in Artificial Intelligence and Data Science - CGPA : 8.02</span>
                <span>Aug. 2023 – May 2027</span>
              </div>
            </div>

            {/* School */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Shri Jayendra Vidhyalaya CBSE School</span>
                <span>Musiri</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic' }}>
                <span>SSLC : 81% - HSC : 63%</span>
                <span>June 2016 – May 2023</span>
              </div>
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #111111', paddingBottom: '2px', marginBottom: '6px' }}>
              TECHNICAL SKILLS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div>
                <strong>Languages:</strong> Java, JavaScript, SQL, HTML, CSS
              </div>
              <div>
                <strong>Frameworks:</strong> React, Spring Boot
              </div>
              <div>
                <strong>Developer Tools:</strong> Git, GitHub, Docker, AWS, IntelliJ
              </div>
              <div>
                <strong>Soft Skills :</strong> {softSkills.join(', ')}
              </div>
            </div>
          </div>

          {/* Section: Experience */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #111111', paddingBottom: '2px', marginBottom: '6px' }}>
              EXPERIENCE
            </div>
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>{exp.role}</span>
                  <span>{exp.period}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', marginBottom: '4px' }}>
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul style={{ margin: '0', paddingLeft: '18px' }}>
                  {exp.keyAchievements.map((ach, i) => (
                    <li key={i} style={{ marginBottom: '3px' }}>
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Projects */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #111111', paddingBottom: '2px', marginBottom: '6px' }}>
              PROJECTS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                    {proj.title}
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '9.5pt', marginBottom: '3px', color: '#333333' }}>
                    {proj.techStack.join(', ')}
                  </div>
                  <ul style={{ margin: '0', paddingLeft: '18px' }}>
                    {proj.impactMetrics.map((metric, i) => (
                      <li key={i} style={{ marginBottom: '2px' }}>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Certifications */}
          <div>
            <div style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #111111', paddingBottom: '2px', marginBottom: '6px' }}>
              CERTIFICATIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {certifications.map((cert) => (
                <div key={cert.title}>
                  <strong>{cert.title}</strong> - {cert.issuer}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
