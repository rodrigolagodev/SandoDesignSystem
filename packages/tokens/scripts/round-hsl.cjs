const { parse, converter } = require('culori');
const fs = require('fs');
const path = require('path');

const colorJsonPath = path.join(__dirname, '../src/ingredients/color.json');
const data = JSON.parse(fs.readFileSync(colorJsonPath, 'utf8'));

function hslToString(hsl) {
  const h = Math.round(hsl.h || 0);
  const s = Math.round((hsl.s || 0) * 100);
  const l = Math.round((hsl.l || 0) * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

const toHsl = converter('hsl');

function convert(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (obj[key].value && obj[key].type === 'color') {
        const val = obj[key].value;
        if (val.startsWith('hsl(') && (val.includes('.') || val.match(/hsl\(\s*\d+\s*,\s*[\d.]+%/))) {
          const parsed = parse(val);
          const hsl = toHsl(parsed);
          const rounded = hslToString(hsl);
          console.log(`${val} -> ${rounded}`);
          obj[key].value = rounded;
        }
      } else {
        convert(obj[key]);
      }
    }
  }
}

convert(data);
fs.writeFileSync(colorJsonPath, JSON.stringify(data, null, 2));
console.log('\n✅ Rounded all HSL values!');
