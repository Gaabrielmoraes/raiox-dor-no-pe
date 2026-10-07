// Gerador da entrega "Raiox - Dor no Pe" (padrão V3): escreve as 12 telas + 5 dossiês + mockups,
// copia estilo.css/app.js sem alterar e monta a pasta-hub (02 a 07).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import * as T1 from './gerar/telas1.mjs';
import * as T2 from './gerar/telas2.mjs';
import * as MK from './gerar/mockups.mjs';
import { LOJAS, MARCA, AVATAR, PL, ANUNCIOS_LANCAMENTO, CASE } from './gerar/pesquisa.mjs';

const DADOS = path.dirname(fileURLToPath(import.meta.url));
const PESQ = path.resolve(DADOS, '..');
const HUB = path.resolve(PESQ, '..');
const PAG = path.join(PESQ, 'paginas');
const SKILL = path.join(os.homedir(), '.claude', 'skills', 'raio-x');
const w = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };

fs.copyFileSync(path.join(SKILL, 'templates', 'estilo.css'), path.join(PAG, 'estilo.css'));
fs.copyFileSync(path.join(SKILL, 'templates', 'exemplo-layout', 'paginas', 'app.js'), path.join(PAG, 'app.js'));

w(path.join(PESQ, 'Pesquisa - clique aqui.html'), T1.central());
w(path.join(PAG, 'demanda.html'), T1.demanda());
w(path.join(PAG, 'mercados.html'), T1.mercados());
w(path.join(PAG, 'concorrentes.html'), T1.concorrentes());
for (const l of LOJAS) w(path.join(PAG, 'loja-' + l.slug + '.html'), T1.loja(l));
w(path.join(PAG, 'anuncios.html'), T1.anuncios());
w(path.join(PAG, 'estrategia.html'), T2.estrategia());
w(path.join(PAG, 'plano-de-acao.html'), T2.plano());
w(path.join(PAG, 'catalogo-oferta.html'), T2.catalogo());
w(path.join(PAG, 'benchmark-visual.html'), T2.benchmark());
w(path.join(PAG, 'identidade-visual.html'), T2.identidade());
w(path.join(PAG, 'dados-fontes.html'), T2.dadosFontes());
w(path.join(PAG, 'metodo.html'), T2.metodo());
w(path.join(PAG, 'mockup-home.html'), MK.mockupHome());
w(path.join(PAG, 'mockup-pdp.html'), MK.mockupPdp());

// pasta-hub: redirecionador + etapas 02 a 07 com LEIA-ME
fs.copyFileSync(path.join(SKILL, 'templates', 'redirect-local.html'), path.join(HUB, 'Pesquisa - clique aqui.html'));
for (const etapa of ['02-brief', '03-marca', '04-produtos', '05-loja', '06-redes', '07-anuncios']) {
  fs.mkdirSync(path.join(HUB, etapa), { recursive: true });
  fs.copyFileSync(path.join(SKILL, 'templates', 'leia-me', etapa + '.txt'), path.join(HUB, etapa, 'LEIA-ME.txt'));
}
fs.copyFileSync(path.join(DADOS, 'build.json'), path.join(HUB, '05-loja', 'build.json'));
w(path.join(HUB, '02-brief', 'brief.md'), `# Brief · ${MARCA.nome}

- **Nicho:** ${CASE.nome} (${CASE.categoria})
- **Mercado:** Estados Unidos · inglês · USD
- **Produto principal:** Heelora Night & Day Compression Sleeves, $34.95 (1 par) / $49.95 (2 pares)
- **Bump:** Morning Release Foot Roller, $9.95 · **Upsell:** Gel Heel Cups, $14.95
- **Avatar:** ${AVATAR.quem}
- **Momento da dor:** ${AVATAR.momento}
- **Objeções:** ${AVATAR.objecoes}
- **Promessa:** ${MARCA.frase}
- **Garantia:** 60 dias · **Frete:** grátis nos EUA
- **AOV projetado:** $${PL.aov} · **CPA alvo:** $18 · **CPA de equilíbrio:** $${PL.escada.equilibrio}
- **Investimento mínimo do teste:** ~$${PL.investimento.total}

Fonte: Raio-X de 06/10/2026 (01-pesquisa/).
`);
w(path.join(HUB, '03-marca', 'comunicacao-da-marca.md'), `# Comunicação da marca · ${MARCA.nome}

**Voz:** ${MARCA.voz}

**Paleta:** ${Object.entries(MARCA.paleta).map(([k, v]) => MARCA.nomesCor[k] + ' ' + v).join(' · ')}

**Fontes:** Cormorant Garamond (título) · Inter (corpo)

**Nunca dizer:** "cure", "treat", "heal", "doctor approved" (sem prova), números de clientes inventados.

**Sempre dizer:** first steps, mornings, on your feet all day, not a compression sock, 60-day guarantee.

Prompts de logo, ícone, capa e banners: 01-pesquisa/paginas/identidade-visual.html (seção 02 e 03).
`);
w(path.join(HUB, '07-anuncios', 'anuncios-de-lancamento.md'), '# 5 anúncios de lançamento · Heelora\n\n' + ANUNCIOS_LANCAMENTO.map(a => `## ${a.n}. ${a.angulo}\n- **Gancho:** ${a.gancho}\n- **Formato:** ${a.formato}\n- **Referência:** ${a.ref} → ${a.url}\n`).join('\n') + '\nRegra: falar de alívio e conforto, nunca de cura.\n');
console.log('entrega gerada em ' + PESQ);
