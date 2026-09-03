CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE users (
    user_id      BIGSERIAL PRIMARY KEY,
    email        VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name         VARCHAR(50) NOT NULL,
    role         VARCHAR(20) NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE company (
    company_code VARCHAR(20) PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    industry     VARCHAR(50)
);

CREATE TABLE tech_stack (
    tech_id   BIGSERIAL PRIMARY KEY,
    tech_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE position (
    position_id   BIGSERIAL PRIMARY KEY,
    position_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE job_seeker_profile (
    user_id             BIGINT PRIMARY KEY,
    desired_position_id BIGINT,
    CONSTRAINT fk_jsp_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_jsp_position FOREIGN KEY (desired_position_id)
        REFERENCES position (position_id)
);

CREATE INDEX idx_job_seeker_profile_position
    ON job_seeker_profile (desired_position_id);

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

CREATE TABLE profile_content (
    content_id   BIGSERIAL PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    category     VARCHAR(20) NOT NULL,
    content      TEXT NOT NULL,
    content_hash VARCHAR(64),
    embedding    VECTOR(1536),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pc_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_profile_content_user
    ON profile_content (user_id);

CREATE TABLE company_insight (
    insight_id   BIGSERIAL PRIMARY KEY,
    company_code VARCHAR(20) NOT NULL,
    created_by   BIGINT,
    category     VARCHAR(20) NOT NULL,
    position_id  BIGINT,
    content      TEXT NOT NULL,
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
        REFERENCES position (position_id)
);

CREATE INDEX idx_company_insight_company
    ON company_insight (company_code);

CREATE INDEX idx_company_insight_created_by
    ON company_insight (created_by);

CREATE INDEX idx_company_insight_position
    ON company_insight (position_id);

CREATE INDEX idx_company_insight_embedding
    ON company_insight USING hnsw (embedding vector_cosine_ops);

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

CREATE TABLE analysis_report (
    report_id    BIGSERIAL PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    company_code VARCHAR(20),
    report_type  VARCHAR(20) NOT NULL,
    fit_score    NUMERIC(5, 2),
    pdf_url      VARCHAR(500),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ar_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_ar_company FOREIGN KEY (company_code)
        REFERENCES company (company_code)
        ON DELETE SET NULL
);

CREATE INDEX idx_analysis_report_user
    ON analysis_report (user_id);

CREATE INDEX idx_analysis_report_company
    ON analysis_report (company_code);

CREATE TABLE analysis_report_item (
    item_id   BIGSERIAL PRIMARY KEY,
    report_id BIGINT NOT NULL,
    item_type VARCHAR(30) NOT NULL,
    content   TEXT NOT NULL,
    CONSTRAINT fk_ari_report FOREIGN KEY (report_id)
        REFERENCES analysis_report (report_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_analysis_report_item_report
    ON analysis_report_item (report_id);
