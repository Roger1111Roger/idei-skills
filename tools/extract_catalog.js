#!/usr/bin/env node
// Generates the catalog (approaches, methods, steps, extras) from the map map/idei.html
// into plugins/idei-skills/catalog/. No dependencies, Node only.
// Run from the repository root: node tools/extract_catalog.js
// Only generated files are rewritten; hand-written files (PROVENANCE.md) are kept.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const MAP_FILE = path.join(ROOT, 'map', 'idei.html');
const OUT = path.join(ROOT, 'plugins', 'idei-skills', 'catalog');

const html = fs.readFileSync(MAP_FILE, 'utf8');
const a = html.indexOf('var APR=[');
const b = html.indexOf('var CLOFF=');
if (a < 0 || b < 0) throw new Error('Data block not found in the map (var APR / var CLOFF)');
const data = vm.runInNewContext(html.slice(a, b) + ';({APR,STP,EXT,CL,MAP})');
const { APR, STP, EXT, CL, MAP } = data;

// Labels in the map contain manual line breaks: join them into one line
const one = s => String(s).replace(/-\n/g, '-').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
const q = s => JSON.stringify(one(s));               // YAML string (a JSON string is valid YAML)
const urls = s => (s ? String(s).split(' ').filter(Boolean) : []);
const srcBlock = s => urls(s).length
  ? urls(s).map(u => '- ' + u).join('\n') + '\n\nDescription checked against these pages, not against the author\'s own works. Rule: ../PROVENANCE.md'
  : 'No source. Not checked against a primary source. Rule: ../PROVENANCE.md';

// --- parse methods ---
const methods = [];
CL.forEach(c => c.m.forEach(m => {
  const att = MAP[m[0]] || [];
  methods.push({ id: m[0], name: one(m[1]), d: m[2], how: m[3] || [], src: m[4] || '',
                 section: one(c.name), primary: att[0] || '', also: att.slice(1) });
}));
const byId = {}; methods.forEach(m => byId[m.id] = m);
const aprName = {}; APR.forEach(x => aprName[x.id] = one(x.label));
const stpName = {}; STP.forEach(x => stpName[x.id] = x.num + '. ' + one(x.label));
const nameOf = id => aprName[id] || stpName[id] || id;

// --- clean generated files only, then write ---
['methods', 'approaches.md', 'steps.md', 'extras.md', 'methods-index.md']
  .forEach(f => fs.rmSync(path.join(OUT, f), { recursive: true, force: true }));
fs.mkdirSync(path.join(OUT, 'methods'), { recursive: true });
const w = (rel, txt) => fs.writeFileSync(path.join(OUT, rel), txt.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');

// --- method cards ---
methods.forEach(m => {
  const fm = ['---', 'id: ' + m.id, 'name: ' + q(m.name), 'section: ' + q(m.section),
    'primary: ' + (m.primary || '""'), 'also: [' + m.also.join(', ') + ']', '---'].join('\n');
  const how = m.how.length ? '\n## How to apply (project suggestion)\n\n' + m.how.map((s, i) => (i + 1) + '. ' + s).join('\n') + '\n' : '';
  w('methods/' + m.id + '.md',
    fm + '\n\n# ' + m.name + '\n\n' + m.d + '\n' + how +
    '\n## Source\n\n' + srcBlock(m.src) +
    '\n\nLinks: ' + [m.primary].concat(m.also).filter(Boolean).map(nameOf).join('; ') + '.');
});

// --- approaches ---
let ap = '# Approaches to idea generation\n\nIndex for selection. For a chosen approach open its method cards in `methods/<id>.md`.\n' +
  'Sources and confidence: `PROVENANCE.md`.\n';
APR.forEach(x => {
  const ms = methods.filter(m => m.primary === x.id || m.also.includes(x.id));
  ap += '\n## ' + x.id + ' · ' + one(x.label) + '\n\n' + x.d + '\n\n' +
    '- Why combine with checking: ' + x.why + '\n' +
    '- Check steps this approach helps: ' + x.checks.map(nameOf).join('; ') + '\n' +
    '- Approach source: ' + (urls(x.src).join(' ') || 'none, not checked against a primary source') + '\n' +
    '- Methods: ' + (ms.length ? ms.map(m => m.id + ' ' + m.name + (m.primary === x.id ? '' : ' (secondary link)')).join('; ') : 'none') + '\n';
});
w('approaches.md', ap);

// --- steps ---
let st = '# Steps\n\nSteps 1-8: feasibility check of an idea; on rework return to step 2. The decision at step 8 sets the idea status.\n' +
  'Steps 9-11 run only for an approved idea and are optional: requirements spec, test cases, implementation prompt.\n';
STP.forEach(x => {
  const ms = methods.filter(m => m.primary === x.id);
  const also = methods.filter(m => m.also.includes(x.id));
  const ex = EXT.filter(e => e.to.includes(x.id));
  st += '\n## Step ' + x.num + ' · ' + one(x.label) + (x.res ? ' (approved ideas only)' : '') + '\n\n' + x.d + '\n\n' +
    '- Source: ' + (urls(x.src).join(' ') || 'none') + '\n' +
    (ms.length ? '- Step methods: ' + ms.map(m => m.id + ' ' + m.name).join('; ') + '\n' : '') +
    (also.length ? '- Additional methods: ' + also.map(m => m.id + ' ' + m.name).join('; ') + '\n' : '') +
    (ex.length ? '- Do not forget: ' + ex.map(e => e.id + ' ' + one(e.label)).join('; ') + '\n' : '');
});
w('steps.md', st);

// --- extras ("do not forget") ---
let ext = '# Do not forget\n\nShort reminders attached to steps. These are project rules, not ready-made methods from sources; the source pages confirm individual principles only.\n';
EXT.forEach(e => {
  ext += '\n## ' + e.id + ' · ' + one(e.label) + '\n\n' + e.d + '\n\n- Steps: ' + e.to.map(nameOf).join('; ') + '\n' +
    '- Source of principles: ' + (urls(e.src).join(' ') || 'none, not checked against a primary source') + '\n';
});
w('extras.md', ext);

// --- method index (lookup by name) ---
let ix = '# All methods\n\nid · name · literature section · primary link\n\n';
CL.forEach(c => {
  ix += '## ' + one(c.name) + '\n\n';
  methods.filter(m => m.section === one(c.name)).forEach(m => { ix += '- ' + m.id + ' · ' + m.name + ' → ' + nameOf(m.primary) + '\n'; });
  ix += '\n';
});
w('methods-index.md', ix);

console.log('methods:', methods.length, '· approaches:', APR.length, '· steps:', STP.length, '· extras:', EXT.length);
