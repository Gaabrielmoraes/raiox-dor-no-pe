// Benchmark visual (tela 08): capturas com viewport fixo (nunca full-page) + carregamento observado
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const PESQ = process.argv[2];
const OUT = path.join(PESQ, 'paginas', 'bench');
fs.mkdirSync(OUT, { recursive: true });
const alvos = [
  ['koprez', 'Koprez', 'https://koprez.com/', 'https://koprez.com/products/foot-sleeve'],
  ['onecompress', 'One Compress', 'https://onecompress.com/', 'https://onecompress.com/products/bamboofootsleeves'],
  ['stepprs', 'Stepprs', 'https://stepprs.com/', 'https://stepprs.com/products/plantar-fasciitis-kit'],
  ['orthoflexx', 'OrthoFlexx', 'https://orthoflexx.com/', 'https://orthoflexx.com/products/max-arch-support-insoles'],
  ['heelora', 'Heelora (mockup)', 'file:///' + path.join(PESQ, 'paginas', 'mockup-home.html').replace(/\\/g, '/'), 'file:///' + path.join(PESQ, 'paginas', 'mockup-pdp.html').replace(/\\/g, '/')],
];
const DEV = { desktop: { width: 1280, height: 800, clipH: 1500 }, mobile: { width: 390, height: 844, clipH: 1400, mobile: true } };
(async () => {
  const browser = await chromium.launch({ headless: true });
  const perf = [];
  for (const [slug, nome, home, pdp] of alvos) {
    for (const [pag, url] of [['home', home], ['pdp', pdp]]) {
      for (const [dev, cfg] of Object.entries(DEV)) {
        const ctx = await browser.newContext({ viewport: { width: cfg.width, height: cfg.height }, isMobile: !!cfg.mobile, deviceScaleFactor: 1, userAgent: cfg.mobile ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' : undefined });
        const page = await ctx.newPage();
        let falhas = 0; page.on('requestfailed', () => falhas++);
        try {
          await page.goto(url, { waitUntil: 'load', timeout: 45000 });
          await page.waitForTimeout(2500);
          for (const sel of ['button:has-text("Accept")', 'button:has-text("No thanks")', 'button[aria-label*="lose"]', '[aria-label="Close dialog"]']) { try { await page.click(sel, { timeout: 600 }); } catch {} }
          await page.keyboard.press('Escape').catch(() => {});
          const h = await page.evaluate(() => document.documentElement.scrollHeight);
          await page.setViewportSize({ width: cfg.width, height: Math.min(cfg.clipH, Math.max(cfg.height, h)) });
          await page.waitForTimeout(800);
          await page.screenshot({ path: path.join(OUT, slug + '-' + pag + '-' + dev + '.png') });
          if (dev === 'desktop') {
            const m = await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0] || {}; const r = performance.getEntriesByType('resource'); return { dcl: n.domContentLoadedEventEnd || 0, load: n.loadEventEnd || 0, recursos: r.length, kb: r.reduce((a, x) => a + (x.transferSize || 0), 0) / 1024, scripts: r.filter(x => x.initiatorType === 'script').length, imagens: r.filter(x => x.initiatorType === 'img' || /\.(jpe?g|png|webp|gif|avif)/.test(x.name)).length }; });
            perf.push({ slug, nome, pagina: pag, dcl_ms: Math.round(m.dcl), load_ms: Math.round(m.load), recursos: m.recursos, kb: Math.round(m.kb), scripts: m.scripts, imagens: m.imagens, falhas });
          }
          console.log('ok', slug, pag, dev);
        } catch (e) { console.log('FALHOU', slug, pag, dev, e.message.slice(0, 80)); }
        await ctx.close();
      }
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(PESQ, 'dados', 'performance-concorrentes.json'), JSON.stringify({ medido_em: new Date().toISOString(), metodo: 'Playwright headless, 1280x800, 1 carga por página, conexão doméstica', paginas: perf }, null, 2));
})();
