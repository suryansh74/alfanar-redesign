"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { IMG } from "@/lib/content";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

export default function Hero() {
  const reduce = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const o = useTransform(scrollY, [0, 500], [1, 0.2]);
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const low = (nav.hardwareConcurrency ?? 8) <= 4 || nav.connection?.saveData || (nav.deviceMemory ?? 8) <= 2;
    if (reduce || low) return;
    const w = window as Window & { requestIdleCallback?: (f: () => void) => number };
    const idle = w.requestIdleCallback ?? ((f: () => void) => setTimeout(f, 300));
    idle(() => setUse3D(true));
  }, [reduce]);
  return (
    <section id="top" className="relative isolate min-h-[92vh] overflow-hidden bg-brand-ink text-white">
      <Image src={`${IMG}/Impact/6GW.jpg`} alt="" fill priority sizes="100vw" className={`object-cover transition-opacity duration-1000 ${use3D ? "opacity-20" : "opacity-50"}`} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
      {use3D && <div className="absolute inset-0"><HeroScene /></div>}
      <motion.div style={reduce ? undefined : { y, opacity: o }} className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-sky">Engineering a cleaner future</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">Powering the future</motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">Sustainability isn’t a feature, it’s a foundation. Our work is designed to protect what matters.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#sectors" className="btn-primary">Explore our sectors</a>
          <a href="#careers" className="btn-ghost">Grow with us</a>
        </motion.div>
      </motion.div>
      <a href="#purpose" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/70 hover:text-white">Scroll down ↓</a>
    </section>
  );
}
