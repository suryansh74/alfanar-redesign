"use client";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sectors } from "@/lib/content";
export default function SectorExplorer() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const k = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!k) return; e.preventDefault(); const n = (i + k + sectors.length) % sectors.length; setI(n); tabs.current[n]?.focus();
  };
  const s = sectors[i];
  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div role="tablist" aria-label="Sectors" aria-orientation="vertical" onKeyDown={onKey} className="flex gap-2 overflow-x-auto lg:flex-col">
        {sectors.map((x, j) => (
          <button key={x.title} ref={(el) => { tabs.current[j] = el; }} role="tab" id={`tab-${j}`} aria-selected={i === j} aria-controls={`panel-${j}`} tabIndex={i === j ? 0 : -1} onClick={() => setI(j)}
            className={`group shrink-0 rounded-xl border px-5 py-4 text-left transition-all ${i === j ? "border-brand-blue bg-brand-blue text-white shadow-lg shadow-brand-blue/25" : "border-slate-200 bg-white text-slate-800 hover:border-brand-blue hover:-translate-y-0.5"}`}>
            <span className={`block text-xs uppercase tracking-widest ${i === j ? "text-white/80" : "text-slate-500"}`}>{x.category}</span>
            <span className="mt-1 block font-semibold">{x.title}</span>
          </button>
        ))}
      </div>
      <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-brand-ink [perspective:1200px]">
        <AnimatePresence mode="wait">
          <motion.div key={s.title} id={`panel-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`} initial={{ opacity: 0, rotateY: -8, scale: 0.98 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 8 }} transition={{ duration: 0.45 }} className="absolute inset-0">
            <Image src={s.img} alt={`${s.title} sector`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />
            <div className="absolute bottom-0 p-8 text-white sm:p-10">
              <p className="text-sm uppercase tracking-widest text-brand-sky">{s.category}</p>
              <h3 className="mt-2 text-3xl font-bold sm:text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-lg text-lg text-white/85">{s.content}</p>
              <a href={s.href} className="btn-primary mt-6 inline-flex">View more <span aria-hidden>→</span></a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
