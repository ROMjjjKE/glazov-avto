import { useEffect } from 'react';

/**
 * Появление блоков на IntersectionObserver + CSS-переход, без GSAP:
 * так библиотека анимаций остаётся нужна только пин-сцене.
 */
export function useReveal(key: string) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => {
        n.style.opacity = '1';
        n.style.transform = 'none';
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = (Number(el.dataset.stagger ?? 0) % 4) * 50;
          window.setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    nodes.forEach((n, i) => {
      n.dataset.stagger = String(i);
      io.observe(n);
    });
    return () => io.disconnect();
  }, [key]);
}
