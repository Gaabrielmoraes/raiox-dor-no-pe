// Mockups da loja Heelora (únicas páginas com <style> próprio: são a maquete, não tela do case file)
import { MARCA } from './pesquisa.mjs';
const C = MARCA.paleta;
const REF = (h, f) => '../Referencia%20de%20imagens%20-%20cena%20e%20prompt/' + h + '/carrossel-concorrente/' + f;
const SLV = 'heelora-night-day-compression-sleeves';
const css = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;background:${C.bg};color:${C.ink};line-height:1.55;font-size:16px}
h1,h2,h3{font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;line-height:1.15}
a{color:inherit}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
.ann{background:${C.primary};color:${C.bg};text-align:center;font-size:13px;padding:9px 12px;letter-spacing:.02em}
.hdr{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid ${C.line};background:${C.bg}}
.logo{font-family:"Cormorant Garamond",Georgia,serif;font-size:28px;color:${C.primary};letter-spacing:.04em}
.nav{display:flex;gap:22px;font-size:14px}.cart{font-size:14px;border:1px solid ${C.line};padding:6px 12px;border-radius:20px}
.btn{display:inline-block;background:${C.primary};color:${C.bg};padding:15px 28px;border-radius:30px;font-weight:600;text-decoration:none;font-size:16px;text-align:center}
.btn.alt{background:${C.accent}}
.ph{position:relative;background:${C.bg2};border:1px dashed #cbb9a5;border-radius:14px;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#8a7a6a;font-size:13px;text-align:center}
.ph img{width:100%;height:100%;object-fit:cover;opacity:.92}
.ph .tag{position:absolute;left:10px;top:10px;background:rgba(31,37,35,.82);color:#fff;font-size:11px;padding:4px 8px;border-radius:6px;max-width:85%;text-align:left}
.hero{display:grid;grid-template-columns:1.05fr 1fr;gap:40px;align-items:center;padding:56px 24px}
.hero h1{font-size:54px;color:${C.primary}}
.hero p{font-size:19px;margin:18px 0 26px;max-width:520px}
.stars{color:${C.accent};font-size:14px;margin-top:14px}
.sec{padding:56px 24px}.sec h2{font-size:38px;color:${C.primary};text-align:center;margin-bottom:10px}
.sub{text-align:center;max-width:640px;margin:0 auto 32px;color:#4a4f4c}
.offer{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:760px;margin:0 auto}
.card{background:#fff;border:1px solid ${C.line};border-radius:16px;padding:24px}
.card.best{border:2px solid ${C.accent}}
.badge{display:inline-block;background:${C.accent};color:#fff;font-size:12px;padding:3px 10px;border-radius:12px;margin-bottom:8px}
.price{font-size:30px;font-weight:700;color:${C.primary}}.price s{font-size:16px;color:#8a8f8c;font-weight:400;margin-left:8px}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.step b{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-size:24px;color:${C.primary};margin:10px 0 4px}
.vs{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:860px;margin:0 auto}
.vs .card h3{font-size:24px;margin-bottom:10px}.vs ul{padding-left:18px}.vs li{margin:6px 0}
.trust{display:flex;justify-content:center;gap:34px;flex-wrap:wrap;background:${C.bg2};padding:22px;font-size:14px}
.faq{max-width:760px;margin:0 auto}.faq details{border-bottom:1px solid ${C.line};padding:16px 0}.faq summary{font-weight:600;cursor:pointer}
.ft{background:${C.ink};color:#d9d4cc;padding:36px 24px;font-size:13px}
/* PDP */
.pdp{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;padding:36px 24px}
.gal{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.gal .ph.main{grid-column:1/4;aspect-ratio:1/1}.gal .ph{aspect-ratio:1/1}
.buy h1{font-size:40px;color:${C.primary}}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:12px;color:${C.accent};font-weight:600}
.lede{font-size:18px;margin:12px 0}
.qty{display:grid;gap:12px;margin:18px 0}
.opt{display:flex;justify-content:space-between;align-items:center;border:1px solid ${C.line};background:#fff;border-radius:12px;padding:14px 16px}
.opt.on{border:2px solid ${C.primary}}
.size{display:flex;gap:10px;margin:8px 0 18px}.size span{border:1px solid ${C.line};padding:9px 16px;border-radius:20px;background:#fff;font-size:14px}.size .on{border:2px solid ${C.primary}}
.bump{display:flex;gap:12px;align-items:center;background:${C.bg2};border:1px dashed ${C.accent};border-radius:12px;padding:12px 14px;margin:14px 0;font-size:14px}
.bump .ph{width:64px;height:64px;flex:none}
.guar{display:flex;gap:10px;align-items:center;font-size:14px;margin-top:14px;color:${C.primary}}
.ul2{padding-left:18px}.ul2 li{margin:7px 0}
.cta-flow{display:block;width:100%;margin-top:16px}
@media (max-width:760px){
 .hero,.pdp,.steps,.vs,.offer{grid-template-columns:1fr}
 .hero{padding:28px 18px;gap:22px}.hero h1{font-size:38px}.hero p{font-size:17px}
 .sec{padding:40px 18px}.sec h2{font-size:30px}.nav{display:none}
 .buy h1{font-size:32px}.pdp{padding:18px;gap:22px}
 .btn{display:block;width:100%}
}`;
const head = t => '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + t + '</title><style>' + css + '</style></head><body>';
const header = '<!-- BLOCO NOVO: announcement-bar -->\n<div class="ann">' + MARCA.announcement + '</div>\n<header class="hdr"><div class="logo">Heelora</div><nav class="nav"><a>Heel &amp; Arch Relief</a><a>Recovery Tools</a><a>Our Guarantee</a></nav><span class="cart">Cart (0)</span></header>';
const footerM = '<footer class="ft"><div class="wrap">Heelora · Comfort for people who stand all day · support@heelora.com<br>Shipping · 60-Day Guarantee · Privacy · Terms<br><small>Heelora products are comfort accessories, not medical devices.</small></div></footer></body></html>';

export function mockupHome() {
  return head('Heelora · Home (mockup)') + header +
    '\n<!-- BLOCO: hero -->\n<section class="hero wrap"><div><span class="eyebrow">For plantar fasciitis &amp; morning heel pain</span><h1>Take your first step tomorrow without bracing for the pain.</h1><p>Soft open-toe compression sleeves you can wear through your shift and sleep in at night. Not a compression sock. No squeeze, no marks.</p><a class="btn" href="mockup-pdp.html">Get 2 pairs for $49.95</a><div class="stars">60-day guarantee · Free US shipping · Two easy sizes</div></div>' +
    '<div class="ph" style="aspect-ratio:4/3"><img src="' + REF(SLV, 'referencia-07.webp') + '" alt="><div class="tag">PLACEHOLDER temporário (concorrente) · IMAGEM 0 · banner da home: mulher 50+ sentada na cama de manhã, vestindo a luva (ver prompt banner_home)</div></div></section>' +
    '\n<!-- BLOCO: trust-bar -->\n<div class="trust"><span>60-day "walk-it-off" guarantee</span><span>Free US shipping</span><span>Free size exchange</span><span>Secure checkout</span></div>' +
    '\n<!-- BLOCO: the-pair -->\n<section class="sec"><h2>One pair for work, one for bed</h2><p class="sub">Most people wear one pair on their shift and keep one by the bed. That is why 2 pairs is our most popular offer.</p><div class="offer"><div class="card"><b>1 pair</b><div class="price">$34.95<s>$59.95</s></div><p>Try it on your worst mornings.</p></div><div class="card best"><span class="badge">Most popular</span><br><b>2 pairs</b><div class="price">$49.95<s>$119.90</s></div><p>Day pair + night pair. Free shipping.</p></div></div><p style="text-align:center;margin-top:22px"><a class="btn" href="mockup-pdp.html">Choose your pairs</a></p></section>' +
    '\n<!-- BLOCO: how-it-works -->\n<section class="sec" style="background:' + C.bg2 + '"><h2>How it works</h2><p class="sub">Two minutes in the morning, all-day comfort.</p><div class="wrap steps"><div class="step"><div class="ph" style="aspect-ratio:1/1"><img src="' + REF(SLV, 'referencia-03.jpg') + '" alt=""><div class="tag">PLACEHOLDER temporário (foto de concorrente) · IMAGEM 2: luva calçada à noite</div></div><b>1. Slip them on at night</b>Gentle compression holds your arch while you sleep.</div><div class="step"><div class="ph" style="aspect-ratio:1/1"><img src="' + REF('heelora-morning-foot-roller', 'referencia-02.png') + '" alt=""><div class="tag">PLACEHOLDER temporário · rolo de massagem pela manhã</div></div><b>2. Roll for 2 minutes</b>Wake the bottom of your foot before your first step.</div><div class="step"><div class="ph" style="aspect-ratio:1/1"><img src="' + REF(SLV, 'referencia-06.webp') + '" alt=""><div class="tag">PLACEHOLDER temporário · IMAGEM 4: em pé no trabalho</div></div><b>3. Wear them on your shift</b>Thin enough for sneakers, clogs and work boots.</div></div></section>' +
    '\n<!-- BLOCO NOVO: not-a-compression-sock -->\n<section class="sec"><h2>These are not compression socks</h2><p class="sub">If you gave up on compression socks because they were too tight, this is for you.</p><div class="vs"><div class="card"><h3>Compression socks</h3><ul><li>Squeeze your toes</li><li>Hard to pull on</li><li>Too hot to sleep in</li><li>Leave marks on your legs</li></ul></div><div class="card best"><h3>Heelora sleeves</h3><ul><li>Open toe, no squeeze</li><li>Slip on in seconds</li><li>Soft enough to sleep in</li><li>Arch support where it hurts</li></ul></div></div></section>' +
    '\n<!-- BLOCO: reviews -->\n<section class="sec" style="background:' + C.bg2 + '"><h2>Real reviews, coming soon</h2><p class="sub">We only show reviews from real Heelora customers. Order today and tell us how your mornings feel in 2 weeks.</p></section>' +
    '\n<!-- BLOCO NOVO: faq -->\n<section class="sec"><h2>Questions</h2><div class="faq"><details open><summary>Can I sleep in them?</summary><p>Yes. They are made to be worn overnight: open toe, soft knit, gentle compression.</p></details><details><summary>Which size do I need?</summary><p>S/M fits US women 5 to 9 and men 4 to 8. L/XL fits women 9.5 to 13 and men 8.5 to 12. Wrong size? We exchange it free.</p></details><details><summary>Do they cure plantar fasciitis?</summary><p>No product can promise that. Heelora sleeves are a comfort accessory that supports your arch and heel. If pain persists, talk to your doctor.</p></details><details><summary>What if they don\'t work for me?</summary><p>Try them for 60 days. If your mornings don\'t feel better, we refund you.</p></details></div></section>' +
    '\n<!-- BLOCO: fecho -->\n<section class="sec" style="text-align:center"><h2>Your mornings can feel different.</h2><p class="sub">2 pairs for $49.95, free shipping, 60-day guarantee.</p><a class="btn alt" href="mockup-pdp.html">Shop the sleeves</a></section>' + footerM;
}

export function mockupPdp() {
  const g = (n, f, txt) => '<div class="ph' + (n === 1 ? ' main' : '') + '">' + (f ? '<img src="' + f + '" alt="">' : '') + '<div class="tag">' + (f ? 'PLACEHOLDER temporário (concorrente) · ' : '') + 'IMAGEM ' + n + ' · ' + txt + '</div></div>';
  return head('Heelora · Night & Day Compression Sleeves (mockup)') + header +
    '\n<section class="pdp wrap">' +
    '\n<!-- BLOCO: galeria -->\n<div class="gal">' + g(1, REF(SLV, 'referencia-01.jpg'), 'still do par de luvas sobre linho (posição 1 da sequência)') + g(2, REF(SLV, 'referencia-03.jpg'), 'uso noturno, beira da cama') + g(3, REF(SLV, 'referencia-05.webp'), 'mãos calçando pelo calcanhar') + g(4, REF(SLV, 'referencia-06.webp'), 'em pé no trabalho, scrub azul') + '</div>' +
    '\n<div class="buy">' +
    '\n<!-- BLOCO: prova-social -->\n<div class="stars">New: be one of our first reviewers</div>' +
    '\n<!-- BLOCO: lede -->\n<span class="eyebrow">For plantar fasciitis &amp; morning heel pain</span><h1>Heelora Night &amp; Day Compression Sleeves</h1><p class="lede">Wear them through your shift, sleep in them at night, and take your first steps tomorrow without bracing for that stab in your heel.</p>' +
    '\n<!-- BLOCO: preco-ancora -->\n<div class="qty"><div class="opt"><span><b>1 pair</b><br><small>Try it</small></span><span class="price">$34.95<s>$59.95</s></span></div><div class="opt on"><span><span class="badge">Most popular</span><br><b>2 pairs</b> · one for work, one for bed</span><span class="price">$49.95<s>$119.90</s></span></div></div>' +
    '<b style="font-size:14px">Size</b><div class="size"><span class="on">S/M (W 5-9 · M 4-8)</span><span>L/XL (W 9.5-13 · M 8.5-12)</span></div>' +
    '\n<!-- BLOCO: order-bump -->\n<label class="bump"><input type="checkbox" checked> <span class="ph"><img src="' + REF('heelora-morning-foot-roller', 'referencia-01.png') + '" alt=""></span><span><b>Add the Morning Release Foot Roller for $9.95</b> <s>$19.95</s><br>2 minutes before your first step.</span></label>' +
    '<a class="btn cta-flow" href="#">Add to cart · $59.90</a>' +
    '\n<!-- BLOCO: faixa-confianca -->\n<div class="guar">✓ 60-day "walk-it-off" guarantee &nbsp; ✓ Free US shipping &nbsp; ✓ Free size exchange</div>' +
    '\n<!-- BLOCO: bullets-objecao -->\n<ul class="ul2" style="margin-top:18px"><li><b>Not a compression sock:</b> open toe, no squeeze, no marks.</li><li><b>Soft enough to sleep in</b>, thin enough for work shoes.</li><li><b>Arch and heel support</b> right where the morning pain starts.</li><li><b>Two sizes,</b> free exchange if you pick wrong.</li></ul>' +
    '</div></section>' +
    '\n<!-- BLOCO: editorial-beat -->\n<section class="sec" style="background:' + C.bg2 + '"><h2>Why mornings hurt the most</h2><p class="sub">While you sleep, your foot rests pointed down and the tissue under your arch tightens. The first step stretches it all at once. Wearing a gentle sleeve at night keeps your arch supported, so the morning feels softer. Comfort, not a cure: if the pain stays, see your doctor.</p></section>' +
    '\n<!-- BLOCO: upsell -->\n<section class="sec"><h2>Complete your routine</h2><div class="offer"><div class="card"><div class="ph" style="aspect-ratio:1/1"><img src="' + REF('heelora-gel-heel-cups', 'referencia-01.webp') + '" alt=""><div class="tag">PLACEHOLDER temporário · copinho de gel</div></div><b>Gel Heel Cups</b><div class="price">$14.95<s>$24.95</s></div></div><div class="card"><div class="ph" style="aspect-ratio:1/1"><img src="' + REF('heelora-arch-support-insoles', 'referencia-01.webp') + '" alt=""><div class="tag">PLACEHOLDER temporário · palmilha (fase 2)</div></div><b>Firm Arch Support Insoles</b><div class="price">$29.95<s>$49.95</s></div></div></div></section>' +
    '\n<!-- BLOCO: reviews -->\n<section class="sec" style="background:' + C.bg2 + '"><h2>Reviews</h2><p class="sub">Only real Heelora customer reviews will appear here (IMAGENS 9 a 11 reservadas pra fotos de review reais).</p></section>' +
    '\n<!-- BLOCO: faq -->\n<section class="sec"><h2>Questions</h2><div class="faq"><details open><summary>Can I sleep in them?</summary><p>Yes, that is what they are made for.</p></details><details><summary>How long until I feel a difference?</summary><p>Many people notice their mornings within the first weeks. You have 60 days to decide.</p></details><details><summary>When will my order arrive?</summary><p>Processing 1 to 2 business days, delivery 5 to 9 business days in the US, with tracking.</p></details></div></section>' +
    '\n<!-- BLOCO: sticky-mobile (em fluxo, nunca fixo) -->\n<section class="sec" style="text-align:center;padding-top:0"><a class="btn" href="#">Get 2 pairs for $49.95</a></section>' + footerM;
}
