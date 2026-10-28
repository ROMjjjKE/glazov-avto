import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4200/glazov-avto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
await p.screenshot({ path: 'shots/d-hero.png' });
const top = await p.evaluate(() => document.querySelector('.volt').getBoundingClientRect().top + window.scrollY);
await p.evaluate(t => window.scrollTo(0, t + 300), top);
await new Promise(r => setTimeout(r, 900));
const st = [];
for (let i = 0; i < 5; i++) {
  await p.evaluate(() => window.scrollBy(0, 340));
  await new Promise(r => setTimeout(r, 450));
  st.push(await p.evaluate(() => ({ v: document.querySelector('.readout__v').innerText.replace(/\s/g, ''), y: Math.round(document.querySelector('.volt__pin').getBoundingClientRect().top) })));
}
console.log(st.map(s => `${s.y}px ${s.v}`).join(' | '));
await p.screenshot({ path: 'shots/d-scene.png' });
await b.close();
