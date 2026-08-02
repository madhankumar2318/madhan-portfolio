import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Download, Mail, Check, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { Canvas3D } from './Canvas3D';
import { Tilt3D } from './Tilt3D';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="section" style={{ paddingTop: '8rem', paddingBottom: '6rem', overflow: 'hidden', position: 'relative' }}>
      
      {/* Interactive 3D Canvas Particle Background */}
      <Canvas3D />

      {/* Background Glow Orbs */}
      <div
        className="glow-orb"
        style={{
          top: '8%',
          left: '12%',
          width: '380px',
          height: '380px',
          background: 'rgba(99, 102, 241, 0.18)',
        }}
      />
      <div
        className="glow-orb"
        style={{
          top: '25%',
          right: '8%',
          width: '320px',
          height: '320px',
          background: 'rgba(6, 182, 212, 0.18)',
        }}
      />

      {/* Floating 3D Geometric Cube Background Accent */}
      <div className="floating-3d-cube" style={{ top: '15%', right: '46%' }}>
        <div className="cube-face face-front" />
        <div className="cube-face face-back" />
        <div className="cube-face face-right" />
        <div className="cube-face face-left" />
        <div className="cube-face face-top" />
        <div className="cube-face face-bottom" />
      </div>

      <div className="container perspective-viewport" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">
          
          {/* Left Column: Text & CTAs */}
          <div className="animate-fade-in">
            {/* Status Badge */}
            <div className="badge">
              <Sparkles size={14} />
              <span>Available for New Roles & Opportunities</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.2rem', lineHeight: 1.1 }}>
              Hi, I'm <span className="text-gradient">{personal.name}</span>
            </h1>

            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
              {personal.title}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              <MapPin size={16} color="var(--accent-primary)" />
              <span>{personal.location}</span>
            </div>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: '2rem' }}>
              {personal.bio}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button onClick={onOpenResume} className="btn btn-primary">
                <Download size={18} />
                <span>View / Download Resume</span>
              </button>

              <button onClick={handleCopyEmail} className="btn btn-secondary">
                {copied ? <Check size={18} color="var(--accent-emerald)" /> : <Mail size={18} />}
                <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
              </button>

              <a href="#projects" className="btn btn-outline">
                <span>View Projects</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Profiles:
              </span>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <LinkedinIcon size={18} />
              </a>
              {personal.socials.leetcode && (
                <a
                  href={personal.socials.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  title="LeetCode Profile"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: 'var(--shadow-sm)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <LeetcodeIcon size={18} color="var(--text-primary)" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Subtle 3D Elevating Key Stats Panel */}
          <Tilt3D maxTilt={4} style={{ padding: '2rem' }}>
            <h3 className="layer-pop-1" style={{ fontSize: '1.15rem', marginBottom: '1.2rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              Engineering Metrics
            </h3>

            <div className="layer-pop-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {personal.stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: 0,
                  }}
                >
                  <div
                    className="text-gradient"
                    style={{
                      fontSize: stat.value.length > 9 ? '1.25rem' : '1.65rem',
                      fontWeight: 800,
                      lineHeight: 1.1,
                      marginBottom: '0.3rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Tilt3D>

        </div>
      </div>
    </section>
  );
};
