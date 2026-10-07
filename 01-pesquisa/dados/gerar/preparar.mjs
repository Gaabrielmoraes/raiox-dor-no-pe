// Fase 5/6: escreve build.json (contrato da /montar-loja), consolida dados-brutos.json,
// auditoria-anuncios.json e julgamento.json a partir da fonte única (pesquisa.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { DADOS, CASE, LOJAS, MARCA, PRODUTOS, PL, BENCH, AVATAR, ali } from './pesquisa.mjs';

const w = (f, o) => fs.writeFileSync(path.join(DADOS, f), JSON.stringify(o, null, 2));
const r = f => JSON.parse(fs.readFileSync(path.join(DADOS, f), 'utf8'));
const P = Object.fromEntries(PRODUTOS.map(p => [p.handle, p]));

/* ---------------- dados-brutos.json ---------------- */
const brutos = r('dados-brutos.json');
for (const l of LOJAS) {
  const d = brutos[l.dominio] || (brutos[l.dominio] = {});
  d.trafego = { fonte: 'SimilarWeb (página pública, via WebFetch; trafego.js bloqueado por CloudFront)', snapshot: '2026-09', visitas_mes: l.trafego.visitas, visitas_nota: l.trafego.visitasNota, rank_global: l.trafego.rank, rank_pais: l.trafego.rankPais, bounce: l.trafego.bounce, paginas_visita: l.trafego.paginasVisita, variacao_mes: l.trafego.variacao, share_us: l.trafego.us, canais: l.trafego.canais };
  d.midia = { ativos: l.ativos, historico: l.historico, page_ids: l.page_ids, snapshot_em: '2026-10-06' };
}
brutos.lojas = LOJAS.map(l => ({ slug: l.slug, nome: l.nome, dominio: l.dominio, produto_campeao: l.campeao.titulo, ativos: l.ativos, historico: l.historico, sobrevivencia_pct: l.sobrevivencia, veredito: l.veredito, modelo: l.modelo, nivel: l.nivel, defensabilidade: l.defens, momentum: l.momentum, faturamento: l.fat, confianca: l.confianca, snapshot_em: '2026-10-06' }));
brutos.decisao_mercado = { pais: 'Estados Unidos (US)', moeda: 'USD', idioma: 'en', motivo: 'maior mercado vivo da matriz (10.958 ativos em "plantar fasciitis") e melhor sobrevivência (8,0%)' };
w('dados-brutos.json', brutos);

/* ---------------- auditoria-anuncios.json ---------------- */
w('auditoria-anuncios.json', {
  data: '2026-10-06',
  fonte: 'conector Meta Ads (ads_library_search, page_ids, ACTIVE e ALL)',
  lojas: LOJAS.map(l => ({ loja: l.nome, dominio: l.dominio, metodo: 'dominio', page_ids: l.page_ids, tentativas: ['search_terms=' + l.dominio + ' (ALL, sem país)'], reportado: { ativos: l.ativos, historico: l.historico }, biblioteca: { ativos: l.ativos, historico: l.historico }, nota: 'páginas confirmadas pelo domínio de destino: ' + l.paginas.join(', ') })),
});

/* ---------------- julgamento.json ---------------- */
w('julgamento.json', { caso: CASE, benchmark: BENCH, economia: PL, lojas: LOJAS.map(l => ({ slug: l.slug, modelo: l.modelo, veredito: l.veredito, nivel: l.nivel, score: l.score, soma: l.scoreSoma, defensabilidade: l.defens, momentum: l.momentum, faturamento: l.fat, confianca: l.confianca })) });

/* ---------------- copy por produto (Voz do Mercado + Anatomia dos 4 mais escalados) ---------------- */
const COPY = {
  'heelora-night-day-compression-sleeves': {
    pdp: { eyebrow: 'For plantar fasciitis & morning heel pain', lede: 'Wear them through your shift, sleep in them at night, and take your first steps tomorrow without bracing for that stab in your heel.', proof: '', season: 'Fall Relief: 2 pairs for $49.95' },
    desc: '<p>Soft, breathable compression sleeves that hug your arch and heel without the squeeze of compression socks. Open toe, no seams under the foot, made to be worn all day in your work shoes and all night in bed.</p><ul><li><b>Built for the first step of the morning.</b> Gentle compression and arch support keep the fascia supported while you sleep, so getting out of bed hurts less.</li><li><b>Not a compression sock.</b> No tight toe box, no heat trap, no marks on your legs. Most people forget they are wearing them.</li><li><b>Fits inside any shoe.</b> Thin enough for sneakers, clogs and work boots.</li><li><b>Two sizes, easy fit.</b> S/M and L/XL with a simple size chart. Wrong size? We exchange it free.</li></ul><p>Comfort and support for everyday heel and arch discomfort. This is not a medical device and does not treat or cure any condition; if pain persists, talk to your doctor.</p><p>Try them for 60 days. If your mornings don\'t feel better, send them back for a full refund.</p>',
    seo_titulo: 'Plantar Fasciitis Compression Sleeves, Day & Night | Heelora',
    seo_descricao: 'Soft open-toe compression sleeves with arch support for heel pain. Wear at work, sleep in them at night. Free US shipping, 60-day guarantee.',
  },
  'heelora-arch-support-insoles': {
    pdp: { eyebrow: 'For long shifts on hard floors', lede: 'Firm arch support that doesn\'t flatten by lunchtime, trimmed with scissors to fit every shoe you own.', proof: '', season: 'Bundle with your sleeves and save' },
    desc: '<p>Semi-rigid arch support with a deep heel cup, made for people who are on their feet all day. Trim-to-fit with scissors so one pair can move between sneakers and work shoes.</p><ul><li><b>Holds its shape.</b> A firm arch that supports instead of collapsing under your weight.</li><li><b>Deep heel cup.</b> Cradles the heel to spread pressure away from the sore spot.</li><li><b>Trim to fit.</b> Follow the size guide lines on the insole.</li><li><b>Pairs with your sleeves.</b> Sleeves at night, insoles during the day.</li></ul><p>Comfort and support product, not a custom orthotic and not a medical treatment. 60-day guarantee, even if you already trimmed them.</p>',
    seo_titulo: 'Firm Arch Support Insoles for Heel & Arch Pain | Heelora',
    seo_descricao: 'Trim-to-fit arch support insoles with a deep heel cup for people on their feet all day. Free US shipping and a 60-day guarantee.',
  },
  'heelora-gel-heel-cups': {
    pdp: { eyebrow: 'Extra cushion where it hurts', lede: 'A soft gel cup under the heel for the days you can\'t sit down.', proof: '', season: 'Add-on price in your cart' },
    desc: '<p>Soft silicone gel cups that sit under your heel to absorb the impact of every step on hard floors.</p><ul><li><b>Shock-absorbing gel</b> under the heel.</li><li><b>Fits most shoes</b>, washable and reusable.</li><li><b>Works with your sleeves</b> for all-day comfort.</li></ul><p>Comfort accessory, not a medical device.</p>',
    seo_titulo: 'Gel Heel Cups for Heel Pain & Hard Floors | Heelora',
    seo_descricao: 'Soft silicone gel heel cups that cushion every step on hard floors. Reusable, fits most shoes. Free US shipping.',
  },
  'heelora-morning-foot-roller': {
    pdp: { eyebrow: 'Your 2-minute morning ritual', lede: 'Roll it under your arch before you stand up and wake your foot gently.', proof: '', season: 'Only $9.95 when added to your sleeves' },
    desc: '<p>A ridged foot roller to roll under the arch and heel in the morning and after your shift.</p><ul><li><b>2 minutes, twice a day.</b> Roll slowly from heel to toes.</li><li><b>Fits under your desk or in a drawer</b> for breaks at work.</li><li><b>The perfect partner</b> to your sleeves: sleeve at night, roller in the morning.</li></ul><p>Comfort and self-massage tool, not a medical treatment.</p>',
    seo_titulo: 'Foot Massage Roller for Arch & Heel | Heelora',
    seo_descricao: 'Ridged foot massage roller for a 2-minute morning routine. Small enough for your bag. Add it to your Heelora sleeves for $9.95.',
  },
};

/* ---------------- prompts (5 blocos, PT, com persona do Bloco 12) ---------------- */
const PERSONA = 'A MULHER/O AVATAR: mulher americana de 50 a 58 anos, corpo real (não modelo de passarela), cabelo natural com alguns fios grisalhos, unhas curtas sem esmalte chamativo, roupa simples de quem trabalha em pé (scrub azul-marinho de enfermagem ou calça de moletom e camiseta de algodão em casa). Ela NÃO é atleta, NÃO é modelo de banco de imagem, NÃO sorri forçado pra câmera: a expressão é de alívio tranquilo, o rosto relaxado de quem não sentiu a pontada que esperava. Mãos e pés com textura de pele de verdade, sem retoque excessivo.';
const MUNDO = 'MUNDO DA MARCA: ambiente doméstico claro e calmo, com a paleta Heelora expressa como objetos reais e não como gráfico: lençol e parede em linho (#FBF7F2) e areia clara (#F1E8DD), uma manta ou caneca em terracota suave (#D9825B), uma planta de folha verde-eucalipto (#2F4B45). Luz natural de manhã cedo entrando pela janela, suave e quente, nada de luz de estúdio dura. Nada de texto, selo ou logo desenhado por cima da foto.';
const FOTO = fmt => 'FOTORREALISMO + FORMATO: fotografia comercial de e-commerce, qualidade de catálogo premium, câmera full-frame com lente 50mm, profundidade de campo rasa e foco nítido no produto. Tecido com textura real de malha, costuras visíveis e coerentes, sombras suaves e corretas. Nunca: mão ou pé deformado, dedo a mais, pele plástica, brilho de CGI, marca d\'água, texto ilegível, logo de concorrente. ' + fmt;
const CONTEXTO = 'CONTEXTO: fotografia comercial de e-commerce para uma loja de conforto e bem-estar (catálogo premium), produto de compressão para os pés.';
function prompt(prod, cena, refCena, fmt) {
  return [CONTEXTO,
    'REFERÊNCIA A ANEXAR: (1) CENA: ' + refCena + ', usar só como referência de enquadramento, luz e pose; IGNORAR COMPLETAMENTE a pessoa da foto (rosto, cabelo, corpo, pele), ela não é a pessoa da imagem final, e trocar a arquitetura do ambiente: em vez do piso e da parede da referência, use piso de madeira clara de carvalho, parede lisa em linho e uma janela grande à esquerda com cortina de linho. (2) PRODUTO: REFERÊNCIA PENDENTE: rodar produto-real.js depois do Passo 4 do /montar-loja (a foto do fornecedor do link de sourcing de "' + prod.tituloPt + '" já estará na loja) e anexar o arquivo real; até lá, não gerar esta imagem. Quando a foto real existir, ela tem PRIORIDADE MÁXIMA sobre a referência de cena pra tudo que for o produto (cor, costura, formato, faixa).',
    PERSONA,
    'A CENA: ' + cena,
    MUNDO,
    FOTO(fmt)].join('\n\n');
}
const CENAS = {
  'heelora-night-day-compression-sleeves': [
    ['still_produto', 'Par de luvas dobradas lado a lado sobre lençol de linho, vista de cima a 45 graus, sem pessoa. Mostra o formato aberto nos dedos, o calcanhar e a faixa do arco. A luz da manhã desenha a textura da malha.'],
    ['uso_noturno', 'A mulher sentada na beira da cama de manhã, pés no chão de madeira, ainda vestindo a luva nos dois pés; câmera baixa na altura do tornozelo, foco nos pés e na luva, rosto fora de quadro ou desfocado. Transmite "dormi com ela e acordei bem".'],
    ['demonstracao_calcar', 'Close das mãos puxando a luva pelo calcanhar, mostrando que entra fácil (resposta à objeção "aperta demais"). Fundo desfocado do quarto.'],
    ['trabalho_em_pe', 'A mulher de scrub azul-marinho em pé num corredor claro de hospital ou loja, enquadramento do joelho pra baixo, luva aparecendo por cima do tênis branco. Movimento natural de caminhada.'],
  ],
  'heelora-arch-support-insoles': [['still_produto', 'Palmilha sozinha, de lado a 3/4 sobre superfície de madeira clara, mostrando a altura do arco e o copo do calcanhar; ao lado, uma tesoura pequena indicando que é recortável.'], ['uso', 'Palmilha sendo colocada dentro de um tênis branco de trabalho, mãos da mulher em close, luz natural.']],
  'heelora-gel-heel-cups': [['still_produto', 'Par de copinhos de gel translúcidos sobre linho, luz lateral que mostra a transparência e a espessura do gel.']],
  'heelora-morning-foot-roller': [['ritual_manha', 'A mulher sentada na beira da cama de manhã rolando o rolo de massagem sob o arco do pé descalço, caneca terracota no criado-mudo; câmera baixa, foco no pé e no rolo.']],
};
const REFS = { 'heelora-night-day-compression-sleeves': 'carrossel da PDP Koprez Foot Sleeve (pasta "heelora-night-day-compression-sleeves/carrossel-concorrente/")', 'heelora-arch-support-insoles': 'carrossel da PDP OrthoFlexx Max Arch Support Insoles', 'heelora-gel-heel-cups': 'carrossel da PDP Footstr Heel Cushion Pads (copinho de gel)', 'heelora-morning-foot-roller': 'carrossel da PDP Footstr Massage Roller' };
const seq = [
  { posicao: 0, tipo: 'banner_home', status: 'nova', formato: 'banner_desktop', descricao: 'hero da home, horizontal: a mulher de manhã, sentada na cama, vestindo a luva, primeiro passo sem medo', referencia_cena_arquivo: null,
    prompt: [CONTEXTO, 'REFERÊNCIA A ANEXAR: nenhuma cena de concorrente (nenhum concorrente auditado tem hero com a persona); PRODUTO: REFERÊNCIA PENDENTE até a foto real da luva existir na loja.', PERSONA, 'A CENA: quarto claro às 6h30, a mulher sentada na beira da cama com os dois pés no chão de madeira, vestindo a luva Heelora nos dois pés, mão apoiada no colchão, prestes a levantar com calma. Câmera na altura do quadril, lado direito, enquadramento horizontal amplo.', MUNDO, 'ZONA DE TEXTO: reservar o terço esquerdo da imagem limpo (parede de linho lisa) para o headline e o botão, sem nenhum objeto competindo nessa área.', FOTO('Formato: banner desktop 16:9, 1920x1080px, posição "banner da home (desktop)".')].join('\n\n') },
  { posicao: 0, tipo: 'banner_home', status: 'nova', formato: 'banner_mobile', descricao: 'mesmo hero recomposto na vertical (nunca o desktop cortado)', referencia_cena_arquivo: null,
    prompt: [CONTEXTO, 'REFERÊNCIA A ANEXAR: a imagem do banner desktop já gerada, como referência de IDENTIDADE da mulher (PRIORIDADE MÁXIMA pra tudo que for a pessoa); PRODUTO: REFERÊNCIA PENDENTE até a foto real existir.', PERSONA, 'A CENA: a mesma mulher e o mesmo quarto, recompostos na vertical: câmera mais baixa, pés e luvas no terço inferior, a cama e a janela acima. Mantenha o mesmo rosto da foto-âncora.', MUNDO, 'ZONA DE TEXTO: reservar a metade superior limpa (parede e janela desfocadas) para headline e botão.', FOTO('Formato: banner mobile 4:5, 1080x1350px, posição "banner da home (mobile)".')].join('\n\n') },
];
let pos = 1;
for (const p of PRODUTOS) for (const [tipo, cena] of CENAS[p.handle]) seq.push({ posicao: pos++, produto_handle: p.handle, tipo, status: 'nova', descricao: cena.split('.')[0], referencia_cena_arquivo: null, prompt: prompt(p, cena, REFS[p.handle], 'Formato: quadrado 1:1, 2048x2048px, WEBP, posição "PDP de ' + p.tituloPt + ', imagem ' + (pos - 1) + '".') });

/* ---------------- logos (identidade_visual) ---------------- */
const pal = 'eucalipto #2F4B45, terracota suave #D9825B, linho #FBF7F2, areia clara #F1E8DD, grafite #1F2523';
const logos = [
  { tipo: 'wordmark', descricao: 'logo principal "Heelora", horizontal, versão escura pra fundo claro e versão clara pra fundo escuro', prompt: 'REFERENCE HIERARCHY\nNo external scene reference. Typography-only wordmark generated from the brand identity below.\n\nART DIRECTION\nDesign the wordmark "Heelora" for a calm, caring foot-comfort brand for women 45 to 64 who stand all day. Use a soft high-contrast serif in the spirit of Cormorant Garamond (medium weight), generous letter spacing, lowercase-friendly and warm, never clinical or sporty. Optionally a tiny gentle arc above the "ee" suggesting the curve of an arch, kept subtle.\n\nPRODUCT FIDELITY\nN/A (no physical product in this asset). BRAND FIDELITY: palette ' + pal + '; primary color for the letters is eucalyptus #2F4B45; reversed version in linen #FBF7F2.\n\nBRAND AND LEGAL CLEANUP\nDo not imitate Koprez, Onecompress, Stepprs, OrthoFlexx or Footstr logos. No medical crosses, no feet silhouettes, no footprints, no sneakers. No trademark symbols.\n\nQUALITY CONTROL\nClean vector-like edges, perfectly even kerning, flat color, transparent background, no shadow, no 3D. Deliver two images: dark-on-light and light-on-dark, each 1200x400px PNG.' },
  { tipo: 'icone_perfil', descricao: 'ícone/favicon quadrado, legível a 32x32px, também foto de perfil de rede social', prompt: 'REFERENCE HIERARCHY\nDerived from the Heelora wordmark above (attach it as the only reference). No scene reference.\n\nART DIRECTION\nA compact monogram "h" in the same soft serif, inside a softly rounded square in eucalyptus #2F4B45, letter in linen #FBF7F2, with a small terracotta #D9825B arc under the letter echoing an arch. One bold shape, thick strokes, no fine detail.\n\nPRODUCT FIDELITY\nN/A (no physical product). BRAND FIDELITY: palette ' + pal + '.\n\nBRAND AND LEGAL CLEANUP\nNo competitor marks, no medical symbols, no feet drawings, no text other than the "h".\n\nQUALITY CONTROL\nMust read clearly at 32x32px and at 110x110px (Instagram avatar). Square 1:1, 512x512px PNG, flat colors, no gradients.' },
  { tipo: 'capa_loja', descricao: 'capa/banner da loja (hero fixo da home), ~1920x600px', prompt: 'REFERENCE HIERARCHY\nAttach the generated home banner photo (desktop) as the scene base; it rules composition and the woman\'s identity. The Heelora wordmark is attached only for color and tone; do not render the logo inside the photo.\n\nART DIRECTION\nWide, calm morning bedroom scene in linen and sand tones: a woman in her 50s sitting on the edge of the bed wearing soft open-toe compression sleeves on both feet, about to stand up without fear. Soft window light from the left, terracotta mug on the nightstand, eucalyptus plant.\n\nPRODUCT FIDELITY\nThe sleeves must match the real Heelora product photo once available (open toe, arch strap, knit texture). Until then keep them neutral grey-beige and simple.\n\nBRAND AND LEGAL CLEANUP\nRemove any competitor logo, label or packaging from references. No text burned into the image.\n\nQUALITY CONTROL\nPhotorealistic commercial photography, natural skin, correct hands and feet, no CGI gloss. 1920x600px, left 40% kept clean for headline overlay.' },
  { tipo: 'capa_rede_social', descricao: 'capa de Facebook/Instagram, 1640x624px, respeitando a área segura do avatar', prompt: 'REFERENCE HIERARCHY\nAttach the store cover image above as the base scene; it rules the woman, the room and the light.\n\nART DIRECTION\nRecompose the same morning bedroom scene for a social cover: the woman\'s feet with the sleeves on the right third, linen wall and window light filling the rest, terracotta and eucalyptus accents.\n\nPRODUCT FIDELITY\nSleeves identical to the real Heelora product photo when available; otherwise neutral and simple.\n\nBRAND AND LEGAL CLEANUP\nNo competitor marks, no medical claims, no text inside the photo.\n\nQUALITY CONTROL\n1640x624px. Keep the bottom-left 200x200px area empty (profile picture overlap safe zone). Photorealistic, soft light, no distortion.' },
];

/* ---------------- páginas institucionais (padrão real do mercado) ---------------- */
const paginas = [
  { handle: 'contact', titulo: 'Contact', corpo_html: '<p>We\'re a small team that answers every message. Email <b>support@heelora.com</b> and we reply within 24 hours on weekdays.</p><p>Need help picking a size? Send us your US shoe size and we\'ll tell you which sleeve fits.</p>' },
  { handle: 'shipping-policy', titulo: 'Shipping Policy', corpo_html: '<p><b>Free US shipping on every order.</b></p><p>Orders are processed in 1 to 2 business days. Delivery usually takes 5 to 9 business days in the continental US. You\'ll get a tracking number by email as soon as your order ships.</p><p>If your tracking hasn\'t updated in 5 business days, email support@heelora.com and we\'ll sort it out.</p>' },
  { handle: 'refund-policy', titulo: '60-Day Guarantee & Returns', corpo_html: '<p><b>60-day "walk-it-off" guarantee.</b> Wear your Heelora sleeves for up to 60 days. If your mornings don\'t feel better, email us for a full refund of the product price. No need to send worn sleeves back.</p><p>Wrong size? We exchange it free within 60 days.</p><p>Refunds go back to the original payment method within 5 to 10 business days after approval.</p>' },
  { handle: 'privacy-policy', titulo: 'Privacy Policy', corpo_html: '<p>Heelora collects only the information needed to process your order (name, email, shipping address and payment confirmation) and to send order updates. Payments are processed by Shopify Payments; we never see or store your full card number.</p><p>We don\'t sell your data. You can ask us to delete your information at any time by emailing support@heelora.com.</p>' },
  { handle: 'terms-of-service', titulo: 'Terms of Service', corpo_html: '<p>By using heelora.com you agree to these terms. Heelora products are comfort and support accessories. They are not medical devices and are not intended to diagnose, treat, cure or prevent any disease. If you have persistent pain, consult a healthcare professional.</p><p>Prices are in US dollars. We may update these terms; the version on this page is the one in effect.</p>' },
];

/* ---------------- build.json ---------------- */
const build = {
  _comentario: 'Contrato de execução gerado pelo /raio-x (Raiox - Dor no Pe, 06/10/2026). Custos e prazos de fornecedor são estimativa até a amostra chegar. tema.settings vazio de propósito.',
  marca: { nome: MARCA.nome, pais: 'US', moeda: 'USD', idioma: 'en', paleta: MARCA.paleta, fontes: MARCA.fontes, logo: null, announcement: MARCA.announcement },
  identidade_visual: { logos },
  colecoes: [
    { handle: 'heel-arch-relief', titulo: 'Heel & Arch Relief', descricao_html: '<p>Everything for the first step of the morning and the last hour of your shift.</p>' },
    { handle: 'recovery-tools', titulo: 'Recovery Tools', descricao_html: '<p>Small tools for a 2-minute foot routine at home or at work.</p>' },
  ],
  produtos: PRODUTOS.map(p => ({ handle: p.handle, titulo: p.titulo, tipo: p.tipo, tags: p.tags, colecao: p.colecao, preco: p.preco, de: p.de, sku: p.sku, status: 'active', descricao_html: COPY[p.handle].desc, seo_titulo: COPY[p.handle].seo_titulo, seo_descricao: COPY[p.handle].seo_descricao, pdp: COPY[p.handle].pdp, imagens: [] })),
  addons: [
    { handle: 'heelora-morning-foot-roller', titulo: P['heelora-morning-foot-roller'].titulo, preco: '9.95', de: '19.95', sku: 'HL-ROL-01', papel: 'order bump da PDP (aceite estimado 25%)' },
    { handle: 'heelora-gel-heel-cups', titulo: P['heelora-gel-heel-cups'].titulo, preco: '14.95', de: '24.95', sku: 'HL-CUP-01', papel: 'upsell no carrinho (aceite estimado 10%)' },
  ],
  bump_pdp: { handle: 'heelora-morning-foot-roller' },
  ofertas: { quantidade: [{ pares: 1, preco: '34.95' }, { pares: 2, preco: '49.95', rotulo: 'Most popular: one for work, one for bed' }], frete_gratis: true, garantia_dias: 60 },
  paginas,
  menu: [{ tipo: 'frontpage', titulo: 'Home' }, { tipo: 'collection', titulo: 'Heel & Arch Relief', handle: 'heel-arch-relief' }, { tipo: 'collection', titulo: 'Recovery Tools', handle: 'recovery-tools' }],
  tema: { settings: {} },
  imagens_pdp: {
    fonte: 'auditoria_carrossel_concorrentes',
    concorrentes_auditados: PRODUTOS.map(p => ({ produto_handle: p.handle, concorrente: p.ref.loja, loja: p.ref.loja, dominio: p.ref.dominio, produto_concorrente_handle: p.ref.handle, url_pdp: 'https://' + p.ref.dominio + '/products/' + p.ref.handle, observacao: 'carrossel do campeão escolhido como referência de cena para ' + p.tituloPt, cap: 12 })),
    faixa_nicho: { min: 2, max: 9 },
    achado: 'Os carrosséis auditados (Koprez 9, OrthoFlexx 5, Footstr 5 e 2 imagens) são still de produto + infográfico com texto e selo de garantia. Nenhum mostra a cena que a Voz do Mercado descreve: a mulher de 50+ em casa, de manhã, dando o primeiro passo sem dor. Essa cena é a lacuna que a Heelora ocupa primeiro.',
    sequencia: seq,
    conferencia_produto: [],
  },
};
w('build.json', build);
console.log('build.json, dados-brutos.json, auditoria-anuncios.json e julgamento.json gravados.');
console.log('sequencia: ' + seq.length + ' posições · produtos: ' + build.produtos.length);
