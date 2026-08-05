import React, { useCallback, useState } from 'react';
import { useCountUp, useInViewOnce } from '../hooks/useCountUp';

interface AnimatedStatProps {
  value: string;   // raw value from data e.g. "8.02 / 10", "2027", "3 Major", "AI & DS"
  label: string;
  delay?: number;  // stagger delay in ms
}

/**
 * Parses a stat value string and returns:
 *  - the numeric part to animate
 *  - any prefix/suffix text to keep
 *  - whether it has a numeric target at all
 *
 * Examples:
 *   "8.02 / 10"  → prefix="", numeric=8.02, suffix=" / 10", decimals=2
 *   "2027"       → prefix="", numeric=2027, suffix="", decimals=0
 *   "3 Major"    → prefix="", numeric=3, suffix=" Major", decimals=0
 *   "AI & DS"    → no numeric → show as-is
 */
function parseStatValue(raw: string): {
  hasNumber: boolean;
  prefix: string;
  numeric: number;
  suffix: string;
  decimals: number;
} {
  const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)/);
  if (!match) {
    return { hasNumber: false, prefix: raw, numeric: 0, suffix: '', decimals: 0 };
  }
  const [, prefix, numStr, suffix] = match;
  const numeric = parseFloat(numStr);
  const decimals = (numStr.split('.')[1] ?? '').length;
  return { hasNumber: true, prefix, numeric, suffix, decimals };
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, label, delay = 0 }) => {
  const parsed = parseStatValue(value);
  const [animating, setAnimating] = useState(false);

  const { value: count, startAnimation } = useCountUp({
    end: parsed.hasNumber ? parsed.numeric : 0,
    duration: 1600,
    decimals: parsed.decimals,
    delay,
  });

  const handleEnter = useCallback(() => {
    if (parsed.hasNumber) {
      setAnimating(true);
      startAnimation();
    }
  }, [parsed.hasNumber, startAnimation]);

  const ref = useInViewOnce(handleEnter);

  const displayValue = parsed.hasNumber
    ? `${parsed.prefix}${animating ? count.toFixed(parsed.decimals) : parsed.numeric.toFixed(parsed.decimals)}${parsed.suffix}`
    : value;

  return (
    <div
      ref={ref}
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
        transition: 'border-color 0.4s ease',
      }}
    >
      {/* Animated number value */}
      <div
        className="text-gradient"
        style={{
          fontSize: 'clamp(1.15rem, 3.8vw, 1.5rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '0.3rem',
          wordBreak: 'break-word',
          transition: 'all 0.05s linear',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {displayValue}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  );
};
