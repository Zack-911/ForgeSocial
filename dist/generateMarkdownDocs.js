'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateAllMarkdownDocs = generateAllMarkdownDocs;
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const metadataDir = path_1.default.join(__dirname, '../metadata');
function writeMarkdown(filename, content) {
  fs_1.default.writeFileSync(path_1.default.join(metadataDir, filename), content);
}
function eventsToMarkdown(events) {
  let md = `# Events\n\n`;
  for (const event of events) {
    md += `## ${event.name}\n\n`;
    md += `- **Version:** ${event.version}\n`;
    md += `- **Description:** ${event.description}\n\n`;
  }
  return md;
}
function functionsToMarkdown(functions) {
  let md = `# Functions\n\n`;
  for (const fn of functions) {
    md += `## ${fn.name}\n\n`;
    md += `- **Version:** ${fn.version}\n`;
    md += `- **Description:** ${fn.description}\n`;
    if (fn.category) md += `- **Category:** ${fn.category}\n`;
    if (fn.args && fn.args.length) {
      md += `- **Arguments:**\n`;
      for (const arg of fn.args) {
        md += `  -  ${arg.name} (${arg.type}${arg.required ? ', required' : ''}${arg.rest ? ', rest' : ''})${arg.enum ? `: [${arg.enum.join(', ')}]` : ''} - ${arg.description}\n`;
      }
    }
    if (fn.output) md += `- **Output:** ${fn.output.join(', ')}\n`;
    if (fn.brackets !== undefined) md += `- **Brackets:** ${fn.brackets}\n`;
    if (fn.unwrap !== undefined) md += `- **Unwrap:** ${fn.unwrap}\n`;
    md += `\n`;
  }
  return md;
}
function enumsToMarkdown(enums) {
  let md = `# Enums\n\n`;
  for (const [name, values] of Object.entries(enums)) {
    md += `## ${name}\n\n`;
    md += values.map((v) => `- ${v}`).join('\n') + '\n\n';
  }
  return md;
}
function generateAllMarkdownDocs() {
  // Events
  const events = JSON.parse(
    fs_1.default.readFileSync(path_1.default.join(metadataDir, 'events.json'), 'utf8'),
  );
  writeMarkdown('events.md', eventsToMarkdown(events));
  // Functions
  const functions = JSON.parse(
    fs_1.default.readFileSync(path_1.default.join(metadataDir, 'functions.json'), 'utf8'),
  );
  writeMarkdown('functions.md', functionsToMarkdown(functions));
  // Enums
  const enums = JSON.parse(
    fs_1.default.readFileSync(path_1.default.join(metadataDir, 'enums.json'), 'utf8'),
  );
  writeMarkdown('enums.md', enumsToMarkdown(enums));
}
//# sourceMappingURL=generateMarkdownDocs.js.map
