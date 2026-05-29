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
├── design-system/              # Hệ thống design tokens và styles dùng chung
│   ├── tokens.css              # Màu sắc, spacing, typography variables
│   ├── base.css                # Reset + global styles
│   ├── layout.css              # Device frame, desktop container
│   ├── animations.css          # Keyframe animations dùng chung
│   └── components/             # Style cho các component tái sử dụng
│
├── features/                   # Tất cả màn hình sản phẩm
│   ├── onboarding/
│   │   ├── home/               # Màn hình About Me / tab chủ
│   │   └── loading/            # Màn hình chờ kết quả quiz
│   ├── quiz/
│   │   └── quiz-card/          # Giao diện 30 câu hỏi
│   ├── discipline/
│   │   ├── match/              # Kết quả ngành + Academic DNA radar
│   │   ├── detail/             # Trang chi tiết từng ngành (kt, nn, nv, tn, xh, yt)
│   │   └── why/                # Giải thích lý do match
│   ├── major/
│   │   ├── recommendations/    # Danh sách chuyên ngành gợi ý
│   │   └── detail/             # Chi tiết chuyên ngành
│   ├── university/
│   │   └── matches/            # Kết quả trường đại học
│   ├── results/
│   │   └── match-reveal/       # Màn hình reveal kết quả có animation
│   └── profile/
│       ├── overview/           # Hồ sơ học sinh
│       ├── edit/               # Chỉnh sửa hồ sơ
│       └── settings/           # Cài đặt ứng dụng
│
├── shared/
│   └── scripts/                # JavaScript utilities dùng chung
│
└── data/                       # File dữ liệu CSV (ngành, chuyên ngành)
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
