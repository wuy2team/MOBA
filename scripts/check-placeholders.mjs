// Kiểm tra mã nguồn không chứa dấu hiệu "code giả" (docs/04 §2):
// TODO/FIXME/XXX/HACK, "coming soon", "not implemented", hàm rỗng trong mã sản phẩm.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SRC = join(ROOT, 'src');
const EXTENSIONS = ['.ts', '.tsx', '.css'];

const RULES = [
  { pattern: /\b(TODO|FIXME|XXX|HACK)\b/, reason: 'đánh dấu việc chưa làm' },
  { pattern: /coming soon|not implemented|sắp ra mắt|chưa triển khai/i, reason: 'chức năng giả/chưa làm' },
  { pattern: /throw new Error\(\s*['"`]Not implemented/i, reason: 'hàm chưa hiện thực' },
];
// Hàm rỗng chỉ bị cấm trong mã sản phẩm (test được phép dùng stub).
const EMPTY_FN = { pattern: /=>\s*\{\s*\}|\)\s*\{\s*\}(?!\s*from)/, reason: 'hàm rỗng' };
// Constructor chỉ khai báo parameter property (TypeScript) có thân rỗng hợp lệ.
const PARAMETER_PROPERTY_CTOR = /constructor\(.*\b(private|public|protected|readonly)\b/;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTENSIONS.some((ext) => name.endsWith(ext))) out.push(full);
  }
  return out;
}

const problems = [];
for (const file of walk(SRC)) {
  const isTest = /\.test\.tsx?$/.test(file);
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    const checkEmpty = !isTest && !PARAMETER_PROPERTY_CTOR.test(line);
    const rules = checkEmpty ? [...RULES, EMPTY_FN] : RULES;
    for (const rule of rules) {
      if (rule.pattern.test(line)) {
        problems.push(`${relative(ROOT, file)}:${index + 1}  [${rule.reason}]  ${line.trim()}`);
      }
    }
  });
}

if (problems.length > 0) {
  console.error(`check:placeholders – phát hiện ${problems.length} vấn đề:\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log('check:placeholders – OK, không phát hiện code giả/placeholder.');
