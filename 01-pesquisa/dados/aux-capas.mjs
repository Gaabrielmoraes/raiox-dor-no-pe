// sem ffmpeg na máquina: usa a imagem de prévia que a própria Meta entrega (videoPreviewUrls[0]) como capa do vídeo
import fs from 'node:fs';
import path from 'node:path';
const [, , dadosArq, pesquisa] = process.argv;
const ads = JSON.parse(fs.readFileSync(dadosArq, 'utf8'));
const manArq = path.join(pesquisa, 'paginas', 'criativos', 'manifesto.json');
const man = JSON.parse(fs.readFileSync(manArq, 'utf8'));
for (const c of man.criativos) {
  if (!c.ehVideo || c.capaLocal) continue;
  const a = ads.find(x => x.adArchiveId === c.adArchiveId);
  const u = a?.videoPreviewUrls?.[0];
  if (!u) { c.capaErro = 'sem videoPreviewUrls'; continue; }
  try {
    const r = await fetch(u); if (!r.ok) throw new Error('HTTP ' + r.status);
    const rel = path.join('paginas', 'criativos', c.adArchiveId + '-capa.jpg');
    fs.writeFileSync(path.join(pesquisa, rel), Buffer.from(await r.arrayBuffer()));
    c.capaLocal = rel; c.capaFonte = 'videoPreviewUrls[0] (prévia da Meta, sem ffmpeg)';
    console.log('capa OK ' + c.adArchiveId);
  } catch (e) { c.capaErro = e.message; console.log('capa FALHOU ' + c.adArchiveId + ' ' + e.message); }
}
fs.writeFileSync(manArq, JSON.stringify(man, null, 2));
