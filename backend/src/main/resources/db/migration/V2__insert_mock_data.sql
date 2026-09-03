-- Master data
INSERT INTO users (
    user_id, email, password_hash, name, role, created_at
) VALUES (
    1,
    'seeker@example.com',
    'mock-password-not-used',
    '홍길동',
    'JOB_SEEKER',
    '2026-09-03T01:00:00Z'
);

INSERT INTO job_position (
    position_id, position_name
) VALUES (
    10, '백엔드 개발자'
);

INSERT INTO tech_stack (
    tech_id, tech_name
) VALUES
    (101, 'Java'),
    (102, 'Spring'),
    (103, 'PostgreSQL'),
    (104, 'Docker');

INSERT INTO company (
    company_code, company_name, industry
) VALUES
    ('C001', '예시테크', 'IT'),
    ('C002', '클라우드나인', 'IT');


-- Profile data
INSERT INTO job_seeker_profile (
    user_id, desired_position_id
) VALUES (
    1, 10
);

INSERT INTO job_seeker_tech (
    user_id, tech_id
) VALUES
    (1, 101),
    (1, 102),
    (1, 103);

INSERT INTO profile_content (
    content_id,
    user_id,
    category,
    content,
    content_hash,
    embedding,
    created_at
) VALUES
    (
        1001,
        1,
        'PROJECT',
        'Spring Boot로 채팅 REST API를 구현했습니다.',
        NULL,
        NULL,
        '2026-09-03T01:10:00Z'
    ),
    (
        1002,
        1,
        'EXPERIENCE',
        '팀 프로젝트에서 백엔드 API 설계와 코드 리뷰를 담당했습니다.',
        NULL,
        NULL,
        '2026-09-03T01:10:00Z'
    ),
    (
        1003,
        1,
        'STUDY',
        '운영체제와 데이터베이스 스터디에 참여했습니다.',
        NULL,
        NULL,
        '2026-09-03T01:10:00Z'
    ),
    (
        1004,
        1,
        'PREFERRED_CULTURE',
        '학습과 협업을 중시하는 문화를 선호합니다.',
        NULL,
        NULL,
        '2026-09-03T01:10:00Z'
    );


-- Company insight data
INSERT INTO company_insight (
    insight_id,
    company_code,
    created_by,
    category,
    position_id,
    content,
    content_hash,
    embedding,
    created_at
) VALUES
    (
        201,
        'C001',
        NULL,
        'TECH',
        10,
        'Java와 Spring 기반의 백엔드 서비스를 운영하며 PostgreSQL과 Docker를 사용합니다.',
        NULL,
        NULL,
        '2026-09-03T01:20:00Z'
    ),
    (
        202,
        'C001',
        NULL,
        'CULTURE',
        10,
        '코드 리뷰와 기술 공유를 통해 함께 성장하는 문화를 지향합니다.',
        NULL,
        NULL,
        '2026-09-03T01:20:00Z'
    ),
    (
        203,
        'C001',
        NULL,
        'HIRING',
        10,
        'REST API 개발과 데이터베이스 설계 경험이 있는 백엔드 개발자를 채용합니다.',
        NULL,
        NULL,
        '2026-09-03T01:20:00Z'
    ),
    (
        204,
        'C002',
        NULL,
        'TECH',
        10,
        '클라우드 환경에서 데이터 중심의 백엔드 서비스를 개발하고 운영합니다.',
        NULL,
        NULL,
        '2026-09-03T01:20:00Z'
    ),
    (
        205,
        'C002',
        NULL,
        'CULTURE',
        10,
        '자율적인 협업과 지속적인 학습을 중요하게 생각합니다.',
        NULL,
        NULL,
        '2026-09-03T01:20:00Z'
    ),
    (
        206,
        'C002',
        NULL,
        'HIRING',
        10,
        '데이터베이스와 클라우드 환경에 관심이 있는 백엔드 개발자를 채용합니다.',
        NULL,
        NULL,
        '2026-09-03T01:20:00Z'
    );

INSERT INTO company_insight_tech (
    insight_id, tech_id
) VALUES
    (201, 101),
    (201, 102),
    (201, 103),
    (201, 104);


-- Analysis report data
INSERT INTO analysis_report (
    report_id,
    user_id,
    report_type,
    status,
    error_code,
    pdf_object_key,
    created_at,
    completed_at
) VALUES
    (
        501,
        1,
        'RECOMMEND',
        'COMPLETED',
        NULL,
        'reports/501.pdf',
        '2026-09-03T02:00:00Z',
        '2026-09-03T02:00:18Z'
    ),
    (
        502,
        1,
        'FIT_ANALYSIS',
        'COMPLETED',
        NULL,
        'reports/502.pdf',
        '2026-09-03T02:05:00Z',
        '2026-09-03T02:05:16Z'
    ),
    (
        503,
        1,
        'RECOMMEND',
        'PROCESSING',
        NULL,
        NULL,
        '2026-09-03T02:08:00Z',
        NULL
    ),
    (
        504,
        1,
        'FIT_ANALYSIS',
        'FAILED',
        'LLM_GENERATION_FAILED',
        NULL,
        '2026-09-03T02:10:00Z',
        '2026-09-03T02:10:04Z'
    );

INSERT INTO analysis_report_company (
    report_company_id,
    report_id,
    company_code,
    position_id,
    rank,
    fit_score
) VALUES
    (601, 501, 'C001', 10, 1, NULL),
    (602, 501, 'C002', 10, 2, NULL),
    (603, 502, 'C001', 10, NULL, 75.00);


-- Recommendation result: C001
INSERT INTO analysis_report_item (
    item_id, report_company_id, item_type, content
) VALUES
    (
        701,
        601,
        'REASON',
        $$"Spring 프로젝트 경험과 기업 기술 정보가 잘 맞습니다."$$::json::text
    ),
    (
        702,
        601,
        'STRENGTHS',
        $$["Java", "Spring", "PostgreSQL"]$$::json::text
    ),
    (
        703,
        601,
        'GAPS',
        $$["Docker 운영 경험"]$$::json::text
    ),
    (
        704,
        601,
        'RECOMMENDED_ACTIONS',
        $$["Docker 기반 배포 프로젝트 수행"]$$::json::text
    ),
    (
        705,
        601,
        'PREPARATION_DIRECTION',
        $$"운영과 배포 경험을 보강하세요."$$::json::text
    );


-- Recommendation result: C002
INSERT INTO analysis_report_item (
    item_id, report_company_id, item_type, content
) VALUES
    (
        706,
        602,
        'REASON',
        $$"데이터베이스 학습 경험이 직무 정보와 관련됩니다."$$::json::text
    ),
    (
        707,
        602,
        'STRENGTHS',
        $$["PostgreSQL"]$$::json::text
    ),
    (
        708,
        602,
        'GAPS',
        $$["클라우드 경험"]$$::json::text
    ),
    (
        709,
        602,
        'RECOMMENDED_ACTIONS',
        $$["클라우드 배포 실습"]$$::json::text
    ),
    (
        710,
        602,
        'PREPARATION_DIRECTION',
        $$"클라우드 환경의 서비스 운영 경험을 만드세요."$$::json::text
    );


-- Fit analysis result: C001
INSERT INTO analysis_report_item (
    item_id, report_company_id, item_type, content
) VALUES
    (
        711,
        603,
        'SCORE_DETAIL',
        $$
        {
          "targetTechIds": [101, 102, 103, 104],
          "matchedTechIds": [101, 102, 103],
          "missingTechIds": [104]
        }
        $$::json::text
    ),
    (
        712,
        603,
        'FIT_REASONS',
        $$["핵심 백엔드 기술 4개 중 3개를 보유했습니다."]$$::json::text
    ),
    (
        713,
        603,
        'STRENGTHS',
        $$["Java", "Spring", "PostgreSQL"]$$::json::text
    ),
    (
        714,
        603,
        'GAPS',
        $$["Docker"]$$::json::text
    ),
    (
        715,
        603,
        'RECOMMENDED_LEARNING',
        $$["Docker 이미지와 컨테이너 네트워크"]$$::json::text
    ),
    (
        716,
        603,
        'RECOMMENDED_PROJECTS',
        $$["Docker 기반 채팅 서비스 배포"]$$::json::text
    ),
    (
        717,
        603,
        'PREPARATION_DIRECTION',
        $$"개발 경험을 실제 배포 경험으로 확장하세요."$$::json::text
    ),
    (
        718,
        603,
        'RESUME_HIGHLIGHTS',
        $$["Spring Boot 기반 채팅 REST API 구현 경험"]$$::json::text
    );


-- Synchronize BIGSERIAL sequences after inserting fixed IDs
SELECT setval(
    pg_get_serial_sequence('users', 'user_id'),
    (SELECT MAX(user_id) FROM users),
    true
);

SELECT setval(
    pg_get_serial_sequence('tech_stack', 'tech_id'),
    (SELECT MAX(tech_id) FROM tech_stack),
    true
);

SELECT setval(
    pg_get_serial_sequence('job_position', 'position_id'),
    (SELECT MAX(position_id) FROM job_position),
    true
);

SELECT setval(
    pg_get_serial_sequence('profile_content', 'content_id'),
    (SELECT MAX(content_id) FROM profile_content),
    true
);

SELECT setval(
    pg_get_serial_sequence('company_insight', 'insight_id'),
    (SELECT MAX(insight_id) FROM company_insight),
    true
);

SELECT setval(
    pg_get_serial_sequence('analysis_report', 'report_id'),
    (SELECT MAX(report_id) FROM analysis_report),
    true
);

SELECT setval(
    pg_get_serial_sequence(
        'analysis_report_company',
        'report_company_id'
    ),
    (SELECT MAX(report_company_id) FROM analysis_report_company),
    true
);

SELECT setval(
    pg_get_serial_sequence('analysis_report_item', 'item_id'),
    (SELECT MAX(item_id) FROM analysis_report_item),
    true
);