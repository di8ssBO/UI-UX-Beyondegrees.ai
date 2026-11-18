# tools/

Các công cụ sinh dữ liệu mẫu cho bản UI. Không trang nào nạp thư mục này.
Chạy từ thư mục gốc repo, cần Python 3.9 trở lên.

## generate-assertions-i18n.py
Đọc `shared/scripts/data/assertions.js`, dịch câu tiếng Anh sang fr / hi / ar, ghi `shared/scripts/data/assertions-i18n.js`.
- Bản dịch được lưu ở `tools/assertions-i18n-cache.json`. Câu nào đã có trong cache thì không dịch lại, không cần mạng.
- Câu mới (chưa có trong cache) được dịch qua Google Translate miễn phí, cần mạng.
```
python tools/generate-assertions-i18n.py
```
Kiểm 18/11/2026: với cache hiện tại, chạy lại cho ra tệp giống hệt bản đang dùng.

## generate-spec-data.py
Đọc `shared/data/Specialization-2026-05-09.csv` và `tools/data/UniversitySpecializationLevel-2026-05-12.csv`, ghi `tools/output/spec-csv-data.js` (623 chuyên ngành).
Hiện chưa trang nào dùng tệp này; `shared/scripts/data/spec-data.js` đang dùng là bản trích tay.
```
python tools/generate-spec-data.py
```

## data/
CSV xuất từ database (tháng 5/2026). Riêng `Specialization-2026-05-09.csv` nằm ở `shared/data/` vì trang mobile/major/spec-detail đọc nó lúc chạy. `assertions.js` ghi là sinh từ `Assertion-2026-05-09.csv`, nhưng script sinh tệp đó không có trong repo.
