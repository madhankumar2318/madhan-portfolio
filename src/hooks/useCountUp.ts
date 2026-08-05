import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;     // ms
  decimals?: number;     // decimal places to display
  delay?: number;        // ms before animation starts
}

/**
 * Smoothly animates a number from 0 → end using easeOutExpo.
 * Only triggers once when the element enters the viewport.
 */
export function useCountUp({ end, duration = 1800, decimals = 0, delay = 0 }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startAnimation = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    setTimeout(() => {
      rafRef.current = requestAnimationFrame(step);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { value, startAnimation };
}

/**
 * Returns a ref + started flag. When the ref element enters the viewport
 * (>=30% visible), calls the onEnter callback exactly once.
 */
export function useInViewOnce(onEnter: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          onEnter();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onEnter]);

  return ref;
}
