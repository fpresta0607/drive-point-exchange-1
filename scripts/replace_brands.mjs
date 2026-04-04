import fs from 'fs';
import path from 'path';

const searchPatterns = [
  { match: /apex-navy-deep/g, replace: 'dpe-navy-deep' },
  { match: /apex-navy/g, replace: 'dpe-navy' },
  { match: /apex-blue-light/g, replace: 'dpe-blue-light' },
  { match: /apex-blue/g, replace: 'dpe-blue' },
  { match: /apex-red/g, replace: 'dpe-green' },
  { match: /apex-slate/g, replace: 'dpe-slate' },
  { match: /apex-bg-alt/g, replace: 'dpe-bg-alt' },
  { match: /apex-bg/g, replace: 'dpe-bg' },
  { match: /apex-card-border/g, replace: 'dpe-card-border' },
  { match: /apex-card/g, replace: 'dpe-card' },
  { match: /shadow-apex-lg/g, replace: 'shadow-dpe-lg' },
  { match: /shadow-apex/g, replace: 'shadow-dpe' },
  { match: /border-apex/g, replace: 'border-dpe' },
  { match: /Apex Auto Solutions Inc/g, replace: 'Drive Point Exchange' },
  { match: /Apex Auto Solutions/g, replace: 'Drive Point Exchange' },
  { match: /Apex Auto/g, replace: 'Drive Point Exchange' },
  { match: /apexautosolutionsinc\.com/g, replace: 'drivepointexchange.com' },
  { match: /logo-apex\.png/g, replace: 'logo.png' }
];

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'scripts') continue;
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      if (filepath.endsWith('.tsx') || filepath.endsWith('.ts') || filepath.endsWith('.json') || filepath.endsWith('.js') || filepath.endsWith('.md')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
};

const files = walkSync('./');
let changedCount = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  for (const pattern of searchPatterns) {
    content = content.replace(pattern.match, pattern.replace);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
    changedCount++;
  }
}
console.log(`Replaced in ${changedCount} files.`);
