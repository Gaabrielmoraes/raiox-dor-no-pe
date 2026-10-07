// resumo da triagem: o que cada loja vende de verdade (lê o catálogo, não o nome)
import fs from 'node:fs';
const j = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const lojas = Array.isArray(j) ? j : (j.lojas || Object.values(j));
if (process.argv[3] === '--chaves') { console.log(Object.keys(lojas[0])); console.log(JSON.stringify(lojas[0], null, 1).slice(0, 3000)); process.exit(); }
for (const l of lojas) {
  const c = l.catalogo || {};
  const prods = c.produtos || c.items || [];
  console.log('\n## ' + l.dominio + ' | ' + (l.identificacao?.plataforma || '') + ' | ' + c.n_produtos + ' produtos | mediana ' + c.preco_mediana + ' | desde ' + c.primeiro_produto + ' | wayback ' + (l.wayback?.primeira_captura || JSON.stringify(l.wayback || '').slice(0, 40)) + ' | social ' + (l.identificacao?.perfis_sociais || []).length);
  for (const p of prods.slice(0, +(process.argv[3] || 10))) console.log('   - ' + (p.titulo || p.title) + ' | ' + (p.preco ?? p.price ?? '') + ' | ' + (p.handle || '') + ' | ' + (p.publicado || p.published_at || '').slice(0, 10));
}
