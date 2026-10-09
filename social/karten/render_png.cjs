// PNG-Vorschau (transparent + dunkler Hintergrund zum Ansehen). Aufruf: node render_png.cjs <region>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const out = path.join(__dirname, process.argv[2]);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const name of ['titelkarte', 'regionskarte']) {
    const svg = fs.readFileSync(path.join(out, name + '.svg'), 'utf8');
    const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/).map(Number);
    const pg = await b.newPage({ viewport: { width: w, height: h } });
    for (const [suf, bg] of [['', 'transparent'], ['_dunkel', '#141416']]) {
      await pg.setContent(`<html><body style="margin:0;background:${bg}">${svg}</body></html>`);
      await pg.evaluate(() => document.fonts.ready);
      await pg.waitForTimeout(300);
      await pg.screenshot({ path: path.join(out, name + suf + '.png'), omitBackground: suf === '', clip: { x: 0, y: 0, width: w, height: h } });
    }
  }
  await b.close();
})();
