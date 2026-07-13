# BeyonDegrees API v1
Base URL: /api/v1
Response thành công: { "data": ... }
Response lỗi: { "error": { "code", "message", "details" } }

## Endpoints
- GET  /health                         → {status:'ok'}
- GET  /ready                          → {status:'ready'} | 503
- POST /assessments                    body {device, locale, profileId?} → 201 {data:{id}}
- POST /assessments/:id/answers        body {assertion_id, position, answer_value, answer_label, stage} → 201
- GET  /assessments/:id/next           → 200 {data:{done, assertion}}
- POST /assessments/:id/finalize       → 200 {data:{top_discipline, ratios, ...}}
- GET  /reference/disciplines          → 200 {data:[...]}
- GET  /reference/majors?discipline=ID → 200 {data:[...]}

## Ràng buộc dữ liệu
- answer_label ∈ {Absolutely agree, Agree, Unsure, Disagree, Totally disagree}
- answer_value ∈ 1..5
- stage ∈ {d, m, u}
- device ∈ {mobile, desktop}; locale ∈ {en, ar, vi, hi, fr}

## Mã lỗi
400 BAD_REQUEST · 401 UNAUTHORIZED · 404 NOT_FOUND · 422 VALIDATION · 429 RATE_LIMITED · 500 INTERNAL