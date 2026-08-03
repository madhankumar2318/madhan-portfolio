import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Send, CheckCircle, Copy, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <MessageSquare size={14} />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtitle">
            Open for full-time opportunities, technical interviews, and interesting project collaborations.
          </p>
        </div>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          
          {/* Direct Info Card */}
          <div className="glass-card" style={{ padding: '1.8rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Direct Outreach
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.8rem', lineHeight: 1.6 }}>
              Looking to fill a Software Engineer position or schedule a technical discussion? Reach out directly via email or LinkedIn.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.8rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.8rem',
                  background: 'var(--bg-secondary)',
                  padding: '0.9rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: 0, flex: 1 }}>
                  <Mail size={20} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Email</div>
                    <a
                      href={`mailto:${personal.email}`}
                      style={{
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        wordBreak: 'break-all',
                        lineHeight: 1.3,
                      }}
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    flexShrink: 0,
                  }}
                >
                  {copied ? <CheckCircle size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ flex: '1 1 140px', padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
              >
                <GithubIcon size={18} />
                <span>GitHub Profile</span>
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ flex: '1 1 140px', padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card" style={{ padding: '1.8rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Send a Direct Message
            </h3>

            <form
              action={`https://formsubmit.co/${personal.email}`}
              method="POST"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
            >
              {/* FormSubmit Configuration Fields */}
              <input type="hidden" name="_subject" value="New Portfolio Message for Madhan Kumar S" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://madhan-portfolio.vercel.app/" />

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jane Doe"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. recruiter@company.com"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the role, team, or project details..."
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <Send size={16} />
                <span>Send Message to Gmail</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
