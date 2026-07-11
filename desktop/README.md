# 🖥️ BeyonDegrees.ai — Desktop UI

Phiên bản giao diện **desktop** của BeyonDegrees.ai, làm lại từ bản mobile. Cùng tech stack với app gốc: **HTML + CSS + Vanilla JS, không framework, không build tool** — mở `index.html` là chạy.

## Ngôn ngữ thiết kế (đồng bộ 1:1 với mobile)

- **Dark mode**: nền `#06060f` + 4 aurora blobs trôi (blue/mint/violet) + noise overlay, card glassmorphism `rgba(255,255,255,0.06)` + backdrop-blur, logo gradient text `#a78bfa → #06d6a0`, accent violet/mint.
- **Light mode**: nền kem + `bg-light.svg` (đã bỏ chấm tròn), card frosted trắng `rgba(253,248,242,0.92)`, accent **terracotta** (`#e8917a/#c96b55/#a84e30`) + blue `#0274BE` + sage, nút primary gradient terra, logo gradient `#c96b55 → #0274BE`.
- **Bộ màu 6 ngành** (`.acc-kt/tn/yt/nn/xh/nv`) đúng theo mobile: violet / rose / mint / amber / purple / blue — dùng cho thanh màu trái (dc-bar), icon tô nền, % match, progress gradient, top strip + halo trên card.
- **Component port từ mobile**: ai-chip, story-bar segments, score chips, dc card (discipline-match), orb + orbit particles (loading), aurora đổi màu theo ngành (quiz & discipline-detail), radar có đỉnh tô màu theo từng ngành.

## Khác biệt so với bản mobile

| | Mobile (gốc) | Desktop (folder này) |
| :-- | :-- | :-- |
| Điều hướng | Float tab bar dưới màn hình | Sidebar trái cố định |
| Layout | 1 cột trong khung điện thoại | Grid 2–3 cột, max-width 1180px |
| Theme | Dark mặc định | **Light mặc định** (nền kem, không chấm tròn), toggle ở topbar |
| Design tokens | `design-system/tokens.css` | **Tái sử dụng cùng file tokens** |

## Nội dung 1:1 từ mobile

Mỗi màn desktop được port **từng màn một** từ mobile, giữ nguyên toàn bộ nội dung & cấu trúc màu, chỉ đổi bố cục:

- **Home**: hero ring tiến độ + state machine theo `quizProgress`/`quizMilestone` (localStorage, logic y hệt mobile), 6 discipline cards đúng icon/màu (`--disc`).
- **Quiz**: đủ 30 câu thật từ QUESTIONS bank, swipe card 4 hướng (kéo chuột / phím tắt / nút), card đổi màu theo ngành (DISC_COLORS), story bar + score chips + undo + milestone overlay.
- **Loading**: 5 phases + DNA forming 6 bars (DNA_SCHEDULE) + 6 fun facts + overlay "Results are ready!".
- **Match Reveal**: 87% count-up, Top 12%, DNA share card (Phan Văn Hoang Phuc), 3 Top Majors thật, confetti canvas.
- **Disciplines**: ranking 94/89/64/62/34/32 + mô tả nguyên văn, radar 6 đỉnh tô màu ngành.
- **Why I Match**: DISC_DATA đầy đủ 6 ngành (insight + 6 assertions + response breakdown).
- **Majors**: data thật `features/major/majors-data.js` (56 majors) + MOCK_PCT + tiers 🎯/💡/🌐 + filter chips.
- **Major/Spec Detail**: `assets/spec-data.js` (SPECIALIZATIONS đầy đủ trích từ mobile) + roadmap/skills/admission.
- **Universities**: `assets/uni-data.js` (UNI_DATA ~39 trường) + sort Best Match/Diverse Mix/Employment/A-Z + filter region/aid + match ring + save ♥.
- **University Detail**: `assets/uni-detail-data.js` (UNI_DETAIL: about/life/admissions/support thật).
- **Profile/Edit/Settings**: đúng menu, form, segmented options, reset modal, theme & language selector mobile.

## Cấu trúc

```
desktop/
├── assets/
│   ├── desktop.css      # Shell + components (import tokens gốc)
│   └── desktop.js       # Sidebar/topbar tự render, theme toggle, data chung
├── index.html           # Home / About me — chọn disciplines, tiến độ quiz
├── quiz.html            # Quiz 2 cột: câu hỏi + progress
├── loading.html         # AI đang phân tích (auto chuyển trang)
├── match-reveal.html    # Reveal kết quả + confetti
├── discipline-match.html# Ranking 6 nhóm ngành + radar Academic DNA
├── discipline-detail.html?d=kt|yt|tn|xh|nv|nn   # Chi tiết 6 ngành (1 file)
├── discipline-why.html  # Giải thích vì sao match
├── majors.html          # Gợi ý chuyên ngành + filter
├── major-detail.html    # Chi tiết chuyên ngành + lộ trình 4 năm
├── spec-detail.html     # Hướng chuyên sâu (specializations)
├── universities.html    # Danh sách trường + tìm kiếm/lọc/sắp xếp
├── university-detail.html
├── profile.html         # Hồ sơ + Academic DNA + trường đã lưu
├── profile-edit.html
└── settings.html        # Theme, ngôn ngữ, thông báo, dữ liệu
```

## Chạy

```bash
# Từ thư mục gốc repo (cần serve từ gốc để load được design-system/ và shared/)
npx serve .
# Mở http://localhost:3000/desktop/
```

Theme được lưu trong `localStorage` (`bd-theme`), đồng bộ giữa các trang.
