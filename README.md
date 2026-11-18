# 🎓 BeyonDegrees.ai — UI/UX Prototype

> **Dự án UI/UX — BeyonDegrees.ai (2026)**

BeyonDegrees.ai là nền tảng hướng nghiệp thông minh, ứng dụng **Trí tuệ nhân tạo (AI)** để giúp học sinh 14–18 tuổi khám phá ngành học, chuyên ngành và trường đại học phù hợp nhất với bản thân.

Repository này chứa toàn bộ **bản mẫu giao diện (UI Prototype)** được xây dựng bởi team UI/UX.

---

## 🌟 Màn hình chính

| Màn hình | Mô tả |
| :--- | :--- |
| **Home (About Me)** | Màn hình chủ, hiển thị tiến độ quiz theo từng mốc |
| **Quiz Card** | 30 câu hỏi theo 3 stage, swipe-card interface |
| **Loading Screen** | Màn hình chờ xử lý kết quả AI sau mỗi stage |
| **Discipline Match** | Kết quả ngành học, Academic DNA radar chart |
| **Discipline Detail** | Chi tiết từng ngành (6 ngành) |
| **Major Recommendations** | Danh sách chuyên ngành phù hợp |
| **Major Detail** | Chi tiết từng chuyên ngành |
| **University Matches** | Danh sách trường đại học gợi ý |
| **Profile / Settings** | Hồ sơ và cài đặt tài khoản |

---

## 🧠 Tech Stack

| Thành phần | Công nghệ sử dụng |
| :--- | :--- |
| **Markup** | HTML5 |
| **Styling** | CSS3 (Custom Design System) |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Font** | Plus Jakarta Sans (Google Fonts) |
| **Icons** | Inline SVG |

> ✅ **Không dùng framework. Không cần build tool. Mở file `.html` là chạy được ngay.**

---

## 📁 Cấu trúc thư mục

```
BeyonDegrees-UI/
│
├── index.html                  # Định tuyến: phát hiện thiết bị, chuyển sang mobile/ hoặc desktop/
├── dashboard.html              # Trang tổng hợp màn hình cho đội UI/UX (không nằm trong luồng người dùng)
├── sw.js                       # Service worker (PWA); tăng CACHE_VERSION mỗi lần đổi tệp được cache
├── netlify.toml                # Cấu hình Netlify: publish cả thư mục, không có bước build
│
├── design-system/              # Token, base, layout, animation, component CSS; docs/ là trang tài liệu
├── shared/
│   ├── auth/                   # Đăng nhập, đăng ký, complete profile (dùng chung 2 bản)
│   ├── scripts/data/           # Dữ liệu mẫu: assertions.js (en+vi), assertions-i18n.js (fr/hi/ar),
│   │                           #   quiz-builder.js (rút 30 câu cho cả 2 bản), majors/spec/uni data
│   ├── scripts/ui/             # i18n.js, tab-bar.js (thanh tab mobile), app-menu.js, bd-profile.js,
│   │                           #   dna-card.js, pwa-install.js, tab-lock.js ...
│   ├── data/                   # Specialization CSV, trang mobile spec-detail đọc lúc chạy
│   ├── styles/  icons/  assets/
│
├── mobile/                     # Bản mobile: auth, onboarding (home, loading), quiz, discipline,
│                               #   major (recommendations, detail, spec-detail, why), university
│                               #   (matches, detail, why), understand-matches, profile, results (dna-card)
├── desktop/                    # Bản desktop cùng màn hình; _shell/ là sidebar + topbar dùng chung
│
└── tools/                      # Không nằm trong ứng dụng
    ├── data/                   # CSV xuất từ database, nguồn sinh dữ liệu mẫu (không nạp lúc chạy)
    ├── generate-assertions-i18n.py
    ├── generate-spec-data.py
    └── README.md               # Cách chạy các công cụ
```

---

## 🚀 Hướng dẫn chạy

Không cần cài đặt gì thêm.

**Cách 1 — Mở trực tiếp:**
```
Mở bất kỳ file index.html nào bằng trình duyệt
```

**Cách 2 — Dùng local server (khuyến nghị, tránh lỗi CORS):**
```bash
# Đứng ở thư mục gốc project
npx serve .
# hoặc: python -m http.server 3000
# hoặc: VS Code Live Server (cổng 5500)

# Truy cập: http://localhost:3000
```

---

## ⚠️ Quy tắc làm việc (Git Workflow)

> 🚨 **Nhánh `master` là nhánh bàn giao. TUYỆT ĐỐI KHÔNG PUSH THẲNG LÊN `master`!**

1️⃣ **Nhận task** từ leader

2️⃣ **Tạo branch mới** từ `dev`:
```bash
git checkout dev
git pull origin dev
git checkout -b feature/ten-tinh-nang

# Ví dụ tên branch:
# feature/home-screen
# feature/quiz-card
# feature/radar-chart
```

3️⃣ **Code & Commit:**
```bash
git add .
git commit -m "feat: add home screen momentum ring"
```

4️⃣ **Push branch** lên GitHub:
```bash
git push origin feature/ten-tinh-nang
```

5️⃣ **Tạo Pull Request (PR):**
- Lên GitHub tạo Pull Request, chọn **base: `dev`**
- Leader sẽ review code
- Nếu có comment thì sửa lại và push tiếp

6️⃣ **Merge:**
- Sau khi được approve, leader merge vào `dev`
- Leader sẽ merge `dev` → `master` khi sẵn sàng bàn giao

---

## 👨‍💻 Team Notes

- ❌ **Không** push file `.env`, `.claude/`, file backup `*.bak`
- ❌ **Không** push code lỗi hoặc chưa test trên trình duyệt
- ❌ **Không** merge khi chưa có người review
- ✅ Viết commit rõ ràng theo chuẩn:

| Prefix | Ý nghĩa |
| :--- | :--- |
| `feat:` | Thêm tính năng mới |
| `fix:` | Sửa lỗi |
| `refactor:` | Tối ưu / dọn dẹp code |
| `style:` | Chỉnh CSS / giao diện, không ảnh hưởng logic |
| `chore:` | Công việc hỗ trợ (config, README...) |

**Ví dụ commit:**
- `feat: add academic DNA radar chart`
- `fix: quiz progress not saved to localStorage`
- `style: update discipline card hover animation`
- `refactor: extract nav logic to shared script`

---

## 👥 Team

**BeyonDegrees.ai — UI/UX Team**
