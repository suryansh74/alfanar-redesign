"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
export default function Counter({ value, decimals = 0, prefix = "", postfix = "" }: { value: number; decimals?: number; prefix?: string; postfix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    let raf = 0; const t0 = performance.now(); const d = 1600;
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / d); setN(value * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);
  return <span ref={ref} aria-label={`${prefix}${value}${postfix}`}>{prefix}{n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{postfix}</span>;
}
