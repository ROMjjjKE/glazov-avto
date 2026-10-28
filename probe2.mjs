import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('c:' + m.text()); });
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4200/glazov-avto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 2500));
console.log('after 2.5s:', await p.evaluate(() => ({
  mode: document.querySelector('.volt__pin').className,
  spacer: !!document.querySelector('.pin-spacer'),
  top: Math.round(document.querySelector('.volt__pin').getBoundingClientRect().top),
  chunks: performance.getEntriesByType('resource').map(r => r.name.split('/').pop()).filter(n => /ScrollTrigger|gsap|index/.test(n)),
})), errs);
await p.evaluate(() => window.scrollBy(0, 400));
await new Promise(r => setTimeout(r, 1500));
console.log('after scroll:', await p.evaluate(() => ({
  mode: document.querySelector('.volt__pin').className,
  v: document.querySelector('.readout__v').innerText.replace(/\s/g, ''),
  spacer: !!document.querySelector('.pin-spacer'),
})), errs);
await b.close();
