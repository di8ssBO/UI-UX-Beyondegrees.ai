-- ============ BeyonDegrees schema 0001_init ============
-- Khớp với bộ CSV gốc trong BeyonDegrees-UI/data.
-- Quy ước id: disciplines/majors/specializations/assertions GIỮ id gốc từ CSV
-- (để khoá ngoại khớp). universities dùng id serial riêng + name UNIQUE
-- (vì junction tham chiếu trường/chuyên ngành theo TÊN, không theo id).

CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- cho gen_random_uuid()

-- ---------- Dữ liệu tham chiếu ----------
CREATE TABLE disciplines (
  id          integer PRIMARY KEY,     -- id gốc từ CSV (vd 71..76)
  name        text NOT NULL,
  description text
);

CREATE TABLE majors (
  id            integer PRIMARY KEY,    -- id gốc
  discipline_id integer REFERENCES disciplines(id),
  name          text NOT NULL,
  description   text
);
CREATE INDEX idx_majors_discipline ON majors(discipline_id);

CREATE TABLE specializations (
  id                    integer PRIMARY KEY,  -- id gốc
  name                  text NOT NULL,
  description           text,
  admission_requirements text,
  recommended_skills    text,
  entrance_exams        text,
  language_requirements text
);
CREATE INDEX idx_spec_name ON specializations(lower(name));

CREATE TABLE universities (
  id          serial PRIMARY KEY,       -- id riêng (CSV id intl/VN trùng nhau)
  name        text UNIQUE NOT NULL,     -- junction khớp theo tên
  location    text,
  country     text,                     -- 'Vietnam' cho file VN
  website     text,
  global_rank text,
  source      text                      -- 'intl' | 'vn'
);
CREATE INDEX idx_univ_country ON universities(country);

-- Junction: trường ⇄ chuyên ngành (15k+ dòng)
CREATE TABLE university_specialization_levels (
  id                 bigserial PRIMARY KEY,
  university_id      integer NOT NULL REFERENCES universities(id),
  specialization_id  integer NOT NULL REFERENCES specializations(id),
  level              text,
  duration           text,
  UNIQUE (university_id, specialization_id, level)
);
CREATE INDEX idx_usl_univ ON university_specialization_levels(university_id);
CREATE INDEX idx_usl_spec ON university_specialization_levels(specialization_id);

-- Ngân hàng câu hỏi (352 assertion)
CREATE TABLE assertions (
  id             integer PRIMARY KEY,   -- id gốc
  content        text NOT NULL,
  has_discipline boolean DEFAULT false,
  has_major      boolean DEFAULT false,
  has_university boolean DEFAULT false,
  stage          char(1) NOT NULL CHECK (stage IN ('d','m','u')),
  is_active      boolean DEFAULT true
);
CREATE INDEX idx_assertions_stage ON assertions(stage);

-- ---------- Người dùng & bài làm ----------
CREATE TABLE profiles (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email        text,
  display_name text,
  locale       text,
  created_at   timestamptz DEFAULT now()
);

CREATE TABLE assessments (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id   uuid REFERENCES profiles(id),       -- NULL = ẩn danh
  device       text CHECK (device IN ('mobile','desktop')),
  locale       text NOT NULL,
  status       text NOT NULL DEFAULT 'in_progress'
                 CHECK (status IN ('in_progress','completed','abandoned')),
  created_at   timestamptz DEFAULT now(),
  completed_at timestamptz
);
CREATE INDEX idx_assessments_profile ON assessments(profile_id);

CREATE TABLE assessment_answers (
  id            bigserial PRIMARY KEY,
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  assertion_id  integer NOT NULL REFERENCES assertions(id),
  position      integer NOT NULL,                  -- thứ tự câu (1..30)
  answer_value  integer NOT NULL CHECK (answer_value BETWEEN 1 AND 5),
  answer_label  text NOT NULL
                  CHECK (answer_label IN
                    ('Absolutely agree','Agree','Unsure','Disagree','Totally disagree')),
  stage         char(1) CHECK (stage IN ('d','m','u')),
  created_at    timestamptz DEFAULT now(),
  UNIQUE (assessment_id, position)
);
CREATE INDEX idx_answers_assessment ON assessment_answers(assessment_id);

CREATE TABLE assessment_results (
  id             bigserial PRIMARY KEY,
  assessment_id  uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  top_discipline text,
  ratios         jsonb,           -- matching ratio từng discipline
  riasec         jsonb,           -- điểm RIASEC nếu có
  raw_ai_output  jsonb,           -- toàn bộ output AI để truy vết
  created_at     timestamptz DEFAULT now()
);
CREATE INDEX idx_results_assessment ON assessment_results(assessment_id);

-- Log mỗi lần gọi AI (phục vụ "I/O logging" ở Buổi 9)
CREATE TABLE assessment_events (
  id            bigserial PRIMARY KEY,
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE,
  event_type    text NOT NULL,    -- 'ai_call','fallback','error'...
  payload       jsonb,
  created_at    timestamptz DEFAULT now()
);
CREATE INDEX idx_events_assessment ON assessment_events(assessment_id);
