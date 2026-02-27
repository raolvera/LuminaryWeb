const fs = require('fs');
const path = require('path');

const menuDir = path.join(__dirname, 'content', 'menu');
const outputFile = path.join(__dirname, 'content', 'menu-combined.json');

const files = fs.readdirSync(menuDir).filter(f => f.endsWith('.json'));
const items = files.map(f => JSON.parse(fs.readFileSync(path.join(menuDir, f), 'utf8')));

items.sort((a, b) => (a.order || 0) - (b.order || 0));

fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
console.log(`Combined ${items.length} menu items into ${outputFile}`);
