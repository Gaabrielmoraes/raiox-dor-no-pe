// ranking de criativos vencedores POR LOJA (longevidade > variações), mix de formato e corpo do anúncio
import fs from 'node:fs';
const [, , arq, out] = process.argv;
const ads = JSON.parse(fs.readFileSync(arq, 'utf8'));
const LOJAS = { koprez: 'koprez.com', onecompress: 'onecompress.com', stepprs: 'stepprs.com', orthoflexx: 'orthoflexx.com', footstr: 'getfootstr.com' };
const raiz = d => (d || '').replace(/^(www|offers|try|shop|go|lp|pages)\./, '');
const dias = s => s ? Math.round((Date.now() - new Date(s).getTime()) / 864e5) : 0;
const res = {};
for (const [slug, dom] of Object.entries(LOJAS)) {
  const l = ads.filter(a => raiz(a.linkDomain) === dom);
  const fmt = { video: 0, imagem: 0, carrossel: 0, catalogo: 0 };
  l.forEach(a => { const f = (a.displayFormat || '').toUpperCase(); if (f.includes('VIDEO')) fmt.video++; else if (f.includes('CAROUSEL')) fmt.carrossel++; else if (f.includes('DPA') || f.includes('DCO')) fmt.catalogo++; else fmt.imagem++; });
  const vistos = new Set(); const top = [];
  [...l].sort((a, b) => dias(b.startDate) - dias(a.startDate) || (b.collationCount || 1) - (a.collationCount || 1)).forEach(a => {
    const k = (a.title || a.bodyText || '').slice(0, 40); if (vistos.has(k) || top.length >= 4) return; vistos.add(k);
    top.push({ id: a.adArchiveId, url: a.adLibraryUrl, pagina: a.pageName, dias: dias(a.startDate), variacoes: a.collationCount || 1, formato: a.displayFormat, titulo: a.title, corpo: (a.bodyText || '').replace(/\s+/g, ' ').slice(0, 420), plataformas: a.platforms });
  });
  res[slug] = { amostra_mineracao: l.length, formato: fmt, max_dias: top[0]?.dias || 0, top };
}
fs.writeFileSync(out, JSON.stringify(res, null, 2));
for (const [s, r] of Object.entries(res)) { console.log('\n## ' + s + ' amostra ' + r.amostra_mineracao + ' fmt ' + JSON.stringify(r.formato)); r.top.forEach(t => console.log('  ' + t.dias + 'd var' + t.variacoes + ' ' + t.formato + ' | ' + t.titulo + ' | ' + t.corpo.slice(0, 300))); }
