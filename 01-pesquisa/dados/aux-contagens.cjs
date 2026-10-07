// grava mcp-contagens.json a partir das respostas do conector Meta Ads (sessão de 06/10/2026)
const fs = require('fs');
const out = process.argv[2];
const T = ['foot pain', 'plantar fasciitis', 'heel pain'], P = ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'ES'];
const v = {
  'foot pain': [[57129, 9774950], [18773, 6228363], [16261, 8437196], [17446, 6470632], [6116, 2401593], [5179, 1655075], [5423, 2030328], [4612, 1137725]],
  'plantar fasciitis': [[10958, 125553], [2681, 113389], [2584, 151067], [2384, 91826], [624, 24047], [772, 23406], [737, 19746], [809, 26971]],
  'heel pain': [[19922, 3641235], [6131, 2330147], [5440, 3055242], [5620, 2377465], [2423, 757322], [2093, 520050], [2134, 751037], [1736, 373786]],
};
const c = [];
T.forEach((t, ti) => P.forEach((pa, pi) => ['ACTIVE', 'INACTIVE'].forEach((s, si) => c.push({ id: ti * 16 + pi * 2 + si + 1, termo: t, pais: pa, status: s, total: v[t][pi][si] }))));
fs.writeFileSync(out, JSON.stringify({ fonte: 'MCP (conector Meta Ads)', geradoEm: new Date().toISOString(), consultas: c }, null, 2));
console.log(c.length + ' consultas gravadas');
