#!/usr/bin/env python3
"""
generate-spec-data.py
Đọc 2 CSV từ data/ và tạo ra spec-data.js dùng trong spec-detail/index.html

Chạy từ thư mục gốc project:
  python features/major/spec-detail/generate-spec-data.py
"""
import csv, json, os, re, sys

BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
SPEC_CSV = os.path.join(BASE, 'data', 'Specialization-2026-05-09.csv')
UNI_CSV  = os.path.join(BASE, 'data', 'UniversitySpecializationLevel-2026-05-12.csv')
OUT_JS   = os.path.join(BASE, 'features', 'major', 'spec-detail', 'spec-data.js')

def norm(s):
    return re.sub(r'\s+', ' ', s.strip().lower())

# ── 1. Read Specialization CSV ──────────────────────────────────────
spec_by_norm = {}
with open(SPEC_CSV, encoding='utf-8') as f:
    for row in csv.DictReader(f):
        key = norm(row['title'])
        spec_by_norm[key] = {
            'id':          row['id'].strip(),
            'title':       row['title'].strip(),
            'description': row['description'].strip(),
            'admission':   row.get('admission_requirements','').strip(),
            'skills':      row.get('recommended_skills','').strip(),
            'exams':       row.get('entrance_exams','').strip(),
            'language':    row.get('language_requirements','').strip(),
        }

# ── 2. Read University CSV ──────────────────────────────────────────
LEVEL_ORDER = {'PhD':0,'MS':1,'BS':2,'AS':3}
uni_by_norm = {}
with open(UNI_CSV, encoding='utf-8') as f:
    for row in csv.DictReader(f):
        key = norm(row['specialization'])
        entry = {
            'university': row['university'].strip(),
            'level':      row['level'].strip(),
            'duration':   row['duration'].strip(),
        }
        uni_by_norm.setdefault(key, []).append(entry)

# Sort each list: PhD→MS→BS→AS, then alphabetically
for key in uni_by_norm:
    uni_by_norm[key].sort(
        key=lambda x: (LEVEL_ORDER.get(x['level'], 99), x['university'].lower())
    )

# ── 3. Build combined output object ─────────────────────────────────
combined = {}
all_keys = sorted(set(list(spec_by_norm.keys()) + list(uni_by_norm.keys())))

for key in all_keys:
    spec = spec_by_norm.get(key, {})
    unis = uni_by_norm.get(key, [])
    if not spec and not unis:
        continue
    title = spec.get('title', '') or (unis[0]['university'] if unis else key)
    combined[key] = {
        'title':       spec.get('title', key),
        'description': spec.get('description', ''),
        'admission':   spec.get('admission', ''),
        'skills':      spec.get('skills', ''),
        'exams':       spec.get('exams', ''),
        'language':    spec.get('language', ''),
        'universities': unis,
    }

# ── 4. Write JS file ─────────────────────────────────────────────────
js = '/* AUTO-GENERATED — run generate-spec-data.py to refresh */\n'
js += '/* Keyed by normalized spec title (lowercase, trimmed) */\n'
js += 'var SPEC_CSV_DATA = '
js += json.dumps(combined, ensure_ascii=False, indent=2)
js += ';\n\n'
js += '/* Lookup helper: find by raw title string (case-insensitive) */\n'
js += 'function lookupSpecData(title) {\n'
js += '  var key = title.toLowerCase().replace(/\\s+/g," ").trim();\n'
js += '  return SPEC_CSV_DATA[key] || null;\n'
js += '}\n'

with open(OUT_JS, 'w', encoding='utf-8') as f:
    f.write(js)

total_specs = len(combined)
total_unis  = sum(len(v['universities']) for v in combined.values())
print(f'✅  spec-data.js generated: {total_specs} specializations, {total_unis} university entries')
print(f'    → {OUT_JS}')
