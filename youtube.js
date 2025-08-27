// youtube.js
import { Innertube } from 'youtubei.js';
import fs from 'fs';

function getParamNames(fn) {
  const str = fn.toString().replace(/\n/g, ' ');
  const match = str.match(/^[^(]*\(([^)]*)\)/);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
}

function getMethods(obj, owner) {
  const methods = [];
  const proto = Object.getPrototypeOf(obj);
  if (!proto) return methods;

  for (const name of Object.getOwnPropertyNames(proto)) {
    if (name === 'constructor') continue;
    const desc = Object.getOwnPropertyDescriptor(proto, name);
    if (desc && typeof desc.value === 'function') {
      methods.push({
        owner,
        method: name,
        params: getParamNames(desc.value),
      });
    }
  }
  return methods;
}

(async () => {
  const yt = await Innertube.create();

  // Only check main Innertube + known namespaces
  const namespaces = {
    Innertube: yt,
    'Innertube.music': yt.music,
    'Innertube.kids': yt.kids,
    'Innertube.studio': yt.studio,
    'Innertube.playlist': yt.playlist,
    'Innertube.account': yt.account,
  };

  let output = '';
  for (const [ns, obj] of Object.entries(namespaces)) {
    if (!obj) continue;
    const methods = getMethods(obj, ns);
    output += `# ${ns}\n`;
    for (const m of methods) {
      output += `- ${m.method}(${m.params.join(', ')})\n`;
    }
    output += '\n';
  }

  fs.writeFileSync('youtube-methods.txt', output, 'utf8');
  console.log('✅ Methods written to youtube-methods.txt');
})();
