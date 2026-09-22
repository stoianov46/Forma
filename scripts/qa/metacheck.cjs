#!/usr/bin/env node
// Walks the built `dist/` output and flags any page missing a single <h1>, a
// non-empty <title>, a meta description, a canonical link, or an <img alt="">.
// Usage: node scripts/qa/metacheck.cjs (after `npm run build`)
const fs = require('fs');
const path = require('path');
const distDir = path.join(process.cwd(), 'dist');
let issues = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) check(full);
  }
}

function check(file) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = file.slice(distDir.length);
  const h1Count = (html.match(/<h1[ >]/g) || []).length;
  if (h1Count !== 1) {
    console.log(`[H1] ${rel}: found ${h1Count} <h1> tags`);
    issues++;
  }
  if (!/<title>[^<]+<\/title>/.test(html)) {
    console.log(`[title] ${rel}: missing or empty <title>`);
    issues++;
  }
  if (!/<meta name="description" content="[^"]+"/.test(html)) {
    console.log(`[meta] ${rel}: missing meta description`);
    issues++;
  }
  if (!/<link rel="canonical" href="[^"]+"/.test(html)) {
    console.log(`[canonical] ${rel}: missing canonical link`);
    issues++;
  }
  const imgTags = html.match(/<img[^>]*>/g) || [];
  for (const img of imgTags) {
    // A bare `alt` (how Astro minifies alt="") is a valid empty alt: decorative image.
    if (!/\salt(="[^"]*"|[\s>\/])/.test(img)) {
      console.log(`[alt] ${rel}: <img> missing alt attribute: ${img.slice(0, 80)}`);
      issues++;
    }
  }
}

walk(distDir);
console.log(issues === 0 ? '\nAll checks passed.' : `\n${issues} issue(s) found.`);
process.exit(issues === 0 ? 0 : 1);
