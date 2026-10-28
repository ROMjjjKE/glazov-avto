import { useEffect, useRef } from 'react';

const NAV = [
  { href: '#uslugi', label: 'Услуги' },
  { href: '#pervye', label: 'Первые 10 минут' },
  { href: '#moroz', label: 'Мороз' },
  { href: '#cena', label: 'Цена' },
  { href: '#vyzov', label: 'Вызов' },
];

export default function Header() {
  const barRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const links = Array.from(navRef.current?.querySelectorAll('a') ?? []);
    const targets = links.map((a) => document.querySelector(a.getAttribute('href')!)).filter(Boolean) as Element[];
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="hdr__brand" href="#top" aria-label="Глазов Е.А., наверх">
          <span className="hdr__name">Глазов Е.А.</span>
          <span className="hdr__sub mono">выездной автоэлектрик · Гомель</span>
        </a>
        <nav className="hdr__nav" aria-label="Разделы" ref={navRef}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="hdr__tel" href="tel:+375333069977">
          <span aria-hidden="true">24/7</span> +375 33 306-99-77
        </a>
      </div>
      <span className="hdr__progress" ref={barRef} aria-hidden="true" />
    </header>
  );
}
