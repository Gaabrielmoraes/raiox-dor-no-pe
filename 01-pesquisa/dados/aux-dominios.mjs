// agrega a mineração por domínio de destino (linkDomain): quem domina o leilão
import fs from 'node:fs';
const [, , arq, out] = process.argv;
const ads = JSON.parse(fs.readFileSync(arq, 'utf8'));
const lista = Array.isArray(ads) ? ads : (ads.anuncios || ads.ads || ads.data || []);
const hoje = Date.now();
const dias = d => d ? Math.round((hoje - new Date(d).getTime()) / 86400000) : null;
const raiz = d => (d || '').replace(/^(www|offers|try|shop|get|go|lp|pages)\./, '');
const m = {};
for (const a of lista) {
  const k = raiz(a.linkDomain) || '(sem destino)';
  const r = m[k] ||= { dominio: k, anuncios: 0, variacoes: 0, paginas: new Set(), pageIds: new Set(), max_dias: 0, titulos: new Set(), buscas: new Set() };
  r.anuncios++; r.variacoes += a.collationCount || 1;
  r.paginas.add(a.pageName); r.pageIds.add(String(a.pageId));
  r.max_dias = Math.max(r.max_dias, dias(a.startDate) || 0);
  if (a.title) r.titulos.add(a.title.slice(0, 70));
  if (a._busca || a.busca) r.buscas.add(a._busca || a.busca);
}
const res = Object.values(m).map(r => ({ ...r, paginas: [...r.paginas], pageIds: [...r.pageIds], titulos: [...r.titulos].slice(0, 6), buscas: [...r.buscas] }))
  .sort((a, b) => b.anuncios - a.anuncios);
fs.writeFileSync(out, JSON.stringify(res, null, 2));
console.log('campos do 1o anuncio:', Object.keys(lista[0]).join(','));
for (const r of res.slice(0, 70)) console.log(String(r.anuncios).padStart(3), String(r.max_dias).padStart(5) + 'd', r.dominio.padEnd(34), r.paginas.slice(0, 3).join(' | ').slice(0, 60), '::', r.titulos.slice(0, 2).join(' || ').slice(0, 90));
