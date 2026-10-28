import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4200/glazov-avto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
const out = await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const sample = 'Не заводится, выезжаю круглосуточно: прикурить и отогреть 24/7';
  const w = f => { c.font = `40px "${f}"`; return +c.measureText(sample).width.toFixed(1); };
  const fonts = ['Fira Cond', 'Source Sans', 'Arial', 'sans-serif'];
  return {
    widths: Object.fromEntries(fonts.map(f => [f, w(f)])),
    h1: document.querySelector('h1').innerText,
    h1size: getComputedStyle(document.querySelector('h1')).fontSize,
    mode: document.querySelector('.volt__pin').className,
    v: document.querySelector('.readout__v')?.innerText.replace(/\s/g, ''),
    sections: [...document.querySelectorAll('section[id]')].map(s => s.id),
    scrollW: document.documentElement.scrollWidth,
  };
});
console.log(JSON.stringify(out, null, 1), errs);
await p.screenshot({ path: 'shots/hero.png' });
await b.close();
