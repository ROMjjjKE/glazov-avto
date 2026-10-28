import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('requestfailed', r => errs.push('req ' + r.url().split('/').pop()));
await p.setViewport({ width: 1440, height: 900 });
await p.goto('https://romjjjke.github.io/glazov-avto/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
const info = await p.evaluate(() => ({
  h1: document.querySelector('h1').innerText, font: getComputedStyle(document.querySelector('h1')).fontFamily,
  tel: document.querySelector('.hdr__tel').getAttribute('href'),
  fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
  scrollW: document.documentElement.scrollWidth,
}));
console.log(JSON.stringify(info), 'errors:', errs.slice(0, 3));
// сцена: доходим до 14,4
const top = await p.evaluate(() => document.querySelector('.volt').getBoundingClientRect().top + window.scrollY);
await p.evaluate(t => window.scrollTo(0, t + 1400), top);
await new Promise(r => setTimeout(r, 1400));
console.log('scene:', await p.evaluate(() => ({ v: document.querySelector('.readout__v').innerText.replace(/\s/g, ''), on: document.querySelectorAll('.acts li.is-on').length, spacer: !!document.querySelector('.pin-spacer') })));
await b.close();
