// Shell e componentes do design system V3 (contrato de templates/exemplo-layout/paginas/exemplo.mjs),
// agora lendo os dados reais da pesquisa.
import { CASE, LOJAS } from './pesquisa.mjs';

export const esc = (v = '') => String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const attr = v => esc(v).replaceAll("'", '&#39;');
export const n = (v, d = 2) => Number(v).toLocaleString('pt-BR', { maximumFractionDigits: d });
export const usd = (v, d = 0) => '$' + Number(v).toLocaleString('pt-BR', { maximumFractionDigits: d, minimumFractionDigits: d });
export const pct = (v, d = 1) => n(v, d) + '%';

export const NAT = { obs: 'observado', calc: 'calculado', inf: 'inferido', rec: 'recomendado', ex: 'exemplo' };
export const nat = k => '<span class="nat ' + k + '">' + NAT[k] + '</span>';
export const legendNat = () => '<div class="legend"><span>' + nat('obs') + ' visto na fonte</span><span>' + nat('calc') + ' conta declarada</span><span>' + nat('inf') + ' leitura do analista</span><span>' + nat('rec') + ' ação sugerida</span><span><span class="na">não obtido</span> a fonte não entregou, motivo ao lado</span></div>';
export const legendVer = () => '<div class="legend"><span><span class="pill g">MODELAR</span> estrutura replicável</span><span><span class="pill a">OBSERVAR</span> referência, não clone</span><span><span class="pill r">IGNORAR</span> sem prioridade</span></div>';
export const pill = (t, c = 'n') => '<span class="pill ' + c + '">' + esc(t) + '</span>';
export const VC = { MODELAR: 'g', OBSERVAR: 'a', IGNORAR: 'r' };
export const na = why => '<span class="na">não obtido' + (why ? '<span class="why">' + esc(why) + '</span>' : '') + '</span>';

// dicionário (dfn) — termos técnicos traduzidos na 1ª aparição
export const GLOSS = {
  CPM: 'custo pra mostrar o anúncio 1.000 vezes',
  CPC: 'custo de cada clique no anúncio',
  CPA: 'custo pra conseguir uma venda (custo por aquisição)',
  AOV: 'valor médio de cada pedido',
  ROAS: 'quanto entra de venda pra cada dólar de anúncio',
  dropshipping: 'vender sem estoque: o fornecedor envia direto pro cliente',
  SimilarWeb: 'site que estima as visitas de outros sites',
  bounce: 'porcentagem de visitas que saem sem clicar em nada',
  'order bump': 'produto pequeno oferecido com um clique, junto do principal',
  upsell: 'oferta extra depois que a pessoa já decidiu comprar',
  PDP: 'página de produto',
  Sobrevivência: 'quantos dos anúncios que a loja já rodou continuam no ar',
  advertorial: 'página com cara de matéria de jornal que leva até a loja',
  UGC: 'vídeo com cara de cliente comum, gravado no celular',
};
export const dfn = (termo, rot) => '<dfn data-tip="' + attr(GLOSS[termo] || termo) + '">' + (rot || termo) + '</dfn>';

export function stat({ v, l, d, k = 'obs', src, naWhy, bar, trend }) {
  const value = naWhy ? '<div class="v na">não obtido</div>' : '<div class="v">' + v + (trend != null ? '<span class="trend ' + (trend >= 0 ? 'up' : 'down') + '">' + (trend >= 0 ? '▲' : '▼') + ' ' + pct(Math.abs(trend), 2) + '</span>' : '') + '</div>';
  return '<div class="stat">' + value + '<div class="l">' + l + '</div>' + (naWhy ? '<div class="d">' + esc(naWhy) + '</div>' : d ? '<div class="d">' + d + '</div>' : '') +
    (bar != null ? '<div class="bar"><i style="width:' + Math.max(0, Math.min(100, bar)) + '%"></i></div>' : '') +
    '<div>' + nat(naWhy ? 'obs' : k) + (src ? ' <small>· ' + src + '</small>' : '') + '</div></div>';
}
export function note(text, c = '', eyebrow = '') {
  return '<div class="note ' + c + '">' + (eyebrow ? '<span class="eyebrow ' + (c || '') + '">' + esc(eyebrow) + '</span>' : '') + text + '</div>';
}
export function table(head, rows, opts = {}) {
  const th = head.map(h => '<th' + (h.num ? ' class="num"' : '') + '>' + (h.t || h) + '</th>').join('');
  return '<div class="tbl"><table' + (opts.cls ? ' class="' + opts.cls + '"' : '') + '><thead><tr>' + th + '</tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
}
export const td = (v, cls = '') => '<td' + (cls ? ' class="' + cls + '"' : '') + '>' + v + '</td>';
export const tr = (cells, cls = '') => '<tr' + (cls ? ' class="' + cls + '"' : '') + '>' + cells.join('') + '</tr>';

export function evidence({ fonte, obs, interp, dec, next, decCls = '' }) {
  const st = (cls, lb, sub, tx, tag) => '<div class="st ' + cls + '"><div class="lb">' + lb + '<small>' + sub + '</small></div><div class="tx">' + tx + '<small>' + nat(tag) + '</small></div></div>';
  return '<div class="ev">' + st('fonte', 'Fonte', 'de onde veio', fonte, 'obs') + st('obs', 'Observação', 'o que foi visto', obs, 'obs') + st('interp', 'Interpretação', 'o que isso sugere', interp, 'inf') + st('dec ' + decCls, 'Decisão', 'o que a régua diz', dec, 'calc') + st('next', 'Próxima ação', 'o que fazer agora', next, 'rec') + '</div>';
}

export const GATE_NAMES = ['Demanda', 'Catálogo', 'Criativos', 'Economia', 'Janela', 'Vantagem', 'Operação'];
export const GATE_Q = ['Tem gente comprando isso agora?', 'Dá para crescer o catálogo depois?', 'Os criativos aguentam variação?', 'A conta fecha em cada venda?', 'Ainda dá tempo de entrar?', 'Você tem alguma vantagem aqui?', 'Você consegue operar isso hoje?'];
const SYM = { pass: '✓', warn: '!', fail: '✕', na: '–' };
const STATE_LABEL = { pass: 'abriu', warn: 'abriu com condição', fail: 'fechou', na: 'não medido' };
const STATE_PILL = { pass: 'g', warn: 'a', fail: 'r', na: 'a' };
export function gates(id, list) {
  const btns = list.map((g, i) => '<button class="gate ' + g.st + '" role="tab" data-gate="G' + (i + 1) + '" aria-selected="false" aria-controls="' + id + '"><span class="sym">' + SYM[g.st] + '</span><span class="k">G' + (i + 1) + '</span>' + GATE_NAMES[i] + '</button>').join('');
  const dataObj = {};
  list.forEach((g, i) => { dataObj['G' + (i + 1)] = { nome: GATE_NAMES[i], q: GATE_Q[i], o: g.o, src: g.src, state: pill(STATE_LABEL[g.st], STATE_PILL[g.st]) + ' ' + nat(g.k || 'inf') }; });
  return '<div class="gates" role="tablist" aria-label="Portões" data-detail="' + id + '">' + btns + '</div>' +
    '<div class="legend"><span>✓ abriu</span><span>! abriu com condição</span><span>✕ fechou</span><span>– não medido</span></div>' +
    '<div class="gate-detail" id="' + id + '" hidden data-gates="' + attr(JSON.stringify(dataObj)) + '"><div><span class="eyebrow gd-code"></span><div class="q" style="margin-top:6px"></div><div class="o"></div><div class="state"></div></div><div class="gside"><span class="eyebrow b">Fonte e limite</span><div class="src"></div></div></div>';
}

export const btn = (label, href, cls = '', ext = false) => '<a class="btn ' + cls + '" href="' + href + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + label + (ext ? ' <span class="ar">↗</span>' : '') + '</a>';
export const spark = arr => '<span class="spark" title="variação mensal">' + arr.map(v => '<i class="' + (v >= 0 ? 'up' : 'dn') + '" style="height:' + Math.max(3, Math.min(18, Math.round(Math.abs(v) / 30 * 18 + 3))) + 'px"></i>').join('') + '</span>';

export const NAV = [
  { grp: 'DECISÃO' },
  { id: 'central', label: 'Central da oportunidade', file: 'Pesquisa - clique aqui.html', k: '00', root: true, short: 'Central' },
  { grp: 'EVIDÊNCIAS' },
  { id: 'demanda', label: 'Demanda observada', file: 'demanda.html', k: '01' },
  { id: 'mercados', label: 'Mercados e país', file: 'mercados.html', k: '02' },
  { id: 'concorrentes', label: 'Concorrentes', file: 'concorrentes.html', k: '03', short: 'Lojas' },
  { id: 'anuncios', label: 'Criativos e prova', file: 'anuncios.html', k: '04' },
  { grp: 'EXECUÇÃO' },
  { id: 'estrategia', label: 'Estratégia', file: 'estrategia.html', k: '05' },
  { id: 'plano', label: 'Plano de ação', file: 'plano-de-acao.html', k: '06', short: 'Plano' },
  { id: 'catalogo', label: 'Catálogo e oferta', file: 'catalogo-oferta.html', k: '07' },
  { id: 'benchmark', label: 'Loja: benchmark e blueprint', file: 'benchmark-visual.html', k: '08' },
  { id: 'identidade', label: 'Identidade e imagens', file: 'identidade-visual.html', k: '09' },
  { grp: 'APOIO' },
  { id: 'dados', label: 'Dados, fontes e artefatos', file: 'dados-fontes.html', k: '10' },
  { id: 'metodo', label: 'Método, limites e auditoria', file: 'metodo.html', k: '11' },
];
export const href = (item, fromRoot) => item.root ? (fromRoot ? '' : '../') + encodeURIComponent(item.file) : (fromRoot ? 'paginas/' : '') + item.file;
export const hrefId = (id, fromRoot) => href(NAV.find(i => i.id === id), fromRoot);

export function sidebar(current, fromRoot) {
  let out = '';
  for (const it of NAV) {
    if (it.grp) { out += '<div class="grp">' + it.grp + '</div>'; continue; }
    out += '<a class="' + (current === it.id ? 'on' : '') + '" href="' + href(it, fromRoot) + '"' + (current === it.id ? ' aria-current="page"' : '') + '><span class="dot"></span>' + it.label + '<span class="k">' + it.k + '</span></a>';
    if (it.id === 'concorrentes') out += LOJAS.map(s => '<a class="sub' + (current === s.slug ? ' on' : '') + '" href="' + (fromRoot ? 'paginas/' : '') + 'loja-' + s.slug + '.html"><span class="dot"></span>' + esc(s.nome) + '<span class="k">' + pill(s.veredito.slice(0, 3), VC[s.veredito]) + '</span></a>').join('');
  }
  return '<aside class="side" id="side"><div class="brand"><span class="mark"><i></i></span><b>RAIO-X</b><span class="v">ENTREGA V3</span></div>' +
    '<div class="case"><div class="code">' + CASE.code + '</div><div class="name">' + esc(CASE.nome) + ' · ' + CASE.pais + '</div><div class="dec"><span class="pill g">' + esc(CASE.decisao) + '</span></div></div>' +
    '<nav aria-label="Navegação global">' + out + '</nav>' +
    '<div class="rule"><b>Régua desta entrega.</b> Todo número traz a natureza (observado, calculado, inferido, recomendado). Dado que a fonte não entregou aparece como <span class="na">não obtido</span>, com o motivo. Anúncio ativo prova continuidade, não lucro.</div></aside>';
}
export function bottomnav(current, fromRoot) {
  const items = ['central', 'demanda', 'concorrentes', 'plano', 'metodo'].map(id => NAV.find(i => i.id === id));
  return '<nav class="bottomnav" aria-label="Navegação principal">' + items.map(i => '<a class="' + (current === i.id ? 'on' : '') + '" href="' + href(i, fromRoot) + '"><span class="ic"></span>' + (i.short || i.label.split(' ')[0]) + '</a>').join('') + '</nav>';
}
export function doc({ title, current, screen, body, fromRoot = false, next }) {
  const base = fromRoot ? 'paginas/' : '';
  const nextBar = next ? '<div class="next-action"><span class="eyebrow">Próxima ação</span><div class="tx">' + next.t + (next.s ? '<small>' + next.s + '</small>' : '') + '</div>' + btn(next.b, next.h, 'primary', !!next.ext) + '</div>' : '';
  const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(title) + '</title><link rel="stylesheet" href="' + base + 'estilo.css"></head><body id="top"><div class="app">' +
    sidebar(current, fromRoot) + '<div class="side-bd"></div><div class="main">' +
    '<div class="topbar"><button class="menu" aria-label="Abrir menu" aria-expanded="false" aria-controls="side">☰</button><span class="code">TELA<b>' + esc(screen.code) + '</b></span><span class="sep"></span><span class="title">' + esc(screen.title) + '</span><span class="sp"></span><span class="date">coleta ' + CASE.coletaFmt + ' · auditoria ' + CASE.auditoria + ' · entrega v3 ' + CASE.entregaV3 + '</span></div>' +
    '<main class="page">' + body + nextBar + '</main></div></div>' + bottomnav(current, fromRoot) +
    '<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Prova"><div class="bd"></div><div class="panel"><button class="close" aria-label="Fechar">✕</button><div class="content"></div></div></div>' +
    '<script src="' + base + 'app.js"></script></body></html>';
  return html.replaceAll(' — ', ', ').replaceAll('—', ', ');
}
export function pageHead({ eyebrow, h1, answer, meta = [], eyeCls = '' }) {
  return '<header class="ph"><span class="eyebrow ' + eyeCls + '">' + eyebrow + '</span><h1>' + h1 + '</h1>' + (answer ? '<p class="answer">' + answer + '</p>' : '') + (meta.length ? '<div class="meta">' + meta.map(m => '<span>' + m + '</span>').join('') + '</div>' : '') + '</header>';
}
export const toc = items => '<nav class="toc" aria-label="Nesta tela">' + items.map(([id, l]) => '<a href="#' + id + '">' + l + '</a>').join('') + '</nav>';
export const sec = (id, num, title, inner, lead = '') => '<section class="blk" id="' + id + '"><h2><span class="n">' + num + '</span>' + title + '</h2>' + (lead ? '<p class="lead">' + lead + '</p>' : '') + inner + '</section>';
export function footer(fromRoot, extra = '') {
  return '<footer class="foot"><span>Raio-X · ' + esc(CASE.nome) + ' · ' + CASE.coletaFmt + '.</span><span>Estimativas são faixas de decisão, não dados contábeis. Nada foi publicado. ' + extra + '</span><a href="' + hrefId('metodo', fromRoot) + '">Método, limites e auditoria</a><a class="backtop" href="#top">↑ topo</a></footer>';
}
export const dmyEpoch = s => { const d = new Date(s * 1000); return d.toISOString().slice(8, 10) + '/' + d.toISOString().slice(5, 7) + '/' + d.toISOString().slice(0, 4); };
