// scripts/preprocess-content.cts
const fs = require('fs');
const path = require('path');
const { getAllContent } = require('../src/lib/content');

const outDir = path.join(process.cwd(), 'public', 'content-data');
fs.mkdirSync(outDir, { recursive: true });

const blog = getAllContent('blog');
const project = getAllContent('project');

fs.writeFileSync(path.join(outDir, 'blog.json'), JSON.stringify(blog, null, 2));
fs.writeFileSync(path.join(outDir, 'project.json'), JSON.stringify(project, null, 2));

console.log('Preprocessed blog and project content.');
