import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
// ширины
for (const w of [320, 390, 480, 768, 1024, 1200, 1440, 1680]) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: w, height: 860 });
  await p.goto('http://127.0.0.1:4200/glazov-avto/', { waitUntil: 'networkidle2' });
  await p.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 500));
  const st = await p.evaluate(() => {
    const over = [...document.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > window.innerWidth + 1).slice(0, 2).map(el => el.tagName + '.' + (el.className || '').toString().split(' ')[0]);
    return { sw: document.documentElement.scrollWidth, inner: window.innerWidth, over, h1: getComputedStyle(document.querySelector('h1')).fontSize, glyph: document.fonts.check('16px "Fira Cond"', 'Выезжаю круглосуточно') };
  });
  console.log(String(w).padStart(4), JSON.stringify(st), errs[0] || '');
  await p.close();
}
// CLS + мобильный скрин
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await p.evaluateOnNewDocument(() => {
  window.__s = [];
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__s.push(+e.value.toFixed(4)); }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('http://127.0.0.1:4200/glazov-avto/', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2200));
console.log('CLS mobile:', (await p.evaluate(() => window.__s.reduce((a, x) => a + x, 0))).toFixed(4));
await p.screenshot({ path: 'shots/m-hero.png' });
await b.close();
