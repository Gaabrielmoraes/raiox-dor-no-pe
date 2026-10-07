// filtra a mineração: só anúncio do nicho (dor no pé), fora o ruído do matching largo da Biblioteca
import fs from 'node:fs';
const [, , arq, out] = process.argv;
const ads = JSON.parse(fs.readFileSync(arq, 'utf8'));
const NICHO = /plantar|fasci|heel|arch support|insole|orthotic|foot pain|feet hurt|foot sleeve|footsleeve|foot relief|sore feet|standing all day|night splint|heel spur/i;
const FORA = /itunes\.apple|play\.google|fb\.me|beastmasterrodeo|walmart|amazon\.|alibaba|hyerboots|durango|meaboots|flopindustries|divebomb|facebook\.com|criteo|fb\.com|solution-us|missmaryofficial|pipitea|smoothspine|northcarolinafootandankle|fleetfeet/i;
const ok = ads.filter(a => NICHO.test((a.title || '') + ' ' + (a.bodyText || '') + ' ' + (a.linkDescription || '')) && !FORA.test(a.linkDomain || '') && a.linkDomain);
fs.writeFileSync(out, JSON.stringify(ok, null, 1));
const dom = {}; ok.forEach(a => { dom[a.linkDomain] = (dom[a.linkDomain] || 0) + 1; });
console.log(ok.length + ' de ' + ads.length + ' anuncios ficaram no nicho');
console.log(Object.entries(dom).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([d, n]) => n + ' ' + d).join('\n'));
