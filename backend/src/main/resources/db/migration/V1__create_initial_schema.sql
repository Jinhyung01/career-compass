-- =========================================================
-- 취업 플랫폼 서비스 스키마 v3 (PostgreSQL + pgvector)
-- 최신 DBML(users / job_position / analysis_report_company 구조) 기준
--
-- 필요 라이브러리: pgvector 확장 (PostgreSQL 서버에 사전 설치 필요)
--   - 최소 버전: 0.5.0 이상 (HNSW 인덱싱 지원 최초 버전)
--   - 권장 버전: 0.5.1 이상 (HNSW 성능 개선, l1_distance 등 추가)
--   - 설치 확인: SELECT * FROM pg_extension WHERE extname = 'vector';
--   - 관리형 서비스(AWS RDS, Neon, Supabase 등) 사용 시 대부분 기본 지원됨
-- 호환 PostgreSQL 버전: 12 이상 (pgvector 0.5.0 기준 RDS는 12.16-R2 이상에서 지원)
-- =========================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- ---------------------------------------------------------
-- 1. users
-- ---------------------------------------------------------
CREATE TABLE users (
    user_id       BIGSERIAL PRIMARY KEY,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name          VARCHAR(50)  NOT NULL,
    role          VARCHAR(20)  NOT NULL,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------
-- 2. company
-- ---------------------------------------------------------
CREATE TABLE company (
    company_code VARCHAR(20)  PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    industry     VARCHAR(50),
    people       INTEGER      NOT NULL DEFAULT 0 CHECK (people >= 0),
    insight      INTEGER      NOT NULL DEFAULT 0 CHECK (insight >= 0)
);

-- ---------------------------------------------------------
-- 3. tech_stack
-- ---------------------------------------------------------
CREATE TABLE tech_stack (
    tech_id   BIGSERIAL PRIMARY KEY,
    tech_name VARCHAR(50) NOT NULL UNIQUE
);

-- ---------------------------------------------------------
-- 4. job_position ('position'은 SQL 예약어라 사용 불가하여 개명)
-- ---------------------------------------------------------
CREATE TABLE job_position (
    position_id   BIGSERIAL PRIMARY KEY,
    position_name VARCHAR(100) NOT NULL UNIQUE
);

-- ---------------------------------------------------------
-- 5. job_seeker_profile
-- ---------------------------------------------------------
CREATE TABLE job_seeker_profile (
    user_id             BIGINT PRIMARY KEY,
    desired_position_id BIGINT,
    CONSTRAINT fk_jsp_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_jsp_position FOREIGN KEY (desired_position_id)
        REFERENCES job_position (position_id)
);

CREATE INDEX idx_job_seeker_profile_position
    ON job_seeker_profile (desired_position_id);

-- ---------------------------------------------------------
-- 6. job_seeker_tech
-- ---------------------------------------------------------
CREATE TABLE job_seeker_tech (
    user_id BIGINT NOT NULL,
    tech_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, tech_id),
    CONSTRAINT fk_jst_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_jst_tech FOREIGN KEY (tech_id)
        REFERENCES tech_stack (tech_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_job_seeker_tech_tech
    ON job_seeker_tech (tech_id);

-- ---------------------------------------------------------
-- 7. profile_content (쿼리 재료 — HNSW 인덱스 없음)
-- ---------------------------------------------------------
CREATE TABLE profile_content (
    content_id   BIGSERIAL PRIMARY KEY,
    user_id      BIGINT      NOT NULL,
    category     VARCHAR(20) NOT NULL,
    content      TEXT        NOT NULL,
    content_hash VARCHAR(64),
    embedding    VECTOR(1536),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pc_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_profile_content_user
    ON profile_content (user_id);

-- ---------------------------------------------------------
-- 8. company_insight (검색 대상 코퍼스 — HNSW 인덱스 필수)
-- ---------------------------------------------------------
CREATE TABLE company_insight (
    insight_id   BIGSERIAL PRIMARY KEY,
    company_code VARCHAR(20) NOT NULL,
    created_by   BIGINT,
    category     VARCHAR(20) NOT NULL,
    position_id  BIGINT,
    content      TEXT        NOT NULL,
    content_hash VARCHAR(64),
    embedding    VECTOR(1536),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ci_company FOREIGN KEY (company_code)
        REFERENCES company (company_code)
        ON DELETE CASCADE,
    CONSTRAINT fk_ci_admin FOREIGN KEY (created_by)
        REFERENCES users (user_id)
        ON DELETE SET NULL,
    CONSTRAINT fk_ci_position FOREIGN KEY (position_id)
        REFERENCES job_position (position_id)
);

CREATE INDEX idx_company_insight_company
    ON company_insight (company_code);

CREATE INDEX idx_company_insight_created_by
    ON company_insight (created_by);

CREATE INDEX idx_company_insight_position
    ON company_insight (position_id);

-- HNSW 인덱스: pgvector 0.5.0 이상 필요 (그 이전 버전은 ivfflat만 지원)
CREATE INDEX idx_company_insight_embedding
    ON company_insight USING hnsw (embedding vector_cosine_ops);

-- ---------------------------------------------------------
-- 9. company_insight_tech
-- ---------------------------------------------------------
CREATE TABLE company_insight_tech (
    insight_id BIGINT NOT NULL,
    tech_id    BIGINT NOT NULL,
    PRIMARY KEY (insight_id, tech_id),
    CONSTRAINT fk_cit_insight FOREIGN KEY (insight_id)
        REFERENCES company_insight (insight_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_cit_tech FOREIGN KEY (tech_id)
        REFERENCES tech_stack (tech_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_company_insight_tech_tech
    ON company_insight_tech (tech_id);

-- ---------------------------------------------------------
-- 10. analysis_report (헤더 — company_code/fit_score는 하위 테이블로 이동)
-- ---------------------------------------------------------
CREATE TABLE analysis_report (
    report_id     BIGSERIAL PRIMARY KEY,
    user_id       BIGINT      NOT NULL,
    report_type   VARCHAR(20) NOT NULL,
    status        VARCHAR(20) NOT NULL DEFAULT 'PENDING',   -- PENDING/PROCESSING/COMPLETED/FAILED
    error_code    VARCHAR(50),                              -- 실패 시 원인 코드
    pdf_object_key VARCHAR(500),                            -- 객체 스토리지 키(불변). URL은 API가 요청시점에 서명 발급
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 요청 시각(requested_at 겸용)
    completed_at  TIMESTAMPTZ,                               -- 완료 시각, 처리시간 = completed_at - created_at
    CONSTRAINT fk_ar_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT chk_ar_report_type CHECK (report_type IN ('RECOMMEND', 'FIT_ANALYSIS')),
    CONSTRAINT chk_ar_status CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'))
);

CREATE INDEX idx_analysis_report_user
    ON analysis_report (user_id);

-- ---------------------------------------------------------
-- 11. analysis_report_company (리포트 내 기업별 결과, 1:N)
--     RECOMMEND: N행(rank 사용) / FIT_ANALYSIS: 항상 1행(fit_score 사용)
-- ---------------------------------------------------------
CREATE TABLE analysis_report_company (
    report_company_id BIGSERIAL PRIMARY KEY,
    report_id         BIGINT      NOT NULL,
    company_code      VARCHAR(20) NOT NULL,
    position_id       BIGINT      NOT NULL,   -- 분석 시점에 사용된 대상 직무 (API 결과의 positionId 보존)
    rank              INT,
    fit_score         NUMERIC(5,2),
    CONSTRAINT fk_arc_report FOREIGN KEY (report_id)
        REFERENCES analysis_report (report_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_arc_company FOREIGN KEY (company_code)
        REFERENCES company (company_code),
    CONSTRAINT fk_arc_position FOREIGN KEY (position_id)
        REFERENCES job_position (position_id),
    CONSTRAINT chk_arc_rank CHECK (rank IS NULL OR rank > 0),
    CONSTRAINT chk_arc_fit_score CHECK (fit_score IS NULL OR (fit_score >= 0 AND fit_score <= 100)),
    CONSTRAINT uq_arc_report_company UNIQUE (report_id, company_code),  -- 같은 리포트 내 기업 중복 추천 방지
    CONSTRAINT uq_arc_report_rank UNIQUE (report_id, rank)              -- 같은 리포트 내 순위 중복 방지
);

CREATE INDEX idx_analysis_report_company_report
    ON analysis_report_company (report_id);

CREATE INDEX idx_analysis_report_company_company
    ON analysis_report_company (company_code);

CREATE INDEX idx_analysis_report_company_position
    ON analysis_report_company (position_id);

-- ---------------------------------------------------------
-- 12. analysis_report_item (report_id가 아닌 report_company_id 참조)
-- ---------------------------------------------------------
CREATE TABLE analysis_report_item (
    item_id           BIGSERIAL PRIMARY KEY,
    report_company_id BIGINT      NOT NULL,
    item_type         VARCHAR(30) NOT NULL,
    content           TEXT        NOT NULL,
    CONSTRAINT fk_ari_report_company FOREIGN KEY (report_company_id)
        REFERENCES analysis_report_company (report_company_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_analysis_report_item_report_company
    ON analysis_report_item (report_company_id);
