import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectorExplorer from "@/components/SectorExplorer";
import { stats, highlights, projects, quotes, careers, news, IMG } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        <section id="purpose" className="relative -mt-16 px-6">
          <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-2xl shadow-brand-ink/10 sm:p-12">
            <Reveal className="grid gap-8 lg:grid-cols-2">
              <div><p className="eyebrow">Driven by purpose</p><h2 className="h2">Systems that support progress</h2></div>
              <p className="text-lg leading-relaxed text-slate-600">Our purpose is simple: design and build systems that support progress; sustainably and intelligently. From smart grids to safer homes, we engineer what the world needs next, built on care, driven by responsibility, and designed to serve people first.</p>
            </Reveal>
            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.05} className="group rounded-2xl border border-slate-100 bg-brand-mist/40 p-6 transition hover:-translate-y-1 hover:border-brand-blue hover:shadow-lg">
                  <dt className="text-sm text-slate-600">{s.label}</dt>
                  <dd className="mt-2 text-3xl font-bold text-brand-ink sm:text-4xl"><Counter value={s.value} decimals={s.decimals} prefix={s.prefix} postfix={s.postfix} /></dd>
                </Reveal>
              ))}
            </dl>
            <p className="mt-4 text-xs text-slate-500">Figures as published on alfanar.com.</p>
          </div>
        </section>

        <section id="sectors" className="mx-auto max-w-7xl px-6 py-24">
          <Reveal><p className="eyebrow">Core sectors</p><h2 className="h2">Built for people first</h2><p className="mt-4 max-w-2xl text-lg text-slate-600">From power to process, our sectors deliver future-ready infrastructure that drives lasting progress.</p></Reveal>
          <Reveal className="mt-12"><SectorExplorer /></Reveal>
        </section>

        <section id="solutions" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal><p className="eyebrow">Businesses & solutions</p><h2 className="h2">Engineering what the world needs next</h2></Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.1}>
                  <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl [transform-style:preserve-3d]">
                    <div className="relative aspect-[4/3] overflow-hidden"><Image src={h.img} alt={h.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
                    <div className="p-7"><p className="text-xs font-semibold uppercase tracking-widest text-brand-blue">{h.kicker}</p><h3 className="mt-2 text-xl font-bold text-brand-ink">{h.title}</h3><p className="mt-3 leading-relaxed text-slate-600">{h.text}</p></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
          <Reveal><p className="eyebrow">Real-world stories</p><h2 className="h2">Projects that power progress</h2></Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <li className="h-full"><a href={p.href} className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-brand-blue hover:bg-brand-ink hover:text-white">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-blue group-hover:text-brand-sky">{p.tag}</span>
                  <span className="mt-4 text-xl font-bold">{p.title}</span>
                  <span className="mt-2 text-slate-600 group-hover:text-white/80">{p.blurb}</span>
                  <span className="mt-6 text-sm font-semibold">View project <span aria-hidden className="inline-block transition group-hover:translate-x-1">→</span></span>
                </a></li>
              </Reveal>
            ))}
          </ul>
        </section>

        <section id="sustainability" className="relative isolate overflow-hidden bg-brand-ink py-28 text-white">
          <Image src={`${IMG}/Impact/6GW.jpg`} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
            <Reveal><p className="eyebrow !text-brand-sky">Sustainability</p><h2 className="h2 !text-white">Energy for today, with tomorrow in mind</h2><p className="mt-5 max-w-lg text-lg text-white/85">Sustainability isn’t a feature, it’s a foundation. Our work is designed to protect what matters.</p></Reveal>
            <Reveal delay={0.15} className="text-center lg:text-right">
              <p className="text-7xl font-bold sm:text-9xl"><Counter value={6} postfix="+ GW" /></p>
              <p className="mt-2 text-xl uppercase tracking-widest text-white/80">Powering net zero projects</p>
              <p className="mt-6 text-3xl font-semibold"><Counter value={2.5} decimals={1} postfix="M+" /> <span className="text-base font-normal text-white/70">tons CO₂ emissions cut</span></p>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="voices" className="mx-auto max-w-7xl px-6 py-24">
          <Reveal><p className="eyebrow">In their words</p><h2 id="voices" className="h2">Our people say it best</h2></Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {quotes.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.1}><figure className="flex h-full flex-col rounded-3xl bg-brand-mist/50 p-8">
                <blockquote className="flex-1 text-lg leading-relaxed text-slate-700">“{q.q}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-4"><Image src={q.img} alt={q.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" /><span><span className="block font-bold text-brand-ink">{q.name}</span><span className="text-sm text-slate-600">{q.role}</span></span></figcaption>
              </figure></Reveal>
            ))}
          </div>
        </section>

        <section id="news" className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal><p className="eyebrow">Our latest news</p><h2 className="h2">News, press releases & events</h2></Reveal>
            {news.map((n) => (
              <Reveal key={n.title} className="mt-10"><article className="rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-xl sm:p-10">
                <time className="text-sm font-semibold text-brand-blue">{n.date}</time>
                <h3 className="mt-2 text-2xl font-bold text-brand-ink">{n.title}</h3>
                <p className="mt-3 max-w-3xl text-slate-600">{n.text}</p>
                <a href={n.href} className="mt-5 inline-block font-semibold text-brand-blue link-underline">Visit the media center</a>
              </article></Reveal>
            ))}
          </div>
        </section>

        <section id="careers" className="mx-auto max-w-7xl px-6 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">Grow with us</p><h2 className="h2">Build the future you’re aiming for</h2><p className="mt-4 max-w-2xl text-lg text-slate-600">We grow when you do. Join a place that listens, supports, and helps you build the future you’re aiming for.</p></div><a href="https://www.alfanar.com/careers" className="btn-primary">Explore careers</a></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {careers.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}><article className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src={c.img} alt={c.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/30 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white"><h3 className="text-xl font-bold">{c.title}</h3><p className="mt-2 text-sm text-white/85">{c.text}</p></div>
              </article></Reveal>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-brand-ink text-white/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
          <div><Image src="/alfanar-logo-white.svg" alt="alfanar" width={156} height={46} className="h-11 w-auto" /><p className="mt-3 text-sm">The Power of Excellence</p></div>
          <nav aria-label="Sectors"><p className="font-semibold text-white">Sectors</p><ul className="mt-3 space-y-2 text-sm"><li>Energy & Grid</li><li>Process</li><li>Water</li><li>Data Centers</li><li>Building & Infrastructure</li><li>Renewable Energy</li></ul></nav>
          <nav aria-label="Company"><p className="font-semibold text-white">Company</p><ul className="mt-3 space-y-2 text-sm"><li><a className="link-underline" href="https://www.alfanar.com/company/about-us">About us</a></li><li><a className="link-underline" href="https://www.alfanar.com/careers">Careers</a></li><li><a className="link-underline" href="https://www.alfanar.com/media-center">Media center</a></li></ul></nav>
          <div><p className="font-semibold text-white">Get in touch</p><a href="https://www.alfanar.com/contact-us" className="btn-primary mt-4">Contact us</a></div>
        </div>
        <p className="border-t border-white/10 px-6 py-6 text-center text-xs">Design concept. Content and imagery © alfanar, sourced from alfanar.com.</p>
      </footer>
    </>
  );
}
