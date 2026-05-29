/* ══════════════════════════════════════════════════════════════════════════
   BeyonDegrees.ai — i18n Engine  v1.0
   Supported: en · vi · hi · fr · ar (RTL)

   Usage:
     HTML  → <span data-i18n="key">English fallback</span>
     Input → <input data-i18n-placeholder="key">
     JS    → BDi18n.t('key')
     Switch→ BDi18n.apply('vi')

   Persistence: localStorage key "bd-lang"
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Language metadata ─────────────────────────────────────────────────── */
  var LANGS = {
    en: { nativeName: 'English',    flag: '🇺🇸', dir: 'ltr' },
    vi: { nativeName: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
    hi: { nativeName: 'हिन्दी',      flag: '🇮🇳', dir: 'ltr' },
    fr: { nativeName: 'Français',   flag: '🇫🇷', dir: 'ltr' },
    ar: { nativeName: 'العربية',    flag: '🇸🇦', dir: 'rtl' },
  };

  /* ── Translation table ─────────────────────────────────────────────────── */
  /* Keys marked [TODO] in non-EN langs fall back to English automatically   */
  var T = {

    /* ── English (source of truth) ──────────────────────────────────────── */
    en: {
      /* Navigation */
      'nav.about_me':     'About me',
      'nav.disciplines':  'Disciplines',
      'nav.majors':       'Majors',
      'nav.universities': 'Universities',

      /* Home */
      'home.tagline':         'Discover your academic identity',
      'home.hero_q':          'What major are you interested in?',
      'home.chip.cs':         'Computer Science',
      'home.chip.medicine':   'Medicine',
      'home.chip.design':     'Design',
      'home.chip.business':   'Business',
      'home.chip.education':  'Education',
      'home.chip.arts':       'Arts',
      /* Home CTA buttons */
      'home.cta.start':       'Start Quiz →',
      'home.cta.continue':    'Continue Quiz →',
      'home.cta.view_disc':   'View Discipline Results ›',
      'home.cta.view_major':  'View Major Results ›',
      'home.cta.view_uni':    'View University Results ›',
      'home.cta.view_match':  'View Match →',
      /* Home hero states */
      'home.state0.tagline':  'Discover your academic identity',
      'home.state0.title':    'What major are you interested in?',
      'home.state0.sub':      'Answer 30 questions and let AI find your perfect match.',
      'home.state1.tagline':  'Quiz Stage 1 complete!',
      'home.state1.title':    'Your top discipline is revealed 🔥',
      'home.state1.sub':      'Keep going! 20 more questions to unlock your Major matches.',
      'home.state2.tagline':  'Quiz Stage 2 complete!',
      'home.state2.title':    'AI found your Major matches ⚡',
      'home.state2.sub':      '10 more questions to unlock your University matches.',
      'home.state3.tagline':  'Profile complete!',
      'home.state3.title':    'Your academic identity is complete ✨',
      'home.state3.sub':      'BeyonDegrees has found your perfect university matches.',

      /* Loading */
      'loading.analyzing':      'Analyzing',
      'loading.dna_title':      'Your Academic DNA',
      'loading.dna_forming':    'Academic DNA forming',
      'loading.dna.humanities': 'Humanities',
      'loading.dna.agriculture':'Agriculture',
      'loading.dna.social':     'Social Sciences',
      'loading.dna.natural':    'Natural Sciences',
      'loading.done':           'Analysis complete!',
      'loading.compiling':      'Compiling your results...',
      'loading.ready':          'Results are ready!',

      /* Results */
      'results.dna':              'Academic DNA',
      'results.match_label':      'Match Rate',
      'results.dna.label':        'Academic DNA',
      'results.dna.share':        'Share',
      'results.section.top_majors': 'Your Top Majors',
      'results.major.view_path':  'View Path →',
      'results.cta.explore':      'Explore all matching majors →',
      'results.cta.retake':       '↺ Retake Quiz',
      'results.cta.save':         '🔖 Save Results',
      'results.cta.saved':        '✅ Saved!',
      'results.share_toast':      '✓ Link copied!',
      /* DNA discipline short names for results card */
      'results.dna.kt': 'Eng & Tech',
      'results.dna.tn': 'Natural Sci',
      'results.dna.nv': 'Humanities',
      'results.dna.xh': 'Social Sci',
      'results.dna.yt': 'Med & Health',
      'results.dna.nn': 'Agriculture',

      /* Quiz */
      'quiz.hint.drag':       'Drag to answer',
      'quiz.hint.arrows':     '← →',
      'quiz.hint.hold':       'Hold to set intensity',
      'quiz.swipe.agree':     'AGREE ✓',
      'quiz.swipe.disagree':  'DISAGREE ✕',
      'quiz.swipe.strong':    'STRONGLY AGREE ⚡',
      'quiz.swipe.neutral':   'NEUTRAL –',
      'quiz.spec.disagree':   'Disagree',
      'quiz.spec.agree':      'Agree',
      'quiz.spec.neutral':    'Neutral',
      'quiz.spec.confirm':    'Confirm ✓',
      'quiz.mode.swipe':      'Swipe',
      'quiz.mode.spectrum':   'Spectrum',

      /* Discipline match */
      'disc.headline':      'Your Perfect',
      'disc.headline_em':   'Disciplines',
      'disc.subtext':       'Based on your answers, these fields align best with your cognitive strengths and professional interests.',
      'disc.caption':       'Complete the quiz to reveal your Academic DNA ✨',
      'disc.lock_title':    'Discipline Match Locked',
      'disc.lock_sub':      'Complete 10 questions to unlock your Discipline results.',
      'disc.match':         'Match',
      'disc.why_match':     'Why I match? 🔍',
      'disc.career_paths':  'Career Paths',
      'disc.cta.start':     'Start Quiz →',
      'disc.cta.continue':  'Continue Quiz →',
      /* Discipline names */
      'disc.name.kt': 'Engineering & Technology',
      'disc.name.tn': 'Natural Sciences',
      'disc.name.yt': 'Medical & Health Sciences',
      'disc.name.nn': 'Agricultural Sciences',
      'disc.name.xh': 'Social Sciences',
      'disc.name.nv': 'Humanities',
      /* Discipline short names (for DNA bars, filter chips) */
      'disc.short.kt': 'Engineering',
      'disc.short.tn': 'Natural Sci',
      'disc.short.yt': 'Medical',
      'disc.short.nn': 'Agricultural',
      'disc.short.xh': 'Social Sci',
      'disc.short.nv': 'Humanities',
      /* Discipline card descriptions */
      'disc.desc.kt': 'You possess strong analytical reasoning and a natural inclination toward systematic problem-solving and science innovation.',
      'disc.desc.tn': 'Your curiosity about the physical world and mathematical approach to observation align with life and physical science paths.',
      'disc.desc.yt': 'Your empathy and precision-oriented mindset suit healthcare and biomedical paths focused on improving human well-being.',
      'disc.desc.nn': 'A grounded approach to sustainability and life sciences positions you well for agronomy, food science, and environmental stewardship.',
      'disc.desc.xh': 'A deep interest in human behavior, societal structures, and interpersonal dynamics makes this a moderate-fit field for your profile.',
      'disc.desc.nv': 'Your appreciation for language, culture, and critical thinking gives you a foundation in literature, philosophy, and history paths.',

      /* Major recommendations */
      'major.headline':     'Majors Made For You',
      'major.subtext':      'Discover majors tailored to your interests and strengths.',
      'major.demand_high':  '🔥 High Demand',
      'major.lock_title':   'Major Match Locked',
      'major.lock_sub':     'Complete more questions to unlock your best-fit majors.',
      'major.filter.all':   'All',
      'major.filter.eng':   'Engineering',
      'major.filter.natural':'Natural Sci',
      'major.filter.medical':'Medical',
      'major.filter.agri':  'Agricultural',
      'major.filter.social':'Social Sci',
      'major.filter.humanities':'Humanities',
      'major.compat':       'Compatibility',
      'major.view_career':  'View Career Paths →',
      'major.no_results':   'No majors found for this filter',
      'major.explore_hint': "Those majors are not your primary strengths, but you can still study them if you're passionate.",
      'major.top_picks':    'Top Picks',
      'major.also_fits':    'Also Fits',
      'major.explore_more': 'Explore More',
      'major.cta.continue': 'Continue Quiz →',
      'major.cta.finish':   'Finish Quiz →',
      /* Major detail page */
      'major.detail.why_title':     'Why I match this major?',
      'major.detail.why_sub':       'See how your quiz answers align with this major',
      'major.detail.specializations': 'Specializations',
      'major.detail.picker_title':  'Choose a Major to view',
      'major.detail.picker_sub':    'majors available — click to preview',

      /* Discipline detail */
      'disc.detail.unlock_banner': 'Finish {n} more questions to see the fit of each major',
      'disc.cta.finish':   'Finish Quiz →',

      /* Discipline why page */
      'disc.why.page_title':   'Why I Match 🔍',
      'disc.why.insight.kt':   "Your answers show a strong pull toward building, optimizing, and innovating. You think in systems — and that's exactly what engineering needs.",
      'disc.why.insight.tn':   'Your quiz responses reveal a strong alignment with evidence-based thinking, scientific curiosity, and a drive to understand the natural world from the ground up.',
      'disc.why.insight.xh':   "You're wired to understand people and systems. Your answers show a natural curiosity about why societies work the way they do — and how to make them better.",
      'disc.why.insight.nv':   "You engage deeply with ideas, narratives, and the human condition. Your responses suggest you're a thinker who finds meaning in language, history, and moral questions.",
      'disc.why.insight.yt':   'Your care for human well-being and interest in biological systems makes health sciences a natural path. You scored high on empathy and precision — exactly what medicine demands.',
      'disc.why.insight.nn':   'Your connection to sustainability and the natural world shows up clearly. You care about feeding people, protecting ecosystems, and working in ways that feel grounded and real.',

      /* Spec detail */
      'spec.read_more':   'Read more',
      'spec.show_less':   'Show less',
      'spec.more':        '+{n} more',
      'spec.tag_default': 'Specialization',
      'spec.uni_soon':    'University data coming soon.',

      /* Loading — phase labels */
      'loading.phase.analyzing':  'Analyzing',
      'loading.phase.evaluating': 'Evaluating',
      'loading.phase.comparing':  'Comparing',
      'loading.phase.calculating':'Calculating',
      'loading.phase.finalizing': 'Finalizing',
      'loading.phase.title.dna':        'Your Academic DNA',
      'loading.phase.title.strengths':  'Your Key Strengths',
      'loading.phase.title.majors':     'Thousands of Majors',
      'loading.phase.title.compat':     'Your Compatibility',
      'loading.phase.title.results':    'Results Tailored for You',
      'loading.countdown':        '~{n} seconds left',
      'loading.finalizing_text':  'Finalizing...',
      'loading.milestone1.title': 'Analysis done!',
      'loading.milestone1.sub':   'Evaluating your strengths...',
      'loading.milestone2.title': 'Pattern found!',
      'loading.milestone2.sub':   'Matching against 2,400+ majors...',
      'loading.milestone3.title': 'Almost there!',
      'loading.milestone3.sub':   'Personalizing results for you...',

      /* DNA card */
      'dna.main_sub': 'Your strongest academic match',
      /* Clipboard errors */
      'err.copy_failed':  'Failed to copy',
      'err.paste_failed': 'Failed to paste',

      /* Edit profile — save feedback */
      'edit.save_success': '✓ Saved!',
      'edit.resetting':    'Resetting...',

      /* University matches */
      'uni.headline':        'Best Universities For You',
      'uni.subtext':         'Top institutions matching your academic profile, curated by our advanced matching engine.',
      'uni.lock_title':      'University Matches Locked',
      'uni.match':           'MATCH',
      'uni.ranking':         'Ranking',
      'uni.tuition':         'Annual Tuition',
      'uni.search_placeholder': 'Search universities...',
      'uni.sort.best_match': '↓ Best Match',
      'uni.sort.diverse':    '⚡ Diverse Mix',
      'uni.sort.employment': '↓ Employment',
      'uni.sort.alpha':      '↓ A → Z',
      'uni.results':         '— universities',
      'uni.saved':           '🤍 Saved',
      'uni.filter.title':    'Filters',
      'uni.filter.clear_all':'Clear all',
      'uni.filter.region':   'Region',
      'uni.filter.country':  'Country',
      'uni.filter.search_country': 'Search country…',
      'uni.filter.country_scoped': 'Country (within selected regions)',
      'uni.filter.aid':      'Financial Aid',
      'uni.filter.cancel':   'Cancel',
      'uni.filter.show':     'Show Results',
      'uni.compare':         'Compare',
      'uni.compare_btn':     'Compare →',
      'uni.compare_title':   'Compare Universities',
      'uni.compare_empty':   'Select universities from cards to compare.',
      'uni.compare_back':    '← Back',
      'uni.compare_clear':   'Clear all',
      /* University matches — additional JS strings */
      'uni.cta.view_program':     'View Program →',
      /* Compare bento labels */
      'uni.compare.match_score':        'Match Score',
      'uni.compare.match_score.sub':    'Highest fit based on your quiz signal.',
      'uni.compare.ranking':            'Ranking',
      'uni.compare.ranking.sub':        'Published rank or local positioning.',
      'uni.compare.employment':         'Employment',
      'uni.compare.employment.sub':     'Graduate employment outcome.',
      'uni.compare.tuition':            'Tuition',
      'uni.compare.tuition.sub':        'Estimated annual study cost.',
      'uni.compare.financial_aid':      'Financial Aid',
      'uni.compare.financial_aid.sub':  'Scholarship or need-based aid signal.',
      'uni.compare.students':           'Students',
      'uni.compare.students.sub':       'Approximate student body size.',
      'uni.count.singular':       ' university',
      'uni.count.plural':         ' universities',
      'uni.filter.show_n':        'Show {n} Result',
      'uni.filter.show_n_plural': 'Show {n} Results',
      'uni.country.none':         'No countries found',
      'uni.lock_body':            'Complete {n} more questions to unlock your best-fit universities.',
      'uni.no_saved':             'No saved universities yet.',
      'uni.no_saved_hint':        'Tap 🤍 on any card to save.',
      'uni.no_match':             'No universities match your filters.',
      'uni.load_more':            'Show {n} more',
      /* University detail */
      'uni.detail.why_match':  'Why I Match',
      'uni.detail.read_more':  'Read more',
      'uni.detail.show_less':  'Show less ↑',
      'uni.detail.view_all':   'View all {n} more programs ↓',

      /* Profile overview */
      'profile.no_bio':     'No bio available',
      'profile.subscription':'Subscription',
      'profile.edit':       'Edit Profile',
      'profile.settings':   'Account Settings',
      'profile.saved':      'Saved',
      'profile.report_bug': 'Report a Bug',

      /* Edit profile */
      'edit.title':           'Edit Profile',
      'edit.first_name':      'First Name',
      'edit.last_name':       'Last Name',
      'edit.email':           'Email',
      'edit.email_hint':      'Contact support to change the email.',
      'edit.location':        'Location',
      'edit.study':           'I want to study',
      'edit.study.abroad':    'Abroad',
      'edit.study.in_country':'In my country',
      'edit.study.either':    'Either',
      'edit.degree':          "I'm working toward a...",
      'edit.degree.bachelor': "Bachelor's Degree",
      'edit.degree.master':   "Master's Degree",
      'edit.degree.phd':      'PhD / Doctorate',
      'edit.degree.associate':"Associate's Degree",
      'edit.already_know':    'I already know what I want to study',
      'edit.save':            'Save Changes',
      'edit.leave_review':    'Leave Review',
      'edit.reset':           'Reset Account',
      'edit.logout':          'Logout',
      'edit.reset_title':     'Reset Account?',
      'edit.reset_body':      "This will clear all quiz progress and all your answers. You'll start fresh from Question 1.",
      'edit.reset_confirm':   'Reset & Start Over',
      'edit.cancel':          'Cancel',

      /* Account settings */
      'settings.title':            'Account Settings',
      'settings.language':         'Language',
      'settings.theme':            'Theme',
      'settings.notifications':    'Notifications',
      'settings.logout':           'Log Out',
      'settings.delete':           'Delete Account',
      'settings.theme_sheet_title':'Select Theme',
      'settings.theme.light':      'Light',
      'settings.theme.dark':       'Dark',
      'settings.theme.system':     'System',
      'settings.lang_sheet_title': 'Select Language',

      /* Language names (shown in language picker) */
      'lang.en': 'English',
      'lang.vi': 'Tiếng Việt',
      'lang.hi': 'हिन्दी',
      'lang.fr': 'Français',
      'lang.ar': 'العربية',
    },

    /* ── Tiếng Việt ─────────────────────────────────────────────────────── */
    vi: {
      /* Navigation */
      'nav.about_me':     'Về tôi',
      'nav.disciplines':  'Ngành học',
      'nav.majors':       'Chuyên ngành',
      'nav.universities': 'Trường ĐH',

      /* Home */
      'home.tagline':         'Khám phá bản sắc học thuật của bạn',
      'home.hero_q':          'Bạn quan tâm đến chuyên ngành nào?',
      'home.chip.cs':         'Khoa học máy tính',
      'home.chip.medicine':   'Y học',
      'home.chip.design':     'Thiết kế',
      'home.chip.business':   'Kinh doanh',
      'home.chip.education':  'Giáo dục',
      'home.chip.arts':       'Nghệ thuật',
      /* Home CTA buttons */
      'home.cta.start':       'Bắt đầu Quiz →',
      'home.cta.continue':    'Tiếp tục Quiz →',
      'home.cta.view_disc':   'Xem kết quả Ngành học ›',
      'home.cta.view_major':  'Xem kết quả Chuyên ngành ›',
      'home.cta.view_uni':    'Xem kết quả Trường đại học ›',
      'home.cta.view_match':  'Xem kết quả phù hợp →',
      /* Home hero states */
      'home.state0.tagline':  'Khám phá bản sắc học thuật của bạn',
      'home.state0.title':    'Bạn quan tâm đến chuyên ngành nào?',
      'home.state0.sub':      'Trả lời 30 câu hỏi và để AI tìm ra ngành học phù hợp nhất với bạn.',
      'home.state1.tagline':  'Hoàn thành giai đoạn 1!',
      'home.state1.title':    'Ngành học hàng đầu của bạn đã được tiết lộ 🔥',
      'home.state1.sub':      'Tiếp tục! Thêm 20 câu hỏi để mở khóa kết quả Chuyên ngành.',
      'home.state2.tagline':  'Hoàn thành giai đoạn 2!',
      'home.state2.title':    'AI đã tìm thấy kết quả Chuyên ngành của bạn ⚡',
      'home.state2.sub':      'Thêm 10 câu hỏi để mở khóa kết quả Trường đại học.',
      'home.state3.tagline':  'Hồ sơ hoàn chỉnh!',
      'home.state3.title':    'Bản sắc học thuật của bạn đã hoàn thiện ✨',
      'home.state3.sub':      'BeyonDegrees đã tìm thấy các trường đại học phù hợp nhất với bạn.',

      /* Loading */
      'loading.analyzing':      'Đang phân tích',
      'loading.dna_title':      'Hồ sơ học thuật của bạn',
      'loading.dna_forming':    'Đang tổng hợp hồ sơ học thuật',
      'loading.dna.humanities': 'Nhân văn',
      'loading.dna.agriculture':'Nông nghiệp',
      'loading.dna.social':     'Khoa học xã hội',
      'loading.dna.natural':    'Khoa học tự nhiên',
      'loading.done':           'Phân tích hoàn tất!',
      'loading.compiling':      'Đang tổng hợp kết quả...',
      'loading.ready':          'Kết quả đã sẵn sàng!',

      /* Results */
      'results.dna':              'Hồ sơ học thuật',
      'results.match_label':      'Độ phù hợp',
      'results.dna.label':        'Hồ sơ học thuật',
      'results.dna.share':        'Chia sẻ',
      'results.section.top_majors': 'Chuyên ngành phù hợp nhất',
      'results.major.view_path':  'Xem lộ trình →',
      'results.cta.explore':      'Khám phá tất cả chuyên ngành phù hợp →',
      'results.cta.retake':       '↺ Làm lại quiz',
      'results.cta.save':         '🔖 Lưu kết quả',
      'results.cta.saved':        '✅ Đã lưu!',
      'results.share_toast':      '✓ Link đã sao chép!',
      'results.dna.kt': 'Kỹ thuật & CN',
      'results.dna.tn': 'Khoa học TN',
      'results.dna.nv': 'Nhân văn',
      'results.dna.xh': 'Khoa học XH',
      'results.dna.yt': 'Y & Sức khoẻ',
      'results.dna.nn': 'Nông nghiệp',

      /* Quiz */
      'quiz.hint.drag':       'Kéo để trả lời',
      'quiz.hint.arrows':     '← →',
      'quiz.hint.hold':       'Giữ để đặt mức độ',
      'quiz.swipe.agree':     'ĐỒNG Ý ✓',
      'quiz.swipe.disagree':  'KHÔNG ✕',
      'quiz.swipe.strong':    'RẤT ĐỒNG Ý ⚡',
      'quiz.swipe.neutral':   'TRUNG LẬP –',
      'quiz.spec.disagree':   'Không đồng ý',
      'quiz.spec.agree':      'Đồng ý',
      'quiz.spec.neutral':    'Trung lập',
      'quiz.spec.confirm':    'Xác nhận ✓',
      'quiz.mode.swipe':      'Vuốt',
      'quiz.mode.spectrum':   'Thang điểm',

      /* Discipline match */
      'disc.headline':      'Ngành học',
      'disc.headline_em':   'Phù hợp nhất',
      'disc.subtext':       'Dựa trên câu trả lời của bạn, những lĩnh vực này phù hợp nhất với điểm mạnh nhận thức và định hướng nghề nghiệp của bạn.',
      'disc.caption':       'Hoàn thành quiz để khám phá hồ sơ học thuật của bạn ✨',
      'disc.lock_title':    'Kết quả chưa được mở khóa',
      'disc.lock_sub':      'Hoàn thành 10 câu hỏi để mở khóa kết quả Ngành học.',
      'disc.match':         'Phù hợp',
      'disc.why_match':     'Vì sao phù hợp? 🔍',
      'disc.career_paths':  'Lộ trình nghề nghiệp',
      'disc.cta.start':     'Bắt đầu Quiz →',
      'disc.cta.continue':  'Tiếp tục Quiz →',
      /* Discipline names */
      'disc.name.kt': 'Kỹ thuật & Công nghệ',
      'disc.name.tn': 'Khoa học tự nhiên',
      'disc.name.yt': 'Y & Khoa học sức khỏe',
      'disc.name.nn': 'Khoa học nông nghiệp',
      'disc.name.xh': 'Khoa học xã hội',
      'disc.name.nv': 'Nhân văn',
      /* Discipline short names */
      'disc.short.kt': 'Kỹ thuật',
      'disc.short.tn': 'Khoa học TN',
      'disc.short.yt': 'Y tế',
      'disc.short.nn': 'Nông nghiệp',
      'disc.short.xh': 'Khoa học XH',
      'disc.short.nv': 'Nhân văn',
      /* Discipline card descriptions */
      'disc.desc.kt': 'Bạn có khả năng lý luận phân tích mạnh và xu hướng tự nhiên trong giải quyết vấn đề có hệ thống và đổi mới khoa học.',
      'disc.desc.tn': 'Sự tò mò về thế giới vật lý và cách tiếp cận toán học trong quan sát phù hợp với các ngành khoa học sự sống và khoa học vật lý.',
      'disc.desc.yt': 'Sự đồng cảm và tư duy chính xác của bạn phù hợp với các con đường chăm sóc sức khỏe và y sinh tập trung vào cải thiện sức khỏe con người.',
      'disc.desc.nn': 'Cách tiếp cận thực tế với bền vững và khoa học sự sống giúp bạn phù hợp với nông học, khoa học thực phẩm và quản lý môi trường.',
      'disc.desc.xh': 'Sự quan tâm sâu sắc đến hành vi con người, cấu trúc xã hội và tương tác cá nhân làm cho đây là lĩnh vực phù hợp vừa phải cho hồ sơ của bạn.',
      'disc.desc.nv': 'Sự đánh giá cao của bạn về ngôn ngữ, văn hóa và tư duy phê phán tạo nền tảng trong các con đường văn học, triết học và lịch sử.',

      /* Major recommendations */
      'major.headline':     'Chuyên ngành dành cho bạn',
      'major.subtext':      'Khám phá các chuyên ngành phù hợp với sở thích và điểm mạnh của bạn.',
      'major.demand_high':  '🔥 Nhu cầu cao',
      'major.lock_title':   'Kết quả chưa được mở khóa',
      'major.lock_sub':     'Hoàn thành thêm câu hỏi để mở khóa chuyên ngành phù hợp nhất.',
      'major.filter.all':   'Tất cả',
      'major.filter.eng':   'Kỹ thuật',
      'major.filter.natural':'KH Tự nhiên',
      'major.filter.medical':'Y tế',
      'major.filter.agri':  'Nông nghiệp',
      'major.filter.social':'KH Xã hội',
      'major.filter.humanities':'Nhân văn',
      'major.compat':       'Độ phù hợp',
      'major.view_career':  'Xem lộ trình →',
      'major.no_results':   'Không có chuyên ngành nào cho bộ lọc này',
      'major.explore_hint': 'Những chuyên ngành này không phải thế mạnh chính, nhưng bạn vẫn có thể học nếu đam mê.',
      'major.top_picks':    'Lựa chọn hàng đầu',
      'major.also_fits':    'Cũng phù hợp',
      'major.explore_more': 'Khám phá thêm',
      'major.cta.continue': 'Tiếp tục Quiz →',
      'major.cta.finish':   'Hoàn thành Quiz →',
      /* Major detail page */
      'major.detail.why_title':     'Tại sao tôi phù hợp với ngành này?',
      'major.detail.why_sub':       'Xem câu trả lời quiz của bạn phù hợp với ngành học này như thế nào',
      'major.detail.specializations': 'Chuyên ngành',
      'major.detail.picker_title':  'Chọn ngành để xem',
      'major.detail.picker_sub':    'ngành có sẵn — nhấn để xem trước',

      /* Discipline detail */
      'disc.detail.unlock_banner': 'Hoàn thành thêm {n} câu hỏi để xem mức độ phù hợp của từng chuyên ngành',
      'disc.cta.finish':   'Hoàn thành Quiz →',

      /* Discipline why page */
      'disc.why.page_title':   'Vì sao tôi phù hợp 🔍',
      'disc.why.insight.kt':   'Câu trả lời của bạn cho thấy xu hướng mạnh về xây dựng, tối ưu hóa và đổi mới. Bạn tư duy theo hệ thống — và đó chính xác là điều kỹ thuật cần.',
      'disc.why.insight.tn':   'Phản hồi quiz của bạn cho thấy sự phù hợp mạnh với tư duy dựa trên bằng chứng, tò mò khoa học và khao khát hiểu thế giới tự nhiên từ căn bản.',
      'disc.why.insight.xh':   'Bạn được lập trình để hiểu con người và hệ thống. Câu trả lời của bạn cho thấy sự tò mò tự nhiên về lý do xã hội vận hành như vậy — và cách cải thiện chúng.',
      'disc.why.insight.nv':   'Bạn tương tác sâu với ý tưởng, câu chuyện và điều kiện con người. Phản hồi của bạn cho thấy bạn là người tư duy tìm thấy ý nghĩa trong ngôn ngữ, lịch sử và câu hỏi đạo đức.',
      'disc.why.insight.yt':   'Sự quan tâm đến sức khỏe con người và hệ thống sinh học làm cho khoa học sức khỏe trở thành con đường tự nhiên. Bạn đạt điểm cao về đồng cảm và chính xác — đúng những gì y học đòi hỏi.',
      'disc.why.insight.nn':   'Kết nối của bạn với bền vững và thế giới tự nhiên hiện rõ. Bạn quan tâm đến việc nuôi sống con người, bảo vệ hệ sinh thái và làm việc theo cách thực tế và có giá trị.',

      /* Spec detail */
      'spec.read_more':   'Xem thêm',
      'spec.show_less':   'Thu gọn',
      'spec.more':        '+{n} khác',
      'spec.tag_default': 'Chuyên ngành',
      'spec.uni_soon':    'Dữ liệu trường đại học sắp có.',

      /* Loading — phase labels */
      'loading.phase.analyzing':  'Đang phân tích',
      'loading.phase.evaluating': 'Đang đánh giá',
      'loading.phase.comparing':  'Đang so sánh',
      'loading.phase.calculating':'Đang tính toán',
      'loading.phase.finalizing': 'Đang hoàn thiện',
      'loading.phase.title.dna':        'Hồ sơ học thuật của bạn',
      'loading.phase.title.strengths':  'Điểm mạnh của bạn',
      'loading.phase.title.majors':     'Hàng nghìn chuyên ngành',
      'loading.phase.title.compat':     'Mức độ tương thích của bạn',
      'loading.phase.title.results':    'Kết quả dành riêng cho bạn',
      'loading.countdown':        '~{n} giây còn lại',
      'loading.finalizing_text':  'Đang hoàn thiện...',
      'loading.milestone1.title': 'Phân tích xong!',
      'loading.milestone1.sub':   'Đang đánh giá điểm mạnh của bạn...',
      'loading.milestone2.title': 'Tìm thấy xu hướng!',
      'loading.milestone2.sub':   'Đối chiếu với 2.400+ chuyên ngành...',
      'loading.milestone3.title': 'Sắp xong rồi!',
      'loading.milestone3.sub':   'Cá nhân hóa kết quả cho bạn...',

      /* DNA card */
      'dna.main_sub': 'Ngành học phù hợp nhất của bạn',
      /* Clipboard errors */
      'err.copy_failed':  'Sao chép thất bại',
      'err.paste_failed': 'Dán thất bại',

      /* Edit profile — save feedback */
      'edit.save_success': '✓ Đã lưu!',
      'edit.resetting':    'Đang đặt lại...',

      /* University matches */
      'uni.headline':        'Trường đại học tốt nhất dành cho bạn',
      'uni.subtext':         'Các trường hàng đầu phù hợp với hồ sơ học thuật của bạn, được chọn lọc bởi hệ thống AI.',
      'uni.lock_title':      'Kết quả chưa được mở khóa',
      'uni.match':           'PHÙ HỢP',
      'uni.ranking':         'Xếp hạng',
      'uni.tuition':         'Học phí/năm',
      'uni.search_placeholder': 'Tìm kiếm trường đại học...',
      'uni.sort.best_match': '↓ Phù hợp nhất',
      'uni.sort.diverse':    '⚡ Đa dạng',
      'uni.sort.employment': '↓ Việc làm',
      'uni.sort.alpha':      '↓ A → Z',
      'uni.results':         '— trường đại học',
      'uni.saved':           '🤍 Đã lưu',
      'uni.filter.title':    'Bộ lọc',
      'uni.filter.clear_all':'Xóa tất cả',
      'uni.filter.region':   'Khu vực',
      'uni.filter.country':  'Quốc gia',
      'uni.filter.search_country': 'Tìm quốc gia…',
      'uni.filter.country_scoped': 'Quốc gia (trong khu vực đã chọn)',
      'uni.filter.aid':      'Hỗ trợ tài chính',
      'uni.filter.cancel':   'Hủy',
      'uni.filter.show':     'Xem kết quả',
      'uni.compare':         'So sánh',
      'uni.compare_btn':     'So sánh →',
      'uni.compare_title':   'So sánh trường đại học',
      'uni.compare_empty':   'Chọn trường từ thẻ để so sánh.',
      'uni.compare_back':    '← Quay lại',
      'uni.compare_clear':   'Xóa tất cả',
      /* University matches — additional JS strings */
      'uni.cta.view_program':     'Xem chương trình →',
      /* Compare bento labels */
      'uni.compare.match_score':        'Điểm phù hợp',
      'uni.compare.match_score.sub':    'Mức độ phù hợp cao nhất dựa trên kết quả bài kiểm tra của bạn.',
      'uni.compare.ranking':            'Xếp hạng',
      'uni.compare.ranking.sub':        'Xếp hạng đã công bố hoặc vị trí tại địa phương.',
      'uni.compare.employment':         'Việc làm',
      'uni.compare.employment.sub':     'Tỷ lệ việc làm sau khi tốt nghiệp.',
      'uni.compare.tuition':            'Học phí',
      'uni.compare.tuition.sub':        'Chi phí học tập hàng năm ước tính.',
      'uni.compare.financial_aid':      'Hỗ trợ tài chính',
      'uni.compare.financial_aid.sub':  'Học bổng hoặc hỗ trợ tài chính theo nhu cầu.',
      'uni.compare.students':           'Sinh viên',
      'uni.compare.students.sub':       'Quy mô sinh viên xấp xỉ.',
      'uni.count.singular':       ' trường đại học',
      'uni.count.plural':         ' trường đại học',
      'uni.filter.show_n':        'Hiển thị {n} kết quả',
      'uni.filter.show_n_plural': 'Hiển thị {n} kết quả',
      'uni.country.none':         'Không tìm thấy quốc gia',
      'uni.lock_body':            'Hoàn thành thêm {n} câu hỏi để mở khóa các trường đại học phù hợp nhất.',
      'uni.no_saved':             'Chưa có trường đại học nào được lưu.',
      'uni.no_saved_hint':        'Nhấn 🤍 vào thẻ bất kỳ để lưu.',
      'uni.no_match':             'Không có trường đại học nào phù hợp với bộ lọc.',
      'uni.load_more':            'Hiển thị thêm {n}',
      /* University detail */
      'uni.detail.why_match':  'Vì sao phù hợp',
      'uni.detail.read_more':  'Xem thêm',
      'uni.detail.show_less':  'Thu gọn ↑',
      'uni.detail.view_all':   'Xem tất cả {n} chương trình khác ↓',

      /* Profile overview */
      'profile.no_bio':     'Chưa có thông tin',
      'profile.subscription':'Gói đăng ký',
      'profile.edit':       'Chỉnh sửa hồ sơ',
      'profile.settings':   'Cài đặt tài khoản',
      'profile.saved':      'Đã lưu',
      'profile.report_bug': 'Báo lỗi',

      /* Edit profile */
      'edit.title':           'Chỉnh sửa hồ sơ',
      'edit.first_name':      'Tên',
      'edit.last_name':       'Họ',
      'edit.email':           'Email',
      'edit.email_hint':      'Liên hệ hỗ trợ để thay đổi email.',
      'edit.location':        'Địa điểm',
      'edit.study':           'Tôi muốn học',
      'edit.study.abroad':    'Ở nước ngoài',
      'edit.study.in_country':'Ở trong nước',
      'edit.study.either':    'Cả hai đều được',
      'edit.degree':          'Tôi đang hướng đến...',
      'edit.degree.bachelor': 'Cử nhân',
      'edit.degree.master':   'Thạc sĩ',
      'edit.degree.phd':      'Tiến sĩ',
      'edit.degree.associate':'Cao đẳng',
      'edit.already_know':    'Tôi đã biết mình muốn học gì',
      'edit.save':            'Lưu thay đổi',
      'edit.leave_review':    'Đánh giá',
      'edit.reset':           'Đặt lại tài khoản',
      'edit.logout':          'Đăng xuất',
      'edit.reset_title':     'Đặt lại tài khoản?',
      'edit.reset_body':      'Điều này sẽ xóa toàn bộ tiến trình quiz và câu trả lời của bạn. Bạn sẽ bắt đầu lại từ Câu 1.',
      'edit.reset_confirm':   'Đặt lại & Bắt đầu lại',
      'edit.cancel':          'Hủy',

      /* Account settings */
      'settings.title':            'Cài đặt tài khoản',
      'settings.language':         'Ngôn ngữ',
      'settings.theme':            'Giao diện',
      'settings.notifications':    'Thông báo',
      'settings.logout':           'Đăng xuất',
      'settings.delete':           'Xóa tài khoản',
      'settings.theme_sheet_title':'Chọn giao diện',
      'settings.theme.light':      'Sáng',
      'settings.theme.dark':       'Tối',
      'settings.theme.system':     'Theo hệ thống',
      'settings.lang_sheet_title': 'Chọn ngôn ngữ',

      /* Language names */
      'lang.en': 'Tiếng Anh',
      'lang.vi': 'Tiếng Việt',
      'lang.hi': 'Tiếng Hindi',
      'lang.fr': 'Tiếng Pháp',
      'lang.ar': 'Tiếng Ả Rập',
    },

    /* ── हिन्दी ──────────────────────────────────────────────────────────── */
    hi: {
      /* Navigation */
      'nav.about_me':     'मेरे बारे में',
      'nav.disciplines':  'विषय',
      'nav.majors':       'प्रमुख विषय',
      'nav.universities': 'विश्वविद्यालय',

      /* Home */
      'home.tagline':        'अपनी शैक्षणिक पहचान खोजें',
      'home.hero_q':         'आप किस विषय में रुचि रखते हैं?',
      'home.chip.cs':        'कंप्यूटर विज्ञान',
      'home.chip.medicine':  'चिकित्सा',
      'home.chip.design':    'डिज़ाइन',
      'home.chip.business':  'व्यापार',
      'home.chip.education': 'शिक्षा',
      'home.chip.arts':      'कला',
      /* Home CTA buttons */
      'home.cta.start':      'Quiz शुरू करें →',
      'home.cta.continue':   'Quiz जारी रखें →',
      'home.cta.view_disc':  'विषय परिणाम देखें ›',
      'home.cta.view_major': 'प्रमुख विषय परिणाम देखें ›',
      'home.cta.view_uni':   'विश्वविद्यालय परिणाम देखें ›',
      'home.cta.view_match': 'मैच देखें →',

      /* Loading */
      'loading.analyzing':      'विश्लेषण हो रहा है',
      'loading.dna_title':      'आपका शैक्षणिक DNA',
      'loading.dna_forming':    'शैक्षणिक DNA बन रहा है',
      'loading.dna.humanities': 'मानविकी',
      'loading.dna.agriculture':'कृषि',
      'loading.dna.social':     'सामाजिक विज्ञान',
      'loading.dna.natural':    'प्राकृतिक विज्ञान',
      'loading.done':           'विश्लेषण पूर्ण!',
      'loading.compiling':      'परिणाम तैयार किए जा रहे हैं...',
      'loading.ready':          'परिणाम तैयार हैं!',

      /* Settings */
      'settings.title':            'खाता सेटिंग्स',
      'settings.language':         'भाषा',
      'settings.theme':            'थीम',
      'settings.notifications':    'सूचनाएं',
      'settings.logout':           'लॉग आउट',
      'settings.delete':           'खाता हटाएं',
      'settings.theme_sheet_title':'थीम चुनें',
      'settings.theme.light':      'लाइट',
      'settings.theme.dark':       'डार्क',
      'settings.theme.system':     'सिस्टम',
      'settings.lang_sheet_title': 'भाषा चुनें',

      /* Misc */
      'major.filter.all':  'सभी',
      'uni.filter.cancel': 'रद्द करें',
      'uni.filter.show':   'परिणाम दिखाएं',
      'uni.filter.clear_all':'सभी साफ करें',
      'edit.save':         'परिवर्तन सहेजें',
      'edit.logout':       'लॉग आउट',
      'edit.cancel':       'रद्द करें',
      'edit.reset_title':  'खाता रीसेट करें?',

      /* Language names */
      'lang.en': 'अंग्रेज़ी',
      'lang.vi': 'वियतनामी',
      'lang.hi': 'हिन्दी',
      'lang.fr': 'फ्रेंच',
      'lang.ar': 'अरबी',
    },

    /* ── Français ─────────────────────────────────────────────────────────  */
    fr: {
      /* Navigation */
      'nav.about_me':     'Mon profil',
      'nav.disciplines':  'Disciplines',
      'nav.majors':       'Filières',
      'nav.universities': 'Universités',

      /* Home */
      'home.tagline':        'Découvrez votre identité académique',
      'home.hero_q':         'Quelle filière vous intéresse?',
      'home.chip.cs':        'Informatique',
      'home.chip.medicine':  'Médecine',
      'home.chip.design':    'Design',
      'home.chip.business':  'Commerce',
      'home.chip.education': 'Éducation',
      'home.chip.arts':      'Arts',
      /* Home CTA buttons */
      'home.cta.start':      'Commencer le Quiz →',
      'home.cta.continue':   'Continuer le Quiz →',
      'home.cta.view_disc':  'Voir les résultats Disciplines ›',
      'home.cta.view_major': 'Voir les résultats Filières ›',
      'home.cta.view_uni':   'Voir les résultats Universités ›',
      'home.cta.view_match': 'Voir les correspondances →',

      /* Loading */
      'loading.analyzing':      'Analyse en cours',
      'loading.dna_title':      'Votre ADN académique',
      'loading.dna_forming':    'Formation de votre ADN académique',
      'loading.dna.humanities': 'Lettres & Sciences humaines',
      'loading.dna.agriculture':'Agriculture',
      'loading.dna.social':     'Sciences sociales',
      'loading.dna.natural':    'Sciences naturelles',
      'loading.done':           'Analyse terminée!',
      'loading.compiling':      'Compilation de vos résultats...',
      'loading.ready':          'Vos résultats sont prêts!',

      /* Results */
      'results.dna': 'ADN Académique',

      /* Discipline match */
      'disc.headline':    'Vos',
      'disc.headline_em': 'Disciplines Idéales',
      'disc.subtext':     'Sur la base de vos réponses, ces domaines correspondent le mieux à vos forces cognitives et à vos intérêts professionnels.',
      'disc.lock_title':  'Résultats verrouillés',
      'disc.lock_sub':    'Complétez 10 questions pour débloquer vos résultats.',
      'disc.match':       'Compatibilité',
      'disc.why_match':   'Pourquoi ce match? 🔍',
      'disc.career_paths':'Parcours professionnels',

      /* Major recommendations */
      'major.headline':     'Filières faites pour vous',
      'major.subtext':      'Découvrez des filières adaptées à vos intérêts et vos forces.',
      'major.lock_title':   'Résultats verrouillés',
      'major.filter.all':   'Tous',
      'major.compat':       'Compatibilité',
      'major.top_picks':    'Meilleurs choix',
      'major.also_fits':    'Convient aussi',
      'major.explore_more': 'Explorer plus',

      /* University matches */
      'uni.headline':        'Meilleures Universités pour Vous',
      'uni.subtext':         'Les meilleures institutions correspondant à votre profil académique, sélectionnées par notre moteur de matching.',
      'uni.lock_title':      'Universités verrouillées',
      'uni.match':           'MATCH',
      'uni.ranking':         'Classement',
      'uni.tuition':         'Frais annuels',
      'uni.filter.title':    'Filtres',
      'uni.filter.clear_all':'Tout effacer',
      'uni.filter.region':   'Région',
      'uni.filter.country':  'Pays',
      'uni.filter.aid':      'Aide financière',
      'uni.filter.cancel':   'Annuler',
      'uni.filter.show':     'Afficher les résultats',
      'uni.compare':         'Comparer',
      'uni.compare_title':   'Comparer les universités',
      'uni.compare_empty':   'Sélectionnez des universités pour les comparer.',

      /* Profile */
      'profile.no_bio':     'Aucune bio disponible',
      'profile.subscription':'Abonnement',
      'profile.edit':       'Modifier le profil',
      'profile.settings':   'Paramètres du compte',
      'profile.saved':      'Enregistré',
      'profile.report_bug': 'Signaler un bug',

      /* Edit profile */
      'edit.title':           'Modifier le profil',
      'edit.first_name':      'Prénom',
      'edit.last_name':       'Nom',
      'edit.email':           'E-mail',
      'edit.email_hint':      'Contactez le support pour changer votre e-mail.',
      'edit.location':        'Localisation',
      'edit.study':           'Je veux étudier',
      'edit.study.abroad':    'À l\'étranger',
      'edit.study.in_country':'Dans mon pays',
      'edit.study.either':    'Les deux',
      'edit.degree':          'Je prépare un...',
      'edit.degree.bachelor': 'Licence',
      'edit.degree.master':   'Master',
      'edit.degree.phd':      'Doctorat',
      'edit.degree.associate':'BTS / DUT',
      'edit.already_know':    'Je sais déjà ce que je veux étudier',
      'edit.save':            'Enregistrer',
      'edit.leave_review':    'Laisser un avis',
      'edit.reset':           'Réinitialiser le compte',
      'edit.logout':          'Déconnexion',
      'edit.reset_title':     'Réinitialiser le compte?',
      'edit.reset_confirm':   'Réinitialiser',
      'edit.cancel':          'Annuler',

      /* Settings */
      'settings.title':            'Paramètres du compte',
      'settings.language':         'Langue',
      'settings.theme':            'Thème',
      'settings.notifications':    'Notifications',
      'settings.logout':           'Se déconnecter',
      'settings.delete':           'Supprimer le compte',
      'settings.theme_sheet_title':'Sélectionner le thème',
      'settings.theme.light':      'Clair',
      'settings.theme.dark':       'Sombre',
      'settings.theme.system':     'Système',
      'settings.lang_sheet_title': 'Sélectionner la langue',

      /* Language names */
      'lang.en': 'Anglais',
      'lang.vi': 'Vietnamien',
      'lang.hi': 'Hindi',
      'lang.fr': 'Français',
      'lang.ar': 'Arabe',
    },

    /* ── العربية (RTL) ───────────────────────────────────────────────────── */
    ar: {
      /* Navigation */
      'nav.about_me':     'عني',
      'nav.disciplines':  'التخصصات',
      'nav.majors':       'المسارات',
      'nav.universities': 'الجامعات',

      /* Home */
      'home.tagline':        'اكتشف هويتك الأكاديمية',
      'home.hero_q':         'ما التخصص الذي يهمك؟',
      'home.chip.cs':        'علوم الحاسوب',
      'home.chip.medicine':  'الطب',
      'home.chip.design':    'التصميم',
      'home.chip.business':  'إدارة الأعمال',
      'home.chip.education': 'التربية والتعليم',
      'home.chip.arts':      'الفنون',
      /* Home CTA buttons */
      'home.cta.start':      'ابدأ الاختبار',
      'home.cta.continue':   'تابع الاختبار',
      'home.cta.view_disc':  'نتائج التخصصات',
      'home.cta.view_major': 'نتائج المسارات',
      'home.cta.view_uni':   'نتائج الجامعات',
      'home.cta.view_match': 'عرض التطابق',

      /* Loading */
      'loading.analyzing':      'جارٍ التحليل',
      'loading.dna_title':      'بصمتك الأكاديمية',
      'loading.dna_forming':    'جارٍ تشكيل البصمة الأكاديمية',
      'loading.dna.humanities': 'الإنسانيات',
      'loading.dna.agriculture':'الزراعة',
      'loading.dna.social':     'العلوم الاجتماعية',
      'loading.dna.natural':    'العلوم الطبيعية',
      'loading.done':           'اكتمل التحليل!',
      'loading.compiling':      'جارٍ تجميع نتائجك...',
      'loading.ready':          'نتائجك جاهزة!',

      /* Results */
      'results.dna': 'البصمة الأكاديمية',

      /* Discipline match */
      'disc.headline':    'تخصصاتك',
      'disc.headline_em': 'المثالية',
      'disc.subtext':     'بناءً على إجاباتك، هذه المجالات تتوافق مع نقاط قوتك المعرفية واهتماماتك المهنية.',
      'disc.lock_title':  'نتائج التخصص مقفلة',
      'disc.lock_sub':    'أكمل ١٠ أسئلة لفتح نتائج التخصص.',
      'disc.match':       'توافق',
      'disc.why_match':   'لماذا يناسبني؟ 🔍',
      'disc.career_paths':'المسارات المهنية',

      /* Major recommendations */
      'major.headline':     'تخصصات مصممة لك',
      'major.subtext':      'اكتشف تخصصات مناسبة لاهتماماتك ونقاط قوتك.',
      'major.lock_title':   'التخصصات مقفلة',
      'major.filter.all':   'الكل',
      'major.compat':       'التوافق',
      'major.top_picks':    'الاختيارات الأولى',
      'major.also_fits':    'يناسبك أيضاً',
      'major.explore_more': 'استكشف المزيد',

      /* University matches */
      'uni.headline':        'أفضل الجامعات لك',
      'uni.subtext':         'أفضل المؤسسات التي تتوافق مع ملفك الأكاديمي، مختارة بواسطة محرك المطابقة المتقدم.',
      'uni.lock_title':      'الجامعات مقفلة',
      'uni.match':           'توافق',
      'uni.ranking':         'التصنيف',
      'uni.tuition':         'الرسوم السنوية',
      'uni.filter.title':    'تصفية',
      'uni.filter.clear_all':'مسح الكل',
      'uni.filter.region':   'المنطقة',
      'uni.filter.country':  'الدولة',
      'uni.filter.aid':      'المساعدة المالية',
      'uni.filter.cancel':   'إلغاء',
      'uni.filter.show':     'عرض النتائج',
      'uni.compare':         'مقارنة',
      'uni.compare_title':   'مقارنة الجامعات',
      'uni.compare_empty':   'اختر جامعات من البطاقات للمقارنة.',

      /* Profile */
      'profile.no_bio':     'لا توجد نبذة',
      'profile.subscription':'الاشتراك',
      'profile.edit':       'تعديل الملف الشخصي',
      'profile.settings':   'إعدادات الحساب',
      'profile.saved':      'المحفوظات',
      'profile.report_bug': 'الإبلاغ عن خطأ',

      /* Edit profile */
      'edit.title':           'تعديل الملف الشخصي',
      'edit.first_name':      'الاسم الأول',
      'edit.last_name':       'اسم العائلة',
      'edit.email':           'البريد الإلكتروني',
      'edit.email_hint':      'تواصل مع الدعم لتغيير البريد الإلكتروني.',
      'edit.location':        'الموقع',
      'edit.study':           'أريد الدراسة',
      'edit.study.abroad':    'في الخارج',
      'edit.study.in_country':'في بلدي',
      'edit.study.either':    'كلاهما',
      'edit.degree':          'أسعى للحصول على...',
      'edit.degree.bachelor': 'بكالوريوس',
      'edit.degree.master':   'ماجستير',
      'edit.degree.phd':      'دكتوراه',
      'edit.degree.associate':'دبلوم',
      'edit.already_know':    'أعرف بالفعل ما أريد دراسته',
      'edit.save':            'حفظ التغييرات',
      'edit.leave_review':    'اترك تقييماً',
      'edit.reset':           'إعادة تعيين الحساب',
      'edit.logout':          'تسجيل الخروج',
      'edit.reset_title':     'إعادة تعيين الحساب؟',
      'edit.reset_confirm':   'إعادة التعيين والبدء من جديد',
      'edit.cancel':          'إلغاء',

      /* Settings */
      'settings.title':            'إعدادات الحساب',
      'settings.language':         'اللغة',
      'settings.theme':            'المظهر',
      'settings.notifications':    'الإشعارات',
      'settings.logout':           'تسجيل الخروج',
      'settings.delete':           'حذف الحساب',
      'settings.theme_sheet_title':'اختر المظهر',
      'settings.theme.light':      'فاتح',
      'settings.theme.dark':       'داكن',
      'settings.theme.system':     'تلقائي',
      'settings.lang_sheet_title': 'اختر اللغة',

      /* Language names */
      'lang.en': 'الإنجليزية',
      'lang.vi': 'الفيتنامية',
      'lang.hi': 'الهندية',
      'lang.fr': 'الفرنسية',
      'lang.ar': 'العربية',
    },
  };

  /* ── Engine ────────────────────────────────────────────────────────────── */
  window.BDi18n = {
    LANGS: LANGS,
    _lang: 'en',

    /** Translate a key with optional fallback to English */
    t: function (key) {
      return (T[this._lang] && T[this._lang][key] != null ? T[this._lang][key] : null)
          || (T.en[key] != null ? T.en[key] : key);
    },

    /** Apply a language: update DOM + persist to localStorage */
    apply: function (lang) {
      if (!T[lang]) lang = 'en';
      this._lang = lang;
      var meta = LANGS[lang] || LANGS.en;

      /* Update <html> attributes */
      document.documentElement.setAttribute('lang',      lang);
      document.documentElement.setAttribute('dir',       meta.dir);
      document.documentElement.setAttribute('data-lang', lang);

      /* Translate text content */
      var self = this;
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        el.textContent = self.t(el.getAttribute('data-i18n'));
      });

      /* Translate placeholder attributes */
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        el.setAttribute('placeholder', self.t(el.getAttribute('data-i18n-placeholder')));
      });

      /* Translate aria-label attributes */
      document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
        el.setAttribute('aria-label', self.t(el.getAttribute('data-i18n-aria')));
      });

      try { localStorage.setItem('bd-lang', lang); } catch (e) {}
    },

    /** Read saved lang and apply — call this on DOMContentLoaded */
    init: function () {
      var saved = 'en';
      try { saved = localStorage.getItem('bd-lang') || 'en'; } catch (e) {}
      if (!T[saved]) saved = 'en';
      this.apply(saved);
    },

    /** Current active language code */
    current: function () { return this._lang; },
  };

  /* Auto-init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { window.BDi18n.init(); });
  } else {
    window.BDi18n.init();
  }

})();
