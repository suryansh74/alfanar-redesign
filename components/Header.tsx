"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
const links = [["Purpose", "#purpose"], ["Sectors", "#sectors"], ["Solutions", "#solutions"], ["Projects", "#projects"], ["Sustainability", "#sustainability"], ["News", "#news"], ["Careers", "#careers"]];
export default function Header() {
  const [s, setS] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setS(window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${s ? "bg-white/90 text-brand-ink shadow-sm backdrop-blur" : "bg-transparent text-white"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-brand-ink">Skip to content</a>
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="alfanar home" className="relative block h-10 w-[136px] shrink-0">
          <Image src="/alfanar-logo-white.svg" alt="alfanar" width={156} height={46} priority className={`absolute inset-0 h-10 w-auto transition-opacity duration-300 ${s ? "opacity-0" : "opacity-100"}`} />
          <Image src="/alfanar-logo-blue.svg" alt="" aria-hidden width={288} height={85} priority className={`absolute inset-0 h-10 w-auto transition-opacity duration-300 ${s ? "opacity-100" : "opacity-0"}`} />
        </a>
        <ul className="hidden gap-7 text-sm font-medium lg:flex">{links.map(([l, h]) => <li key={h}><a className="link-underline" href={h}>{l}</a></li>)}</ul>
        <a href="https://www.alfanar.com/contact-us" className="hidden rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-sky lg:inline-block">Contact us</a>
        <button className="lg:hidden" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      </nav>
      {open && <ul id="mnav" className="space-y-1 bg-white px-6 pb-6 text-brand-ink lg:hidden">{links.map(([l, h]) => <li key={h}><a onClick={() => setOpen(false)} className="block py-2" href={h}>{l}</a></li>)}</ul>}
    </header>
  );
}
