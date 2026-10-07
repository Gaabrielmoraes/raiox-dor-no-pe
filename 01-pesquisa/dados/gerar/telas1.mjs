// Telas 00 a 04 (decisão e evidências) + dossiês de loja
import fs from 'node:fs';
import path from 'node:path';
import * as B from './base.mjs';
import { DADOS, CASE, BENCH, LOJAS, MATRIZ, AUTOCOMPLETE, RADAR, VOZ, PL, GATES, ANGULOS, PRODUTOS, MARCA, CPA_ALVO } from './pesquisa.mjs';
const { esc, n, usd, pct, nat, pill, na, stat, note, table, td, tr, evidence, gates, btn, spark, doc, pageHead, toc, sec, footer, legendNat, legendVer, dfn, VC } = B;

const RK = [...LOJAS].sort((a, b) => b.fat.central - a.fat.central);
const fmtV = l => l.trafego.visitas ? n(l.trafego.visitas, 0) : '~' + n(l.visitasEstim, 0);
const CONT = JSON.parse(fs.readFileSync(path.join(DADOS, 'demanda-contagens-mcp.json'), 'utf8')).linhas;
const MANIF = JSON.parse(fs.readFileSync(path.join(DADOS, '..', 'paginas', 'criativos', 'manifesto.json'), 'utf8')).criativos;

/* ======================= 00 CENTRAL ======================= */
export function central() {
  const R = '';
  const body = pageHead({
    eyebrow: CASE.code + ' · raio-x de nicho, modo profundo · nível iniciante · ' + CASE.categoria,
    h1: 'Dor no pé e fascite plantar: <em>a luva que deixa dar o primeiro passo da manhã</em>',
    answer: 'Cinco lojas que vendem pra dor no pé nos EUA, lidas pra uma pergunta só: <b>vale entrar, com o quê, e qual é o primeiro passo?</b>',
    meta: ['coleta ' + CASE.coletaFmt, 'contagem auditada ' + CASE.auditoria, 'Meta Ads (conector + Biblioteca pública) · SimilarWeb · Shopify · IRP Commerce', '<a href="paginas/metodo.html">dicionário</a>'],
  }) + toc([['decisao', 'Decisão'], ['portoes', 'Portões G1-G7'], ['evidencia', 'Linha de evidência'], ['numeros', 'Números'], ['faturamento', 'Faturamento por loja'], ['ranking', 'Ranking'], ['economia', 'Economia'], ['limites', 'Limites'], ['proxima', 'Próxima ação']]) +
    sec('decisao', '00', 'Decisão',
      '<div class="decision"><div class="main-card">' +
      '<div class="scale5" role="img" aria-label="Escala de decisão de Reprovado a Aprovado (nota máxima): este nicho ficou em Aprovado"><span class="sc-item">Reprovado</span><span class="sc-item">Fraco</span><span class="sc-item">Observar</span><span class="sc-item is-on">Aprovado</span><span class="sc-item">Aprovado (nota máxima)</span></div>' +
      '<span class="badge">✅ APROVADO: SIGA AS RECOMENDAÇÕES</span>' +
      '<p class="tese" style="margin-top:14px">Dá pra vender nesse mercado, e dá pra começar pequeno. Muita gente nos EUA sente dor no calcanhar ao acordar e compra uma luva macia pra aliviar. Duas lojas grandes vendem exatamente isso há anos, e uma loja de só 3 produtos já fatura com um anúncio só.</p>' +
      '<ol class="recs">' +
      '<li><b>Comece só com a luva de compressão, vendida em "2 pares".</b> É o formato que as lojas maiores usam e é o que deixa sobrar dinheiro em cada venda.</li>' +
      '<li><b>Peça a amostra de 2 ou 3 fornecedores antes de gravar qualquer vídeo.</b> O custo de $3,50 por par é estimativa, e "aperta demais" é a reclamação nº1 de quem compra.</li>' +
      '<li><b>Fale de alívio e conforto, nunca de cura.</b> Anúncio que promete curar fascite pode ser bloqueado pelo Facebook.</li>' +
      '<li><b>Teste 14 dias com $30 por dia e pare pelos números do plano.</b> Os critérios de parada estão escritos, não é no achismo.</li>' +
      '</ol>' +
      '<p class="why"><b>Se pular as recomendações:</b> o mais provável é vender o par avulso a $34,95 e gastar quase tudo que sobra no anúncio.</p>' +
      '<div class="btns">' + btn('Ver o plano de 14 dias', 'paginas/plano-de-acao.html', 'primary') + btn('Abrir a estratégia', 'paginas/estrategia.html') + btn('Ver limites da análise', 'paginas/metodo.html', 'ghost') + '</div>' +
      '</div><div class="q3">' +
      '<div class="q"><span class="eyebrow">1 · Qual oportunidade</span><p><b>Heelora Night & Day Compression Sleeves</b>: luva de compressão macia pra usar no trabalho e pra dormir, oferta padrão de 2 pares por $49,95, rolo de massagem de $9,95 como complemento. Estados Unidos, inglês, USD.</p></div>' +
      '<div class="q"><span class="eyebrow b">2 · O que os dados sustentam</span><p>10.958 anúncios ativos de "plantar fasciitis" nos EUA; 3 lojas modelo com 231 a 290 mil visitas por mês (2 medidas, a da Koprez triangulada pelo rank); criativos vencedores no ar de 184 a 524 dias. <b>Não sustentam:</b> gasto real dos concorrentes, lucro, custo exato do fornecedor.</p></div>' +
      '<div class="q"><span class="eyebrow g">3 · Próxima ação</span><p>Pedir amostra da luva de 2 a 3 fornecedores (links no plano) e validar o nome Heelora e o domínio. Sem amostra na mão, não grave criativo.</p></div>' +
      '</div></div>') +
    sec('portoes', '01', 'Os sete portões', gates('gd-central', GATES), 'Cada portão é uma pergunta. Clique pra ver o que foi observado, a fonte e o limite.') +
    sec('evidencia', '02', 'Linha de evidência', evidence({
      fonte: 'Conector Meta Ads (contagem exata), Biblioteca pública (1.101 anúncios extraídos), SimilarWeb set/2026, products.json das lojas, IRP Commerce ago/2026, NIH.',
      obs: '5 lojas dropship vendendo pra dor no pé nos EUA; as 3 maiores com 231 a 290 mil visitas/mês (2 medidas, 1 triangulada); produto campeão entre $34,99 e $64,95; criativos de 184 a 524 dias no ar.',
      interp: 'A luva de compressão e a palmilha são os dois produtos que pagam a conta. A luva é a mais simples de operar: leve, 2 tamanhos, barata.',
      dec: 'APROVADO. 4 portões abriram, 3 abriram com condição (economia, janela, vantagem), nenhum fechou.',
      next: 'Amostra da luva, validação do nome, depois home e PDP mobile-first conforme o blueprint.',
    }) + legendNat()) +
    sec('numeros', '03', 'Os números que sustentam a decisão',
      '<div class="grid g4">' +
      stat({ v: '10.958', l: 'anúncios ativos de "plantar fasciitis" nos EUA', d: '8,0% do histórico segue no ar, a melhor taxa do radar', k: 'obs', src: 'conector Meta Ads' }) +
      stat({ v: '~2 mi', l: 'diagnósticos de fascite por ano nos EUA', d: 'mulheres 2,5x mais; pico de 45 a 64 anos', k: 'obs', src: 'NIH/NCCIH' }) +
      stat({ v: '9.921', l: 'reviews verificados no campeão da One Compress', d: 'luva de bambu pro pé, nota 4,7', k: 'obs', src: 'JSON-LD da PDP' }) +
      stat({ v: pill('ESCALANDO', 'b'), l: 'momentum do nicho', d: 'líder Koprez +9,4% no mês; One Compress −19,4% e Stepprs −2,9%: sinais divergentes, declarados', k: 'inf' }) +
      '</div>' +
      table(['Benchmark de custo do setor', { t: 'Valor', num: true }, 'Fonte'], [
        tr([td(dfn('CPM') + ' médio'), td(usd(BENCH.cpm, 2), 'num'), td('benchmark público Meta 2026, e-commerce geral')]),
        tr([td(dfn('CPC') + ' médio'), td(usd(BENCH.cpc, 2), 'num'), td('benchmark público Meta 2026, e-commerce geral')]),
        tr([td(dfn('CPA') + ' do setor (Health & Wellbeing)'), td(usd(BENCH.cpa_usd, 2), 'num'), td('IRP Commerce ago/2026: 14,2% de um ticket de £48,78 (câmbio 1,34, premissa)')]),
        tr([td('CPA alvo do teste (tráfego frio)'), td(usd(CPA_ALVO, 2), 'num'), td('premissa recomendada, ~2x o CPA do setor ' + nat('rec'))]),
      ]) +
      note('Em resumo: muita gente sofre com isso, as lojas que vendem bem existem e estão no ar há anos, e o produto é simples. O que exige cuidado é a conta por venda.', 'b')) +
    sec('faturamento', '03b', 'Quanto cada loja fatura (estimativa)', table(['Loja', { t: 'Faturamento central/mês', num: true }, { t: 'Faixa', num: true }, { t: 'Mídia/mês', num: true }, 'Confiança'],
      RK.map(l => tr([td('<a href="paginas/loja-' + l.slug + '.html">' + esc(l.nome) + '</a>'), td(usd(l.fat.central), 'num'), td(usd(l.fat.piso) + ' a ' + usd(l.fat.teto), 'num'), td(usd(l.fat.midia), 'num'), td(l.confianca + ' ' + nat(l.confianca === 'medido' ? 'calc' : 'inf'))]))) +
      note('Fórmula: visitas (SimilarWeb set/2026) × conversão do setor ajustada pelo bounce × ticket. Mídia = 14,2% da receita (IRP). Faixa de decisão, não dado contábil.', 'a', 'Limite')) +
    sec('ranking', '04', 'Ranking das cinco operações', legendVer() + table(['#', 'Operação', { t: 'Ativos (auditados)', num: true }, { t: 'Visitas/mês', num: true }, { t: 'Ticket', num: true }, { t: 'Produtos', num: true }, 'Momentum', 'Veredito'],
      RK.map((l, i) => tr([td(i + 1), td('<a href="paginas/loja-' + l.slug + '.html"><b>' + esc(l.nome) + '</b></a><div class="d">' + l.dominio + ' · ' + l.modelo.toLowerCase() + '</div>'), td(n(l.ativos, 0), 'num'), td(fmtV(l) + ' ' + spark([l.trafego.variacao]), 'num'), td(usd(l.campeao.preco, 2), 'num'), td(l.catalogo.n, 'num'), td(l.momentum), td(pill(l.veredito, VC[l.veredito]))], i === 0 ? 'hl' : '')), { cls: 'rank' })) +
    sec('economia', '05', 'A conta por venda',
      '<div class="grid g4">' +
      stat({ v: '$49,95', l: 'oferta padrão: 2 pares', d: '1 par avulso: $34,95', k: 'rec' }) +
      stat({ v: usd(PL.escada.equilibrio, 2), l: 'CPA de equilíbrio da escada', d: 'o máximo que dá pra pagar por venda sem prejuízo', k: 'calc' }) +
      stat({ v: usd(CPA_ALVO, 2), l: 'CPA alvo do teste', d: 'sobra pra devolução e atendimento', k: 'rec' }) +
      stat({ v: usd(PL.escada.sobra, 2), l: 'sobra por pedido no alvo', d: pct(PL.escada.sobra / PL.escada.receita * 100) + ' da receita, AOV de ' + usd(PL.aov, 2), k: 'calc' }) +
      '</div>' +
      table(['Oferta', { t: 'Receita', num: true }, { t: 'Custo', num: true }, { t: 'Frete', num: true }, { t: 'Taxa', num: true }, { t: 'CPA', num: true }, { t: 'Sobra', num: true }, 'Leitura'], [PL.avulso, PL.dois, PL.escada, PL.bench].map((x, i) =>
        tr([td(i === 2 ? '<b>' + x.nome + '</b>' : x.nome), td(usd(x.receita, 2), 'num'), td(usd(x.cogs, 2), 'num'), td(usd(x.frete, 2), 'num'), td(usd(x.taxa, 2), 'num'), td(usd(x.cpa, 2), 'num'), td(usd(x.sobra, 2), 'num'), td(['margem fina: depende de CPA baixo', 'a oferta que paga a conta', 'meta do teste', 'se o CPA chegar ao do setor'][i])], i === 2 ? 'hl' : ''))) +
      note(PL.premissas + ' Investimento mínimo do teste: ~' + usd(PL.investimento.total) + ' (anúncio 14 × $30, Shopify, amostras, domínio, apps).', 'a', 'Limite')) +
    sec('limites', '06', 'O que não foi medido', table(['Dado', 'Situação', 'O que foi feito no lugar'], [
      tr([td('Gasto real de cada concorrente em anúncio'), td(pill('não público', 'a')), td('estimativa = 14,2% da receita (IRP), declarada como inferida')]),
      tr([td('Visitas exatas de Koprez e OrthoFlexx'), td(pill('não obtido', 'a')), td('o total fica atrás do cadastro do SimilarWeb; triangulado pelo rank global e declarado na ficha')]),
      tr([td('Custo do produto no fornecedor'), td(pill('não verificado', 'a')), td('faixa estimada ($3,50 a luva) até a amostra; links de fornecedor no plano')]),
      tr([td('Volume exato de busca no Google'), td(pill('fora do escopo', 'a')), td('força de demanda por 3 sinais + link pronto pro Google Trends (tela 01)')]),
    ]) + '<div class="btns">' + btn('Ver método, limites e auditoria completos', 'paginas/metodo.html') + '</div>') +
    sec('proxima', '07', 'Próxima ação: 14 dias', '<ol class="steps">' +
      '<li><b>Dias 1 a 3: amostra e marca.</b> Pedir a luva de 2 a 3 fornecedores, confirmar tamanho e aperto, registrar o domínio heelora.com (ou alternativa).</li>' +
      '<li><b>Dias 4 a 7: loja.</b> Home e página de produto mobile-first conforme o blueprint, oferta de 2 pares, rolo como complemento.</li>' +
      '<li><b>Dias 8 a 10: criativos.</b> Os 5 anúncios de lançamento (primeiro passo, não é meia, turno em pé, mecanismo, 2 pares).</li>' +
      '<li><b>Dias 11 a 14: teste.</b> $30 por dia, campanha de vendas, critérios de parada sem exceção.</li></ol>' +
      '<div class="btns">' + btn('Abrir o plano completo com checklist', 'paginas/plano-de-acao.html', 'primary') + '</div>') +
    footer(true);
  return doc({ title: 'Central da oportunidade · Raio-X · Dor no pé', current: 'central', screen: { code: '00', title: 'Central da oportunidade' }, body, fromRoot: true, next: { t: 'Pedir amostra da luva e validar o nome', s: 'dias 1 a 3 do plano; sem amostra, nada de criativo', b: 'Abrir plano', h: 'paginas/plano-de-acao.html' } });
}

/* ======================= 01 DEMANDA ======================= */
const INTENT = {
  'plantar fasciitis socks': ['comprar', 'o ano todo', 'luva (core)'], 'plantar fasciitis insoles': ['comprar', 'o ano todo', 'palmilha'], 'plantar fasciitis sleeve': ['comprar', 'o ano todo', 'luva (core)'],
  'heel pain relief': ['problema', 'pico no inverno e no início de caminhadas', 'luva + rolo'], 'foot pain relief': ['problema', 'o ano todo', 'luva + copinho'], 'arch support insoles': ['comprar', 'o ano todo', 'palmilha'],
  'night splint plantar fasciitis': ['comparar alternativa', 'o ano todo', 'luva noturna (substituto mais confortável)'], 'heel spur': ['pesquisar', 'o ano todo', 'conteúdo educativo'], 'compression socks plantar fasciitis': ['comprar', 'o ano todo', 'luva (core): "não é meia"'],
  'heel cups': ['comprar', 'o ano todo', 'copinho (upsell)'], 'foot massage ball': ['comprar', 'presente de fim de ano', 'rolo (bump)'], 'foot massage roller': ['comprar', 'presente de fim de ano', 'rolo (bump)'], 'plantar fasciitis relief': ['problema', 'o ano todo', 'luva (core)'], 'feet hurt standing all day': ['problema', 'o ano todo', 'avatar: turno em pé'], 'arch support': ['pesquisar', 'o ano todo', 'palmilha'],
};
const trends = t => 'https://trends.google.com/trends/explore?date=today%205-y&geo=US&hl=en&q=' + encodeURIComponent(t);
const bib = t => 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=' + encodeURIComponent(t) + '&search_type=keyword_unordered';
const amz = t => 'https://www.amazon.com/s?k=' + encodeURIComponent(t);
const links = t => '<a href="' + trends(t) + '" target="_blank" rel="noopener">Trends ↗</a> · <a href="' + bib(t) + '" target="_blank" rel="noopener">Biblioteca ↗</a> · <a href="' + amz(t) + '" target="_blank" rel="noopener">Amazon ↗</a>';
export function demanda() {
  const ac = Object.fromEntries(AUTOCOMPLETE.termos.map(t => [t.termo, t]));
  const linhas = [...CONT].sort((a, b) => b.total - a.total);
  const cand = AUTOCOMPLETE.termos.filter(t => !CONT.some(c => c.termo === t.termo) && /plantar|heel|arch|insole|sock|sleeve|splint/.test(t.termo) && !/vs|cause|reason|symptom|stretch|fracture|remed|cream|amazon|shoes/.test(t.termo)).slice(0, 10);
  const top5 = ['plantar fasciitis', 'heel pain', 'plantar fasciitis socks', 'plantar fasciitis insoles', 'night splint'];
  const body = pageHead({ eyebrow: '01 · evidências · demanda observada · Estados Unidos', h1: 'As pessoas <em>procuram</em> alívio pra dor no pé', answer: 'Sim, e com palavras de quem já está com dor. Os termos mais fortes falam de meia, palmilha e alívio da dor no calcanhar.', meta: ['autocomplete Google + Bing (' + AUTOCOMPLETE.total + ' termos)', 'contagem de anúncios: conector Meta Ads (exata, EUA, ativos)', 'tráfego: SimilarWeb set/2026'] }) +
    toc([['sinal', 'Sinal mais forte'], ['frequencia', 'Lojas'], ['motivos', 'Motivadores'], ['meta', 'Meta por termo'], ['candidatos', 'Termos sem contagem'], ['midia', 'Mídia qualificada'], ['voz', 'Voz do mercado'], ['decisao', 'Decisão']]) +
    sec('sinal', '01', 'O sinal mais forte', '<div class="grid g4">' +
      stat({ v: '~2 mi', l: 'diagnósticos de fascite por ano (EUA)', d: '1 em cada 10 pessoas terá na vida', k: 'obs', src: 'NIH' }) +
      stat({ v: '10.958', l: 'anúncios ativos em "plantar fasciitis"', d: 'contagem exata, EUA', k: 'obs', src: 'conector Meta Ads' }) +
      stat({ v: '17.841', l: 'anúncios ativos em "foot pain relief"', d: 'termo de problema, amplo', k: 'obs', src: 'conector Meta Ads' }) +
      stat({ v: '2.455', l: 'anúncios ativos em "plantar fasciitis insoles"', d: 'termo de compra; "sleeve" tem 1.070 e "socks" 777', k: 'obs', src: 'conector Meta Ads' }) +
      '</div>' + note('Em resumo: a dor é comum, tem gente anunciando muito pra ela e as pessoas descrevem o problema com palavras simples ("dor no calcanhar", "em pé o dia todo"). Isso é demanda de verdade.', 'b') + '<div class="btns">' + btn('Fonte: NIH, prevalência de fascite plantar', 'https://nccih.nih.gov/research/results/spotlight/Plantar-Fasciitis-Pain', '', true) + '</div>') +
    sec('frequencia', '02', 'Visitas medidas nas lojas do nicho', '<div class="grid g4">' +
      LOJAS.filter(l => l.trafego.visitas).map(l => stat({ v: n(l.trafego.visitas, 0), l: l.nome + ' · visitas/mês', d: 'SimilarWeb set/2026 · ' + l.trafego.visitasNota, k: 'obs', trend: l.trafego.variacao })).join('') +
      stat({ v: '#59.073', l: 'Koprez · rank global', d: 'visitas não exibidas; rank melhor que o da One Compress', k: 'obs', trend: 9.36 }) + '</div>' +
      table(['Leitura oficial', 'Leitura comercial'], [tr([td('3 lojas somam mais de 790 mil visitas por mês (2 medidas + 1 triangulada)'), td('há público pagando por esse tipo de produto todo mês ' + nat('inf'))]), tr([td('2 das 3 maiores caíram no mês de setembro'), td('pode ser sazonal ou fadiga de criativo: não é motivo pra desistir, é motivo pra testar com critério de parada ' + nat('inf'))])])) +
    sec('motivos', '03', 'Por que as pessoas compram', '<div class="grid g2">' +
      '<div class="card"><span class="eyebrow g">Por que compra</span><p>A dor do primeiro passo da manhã. Quem tem fascite descreve como "pisar num prego" ao sair da cama. É dor diária, que atrapalha o trabalho em pé.</p></div>' +
      '<div class="card"><span class="eyebrow r">Por que frustra</span><p>Já tentou gelo, alongamento e palmilha de farmácia. Meia de compressão "aperta demais" e é difícil de calçar. Tala noturna é "horrível pra dormir".</p></div>' +
      '<div class="card"><span class="eyebrow b">Recompra</span><p>A luva gasta com o uso diário e muita gente quer um par pro trabalho e outro pra dormir: é por isso que "2 pares" é a oferta padrão do mercado.</p></div>' +
      '<div class="card"><span class="eyebrow a">Categoria vizinha</span><p>Palmilha de arco (Stepprs, OrthoFlexx, Footstr) resolve a mesma dor durante o dia: é o segundo produto natural, não o primeiro.</p></div></div>') +
    sec('meta', '04', 'Força de demanda por termo (Meta + autocomplete)', table(['Termo', { t: 'Anúncios ativos EUA', num: true }, { t: 'Aparições no autocomplete', num: true }, 'Intenção', 'Sazonalidade provável', 'Serve pra', 'Links'],
      linhas.map(c => { const i = INTENT[c.termo] || ['pesquisar', 'o ano todo', '-']; const a = ac[c.termo]; return tr([td('<b>' + esc(c.termo) + '</b>'), td(n(c.total, 0) + (['feet hurt standing all day', 'arch support'].includes(c.termo) ? ' <small>(ruído)</small>' : ''), 'num'), td(a ? a.aparicoes : 0, 'num'), td(i[0]), td(i[1]), td(i[2]), td(links(c.termo))]); })) +
      note('Contagem exata pelo conector Meta Ads, só anúncios ativos nos EUA, 07/10/2026 (substituiu a raspagem de 06/10, feita quando o conector caiu). "(ruído)": termo amplo que casa com anúncios de outras categorias (livros, romances), leia como teto, não como demanda do nicho. Volume mensal exato de busca no Google não existe sem ferramenta paga: abra o link do Trends pra ver a curva de 5 anos.', 'a', 'Limite') +
      '<div class="btns">' + btn('Comparar os 5 principais no Google Trends', 'https://trends.google.com/trends/explore?date=today%205-y&geo=US&hl=en&q=' + top5.map(encodeURIComponent).join(','), 'primary', true) + btn('Abrir Mercados (8 países)', 'mercados.html') + '</div>') +
    sec('candidatos', '05', 'Termos candidatos (contagem não levantada nesta rodada)', table(['Termo do autocomplete', { t: 'Aparições', num: true }, 'Melhor posição', 'Links'],
      cand.map(t => tr([td(esc(t.termo)), td(t.aparicoes, 'num'), td(t.melhor_pos || '-'), td(links(t.termo))]))) + note('Estes termos apareceram no autocomplete do Google/Bing mas a contagem de anúncios não foi levantada. Não inventamos número: abra o link.', 'a')) +
    sec('midia', '06', 'Mídia qualificada', '<div class="grid g4">' +
      stat({ v: '692', l: 'anúncios do nicho extraídos', d: 'de 1.101 da raspagem, após tirar ruído', k: 'calc' }) +
      stat({ v: '305', l: 'anunciantes na amostra bruta', d: 'muitos são clínicas, livros e calçado', k: 'obs' }) +
      stat({ v: '524 dias', l: 'criativo mais longevo de loja de produto', d: 'Xstance (marca), "Stand All Day Effortlessly"', k: 'obs' }) +
      stat({ v: '192 dias', l: 'criativo mais longevo de loja dropship', d: 'Koprez, "BUY 1 GET 1 FREE: Plantar Fasciitis Sleeve"', k: 'obs' }) + '</div>' +
      table(['Camada', 'O que confirma', 'O que não permite concluir'], [tr([td('Anúncios ativos'), td('que há gente investindo agora'), td('quanto cada um gasta ou lucra')]), tr([td('Longevidade do criativo'), td('que o anúncio provavelmente se paga (60+ dias)'), td('o tamanho da escala')]), tr([td('Visitas SimilarWeb'), td('ordem de grandeza do público'), td('receita contábil')])])) +
    sec('voz', '07', 'Voz do mercado', '<div class="grid g2">' + VOZ.map(v => '<div class="card"><span class="eyebrow ' + ({ dor: 'r', objeção: 'a', desejo: 'g' }[v.tipo] || 'b') + '">' + esc(v.tipo) + '</span><p>' + esc(v.txt) + '</p><small><a href="' + v.url + '" target="_blank" rel="noopener">' + esc(v.fonte) + ' ↗</a></small></div>').join('') + '</div>') +
    sec('decisao', '08', 'Decisão de demanda', evidence({ fonte: 'NIH, autocomplete Google/Bing, Biblioteca da Meta, SimilarWeb set/2026.', obs: 'Dor comum (~2 milhões/ano), termos de compra fortes ("socks", "insoles", "sleeve"), lojas com centenas de milhares de visitas.', interp: 'A demanda existe e é recorrente; a palavra que vende é "alívio da dor no calcanhar", não "compressão".', dec: 'Demanda aprovada (G1 abriu).', next: 'Usar os termos de intenção de compra nos títulos de anúncio e de produto.' }) + '<div class="btns">' + btn('Ver criativos', 'anuncios.html') + btn('Abrir plano', 'plano-de-acao.html', 'primary') + '</div>') +
    footer(false);
  return doc({ title: 'Demanda observada · Raio-X · Dor no pé', current: 'demanda', screen: { code: '01', title: 'Demanda observada' }, body, next: { t: 'Ver em que país entrar', s: 'matriz de 8 países', b: 'Abrir Mercados', h: 'mercados.html' } });
}

/* ======================= 02 MERCADOS ======================= */
export function mercados() {
  const P = { US: 'Estados Unidos', CA: 'Canadá', GB: 'Reino Unido', AU: 'Austrália', DE: 'Alemanha', FR: 'França', NL: 'Holanda', ES: 'Espanha' };
  const cel = (p, t) => MATRIZ.celulas.find(c => c.pais === p && c.termo === t);
  const rows = MATRIZ.paises.map(p => { const a = cel(p, 'foot pain'), b = cel(p, 'plantar fasciitis'), c = cel(p, 'heel pain'); return tr([td('<b>' + P[p] + '</b> (' + p + ')'), td(n(a.ativos, 0), 'num'), td(n(b.ativos, 0) + ' <small>(' + pct(b.vivos_pct * 100) + ' vivos)</small>', 'num'), td(n(c.ativos, 0), 'num'), td(b.assimetria != null ? n(b.assimetria, 3) : n(b.ativos / a.ativos, 3), 'num'), td(p === 'US' ? '<b>recomendado</b>: maior mercado vivo e melhor sobrevivência' : ['CA', 'GB', 'AU'].includes(p) ? 'inglês, mercado 3x a 4x menor que o dos EUA' : 'termo em inglês subestima: precisa de termo nativo')], p === 'US' ? 'hl' : ''); });
  const body = pageHead({ eyebrow: '02 · evidências · mercados · matriz de 8 países', h1: 'Entre pelos <em>Estados Unidos</em>, em inglês, em dólar', answer: 'Os EUA têm o maior mercado vivo de anúncios pra fascite e a melhor taxa de sobrevivência. Pra quem está começando, um país só.', meta: ['48 consultas exatas no conector Meta Ads', 'termos: foot pain · plantar fasciitis · heel pain', 'coleta 06/10/2026'] }) +
    toc([['metodo', 'Método'], ['tabela', 'Tabela de países'], ['cruzamento', 'Cruzamento com demanda'], ['sequencia', 'Sequência de entrada']]) +
    sec('metodo', '01', 'Como ler esta tela', '<div class="grid g2"><div class="card"><span class="eyebrow b">Termo amplo</span><p>"foot pain" mede quanto dinheiro anda na categoria em cada país (anúncios ativos).</p></div><div class="card"><span class="eyebrow b">Ângulo</span><p>"plantar fasciitis" e "heel pain" medem quanta gente disputa o seu ângulo. <b>Razão = ângulo ÷ amplo</b>: razão baixa com mercado grande é porta lateral.</p></div></div>' +
      note('Todas as células caíram na regra de "cemitério" (muitos anúncios no histórico, poucos vivos). Isso acontece porque o histórico de "foot pain" está inflado por milhões de anúncios clonados (a mesma frase "Say Goodbye to Foot Pain in Your Golden Years" se repete em todas as respostas). A régua usa isso pra ORDENAR a fila, não pra vetar o país.', 'a', 'Leitura honesta')) +
    sec('tabela', '02', 'Tabela de países', table(['País', { t: 'Amplo: foot pain', num: true }, { t: 'Ângulo: plantar fasciitis', num: true }, { t: 'Ângulo: heel pain', num: true }, { t: 'Razão PF ÷ amplo', num: true }, 'Leitura'], rows) +
      note('Limite de idioma: ' + esc(MATRIZ.limite_idioma) + '.', 'a', 'Limite') + legendNat()) +
    sec('cruzamento', '03', 'Cruzamento com a demanda observada', '<div class="grid g3">' +
      stat({ v: '87%', l: 'do tráfego da One Compress vem dos EUA', k: 'obs', src: 'SimilarWeb set/2026' }) +
      stat({ v: '82%', l: 'do tráfego da Koprez vem dos EUA', k: 'obs', src: 'SimilarWeb set/2026' }) +
      stat({ v: '10.958', l: 'ativos em "plantar fasciitis" nos EUA', d: '4x o Canadá, o 2º maior', k: 'obs' }) + '</div>' +
      note('As lojas que vendem bem vendem pros EUA. A demanda e a mídia apontam pro mesmo país.', 'g')) +
    sec('sequencia', '04', 'Sequência de entrada', '<ol class="steps"><li><b>Agora: Estados Unidos</b>, inglês, USD. Fornecedor com armazém nos EUA ou envio rápido (5 a 9 dias úteis).</li><li><b>Depois de validar (mês 3+):</b> Canadá e Austrália, mesmo idioma, mesmos criativos, frete diferente.</li><li><b>Só depois:</b> Reino Unido. Europa continental pede criativo e página em idioma nativo e termos medidos no vocabulário local.</li></ol>' +
      evidence({ fonte: 'Matriz de 8 países (conector Meta Ads) + SimilarWeb.', obs: 'EUA: 10.958 ativos no ângulo, 8,0% vivos; Canadá 2.681; Reino Unido 2.584; Austrália 2.384.', interp: 'O mercado de verdade está nos EUA; os outros 3 de inglês são extensão, não ponto de partida.', dec: 'País decidido: Estados Unidos (US), USD, inglês.', next: 'Montar a loja em inglês, preços em USD.' })) +
    footer(false);
  return doc({ title: 'Mercados e país · Raio-X · Dor no pé', current: 'mercados', screen: { code: '02', title: 'Mercados e país' }, body, next: { t: 'Ver as 5 lojas que vendem nesse mercado', s: 'dossiê completo de cada uma', b: 'Abrir concorrentes', h: 'concorrentes.html' } });
}

/* ======================= 03 CONCORRENTES ======================= */
export function concorrentes() {
  const body = pageHead({ eyebrow: '03 · evidências · 5 operações · veredito por loja', h1: 'Cinco lojas dropship que <em>vendem pra dor no pé</em>', answer: 'Quatro valem como molde (MODELAR) e uma fica em observação: está desacelerando.', meta: ['todas dropship (regra do nível iniciante)', 'contagem auditada pelo page_id', 'SimilarWeb set/2026'] }) +
    toc([['lojas', 'As 5 lojas'], ['faturamento', 'Faturamento'], ['auditoria', 'Auditoria de contagem'], ['contexto', 'Fora da entrega'], ['leitura', 'Leitura']]) +
    sec('lojas', '01', 'As cinco lojas', legendVer() + '<div class="grid g2">' + RK.map(l => '<a class="card link" href="loja-' + l.slug + '.html"><span class="eyebrow ' + (l.veredito === 'MODELAR' ? 'g' : 'a') + '">' + l.modelo.toLowerCase() + ' · nível ' + l.nivel.toLowerCase() + '</span><h3>' + esc(l.nome) + ' ' + pill(l.veredito, VC[l.veredito]) + '</h3><p>' + esc(l.campeao.titulo) + ' · ' + usd(l.campeao.preco, 2) + '</p><p><small>' + n(l.ativos, 0) + ' ativos · ' + fmtV(l) + ' visitas/mês · momentum ' + l.momentum + '</small></p></a>').join('') + '</div>') +
    sec('faturamento', '02', 'Faturamento estimado por loja', table(['Loja', { t: 'Central/mês', num: true }, { t: 'Faixa', num: true }, { t: 'Mídia/mês', num: true }, 'Método'], RK.map(l => tr([td('<a href="loja-' + l.slug + '.html">' + esc(l.nome) + '</a>'), td(usd(l.fat.central), 'num'), td(usd(l.fat.piso) + ' a ' + usd(l.fat.teto), 'num'), td(usd(l.fat.midia), 'num'), td(l.confianca + ': ' + (l.trafego.visitas ? 'visitas medidas' : 'visitas estimadas pelo rank') + ' × ' + pct(l.fat.conv, 2) + ' × ' + usd(l.fat.ticket, 2))]))) +
      note('Visitas × conversão do setor (3,31%, ajustada pelo bounce) × ticket (o maior entre a mediana do catálogo e 75% do ticket do setor). É faixa de decisão, não receita contábil.', 'a', 'Limite')) +
    sec('auditoria', '03', 'Auditoria de contagem de anúncios', '<div class="grid g3">' + LOJAS.map(l => '<div class="card"><span class="eyebrow b">' + esc(l.nome) + '</span><p><b>' + n(l.ativos, 0) + '</b> ativos · <b>' + n(l.historico, 0) + '</b> no histórico · ' + l.page_ids.length + ' página(s)</p><p><small>achada pelo domínio ' + l.dominio + ': ficha = Biblioteca (0% de divergência)</small></p></div>').join('') + '</div>' +
      note('Toda contagem foi conferida pelo page_id, com ACTIVE e ALL, somando as páginas confirmadas pelo domínio (advertoriais incluídos). Resultado do auditar-anuncios.mjs: aprovado.', 'g')) +
    sec('contexto', '04', 'Quem ficou fora da entrega (e por quê)', table(['Loja', 'Motivo'], JSON.parse(fs.readFileSync(path.join(DADOS, 'midia-por-loja.json'), 'utf8')).contexto_fora_da_entrega.map(c => tr([td(esc(c.nome)), td(esc(c.motivo))])))) +
    sec('leitura', '05', 'Leitura', evidence({ fonte: 'Conector Meta Ads, SimilarWeb, products.json, PDPs.', obs: 'Luva de compressão (Koprez, One Compress) e palmilha (Stepprs, OrthoFlexx, Footstr) são os dois formatos que vendem.', interp: 'A luva é o caminho do iniciante: 2 tamanhos contra 6 a 11 da palmilha.', dec: '4 MODELAR (Koprez, One Compress, Stepprs, OrthoFlexx) e 1 OBSERVAR (Footstr).', next: 'Modelar a oferta da Koprez, o ângulo da One Compress e o catálogo enxuto da OrthoFlexx.' })) +
    footer(false);
  return doc({ title: 'Concorrentes · Raio-X · Dor no pé', current: 'concorrentes', screen: { code: '03', title: 'Concorrentes' }, body, next: { t: 'Abrir o dossiê da Koprez, o maior molde', s: 'oferta, mídia, anatomia do vencedor', b: 'Abrir Koprez', h: 'loja-koprez.html' } });
}

/* ======================= 03.x DOSSIÊ ======================= */
const FRAUDE = { koprez: 'Plausível na ordem de grandeza (4 anos, ~6.700 pedidos/mês estimados), mas não verificável: trate como marketing.', onecompress: 'A PDP diz 750 mil e a home diz 500 mil: alegações inconsistentes entre si. Os 9.921 reviews verificados são o único número confiável.', stepprs: 'Sinal de inflação: 88.552 reviews num domínio de ~14 meses exigiria milhões de pedidos, incompatível com ~231 mil visitas/mês. Não use como referência.', orthoflexx: 'Compatível com 4 anos de operação; a contagem é do Trustpilot, não verificada aqui.', footstr: 'Contagem da home, não verificada; compatível com operação pequena de ~17 meses.' };
const adLink = id => 'https://www.facebook.com/ads/library/?id=' + id;
export function loja(l) {
  const a = l.amostra;
  const c = l.criativos;
  const fmtTot = Object.values(c.formato).reduce((x, y) => x + y, 0) || 1;
  const mix = Object.entries(c.formato).filter(([, v]) => v).map(([k, v]) => ({ video: 'vídeo', imagem: 'estático', carrossel: 'carrossel', catalogo: 'catálogo dinâmico' })[k] + ' ' + pct(v / fmtTot * 100, 0)).join(' · ');
  const nosSwipe = MANIF.filter(m => (m.linkUrl || '').includes(l.dominio.replace('get', '')) || (m.linkUrl || '').includes(l.dominio));
  const body = pageHead({ eyebrow: '03 · concorrente · ' + l.modelo.toLowerCase() + ' · nível ' + l.nivel.toLowerCase(), eyeCls: 'b', h1: esc(l.nome) + ' ' + pill(l.veredito, VC[l.veredito]), answer: '<b>Copie ' + esc(l.copiar) + '.</b> Evite ' + esc(l.evitar) + '.',
    meta: ['<a href="https://' + l.dominio + '" target="_blank" rel="noopener">' + l.dominio + ' ↗</a>', 'ativa desde ' + l.desdeFmt + ' (' + l.idade + ', ' + l.fonteIdade + ')', l.plataforma, esc(l.redes)] }) +
    '<div class="btns" style="margin:-8px 0 20px">' + btn('Abrir loja', 'https://' + l.dominio, 'primary', true) + btn('Biblioteca de anúncios', l.biblioteca, '', true) + btn('Abrir PDP do campeão', 'https://' + l.dominio + '/products/' + l.campeao.handle, 'ghost', true) + '</div>' +
    toc([['campeao', 'Produto campeão'], ['midia', 'Mídia paga'], ['trafego', 'Tráfego'], ['faturamento', 'Faturamento'], ['paginas', 'Páginas'], ['anatomia', 'Anatomia'], ['catalogo', 'Catálogo e stack'], ['nao-obtido', 'Não obtido'], ['veredito', 'Veredito']]) +
    sec('campeao', '01', 'Produto campeão', '<div class="hero-prod"><img loading="lazy" src="prints/' + l.slug + '-campeao.jpg" alt="Foto do produto campeão da ' + esc(l.nome) + '"><div><span class="eyebrow">produto que os anúncios do nicho promovem</span><h3>' + esc(l.campeao.titulo) + '</h3><div class="price">' + usd(l.campeao.preco, 2) + '<small>' + (l.campeao.de ? 'de ' + usd(l.campeao.de, 2) + ' · ' : '') + l.catalogo.n + ' produtos no catálogo · mediana ' + usd(l.catalogo.mediana, 2) + '</small></div><p style="margin-top:10px">' + esc(l.campeao.nota) + '. ' + nat('obs') + '</p></div></div>' +
      table(['Principais produtos', 'Leitura'], [tr([td(esc(l.campeao.titulo)), td('campeão no nicho de dor no pé')]), tr([td('Catálogo (' + l.catalogo.n + ' itens, ' + l.catalogo.faixa + ')'), td(esc(l.catalogo.obs))])])) +
    sec('midia', '02', 'Mídia paga', '<div class="grid g4">' +
      stat({ v: n(l.ativos, 0), l: 'anúncios ativos hoje', d: 'soma de ' + l.page_ids.length + ' página(s): ' + esc(l.paginas.slice(0, 4).join(', ')) + (l.paginas.length > 4 ? '…' : ''), k: 'obs', src: 'conector Meta Ads' }) +
      stat({ v: n(l.historico, 0), l: 'no histórico total', d: 'ACTIVE + inativos, mesmas páginas', k: 'obs' }) +
      stat({ v: pct(l.sobrevivencia), l: dfn('Sobrevivência'), d: 'ativos ÷ histórico', bar: l.sobrevivencia, k: 'calc' }) +
      stat({ v: l.google != null ? n(l.google, 0) : na('o contador do Transparency Center não parseou'), l: 'anúncios no Google Ads', d: l.google != null ? 'Google Ads Transparency Center' : 'ler manualmente o link do Transparency Center', k: 'obs' }) + '</div>' +
      table(['Ritmo de criativo', 'Valor', 'Leitura'], [
        tr([td('criativos únicos na amostra de 50'), td(a.unicos), td('títulos distintos nos 50 anúncios ativos mais recentes')]),
        tr([td('por dia'), td(a.rajada ? 'rajada: não extrapolável' : '~' + Math.round(a.anuncios_dia)), td(a.rajada ? 'os 50 anúncios subiram em ' + n(a.janela_dias * 24, 1) + ' horas: rajada de lançamento, o "por dia" não vale' : 'janela da amostra: ' + n(a.janela_dias, 1) + ' dias')]),
        tr([td('únicos por semana'), td(a.unicos_semana != null ? '~' + Math.round(a.unicos_semana) : 'rajada'), td('capacidade de produzir criativo novo')]),
        tr([td('<b>duplicação</b>'), td(n(a.duplicacao, 1) + 'x'), td('anúncios ÷ criativos únicos: mesma peça em várias variações')]),
        tr([td('longevidade máxima'), td(c.max_dias + ' dias'), td('o criativo campeão é o mais longevo da mineração (não o mais recente)')]),
        tr([td('mix de formato'), td(mix || 'não obtido'), td('amostra de ' + c.amostra_mineracao + ' anúncios no nicho')]),
        tr([td('nível de sofisticação'), td('nível 1'), td('vídeo de celular, estático com texto ou catálogo: produção barata')]),
      ], { cls: 'kv2' }) +
      '<h3 style="margin:18px 0 8px">Ranking de criativos vencedores (por longevidade)</h3>' +
      table(['#', 'Criativo', 'Dias no ar', 'Formato', 'Ângulo / hook', 'Biblioteca'], c.top.map((t, i) => tr([td(i + 1), td(esc(t.titulo || '(sem título)')), td(t.dias + ' dias', 'num'), td(esc(t.formato || '')), td(esc((t.corpo || '').slice(0, 140)) + '…'), td('<a href="' + (t.url || adLink(t.id)) + '" target="_blank" rel="noopener">abrir ↗</a>')]))) +
      (nosSwipe.length ? '<div class="ads">' + nosSwipe.map(m => '<article class="ad"><div class="media"><img loading="lazy" src="criativos/' + path.basename(m.capaLocal || m.arquivoLocal) + '" alt="' + esc(m.title) + '"></div><div class="body"><div class="pg">' + esc(m.pageName) + '</div><div class="t">' + esc(m.title) + '</div><div class="days">no ar há ' + m.dias + ' dias · top 10 do mercado (#' + m.posicao + ')</div></div><div class="foot"><a class="btn sm" href="' + adLink(m.adArchiveId) + '" target="_blank" rel="noopener">Biblioteca ↗</a></div></article>').join('') + '</div>' : '')) +
    sec('trafego', '03', 'Tráfego real (SimilarWeb · set/2026)', '<div class="grid g4">' +
      (l.trafego.visitas ? stat({ v: n(l.trafego.visitas, 0), l: 'visitas/mês (média de 3 meses)', d: esc(l.trafego.visitasNota), k: 'obs', trend: l.trafego.variacao, src: 'SimilarWeb · set/2026' }) : stat({ naWhy: l.trafego.visitasNota, l: 'visitas/mês (SimilarWeb · set/2026)' })) +
      stat({ v: '#' + n(l.trafego.rank, 0), l: 'rank global', d: 'rank nos EUA #' + n(l.trafego.rankPais, 0) + ' · variação no mês ' + pct(l.trafego.variacao, 2), k: 'obs' }) +
      stat({ v: pct(l.trafego.bounce, 2), l: dfn('bounce'), d: n(l.trafego.paginasVisita, 2) + ' páginas por visita · ' + l.trafego.duracao, k: 'obs' }) +
      stat({ v: pct(l.trafego.us, 2), l: 'do tráfego vem dos EUA', k: 'obs' }) + '</div>' +
      note('Canais: ' + esc(l.trafego.canais) + '. Busca: ' + esc(l.trafego.busca) + '.', 'b', 'Pago vs orgânico')) +
    sec('faturamento', '04', 'Faturamento mensal estimado', '<div class="grid g4">' +
      stat({ v: usd(l.fat.central), l: 'receita bruta/mês, centro', d: n(l.fat.pedidos, 0) + ' pedidos estimados', k: 'calc' }) +
      stat({ v: usd(l.fat.piso), l: 'piso', k: 'calc' }) + stat({ v: usd(l.fat.teto), l: 'teto', k: 'calc' }) +
      stat({ v: usd(l.fat.midia), l: 'mídia/mês (gasto em mídia estimado)', d: '14,2% da receita (IRP); conferência por clique: ' + usd(l.fat.midia_cpc), k: 'inf' }) + '</div>' +
      note('Método: ' + (l.trafego.visitas ? 'visitas medidas' : 'visitas estimadas (' + n(l.visitasEstim, 0) + '/mês)') + ' × conversão ' + pct(l.fat.conv, 2) + ' (setor 3,31% × ajuste ' + l.fat.ajuste + ' pelo bounce) × ticket ' + usd(l.fat.ticket, 2) + '. Confiança: <b>' + l.confianca + '</b>. Benchmark do setor: CPM ' + usd(BENCH.cpm, 2) + ', CPC ' + usd(BENCH.cpc, 2) + ', CPA ' + usd(BENCH.cpa_usd, 2) + ' (e-commerce/Health). CPM/CPC por anunciante não são públicos.', 'a', 'Limite')) +
    sec('paginas', '05', 'Páginas capturadas', '<div class="shots">' +
      '<div class="shot"><div class="cap">Home<a href="prints/' + l.slug + '-home.jpg" target="_blank">abrir ↗</a></div><div class="frame"><img loading="lazy" src="prints/' + l.slug + '-home.jpg" alt="Home ' + esc(l.nome) + '"></div></div>' +
      '<div class="shot"><div class="cap">PDP · ' + esc(l.campeao.titulo) + '<a href="prints/' + l.slug + '-pdp.jpg" target="_blank">abrir ↗</a></div><div class="frame"><img loading="lazy" src="prints/' + l.slug + '-pdp.jpg" alt="PDP ' + esc(l.nome) + '"></div></div>' +
      '<div class="shot"><div class="cap">Carrinho, item adicionado<a href="prints/' + l.slug + '-carrinho.jpg" target="_blank">abrir ↗</a></div><div class="frame"><img loading="lazy" src="prints/' + l.slug + '-carrinho.jpg" alt="Carrinho ' + esc(l.nome) + '"></div></div></div>') +
    sec('anatomia', '06', 'Anatomia do vencedor ' + nat('inf'), table(['Elemento', 'Leitura'], [['Big idea', l.anatomia.big], ['Mecanismo', l.anatomia.mecanismo], ['Hook', l.anatomia.hook], ['Presell', l.anatomia.presell], ['Objeção principal', l.anatomia.objecao]].map(([k, v]) => tr([td(k), td(esc(v))])), { cls: 'kv2' }) +
      note('<b>Momentum da operação: ' + l.momentum.toUpperCase() + '.</b> ' + esc(l.momentumTxt) + '.', l.momentum === 'retraindo' ? 'a' : 'b', 'Inferido')) +
    sec('catalogo', '07', 'Catálogo, oferta e identificação', '<dl class="kv"><dt>Plataforma</dt><dd>' + l.plataforma + '</dd><dt>Apps (tech stack)</dt><dd>' + esc(l.apps) + '</dd><dt>Pixel Meta</dt><dd>' + na(l.pixel) + '</dd><dt>Catálogo</dt><dd>' + l.catalogo.n + ' produtos, ' + l.catalogo.faixa + '</dd><dt>Frete</dt><dd>' + esc(l.oferta.frete) + '</dd><dt>Garantia</dt><dd>' + esc(l.oferta.garantia) + '</dd><dt>Prazo e BNPL</dt><dd>prazo de envio: ' + esc(l.oferta.prazo) + ' · BNPL/parcelamento: ' + esc(l.oferta.bnpl) + '</dd><dt>Reviews</dt><dd>' + esc(l.oferta.reviews) + '</dd><dt>Alegação</dt><dd>' + esc(l.oferta.alegacao) + '. Cruzamento com a idade (checagem de fraude de prova social): operação desde ' + l.desdeFmt + ' (' + l.idade + '). ' + esc(FRAUDE[l.slug]) + '</dd><dt>Redes</dt><dd>' + esc(l.redes) + '</dd></dl>' +
      note('O que copiar: ' + esc(l.copiar) + '.', 'g')) +
    sec('nao-obtido', '08', 'Dados não obtidos', table(['Dado', 'Motivo', 'Método tentado'], [
      tr([td('Gasto e impressões dos anúncios'), td('a Meta não publica gasto de anúncio comercial fora da UE'), td('conector Meta Ads e Biblioteca pública')]),
      tr([td('Pixel ID'), td('não aparece no HTML estático'), td('coletar.mjs (grep do HTML), sem navegador')]),
      tr([td('Primeira captura no Wayback'), td('o CDX não devolveu registro'), td('Wayback CDX; idade usada = data do 1º produto')]),
      ...(l.trafego.visitas ? [] : [tr([td('Visitas exatas'), td('total atrás do cadastro do SimilarWeb; trafego.js bloqueado (CloudFront)'), td('trafego.js (5 tentativas), página pública via WebFetch, rank global')])]),
      ...(l.google == null ? [tr([td('Contagem no Google Ads'), td('o contador da página não parseou'), td('gads-transparency.js')])] : []),
    ])) +
    sec('veredito', '09', 'Veredito e classificação', '<div class="grid g4">' +
      stat({ v: pill(l.modelo, 'n'), l: 'modelo', k: 'inf' }) + stat({ v: pill(l.veredito, VC[l.veredito]), l: 'veredito', k: 'rec' }) +
      stat({ v: pill('NÍVEL ' + l.nivel, 'b'), l: 'nível (soma do scorecard)', k: 'calc' }) + stat({ v: pill(l.defens, 'n'), l: 'defensabilidade', d: l.defens === 'CONSTRUÍVEL' ? 'tem tráfego direto/orgânico e anos de operação' : 'sem rede social, tráfego caindo', k: 'inf' }) + '</div>' +
      table(['Eixo do scorecard', 'Nota', 'Base'], l.score.map(s => tr([td(s[0]), td(s[1] + '/2'), td(esc(s[2]))])).concat([tr([td('<b>Soma</b>'), td('<b>' + l.scoreSoma + '/12</b>'), td('nível ' + l.nivel.toLowerCase() + ' ' + nat('calc'))], 'hl')]), { cls: 'kv2' }) +
      evidence({ fonte: 'Conector Meta Ads, SimilarWeb set/2026, products.json, PDP.', obs: n(l.ativos, 0) + ' ativos, ' + n(l.historico, 0) + ' no histórico, campeão a ' + usd(l.campeao.preco, 2) + ', ' + fmtV(l) + ' visitas/mês.', interp: esc(l.momentumTxt) + '.', dec: l.veredito + ', ' + l.modelo + ', nível ' + l.nivel.toLowerCase() + '.', next: 'Copiar ' + esc(l.copiar) + '.', decCls: l.veredito === 'MODELAR' ? '' : 'a' })) +
    footer(false);
  return doc({ title: l.nome + ' · Concorrente · Raio-X · Dor no pé', current: l.slug, screen: { code: '03', title: 'Concorrente · ' + l.nome }, body, next: { t: 'Voltar ao índice de concorrentes', s: 'comparar com as outras 4 lojas', b: 'Concorrentes', h: 'concorrentes.html' } });
}

/* ======================= 04 ANÚNCIOS ======================= */
export function anuncios() {
  const fmtCriativo = m => m.ehVideo ? 'VÍDEO' : 'ESTÁTICO';
  const estilo = { 'UGC / demonstração (vídeo de celular)': 4, 'still de produto com texto': 3, 'text-heavy estático (gancho escrito)': 2, 'infográfico educativo': 1 };
  const body = pageHead({ eyebrow: '04 · evidências · swipe curado · 10 criativos públicos', h1: 'O que os vencedores <em>mostram</em> e <em>dizem</em>', answer: 'Vídeo de celular e imagem com texto forte, falando da dor da manhã e do turno em pé. Nada de produção cara.', meta: ['10 criativos baixados localmente', 'curadoria: lojas de produto do nicho, máx. 2 por loja, ordem por dias no ar', 'Biblioteca pública da Meta, 06/10/2026'] }) +
    toc([['ranking', 'Ranking de escala'], ['angulos', 'Ângulos'], ['galeria', 'Galeria'], ['anatomia', 'Anatomia dos vencedores'], ['formato', 'Formato e estilo'], ['limites', 'Fonte e limites']]) +
    sec('ranking', '01', 'Ranking de escala', table(['Operação', { t: 'Ativos', num: true }, 'Longevidade máx.', { t: 'Duplicação', num: true }, 'Veredito', 'Biblioteca'], RK.map(l => tr([td('<a href="loja-' + l.slug + '.html">' + esc(l.nome) + '</a>'), td(n(l.ativos, 0), 'num'), td(l.criativos.max_dias + ' dias no ar'), td(n(l.amostra.duplicacao, 1) + 'x', 'num'), td(pill(l.veredito, VC[l.veredito])), td('<a href="' + l.biblioteca + '" target="_blank" rel="noopener">abrir ↗</a>')]))) +
      note('Escala sustentada (60+ dias no ar) = oferta validada: copie a oferta. Rajada (Stepprs, 50 anúncios em 2,4 h) = método de teste: copie o método, não a oferta.', 'b')) +
    sec('angulos', '02', 'Ângulos que se repetem', '<div class="grid g3">' + ANGULOS.map(a => '<div class="card"><span class="eyebrow g">ângulo</span><h3>' + esc(a.t) + '</h3><p>' + esc(a.d) + '</p><small>prova: ' + esc(a.prova) + '</small></div>').join('') + '</div>') +
    sec('galeria', '03', 'Galeria dos 10 criativos mais escalados do mercado', '<div class="ads">' + MANIF.map(m => {
      const img = path.basename(m.capaLocal || m.arquivoLocal);
      return '<article class="ad"><div class="media"><img loading="lazy" src="criativos/' + img + '" alt="' + esc(m.title) + '"><span class="pill n fmt" style="background:rgba(12,12,10,.85)">' + fmtCriativo(m) + '</span></div><div class="body"><div class="pg">#' + m.posicao + ' · ' + esc(m.pageName) + '</div><div class="t">' + esc(m.title) + '</div><div class="tx">' + esc((m.bodyText || '').replace(/\s+/g, ' ').slice(0, 160)) + '…</div><div class="days">no ar há ' + m.dias + ' dias · ' + m.variacoes + ' variação(ões)</div></div><div class="foot"><span class="pill b">ativo</span><button class="btn sm" data-proof="proof-' + m.adArchiveId + '">Abrir prova</button></div></article>' +
        '<template id="proof-' + m.adArchiveId + '"><span class="eyebrow b">Prova do anúncio</span><h2>' + esc(m.pageName) + '</h2><p style="color:var(--txt)">' + esc((m.bodyText || '').replace(/\s+/g, ' ').slice(0, 600)) + '</p><dl class="kv"><dt>Fonte</dt><dd><a href="' + adLink(m.adArchiveId) + '" target="_blank" rel="noopener">Biblioteca de Anúncios da Meta ↗</a></dd><dt>Coleta</dt><dd>06/10/2026, Biblioteca pública (minerar.js)</dd><dt>No ar</dt><dd>' + m.dias + ' dias até a coleta</dd><dt>Formato</dt><dd>' + fmtCriativo(m) + (m.ehVideo ? ' (capa = prévia da Meta; vídeo completo em criativos/' + m.adArchiveId + '.mp4)' : '') + '</dd><dt>Destino</dt><dd>' + esc(m.linkUrl || '') + '</dd><dt>Gasto e impressões</dt><dd>' + na('a Meta não publica gasto de e-commerce fora da UE') + '</dd></dl><div class="two"><div class="card proves"><span class="eyebrow g">O que isso prova</span><p style="color:var(--txt)">Que o anúncio está no ar há ' + m.dias + ' dias e a página segue investindo nesse ângulo.</p></div><div class="card notproves"><span class="eyebrow r">O que isso não prova</span><p style="color:var(--txt)">Gasto, faturamento ou lucro.</p></div></div><div class="btns"><button class="btn primary" data-close>Voltar para a leitura</button></div></template>';
    }).join('') + '</div>' + note('Imagens e capas salvas em paginas/criativos/ (a CDN da Meta expira em horas). Sem ffmpeg na máquina, a capa dos vídeos é a prévia que a própria Meta fornece; o vídeo completo está ao lado (.mp4).', 'a', 'Limite')) +
    sec('anatomia', '04', 'Anatomia dos vencedores (os 4 mais escalados)', table(['Loja', 'Big idea', 'Gancho', 'Ângulo', 'Estrutura', 'Objeção que resolve', 'Texto na tela'], [
      ['Koprez', 'gelo e alongamento não resolvem: é desgaste, não inflamação', '"Last Chance: Buy One... Get One Free. Offer ends at midnight."', 'mecanismo novo + oferta', 'unboxing no celular → vestir a luva → oferta "leve 2"', '"já tentei de tudo"', '"BUY 1 GET 1 FREE: KOPREZ PF SLEEVE"'],
      ['One Compress', 'não é meia de compressão, é luva macia pra dormir', 'review falso de 1 estrela: "TOTAL SCAM!"', 'anti-objeção + uso noturno', 'interrupção → explicação do mecanismo → garantia de 60 dias', '"compressão aperta demais"', '"Try them risk-free for 60 days tonight."'],
      ['Stepprs', 'termine um turno de 12 horas sem dor no pé', 'depoimento de trabalhador de turno', 'avatar profissional em pé', 'foto da palmilha → frase de resultado → "ou é de graça"', '"já tentei várias palmilhas"', '"Finish 12 hour shifts with ZERO FOOT PAIN"'],
      ['OrthoFlexx', 'arco firme por uma fração dos $1.000 da sob medida', '"Read this before you spend over $1,000"', 'comparação de preço', 'catálogo dinâmico, 1 criativo em 996 variações', '"e se não servir?" (recortável)', 'nome do produto + preço'],
    ].map(r => tr(r.map(x => td(esc(x)))))) + note('Síntese: os 4 falam de uma DOR específica (manhã, turno, aperto, preço da sob medida), não de "compressão". O ângulo dominante do nicho é "alívio do primeiro passo / do turno" com uma oferta que reduz o risco (garantia longa, leve 2).', 'g')) +
    sec('formato', '05', 'Formato e estilo do criativo', '<div class="grid g2"><div class="card"><span class="eyebrow b">Estilo do criativo (top 10)</span><ul class="cl">' + Object.entries(estilo).map(([k, v]) => '<li>' + k + ': ' + v + ' de 10</li>').join('') + '</ul></div><div class="card"><span class="eyebrow b">Mix de formato (mineração do nicho)</span><p>Koprez: 62% vídeo · One Compress: 64% estático · Stepprs: 63% vídeo · OrthoFlexx: 100% catálogo · Footstr: 50/50. Sofisticação nível 1 em todas.</p></div></div>' +
      table(['Formato', 'Roteiro', 'Uso'], [tr([td('Vídeo de celular (UGC)'), td('tirar a luva da embalagem → vestir em 5 s → andar'), td('topo de funil, oferta "2 pares"')]), tr([td('Estático com texto'), td('gancho que contraria ("não é meia") + produto na mão + garantia'), td('público frio, anti-objeção')]), tr([td('Advertorial curto'), td('mecanismo em desenho simples + história de quem sofria'), td('tráfego frio mais velho (55+)')])])) +
    sec('limites', '06', 'Fonte e limites', note('Anúncio no ar prova continuidade, não lucro. A amostra da Biblioteca vem por recência: o ranking usa dias no ar e variações, não a ordem de retorno. Gasto e impressões não existem pra anúncio comercial fora da UE.', 'a', 'Limite') + legendNat()) +
    footer(false);
  return doc({ title: 'Criativos e prova · Raio-X · Dor no pé', current: 'anuncios', screen: { code: '04', title: 'Criativos e prova' }, body, next: { t: 'Ver a estratégia de entrada', s: 'onde entrar e com qual ângulo', b: 'Abrir estratégia', h: 'estrategia.html' } });
}
