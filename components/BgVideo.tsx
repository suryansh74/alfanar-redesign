"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function BgVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [allowed, setAllowed] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    setAllowed(!reduce && !nav.connection?.saveData);
  }, [reduce]);
  useEffect(() => {
    const v = ref.current; if (!allowed || !v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setLoad(true); v.play().catch(() => {}); } else v.pause();
    }, { rootMargin: "200px" });
    io.observe(v); return () => io.disconnect();
  }, [allowed]);
  return (
    <div className={`absolute inset-0 -z-10 ${className}`} aria-hidden>
      <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
      {allowed && (
        <video ref={ref} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="none" poster={poster} src={load ? src : undefined} />
      )}
    </div>
  );
}
