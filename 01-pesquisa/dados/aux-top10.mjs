// fecha o top 10 curado (sem CURREX: palmilha de corrida fora do avatar; sem anúncio de catálogo sem copy)
import fs from 'node:fs';
const [, , arq, out] = process.argv;
const c = JSON.parse(fs.readFileSync(arq, 'utf8'));
const top = c.filter(a => a._loja !== 'currex.com' && !/\{\{product\.name\}\}/.test(a.title || '')).slice(0, 10);
fs.writeFileSync(out, JSON.stringify(top, null, 1));
console.log(top.map((a, i) => (i + 1) + '. ' + a._loja + ' ' + a.adArchiveId).join('\n'));
