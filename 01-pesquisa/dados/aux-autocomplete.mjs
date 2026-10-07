// Fase 1.7: expansão gratuita de termos pelo autocomplete do Google e do Bing (sem API paga)
import fs from 'node:fs';
const out = process.argv[2];
const sementes = ['plantar fasciitis', 'heel pain', 'foot pain relief', 'arch support', 'heel spur', 'night splint', 'plantar fasciitis socks', 'plantar fasciitis insoles'];
const mods = ['', 'best ', 'for women', 'buy ', 'relief', 'vs', 'review'];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const res = {};
async function google(q) {
  const r = await fetch('https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=' + encodeURIComponent(q));
  const j = await r.json(); return j[1] || [];
}
async function bing(q) {
  try {
    const r = await fetch('https://api.bing.com/osjson.aspx?query=' + encodeURIComponent(q));
    const j = await r.json(); return j[1] || [];
  } catch { return []; }
}
for (const s of sementes) {
  for (const m of mods) {
    const q = m.endsWith(' ') ? m + s : (m ? s + ' ' + m : s);
    try {
      const g = await google(q); const b = await bing(q);
      g.forEach((t, i) => { res[t] = res[t] || { termo: t, google_pos: [], bing: false, semente: s }; res[t].google_pos.push(i + 1); });
      b.forEach(t => { res[t] = res[t] || { termo: t, google_pos: [], bing: false, semente: s }; res[t].bing = true; });
    } catch (e) { console.error('falhou', q, e.message); }
    await sleep(250);
  }
}
const lista = Object.values(res).map(r => ({ ...r, aparicoes: r.google_pos.length + (r.bing ? 1 : 0), melhor_pos: r.google_pos.length ? Math.min(...r.google_pos) : null }))
  .sort((a, b) => b.aparicoes - a.aparicoes || (a.melhor_pos || 99) - (b.melhor_pos || 99));
fs.writeFileSync(out, JSON.stringify({ fonte: 'Google suggestqueries (gl=us) + Bing osjson', coletado_em: new Date().toISOString(), sementes, total: lista.length, termos: lista }, null, 2));
console.log(lista.length + ' termos'); console.log(lista.slice(0, 60).map(t => t.aparicoes + ' ' + t.termo).join('\n'));
