// curadoria do swipe: só lojas de PRODUTO do nicho (sem clínica, sem aparelho patenteado de atleta),
// no máximo 2 criativos por loja, ordenados por longevidade e depois variações
import fs from 'node:fs';
const [, , arq, out] = process.argv;
const ads = JSON.parse(fs.readFileSync(arq, 'utf8'));
const LOJAS = ['koprez.com', 'onecompress.com', 'getxstance.com', 'getfootstr.com', 'stepprs.com', 'powerstep.com', 'feetures.com', 'orthoflexx.com',
  'thevibit.com', 'hikebalance.com', 'kovaria.com', 'theorthofitstore.com', 'my-happyfeet.com', 'trydigestiq.com', 'myflowlab.co', 'myrebloom.com', 'currex.com'];
const raiz = d => (d || '').replace(/^(www|offers|try|shop|get\.|go|lp|pages)\./, '');
const dias = s => s ? Math.round((Date.now() - new Date(s).getTime()) / 864e5) : 0;
const porLoja = {};
for (const a of ads) {
  const r = raiz(a.linkDomain);
  if (!LOJAS.includes(r)) continue;
  (porLoja[r] ||= []).push(a);
}
const sel = [];
for (const [d, lista] of Object.entries(porLoja)) {
  const vistos = new Set();
  lista.sort((a, b) => dias(b.startDate) - dias(a.startDate) || (b.collationCount || 1) - (a.collationCount || 1));
  for (const a of lista) {
    const k = (a.title || a.bodyText || '').slice(0, 40);
    if (vistos.has(k)) continue; vistos.add(k);
    sel.push({ ...a, _loja: d });
    if (vistos.size >= 2) break;
  }
}
sel.sort((a, b) => dias(b.startDate) - dias(a.startDate) || (b.collationCount || 1) - (a.collationCount || 1));
fs.writeFileSync(out, JSON.stringify(sel, null, 1));
console.log(sel.length + ' candidatos');
sel.slice(0, 14).forEach((a, i) => console.log((i + 1) + '. ' + dias(a.startDate) + 'd var' + (a.collationCount || 1) + ' ' + a._loja + ' | ' + a.pageName + ' | ' + (a.title || '').slice(0, 60) + ' | ' + (a.videoUrls?.length ? 'video' : 'img')));
