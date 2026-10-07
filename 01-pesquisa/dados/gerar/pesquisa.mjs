// FONTE ÚNICA da pesquisa "Raiox - Dor no Pe" (06/10/2026).
// Todo número das telas sai daqui ou dos JSONs coletados em dados/. Nada é
// inventado no gerador: cada valor carrega a natureza (obs/calc/inf/rec).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DADOS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lerJ = f => JSON.parse(fs.readFileSync(path.join(DADOS, f), 'utf8'));

export const CASE = {
  code: 'RX-2026-1006-DORPE',
  nome: 'Dor no pé e fascite plantar',
  categoria: 'Health, fitness & recovery',
  coletaFmt: '06/10/2026', auditoria: '06/10/2026', entregaV3: '06/10/2026',
  pais: 'US', paisNome: 'Estados Unidos', moeda: 'USD', idioma: 'en',
  marca: 'Heelora', dominio: 'heelora.com',
  decisao: 'APROVADO',
};

// ---------- benchmark do setor (IRP Commerce, agosto/2026, Health & Wellbeing) ----------
export const BENCH = {
  fonte: 'IRP Commerce, Health & Wellbeing, agosto/2026',
  url: 'https://www.irpcommerce.com/en/gb/ecommercemarketdata.aspx',
  conversao: 3.31, aov_gbp: 48.78, cpa_pct: 14.2,
  cambio: 1.34, // premissa declarada: 1 GBP ~ 1,34 USD (referência out/2026, não medido)
  cpm: 10.42, cpc: 0.67, // benchmark público Meta 2026, e-commerce geral (coleta.md, Bloco 11)
};
BENCH.aov_usd = +(BENCH.aov_gbp * BENCH.cambio).toFixed(2);           // 65.37
BENCH.cpa_usd = +(BENCH.aov_usd * BENCH.cpa_pct / 100).toFixed(2);    // 9.28
BENCH.ticket_piso = +(0.75 * BENCH.aov_usd).toFixed(2);               // 49.03

// ---------- faturamento: visitas x conversão(ajuste bounce) x ticket ----------
function faturamento({ visitas, bounce, mediana, faixa = [0.6, 1.4] }) {
  const ajuste = bounce < 45 ? 1.25 : bounce > 60 ? 0.7 : 1.0;
  const conv = BENCH.conversao * ajuste / 100;
  const ticket = Math.max(mediana, BENCH.ticket_piso);
  const pedidos = visitas * conv;
  const central = pedidos * ticket;
  return {
    ajuste, conv: +(conv * 100).toFixed(2), ticket: +ticket.toFixed(2), pedidos: Math.round(pedidos),
    central: Math.round(central), piso: Math.round(central * faixa[0]), teto: Math.round(central * faixa[1]),
    midia: Math.round(central * BENCH.cpa_pct / 100),
    midia_cpc: Math.round(visitas * 0.7 * BENCH.cpc),
  };
}

// ---------- as 5 lojas (todas dropship, regra do nível iniciante) ----------
const midia = lerJ('midia-por-loja.json').lojas;
const crt = lerJ('anuncios-curados.json');
const gads = lerJ('gads-transparency.json');
const M = s => midia.find(x => x.slug === s);

export const LOJAS = [
  {
    slug: 'koprez', nome: 'Koprez', dominio: 'koprez.com',
    desde: '2022-05-24', desdeFmt: 'mai/2022', idade: '~4,4 anos', fonteIdade: '1º produto no products.json',
    plataforma: 'Shopify', apps: 'Loox, Vitals, Rebuy, UpCart, Klaviyo, Postscript, Triple Whale, GemPages, Afterpay',
    pixel: 'não exposto no HTML (coletor sem navegador)', redes: 'Instagram @koprezofficial, ~32 mil seguidores; Facebook /koprezshop',
    campeao: { titulo: 'Koprez® Foot Sleeve', handle: 'foot-sleeve', preco: 39.99, de: 79.99, nota: 'luva de compressão com faixa de suporte no arco; vendida em "leve 2, pague 1" nos anúncios' },
    catalogo: { n: 46, mediana: 69.98, faixa: '$3,99 a $149,94', obs: 'luva de pé, joelheira, palmilha "custom", pacotes 6x/8x/12x, suplemento e e-book' },
    oferta: { frete: 'grátis acima de $60 (EUA)', garantia: '30 dias, satisfação garantida', prazo: 'não declarado na PDP (campo "arrives in" vazio)', bnpl: 'Afterpay detectado no stack', reviews: '"10.242 Reviews" na PDP (Loox; contagem por produto não exposta no JSON-LD)', alegacao: '"500k+ Customers" na PDP' },
    ativos: M('koprez').ativos, historico: M('koprez').historico, google: gads['koprez.com'].contagem,
    paginas: M('koprez').paginas, page_ids: M('koprez').page_ids, amostra: M('koprez').amostra,
    trafego: { fonte: 'SimilarWeb · set/2026', visitas: null, visitasNota: 'total não exibido na página pública (atrás de cadastro); triangulado pelo rank vizinho', rank: 59073, rankPais: 13053, bounce: 66.83, paginasVisita: 2.15, duracao: '1min30s', variacao: 9.36, us: 82.34, canais: 'Social pago 24,08% (1º), direto (2º), display (3º)', busca: 'da busca: 85,68% orgânica · 14,32% paga' },
    visitasEstim: 290000, confianca: 'triangulado',
    porte: 'gigante', momentum: 'crescendo', momentumTxt: 'tráfego +9,36% no mês (SimilarWeb), 912 anúncios ativos e criativo novo todo dia (13 únicos em ~26 horas)',
    modelo: 'DROPSHIP DE MARCA', veredito: 'MODELAR', defens: 'CONSTRUÍVEL',
    score: [['Sourcing simples', 2, 'luva de compressão genérica, achável em volume no AliExpress'], ['Ticket fecha sem escada complexa', 1, '$39,99 avulso, mas a loja empurra "leve 2" e pacotes de 6 a 12'], ['Criativo simples de produzir', 2, 'vídeo de celular (unboxing + vestir) e advertorial de texto'], ['Mecanismo com urgência', 2, 'dor física diária, pior nos primeiros passos'], ['Investimento de entrada baixo', 1, 'opera 4 páginas e 912 anúncios: o molde completo pede verba'], ['Sem dependência de autoridade', 1, 'usa "fisioterapeuta explica" como autoridade emprestada']],
    copiar: 'a oferta "leve 2, pague 1" com garantia de 30 dias, o mecanismo "não é inflamação, é desgaste" e o vídeo caseiro de vestir a luva',
    evitar: 'promessa de "cura completa em 30 dias" (risco de reprovação na Meta) e a operação de 4 páginas, que é escala, não ponto de partida',
    anatomia: { big: 'Gelo e alongamento não resolvem porque a fáscia não está mais inflamada, está se desgastando; a luva devolve fluxo de sangue e segura o arco.', mecanismo: '"Biolateral compression" + faixas de suporte que "param o ciclo de re-ruptura"', hook: 'Fisioterapeuta/filha contando o caso ("My Mom Did Everything Right... She Still Got Worse")', presell: 'advertorial em páginas-jornal ("Foot Health Digest", "The Nurse Veteran") antes da loja', objecao: '"já tentei de tudo": respondida com o mecanismo novo + garantia de 30 dias + "leve 2"' },
  },
  {
    slug: 'onecompress', nome: 'One Compress', dominio: 'onecompress.com',
    desde: '2021-03-31', desdeFmt: 'mar/2021', idade: '~5,5 anos', fonteIdade: '1º produto no products.json',
    plataforma: 'Shopify', apps: 'Loox, Yotpo, Klarna, Shop Pay, Klaviyo, UpCart, GemPages',
    pixel: 'não exposto no HTML (coletor sem navegador)', redes: 'Instagram @onecompress, ~29 mil seguidores, 374 posts',
    campeao: { titulo: 'Premium Anti-Fatigue Bamboo Footsleeves', handle: 'bamboofootsleeves', preco: 49.00, de: null, nota: 'luva de bambu sem dedos, usada pra dormir; anúncio "não é meia de compressão"' },
    catalogo: { n: 26, mediana: 49.00, faixa: '$2,99 a $99', obs: 'luvas de bambu (pé, joelho, perna, mão), meias, loção, e-books e curso' },
    oferta: { frete: 'grátis acima de $95; brinde surpresa acima de $75', garantia: '60 dias, reembolso total ("risk-free")', prazo: '2 a 5 dias úteis nos EUA, sai de Springfield, Missouri', bnpl: 'Klarna e Shop Pay', reviews: '9.921 reviews verificados no JSON-LD da PDP, nota 4,7', alegacao: '"750,000+ customers" na PDP e "500,000+" na home (as duas alegações não batem entre si)' },
    ativos: M('onecompress').ativos, historico: M('onecompress').historico, google: gads['onecompress.com'].contagem,
    paginas: M('onecompress').paginas, page_ids: M('onecompress').page_ids, amostra: M('onecompress').amostra,
    trafego: { fonte: 'SimilarWeb · set/2026', visitas: 277733, visitasNota: '833,2 mil visitas nos últimos 3 meses (média mensal)', rank: 64553, rankPais: 13665, bounce: 55.9, paginasVisita: 2.77, duracao: '1min27s', variacao: -19.41, us: 87.34, canais: 'Social pago 29,13% (1º), display (2º), direto (3º)', busca: 'split de busca não exibido' },
    visitasEstim: 277733, confianca: 'medido',
    porte: 'gigante', momentum: 'estável', momentumTxt: 'tráfego −19,41% no mês, mas 2.379 anúncios ativos (81% do histórico) e 5,5 anos de operação: queda pontual, não retração estrutural',
    modelo: 'DROPSHIP DE MARCA', veredito: 'MODELAR', defens: 'CONSTRUÍVEL',
    score: [['Sourcing simples', 2, 'luva de bambu sem dedos, item genérico'], ['Ticket fecha sem escada complexa', 1, '$49 avulso; anúncio usa "compre 1, leve 2 grátis"'], ['Criativo simples de produzir', 2, 'estático com texto pesado (gancho "TOTAL SCAM!") e vídeo simples'], ['Mecanismo com urgência', 2, 'dor e inchaço noturno, público 55-64'], ['Investimento de entrada baixo', 1, 'multi-dor (mão, joelho, quadril): o molde completo é largo'], ['Sem dependência de autoridade', 1, 'apoia em 9.921 reviews acumulados em 5 anos']],
    copiar: 'o ângulo "não é meia de compressão" (quebra a objeção nº1 do nicho), o uso NOTURNO e a garantia de 60 dias',
    evitar: 'o catálogo multi-dor (mão, joelho, quadril) no começo e as alegações de clientes que se contradizem',
    anatomia: { big: 'Meia de compressão aperta, esquenta e você tira antes de dormir; a luva de bambu é macia o bastante pra usar a noite inteira.', mecanismo: 'bambu termorregulador + compressão leve que "drena o líquido parado" durante o sono', hook: 'review falso de 1 estrela ("TOTAL SCAM!") que vira prova, padrão que interrompe o feed', presell: 'advertorial "Pure Living Digest" + páginas-persona ("Helen Whitman", "Dad Advice From Hank")', objecao: '"compressão aperta demais": resposta direta no título "Not Your Regular Compression Socks"' },
  },
  {
    slug: 'stepprs', nome: 'Stepprs', dominio: 'stepprs.com',
    desde: '2024-08-03', desdeFmt: 'ago/2024', idade: '~14 meses', fonteIdade: '1º produto no products.json',
    plataforma: 'Shopify', apps: 'Judge.me, Klaviyo, ReCharge, Triple Whale, Zipify, GemPages, Clarity',
    pixel: 'não exposto no HTML (coletor sem navegador)', redes: 'Instagram @getstepprs, ~103 mil seguidores, 243 posts',
    campeao: { titulo: 'Plantar Fasciitis Relief Kit', handle: 'plantar-fasciitis-kit', preco: 48.00, de: 75.00, nota: 'kit palmilha massageadora + rolo de massagem; desconto progressivo 1, 2, 3 e 5 kits' },
    catalogo: { n: 21, mediana: 39.00, faixa: '$13 a $500', obs: 'palmilhas (massagem, plush, altura, cashmere), kits por dor, chinelo, meias, rolo, spa de pé' },
    oferta: { frete: 'grátis a partir de ~$98 ("Spend $50 more to get FREE shipping" num carrinho de $48)', garantia: '90 dias, dinheiro de volta', prazo: '5 a 8 dias úteis, rastreado; origem não declarada', bnpl: 'não detectado (Shop Pay, PayPal, cartões)', reviews: '"88.552 reviews" e nota 4,8 na PDP (alegação, não verificada pelo JSON-LD)', alegacao: '"100,000+ Happy Customers" no anúncio' },
    ativos: M('stepprs').ativos, historico: M('stepprs').historico, google: null,
    paginas: M('stepprs').paginas, page_ids: M('stepprs').page_ids, amostra: M('stepprs').amostra,
    trafego: { fonte: 'SimilarWeb · set/2026', visitas: 231100, visitasNota: '693,3 mil visitas nos últimos 3 meses (média mensal)', rank: 80484, rankPais: 29954, bounce: 58.68, paginasVisita: 2.32, duracao: '57s', variacao: -2.94, us: 61.17, canais: 'Direto 26,53% (1º), social pago (2º), display (3º)', busca: 'da busca: 57,87% orgânica · 42,13% paga' },
    visitasEstim: 231100, confianca: 'medido',
    porte: 'gigante', momentum: 'estável', momentumTxt: 'tráfego −2,94% no mês, criativo de 435 dias ainda no ar e rajada de 50 anúncios novos em 2,4 horas',
    modelo: 'DROPSHIP DE MARCA', veredito: 'MODELAR', defens: 'CONSTRUÍVEL',
    score: [['Sourcing simples', 1, 'kits de 2 itens e palmilha com grade de tamanho (M5 a M15)'], ['Ticket fecha sem escada complexa', 1, '$48 o kit, desconto progressivo até 5 kits'], ['Criativo simples de produzir', 2, 'foto da palmilha no chão + depoimento escrito'], ['Mecanismo com urgência', 2, 'dor no turno de 12 horas em pé'], ['Investimento de entrada baixo', 1, '1.340 ativos e rajadas de teste: método de queima em volume'], ['Sem dependência de autoridade', 2, 'vende no benefício funcional ("Walk on Clouds")']],
    copiar: 'o avatar "turno de 12 horas em pé", a promessa "Walk on Clouds, ou é de graça" e o kit palmilha + rolo',
    evitar: 'a grade de 11 tamanhos de palmilha logo no início e a alegação de 88 mil reviews num domínio de 14 meses',
    anatomia: { big: 'Termine um turno de 12 horas sem dor no pé, ou o dinheiro volta.', mecanismo: 'palmilha "massageadora" com amortecimento em camadas', hook: 'depoimento em 1ª pessoa de trabalhador de turno ("I wear them in my work boots for 10-hour shifts")', presell: 'sem advertorial: anúncio vai direto pra PDP do kit', objecao: '"já tentei várias palmilhas": respondida no próprio depoimento + garantia de 90 dias' },
  },
  {
    slug: 'orthoflexx', nome: 'OrthoFlexx', dominio: 'orthoflexx.com',
    desde: '2022-05-08', desdeFmt: 'mai/2022', idade: '~4,4 anos', fonteIdade: '1º produto no products.json',
    plataforma: 'Shopify', apps: 'Klaviyo, Triple Whale, Hotjar, Clarity',
    pixel: 'não exposto no HTML (coletor sem navegador)', redes: 'Instagram @orthoflexx_official, ~17 mil seguidores, 448 posts',
    campeao: { titulo: 'Max Arch Support Insoles', handle: 'max-arch-support-insoles', preco: 64.95, de: null, nota: 'palmilha de arco firme, recortável; leva "Achilles Cushions" de brinde' },
    catalogo: { n: 3, mediana: 64.95, faixa: '$19,99 a $64,95', obs: 'só 3 produtos: 2 palmilhas e almofada de calcanhar' },
    oferta: { frete: 'grátis', garantia: '30 dias, devolução grátis (vale mesmo recortada)', prazo: '3 a 6 dias, "Fast shipping from the US"', bnpl: 'não detectado; aceita cartão HSA/FSA', reviews: '"1.200+" no Trustpilot e nota 4,8 (alegação da home, não verificada)', alegacao: '"Holds 330 lbs without collapsing"' },
    ativos: M('orthoflexx').ativos, historico: M('orthoflexx').historico, google: gads['orthoflexx.com'].contagem,
    paginas: M('orthoflexx').paginas, page_ids: M('orthoflexx').page_ids, amostra: M('orthoflexx').amostra,
    trafego: { fonte: 'SimilarWeb · set/2026', visitas: null, visitasNota: 'total não exibido na página pública; estimado pelo rank (#638.911, entre Footstr #998.775 = ~7 mil e Stepprs #80.484 = ~231 mil)', rank: 638911, rankPais: 181156, bounce: 39.92, paginasVisita: 2.83, duracao: '1min12s', variacao: 11.19, us: 77.94, canais: 'Social pago 24,46% (1º), direto (2º), display (3º)', busca: 'termos de marca ("orthoflex", "orthoflexx")' },
    visitasEstim: 15000, confianca: 'estimado incerto',
    porte: 'gigante', momentum: 'crescendo', momentumTxt: 'tráfego +11,19% no mês e 996 anúncios ativos, todos variações de UM criativo de catálogo',
    modelo: 'DROPSHIP DE MARCA', veredito: 'MODELAR', defens: 'CONSTRUÍVEL',
    score: [['Sourcing simples', 2, '3 produtos, palmilha recortável (tamanho ajusta na tesoura)'], ['Ticket fecha sem escada complexa', 2, '$64,95 avulso já banca o CPA'], ['Criativo simples de produzir', 2, '1 criativo de catálogo duplicado 996 vezes'], ['Mecanismo com urgência', 2, 'dor no arco e no calcanhar'], ['Investimento de entrada baixo', 2, 'operação de 1 criativo, sem advertorial'], ['Sem dependência de autoridade', 2, 'vende em "não colapsa" e comparação de preço']],
    copiar: 'o catálogo enxuto (3 itens), o brinde que vira bump percebido (almofada de calcanhar grátis) e a comparação "$1.000 da palmilha sob medida"',
    evitar: 'depender de 1 criativo só: 996 cópias do mesmo anúncio é risco de fadiga',
    anatomia: { big: 'Arco firme em todo sapato que você tem, por uma fração dos $1.000 de uma palmilha sob medida.', mecanismo: 'arco que "aguenta 150 kg sem colapsar"', hook: 'pergunta direta pra quem pensa em palmilha sob medida ("Read this before you spend over $1,000")', presell: 'sem advertorial: catálogo dinâmico direto', objecao: '"e se não servir?": recortável + devolução mesmo recortada' },
  },
  {
    slug: 'footstr', nome: 'Footstr', dominio: 'getfootstr.com',
    desde: '2025-05-15', desdeFmt: 'mai/2025', idade: '~17 meses', fonteIdade: '1º produto no products.json',
    plataforma: 'Shopify', apps: 'Judge.me, Klarna, Rebuy, UpCart, Klaviyo, Triple Whale, GemPages',
    pixel: 'não exposto no HTML (coletor sem navegador)', redes: 'nenhum perfil linkado no site (indício de 100% tráfego pago)',
    campeao: { titulo: 'Footstr™ – InsoleX', handle: 'footstr-insolex', preco: 34.99, de: 59.99, nota: 'palmilha de alinhamento, foco em criança com pé chato (tamanhos infantis e adultos)' },
    catalogo: { n: 9, mediana: 34.99, faixa: '$2,99 a $34,99', obs: 'palmilha InsoleX (adulto e criança), almofada de calcanhar, rolo, fita, joelheira' },
    oferta: { frete: 'sem limite declarado na PDP', garantia: '90 dias, dinheiro de volta', prazo: 'não declarado; armazém nos EUA, com envio internacional quando falta estoque', bnpl: 'Klarna', reviews: '"1.208 reviews", 96% cinco estrelas (Judge.me; contagem da home, não verificada)', alegacao: '"Rated #1 by Parents and Kids Alike"' },
    ativos: M('footstr').ativos, historico: M('footstr').historico, google: gads['getfootstr.com'].contagem,
    paginas: M('footstr').paginas, page_ids: M('footstr').page_ids, amostra: M('footstr').amostra,
    trafego: { fonte: 'SimilarWeb · set/2026', visitas: 6967, visitasNota: '20,9 mil visitas nos últimos 3 meses (média mensal)', rank: 998775, rankPais: 246334, bounce: 29.57, paginasVisita: 3.56, duracao: '2min58s', variacao: -24.88, us: 78.15, canais: 'Direto 39,47% (1º), e-mail (2º), busca paga (3º)', busca: 'termos de marca ("footstr", "footstr insoles")' },
    visitasEstim: 6967, confianca: 'medido',
    porte: 'média', momentum: 'retraindo', momentumTxt: 'tráfego −24,88% no mês, nenhum anúncio novo nos últimos 8 dias e anúncio de "Closing Sale" (urgência; o site segue operando)',
    modelo: 'DROPSHIP PURO', veredito: 'OBSERVAR', defens: 'ARBITRAGEM',
    score: [['Sourcing simples', 2, 'palmilha genérica de alinhamento'], ['Ticket fecha sem escada complexa', 1, '$34,99 avulso, depende de add-ons'], ['Criativo simples de produzir', 2, 'vídeo e estático de mãe ("soccer-mom")'], ['Mecanismo com urgência', 2, 'medo/proteção: dor no pé do filho'], ['Investimento de entrada baixo', 2, '171 ativos, operação pequena'], ['Sem dependência de autoridade', 1, 'usa "Dr. Blane - Pediatric Specialist" como persona']],
    copiar: 'o ângulo de proteção ("pais comprando pro filho") como teste futuro de avatar, e a garantia de 90 dias',
    evitar: 'entrar agora no mesmo avatar infantil: a operação está desacelerando e o tráfego caiu 25% no mês',
    anatomia: { big: 'Nenhuma criança deveria sofrer meses de dor no pé e órteses de $800: a palmilha resolve o pé chato agora.', mecanismo: 'palmilha de alinhamento "para pés em crescimento"', hook: 'confissão de mãe ("WARNING: I made a huge mistake after buying...")', presell: 'páginas-jornal ("Growing Feet Journal", "Heel Pain Journal") + persona de pediatra', objecao: '"meu filho vai usar?": respondida na própria história da mãe' },
  },
];

for (const l of LOJAS) {
  l.sobrevivencia = +(l.ativos / l.historico * 100).toFixed(1);
  l.fat = faturamento({ visitas: l.visitasEstim, bounce: l.trafego.bounce, mediana: l.catalogo.mediana });
  l.scoreSoma = l.score.reduce((a, s) => a + s[1], 0);
  l.nivel = l.scoreSoma >= 10 ? 'INICIANTE' : l.scoreSoma >= 6 ? 'MÉDIO' : 'AVANÇADO';
  l.criativos = crt[l.slug];
  l.biblioteca = 'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=' + l.dominio + '&search_type=keyword_unordered';
}

// ---------- mercado, demanda e voz ----------
export const MATRIZ = lerJ('matriz-paises.json');
export const AUTOCOMPLETE = lerJ('demanda-autocomplete.json');
export const RADAR = [
  ['plantar fasciitis (fascite plantar)', 10958, 137782, 'escolhido: melhor sobrevivência do radar'],
  ['knee brace (joelheira)', 7450, 178873, 'mercado maior em "knee pain", sobrevivência menor'],
  ['red light therapy', 31593, 1411965, 'aparelho com promessa de saúde: nível avançado'],
  ['posture corrector (corretor postural)', 1851, 194281, 'o mais saturado do radar'],
  ['foot massager (massageador de pé)', 1186, 84479, 'mercado pequeno no termo'],
  ['weighted vest (colete com peso)', 735, 24602, 'pesado pra enviar'],
];

export const VOZ = [
  { tipo: 'dor', txt: 'A fáscia "aperta durante a noite" e os primeiros passos da manhã são "excruciantes"; depois de andar um pouco, solta.', fonte: 'Slowtwitch, fórum "Plantar Fasciitis Heel Pain - What worked for you?"', url: 'https://forum.slowtwitch.com/t/plantar-fasciitis-heel-pain-what-worked-for-you/629816' },
  { tipo: 'o que funcionou', txt: 'Rolar o pé numa bolinha de golfe 5 minutos, duas vezes por dia; palmilha em todos os sapatos; alongar a panturrilha.', fonte: 'Slowtwitch e Mayo Clinic Connect (relatos de pacientes)', url: 'https://connect.mayoclinic.org/comment/697103/' },
  { tipo: 'objeção', txt: 'Meias de compressão pra fascite "too tight and difficult to get on" (apertadas demais e difíceis de calçar); algumas pessoas sentiram que a dor "did not change".', fonte: 'Garage Gym Reviews / Fakespot, reviews da Feetures Plantar Fasciitis Relief Sock', url: 'https://garagegymreviews.com/?p=206420' },
  { tipo: 'objeção', txt: 'Tala noturna: "Sleeping in this splint is awful for me"; podólogos citam baixa adesão porque é desconfortável pra dormir.', fonte: 'Fakespot e fórum Runners World UK', url: 'https://forums.runnersworld.co.uk/discussion/comment/8353652/' },
  { tipo: 'desejo', txt: '"Noticeably less heel pain and way less stiffness in the morning" (menos dor no calcanhar e menos rigidez de manhã).', fonte: 'review de tala noturna (Fakespot)', url: 'https://www.fakespot.com/product/ossur-formfit-night-splint-with-slip-resistant-tread-for-plantar-fasciitis-and-achilles-tendonitis-large' },
  { tipo: 'tamanho do problema', txt: '~1% dos adultos dos EUA relatam diagnóstico no último ano (cerca de 2 milhões de pessoas por ano); mulheres têm 2,5x mais diagnóstico; o pico é entre 45 e 64 anos.', fonte: 'NCCIH/NIH, análise de prevalência de fascite plantar', url: 'https://nccih.nih.gov/research/results/spotlight/Plantar-Fasciitis-Pain' },
];

export const DEMANDA_FONTE = 'https://nccih.nih.gov/research/results/spotlight/Plantar-Fasciitis-Pain';

// ---------- a loja do mentorado: Heelora ----------
export const MARCA = {
  nome: 'Heelora',
  frase: 'Luva de compressão macia pra fascite plantar, feita pra usar de dia no trabalho e de noite na cama, pra acordar sem a pontada dos primeiros passos.',
  paleta: { bg: '#FBF7F2', bg2: '#F1E8DD', primary: '#2F4B45', accent: '#D9825B', ink: '#1F2523', good: '#5E8C6A', line: '#E4D9CC' },
  nomesCor: { bg: 'Linho', bg2: 'Areia clara', primary: 'Eucalipto', accent: 'Terracota suave', ink: 'Grafite', good: 'Sálvia', line: 'Borda areia' },
  fontes: { titulo: { nome: 'Cormorant Garamond', handle: 'cormorant_n5' }, corpo: { nome: 'Inter', handle: 'inter_n4' } },
  voz: 'calma, prática e acolhedora; fala como uma amiga que já teve a dor, nunca como médico. Nunca promete cura.',
  announcement: 'Free US shipping on every order · 60-day "walk-it-off" guarantee',
};

export const AVATAR = {
  quem: 'Mulher de 45 a 64 anos, nos EUA, que passa o dia em pé (enfermeira, professora, varejo, cuidadora) ou caminha por saúde.',
  momento: 'Acorda e o primeiro passo fora da cama dói como uma "facada" no calcanhar; melhora andando e volta no fim do turno.',
  dores: 'pontada nos primeiros passos da manhã; dor depois de horas em pé; já tentou gelo, alongamento e palmilha de farmácia',
  desejo: 'levantar da cama sem medo do primeiro passo e terminar o turno sem mancar',
  objecoes: '"meia de compressão aperta e eu tiro antes de dormir"; "já tentei de tudo"; "vai servir no meu pé?"; "posso dormir com isso?"',
  linguagem: '"first steps in the morning", "stabbing heel pain", "on my feet all day", "tried everything"',
};

// preços e custos (custo = ESTIMATIVA de faixa AliExpress, nunca medido: captcha impede raspagem; declarar)
export const PRODUTOS = [
  { handle: 'heelora-night-day-compression-sleeves', sku: 'HL-SLV-01', papel: 'produto principal', titulo: 'Heelora Night & Day Compression Sleeves (1 Pair)', tituloPt: 'Luva de compressão Night & Day (1 par)', tipo: 'Foot Sleeve', colecao: 'heel-arch-relief', tags: ['plantar fasciitis', 'compression', 'best seller'], preco: '34.95', de: '59.95', custo: 3.50, kw: 'plantar fasciitis compression foot sleeve', ref: { loja: 'Koprez', dominio: 'koprez.com', handle: 'foot-sleeve' } },
  { handle: 'heelora-arch-support-insoles', sku: 'HL-INS-01', papel: 'segundo herói (fase 2)', titulo: 'Heelora Firm Arch Support Insoles (Trim-to-Fit)', tituloPt: 'Palmilha de arco firme recortável', tipo: 'Insoles', colecao: 'heel-arch-relief', tags: ['arch support', 'insoles'], preco: '29.95', de: '49.95', custo: 4.00, kw: 'arch support insoles plantar fasciitis trim to fit', ref: { loja: 'OrthoFlexx', dominio: 'orthoflexx.com', handle: 'max-arch-support-insoles' } },
  { handle: 'heelora-gel-heel-cups', sku: 'HL-CUP-01', papel: 'upsell (carrinho)', titulo: 'Heelora Gel Heel Cups (1 Pair)', tituloPt: 'Copinho de gel pro calcanhar (1 par)', tipo: 'Heel Cups', colecao: 'heel-arch-relief', tags: ['heel pain', 'add-on'], preco: '14.95', de: '24.95', custo: 2.50, kw: 'gel heel cups plantar fasciitis', ref: { loja: 'Footstr', dominio: 'getfootstr.com', handle: 'heel-relief-pad' } },
  { handle: 'heelora-morning-foot-roller', sku: 'HL-ROL-01', papel: 'order bump (PDP)', titulo: 'Heelora Morning Release Foot Roller', tituloPt: 'Rolo de massagem pro pé "Morning Release"', tipo: 'Massage Roller', colecao: 'recovery-tools', tags: ['massage', 'add-on'], preco: '9.95', de: '19.95', custo: 3.00, kw: 'foot massage roller plantar fasciitis', ref: { loja: 'Footstr', dominio: 'getfootstr.com', handle: 'massage-roller' } },
];
export const ali = kw => 'https://www.aliexpress.com/w/wholesale-' + kw.replace(/\s+/g, '-') + '.html?SortType=total_tranpro_desc';

// escada e P&L (todas as contas aqui, uma vez)
const TAXA = v => +(v * 0.029 + 0.30).toFixed(2); // Shopify Payments EUA, premissa
export const CPA_ALVO = 18; // CPA alvo do teste (premissa recomendada, ~2x o CPA blended do IRP, pra tráfego frio de Meta)
function linha(nome, receita, cogs, frete, cpa) { const taxa = TAXA(receita); const sobra = +(receita - cogs - frete - taxa - cpa).toFixed(2); return { nome, receita, cogs, frete, taxa, cpa, sobra, equilibrio: +(receita - cogs - frete - taxa).toFixed(2) }; }
const A_BUMP = 0.25, A_UP = 0.10, MIX2 = 0.5;
const aovBase = +((34.95 + 49.95) / 2).toFixed(2);
const aov = +(aovBase + A_BUMP * 9.95 + A_UP * 14.95).toFixed(2);
const cogsAov = +((3.50 + 7.00) / 2 + A_BUMP * 3.00 + A_UP * 2.50).toFixed(2);
const freteAov = +(4.50 * (1 - MIX2) + 5.50 * MIX2 + (A_BUMP + A_UP) * 1.00).toFixed(2);
export const PL = {
  premissas: 'Custo do produto e frete são ESTIMATIVA (faixa AliExpress/CJ, não medida: o AliExpress bloqueia leitura automática de preço). Taxa = 2,9% + $0,30 (Shopify Payments EUA). Frete grátis pro cliente em todo pedido.',
  avulso: linha('Luva avulsa (1 par)', 34.95, 3.50, 4.50, CPA_ALVO),
  dois: linha('2 pares (oferta padrão)', 49.95, 7.00, 5.50, CPA_ALVO),
  escada: linha('Escada completa (AOV projetado)', aov, cogsAov, freteAov, CPA_ALVO),
  bench: linha('Escada no CPA do setor (IRP)', aov, cogsAov, freteAov, BENCH.cpa_usd),
  aov, aovBase, A_BUMP, A_UP, MIX2,
};
PL.roasEq = +(PL.escada.receita / PL.escada.equilibrio).toFixed(2);
PL.investimento = { ads: 14 * 30, shopify: 39, amostras: 45, dominio: 15, apps: 30 };
PL.investimento.total = Object.values(PL.investimento).reduce((a, b) => a + b, 0);

export const GATES = [
  { st: 'pass', k: 'obs', o: '<b>Sim.</b> 10.958 anúncios ativos de "plantar fasciitis" só nos EUA, ~2 milhões de diagnósticos por ano (NIH), e duas lojas com 231 a 278 mil visitas por mês.', src: 'Conector Meta Ads (06/10/2026), NCCIH/NIH, SimilarWeb set/2026.' },
  { st: 'pass', k: 'inf', o: '<b>Sim.</b> Luva, palmilha, copinho de calcanhar e rolo de massagem resolvem a mesma dor em momentos diferentes do dia. As 5 lojas vendem de 3 a 46 itens nessa linha.', src: 'products.json das 5 lojas.' },
  { st: 'pass', k: 'obs', o: '<b>Sim.</b> Os vencedores são vídeo de celular e imagem com texto, no ar entre 184 e 524 dias. Dá pra produzir com uma amostra e um celular.', src: 'Swipe dos 10 criativos mais longevos (paginas/criativos).' },
  { st: 'warn', k: 'calc', o: '<b>Com condição.</b> O par avulso a $34,95 deixa só $' + PL.avulso.sobra.toFixed(2) + ' com CPA de $18. A oferta de 2 pares e o bump levam a sobra pra $' + PL.escada.sobra.toFixed(2) + ' por pedido. Custo é estimativa até a amostra chegar.', src: 'Conta da seção Economia (premissas declaradas).' },
  { st: 'warn', k: 'inf', o: '<b>Com condição.</b> Muita gente entrou e saiu (8% de sobrevivência), mas os vencedores ficam meses no ar e lojas novas seguem entrando. É mercado maduro: entra quem chega com ângulo próprio.', src: 'Matriz de 8 países + mídia das 5 lojas.' },
  { st: 'warn', k: 'inf', o: '<b>Uma vantagem de posicionamento, nenhuma de produto.</b> Ninguém junta a luva macia de dormir (One Compress) com a oferta de 2 pares e o ritual da manhã (rolo) num só kit pra mulher que trabalha em pé.', src: 'Anatomia dos 4 mais escalados.' },
  { st: 'pass', k: 'rec', o: '<b>Sim, seguindo as regras de iniciante.</b> Produto leve, sem bateria, 2 tamanhos, envio barato. A regra principal: falar de alívio e conforto, nunca de cura.', src: 'Plano de ação.' },
];

export const ANGULOS = [
  { t: 'Mecanismo novo: "não é inflamação, é desgaste"', d: 'Explica por que gelo e alongamento não resolvem e apresenta a luva como o que faltava.', prova: 'Koprez, 192 dias no ar, 912 anúncios ativos' },
  { t: '"Não é meia de compressão"', d: 'Quebra a objeção nº1 do nicho (aperta, esquenta, tira antes de dormir) e posiciona o uso noturno.', prova: 'One Compress, 184 dias no ar, 9.921 reviews verificados' },
  { t: 'Turno de 12 horas sem dor', d: 'Avatar de quem trabalha em pé, com depoimento em 1ª pessoa e garantia forte.', prova: 'Stepprs, 435 dias no ar' },
  { t: '"$40 contra $400/$1.000 da palmilha sob medida"', d: 'Ancora o preço contra a solução cara que o cliente já cotou.', prova: 'Xstance (marca, 524 dias) e OrthoFlexx (996 ativos)' },
  { t: 'Fisioterapeuta explica (advertorial)', d: 'Página-jornal com autoridade emprestada antes da loja.', prova: 'Koprez "Foot Health Digest", 170 a 180 dias' },
  { t: 'Proteção: pais comprando pro filho', d: 'Avatar de quem paga ≠ quem usa. Teste futuro, não ponto de partida.', prova: 'Footstr, 130 dias, hoje desacelerando' },
];

export const ANUNCIOS_LANCAMENTO = [
  { n: 1, angulo: 'Primeiro passo da manhã', gancho: '"If your first step out of bed feels like stepping on a nail, read this."', formato: 'vídeo de celular: tirar a luva de manhã + primeiro passo tranquilo', ref: 'Koprez, vídeo de vestir a luva (192 dias)', url: 'https://www.facebook.com/ads/library/?id=26574133278890140' },
  { n: 2, angulo: 'Não é meia de compressão', gancho: '"Gave up on compression socks because they were too tight? These aren\'t socks."', formato: 'estático com texto pesado e a luva segurada na mão', ref: 'One Compress, "Not Your Regular Compression Socks" (184 dias)', url: 'https://www.facebook.com/ads/library/?id=3137947773076498' },
  { n: 3, angulo: 'Turno em pé', gancho: '"12-hour shift. Zero heel pain. Here\'s what changed."', formato: 'UGC de enfermeira ou vendedora no fim do turno', ref: 'Stepprs, "Walk on Clouds, Or It\'s FREE" (435 dias)', url: 'https://www.facebook.com/ads/library/?id=1453071929153538' },
  { n: 4, angulo: 'Mecanismo (desgaste, não inflamação)', gancho: '"Ice and stretches didn\'t fix your heel. Here\'s why."', formato: 'advertorial curto + imagem simples com desenho', ref: 'Koprez, "Plantar Fasciitis, Explained With Stick Figures"', url: 'https://www.facebook.com/ads/library/?id=1587674379118415' },
  { n: 5, angulo: 'Oferta 2 pares', gancho: '"One pair for work, one for bed. Get 2 for $49.95."', formato: 'estático de oferta com os 2 pares e o rolo', ref: 'Koprez/InvigorFate, "Buy 1 Get 1 FREE + 30-Day Money-Back" (191 dias)', url: 'https://www.facebook.com/ads/library/?id=1531662721877474' },
];
