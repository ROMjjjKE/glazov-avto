import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('https://romjjjke.github.io/glazov-avto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1200));
const top = await p.evaluate(() => document.querySelector('.volt__pin').getBoundingClientRect().top + window.scrollY);
for (let i = 0; i < 8; i++) {
  await p.evaluate(y => window.scrollTo(0, y), top + i * 260);
  await new Promise(r => setTimeout(r, 700));
  console.log(i * 260, await p.evaluate(() => ({
    y: Math.round(document.querySelector('.volt__pin').getBoundingClientRect().top),
    v: document.querySelector('.readout__v').innerText.replace(/\s/g, ''),
  })));
}
await b.close();
