import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Code2, Zap } from 'lucide-react';
import { Tilt3D } from './Tilt3D';

interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
  executionTime: string;
  output: string;
}

export const CodeInspector: React.FC = () => {
  const snippets: CodeSnippet[] = [
    {
      filename: 'Architecture.ts',
      language: 'TypeScript',
      code: `// High-Performance Full-Stack Microservices Router
import { Router, Request, Response } from 'express';
import { CacheManager } from '@madhan/cache';

export class APIPipeline {
  private cache = new CacheManager({ ttl: 600 });

  async handleRequest(req: Request, res: Response) {
    const cached = await this.cache.get(req.url);
    if (cached) return res.json({ source: 'edge-cache', data: cached });

    const data = await this.processPipeline(req.body);
    await this.cache.set(req.url, data);
    return res.status(200).json({ status: 'success', latencyMs: 12, data });
  }
}`,
      executionTime: '12ms',
      output: '⚡ Status: 200 OK | Response: Cache Hit | Latency: 12ms | Memory: 42MB',
    },
    {
      filename: 'Performance.config.ts',
      language: 'TypeScript',
      code: `// Sub-Second LCP & Bundle Optimization Config
export const viteOptimizationConfig = {
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          graphics: ['lucide-react'],
        },
      },
    },
  },
};`,
      executionTime: '443ms',
      output: '🚀 Build Success: 1795 modules transformed | Bundle Gzip: 72.1 kB | LCP: 85ms',
    },
    {
      filename: 'DatabaseQuery.sql',
      language: 'SQL',
      code: `-- High-Throughput Index & Materialized View Query
CREATE MATERIALIZED VIEW IF NOT EXISTS user_analytics_summary AS
SELECT 
  u.id AS user_id,
  u.name,
  COUNT(o.id) AS total_orders,
  SUM(o.amount) AS lifetime_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
WITH DATA;

CREATE UNIQUE INDEX idx_user_analytics ON user_analytics_summary(user_id);`,
      executionTime: '4ms',
      output: '📊 Query Optimizer: Index Scan Executed | Rows: 50,000 | Execution Time: 4.1ms',
    },
  ];

  const [activeSnippet, setActiveSnippet] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const current = snippets[activeSnippet];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container perspective-viewport">
        
        {/* Header */}
        <div className="section-header">
          <div className="badge">
            <Code2 size={14} />
            <span>Interactive Technical Showcase</span>
          </div>
          <h2 className="section-title">
            Live Code & <span className="text-gradient">Architecture Inspector</span>
          </h2>
          <p className="section-subtitle">
            Explore actual TypeScript, Database, and Performance architecture patterns. Test code execution in real-time.
          </p>
        </div>

        {/* 3D Code Inspector Terminal */}
        <Tilt3D maxTilt={6} style={{ maxWidth: '950px', margin: '0 auto', background: 'var(--bg-secondary)', border: '1px solid var(--border-glow)' }}>
          
          {/* Terminal Top Window Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.8rem 1.2rem',
              background: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            {/* Window Dots & Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              </div>

              {/* File Tabs */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {snippets.map((snip, index) => (
                  <button
                    key={snip.filename}
                    onClick={() => {
                      setActiveSnippet(index);
                      setShowOutput(false);
                    }}
                    style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      background: activeSnippet === index ? 'var(--bg-card-hover)' : 'transparent',
                      color: activeSnippet === index ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      border: activeSnippet === index ? '1px solid var(--border-glow)' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {snip.filename}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Tools */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <button
                onClick={handleCopyCode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleRunSimulation}
                className="btn btn-primary"
                style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem' }}
              >
                <Play size={14} />
                <span>{isRunning ? 'Running...' : 'Simulate Run'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Code Viewport */}
          <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.6, overflowX: 'auto', background: '#07090e' }}>
            <pre style={{ margin: 0, color: 'var(--text-primary)' }}>
              <code>{current.code}</code>
            </pre>
          </div>

          {/* Terminal Console Output Bar */}
          <div
            style={{
              padding: '1rem 1.5rem',
              background: 'var(--bg-tertiary)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: showOutput ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
              <Terminal size={16} />
              <span>{isRunning ? 'Executing benchmark simulation...' : showOutput ? current.output : 'Click "Simulate Run" to benchmark pipeline latency.'}</span>
            </div>

            {showOutput && (
              <span style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                <Zap size={14} /> {current.executionTime}
              </span>
            )}
          </div>

        </Tilt3D>

      </div>
    </section>
  );
};
