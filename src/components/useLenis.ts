import { useEffect } from 'react';

/** Плавный скролл. Lenis подключается лениво, чтобы не задерживать первый экран. */
export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let cancelled = false;
    let teardown: (() => void) | null = null;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('lenis')]).then(
      ([{ default: gsap }, { ScrollTrigger }, { default: Lenis }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
        const onScroll = () => ScrollTrigger.update();
        lenis.on('scroll', onScroll);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        teardown = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      }
    );

    return () => {
      cancelled = true;
      if (teardown) teardown();
    };
  }, []);
}
