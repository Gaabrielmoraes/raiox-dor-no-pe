// sonda rápida: plataforma + products.json + destino final (pra ligar advertorial -> loja)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
for (const d of process.argv.slice(2)) {
  try {
    const r = await fetch('https://' + d + '/', { headers: { 'User-Agent': UA }, redirect: 'follow' });
    const h = await r.text();
    const shop = /cdn\.shopify|Shopify\.shop/.test(h);
    const links = [...new Set([...h.matchAll(/href="(https?:\/\/[^"\/]+)\/(?:products|collections|cart)[^"]*"/g)].map(m => m[1]))].slice(0, 4);
    const title = (h.match(/<title>([^<]{0,90})/) || [])[1];
    let prods = '';
    try { const p = await (await fetch('https://' + new URL(r.url).host + '/products.json?limit=8', { headers: { 'User-Agent': UA } })).json(); prods = p.products.map(x => x.title.slice(0, 45) + ' $' + x.variants[0].price).join(' | '); } catch {}
    console.log('\n## ' + d + ' -> ' + r.url + ' | shopify=' + shop + ' | ' + (title || '').trim());
    if (links.length) console.log('   links loja: ' + links.join(' , '));
    if (prods) console.log('   produtos: ' + prods);
  } catch (e) { console.log('\n## ' + d + ' ERRO ' + e.message); }
}
