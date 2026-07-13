-- Thêm metadata cho assertion (domain/subdomain) phục vụ engine chọn câu (Mục 6).
-- Nguồn dữ liệu: assertion_bank_en.py (tag/d/sd theo từng id).
ALTER TABLE assertions ADD COLUMN IF NOT EXISTS domain    text;
ALTER TABLE assertions ADD COLUMN IF NOT EXISTS subdomain text;

CREATE INDEX IF NOT EXISTS idx_assertions_domain ON assertions(domain);
