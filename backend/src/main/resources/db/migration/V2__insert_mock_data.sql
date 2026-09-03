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
    ('C001', 'SK hynix', '반도체'),
    ('C002', 'SK AX', 'IT서비스'); 


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

-- Actual authentication and weighted fit-score seed adjustments
UPDATE users
SET password_hash = '$2a$10$4GW2iklZa5nqepUkGR2kvOIYDzpp08egpcpDl9A0EbQNI8ERksyTe'
WHERE user_id = 1;

CREATE UNIQUE INDEX uq_users_email_lower ON users (LOWER(email));

UPDATE analysis_report_company
SET fit_score = 81.00
WHERE report_company_id = 603;

UPDATE analysis_report_item
SET content = $$
{
  "targetTechIds": [101, 102, 103, 104],
  "matchedTechIds": [101, 102, 103],
  "missingTechIds": [104],
  "techScore": 22.50,
  "positionScore": 20.00,
  "projectExperienceScore": 22.50,
  "cultureScore": 16.00,
  "projectExperienceSimilarity": 0.7500,
  "cultureSimilarity": 0.8000
}
$$::json::text
WHERE report_company_id = 603
  AND item_type = 'SCORE_DETAIL';

UPDATE analysis_report_item
SET content = $$["기술, 직무, 프로젝트·경험, 조직문화의 네 항목을 가중 합산했습니다."]$$::json::text
WHERE report_company_id = 603
  AND item_type = 'FIT_REASONS';

-- Company catalog and statistics
UPDATE company
SET company_name = 'SK hynix',
    industry = '반도체'
WHERE company_code = 'C001';

UPDATE company
SET company_name = 'SK AX',
    industry = 'IT서비스'
WHERE company_code = 'C002';

INSERT INTO company (company_code, company_name, industry) VALUES
    ('C003', '삼성전자', '전자'),
    ('C004', '포스코', '철강'),
    ('C005', 'CJ대한통운', '물류'),
    ('C006', '롯데백화점', '유통'),
    ('C007', '현대자동차', '자동차'),
    ('C008', '기아', '자동차'),
    ('C009', 'LG전자', '전자'),
    ('C010', 'LG에너지솔루션', '배터리'),
    ('C011', '네이버', 'IT플랫폼'),
    ('C012', '카카오', 'IT플랫폼'),
    ('C013', '쿠팡', '이커머스'),
    ('C014', 'KT', '통신'),
    ('C015', 'SK텔레콤', '통신'),
    ('C016', '대한항공', '항공'),
    ('C017', '한화시스템', 'ICT'),
    ('C018', 'HD현대', '중공업'),
    ('C019', 'KB국민은행', '금융'),
    ('C020', '신한은행', '금융');

INSERT INTO company (company_code, company_name, industry) VALUES
    ('C021', '파운드리원', '반도체'),
    ('C022', '실리콘웨이브', '반도체'),
    ('C023', '엣지메모리', '반도체'),
    ('C024', '코어다이', '반도체'),
    ('C025', '나노브릿지', '반도체'),
    ('C026', '웨이퍼링크', '반도체'),
    ('C027', '마이크로픽셀', '반도체'),
    ('C028', '오로라칩', '반도체'),
    ('C029', '테라소자', '반도체'),
    ('C030', '블루다이오드', '반도체'),
    ('C031', '세미큐브', '반도체'),
    ('C032', '리드실리콘', '반도체'),
    ('C033', '칩포레스트', '반도체'),
    ('C034', '인텔리다이', '반도체'),
    ('C035', '모듈러스칩', '반도체'),
    ('C036', '웨이퍼랩스', '반도체'),
    ('C037', '소자플로우', '반도체'),
    ('C038', '실리콘포지', '반도체'),
    ('C039', '크리스탈웨이퍼', '반도체'),
    ('C040', '하이브다이', '반도체'),
    ('C041', '메모리펄스', '반도체'),
    ('C042', '나노포커스', '반도체'),
    ('C043', '칩메이커스', '반도체'),
    ('C044', '다이노바', '반도체'),
    ('C045', '포토닉스랩', '반도체'),
    ('C046', '클라우드포지', 'IT서비스'),
    ('C047', '브릿지웍스', 'IT서비스'),
    ('C048', '루멘소프트', 'IT서비스'),
    ('C049', '데이터캐노피', 'IT서비스'),
    ('C050', '스택하버', 'IT서비스'),
    ('C051', '플로우코드', 'IT서비스'),
    ('C052', '모노클라우드', 'IT서비스'),
    ('C053', '큐브스택', 'IT서비스'),
    ('C054', '코어링크', 'IT서비스'),
    ('C055', '스파크온', 'IT서비스'),
    ('C056', '그로스웨이브', 'IT서비스'),
    ('C057', '네오파이프', 'IT서비스'),
    ('C058', '코드브릭', 'IT서비스'),
    ('C059', '오픈메트릭', 'IT서비스'),
    ('C060', '프리즘테크', 'IT서비스'),
    ('C061', '비트포레스트', 'IT서비스'),
    ('C062', '넥스트큐', 'IT서비스'),
    ('C063', '스위프트랩', 'IT서비스'),
    ('C064', '에이펙스데이터', 'IT서비스'),
    ('C065', '인사이트웍스', 'IT서비스'),
    ('C066', '패킷랩', 'IT서비스'),
    ('C067', '테크노트', 'IT서비스'),
    ('C068', '솔리드웨어', 'IT서비스'),
    ('C069', '링크메이커', 'IT서비스'),
    ('C070', '스페이스오브', 'IT서비스'),
    ('C071', '픽앤플로우', '이커머스'),
    ('C072', '마켓브리즈', '이커머스'),
    ('C073', '데일리픽', '이커머스'),
    ('C074', '오브젝트룸', '이커머스'),
    ('C075', '포켓플랜', '이커머스'),
    ('C076', '테이블온', '이커머스'),
    ('C077', '리빙메이트', '이커머스'),
    ('C078', '모먼트샵', '이커머스'),
    ('C079', '셀렉트웨이', '이커머스'),
    ('C080', '온더바스켓', '이커머스'),
    ('C081', '스타일포트', '이커머스'),
    ('C082', '플레이트랩', '이커머스'),
    ('C083', '마일드마켓', '이커머스'),
    ('C084', '카트웨이브', '이커머스'),
    ('C085', '홈픽셀', '이커머스'),
    ('C086', '그린바스켓', '이커머스'),
    ('C087', '큐레이션랩', '이커머스'),
    ('C088', '딜라이트몰', '이커머스'),
    ('C089', '버티컬픽', '이커머스'),
    ('C090', '포레스트웨어', '이커머스'),
    ('C091', '리테일노바', '이커머스'),
    ('C092', '스토어메트릭', '이커머스'),
    ('C093', '브랜드픽', '이커머스'),
    ('C094', '오더브릿지', '이커머스'),
    ('C095', '라이프캐비닛', '이커머스'),
    ('C096', '핀브릿지', '금융'),
    ('C097', '머니웨이브', '금융'),
    ('C098', '클리어캐시', '금융'),
    ('C099', '코인포트', '금융'),
    ('C100', '페이로직', '금융'),
    ('C101', '인슈어랩', '금융'),
    ('C102', '뱅크플로우', '금융'),
    ('C103', '크레딧포레스트', '금융'),
    ('C104', '세이프월렛', '금융'),
    ('C105', '머니큐브', '금융'),
    ('C106', '캐시노트랩', '금융'),
    ('C107', '파이낸스온', '금융'),
    ('C108', '리스크메이커', '금융'),
    ('C109', '밸런스페이', '금융'),
    ('C110', '이지론', '금융'),
    ('C111', '알파시큐어', '금융'),
    ('C112', '포트폴리오뱅크', '금융'),
    ('C113', '페이퍼리스', '금융'),
    ('C114', '자산플래닛', '금융'),
    ('C115', '마이캐피탈', '금융'),
    ('C116', '트러스트핀', '금융'),
    ('C117', '세이프브릿지', '금융'),
    ('C118', '인베스트큐', '금융'),
    ('C119', '페이체인', '금융'),
    ('C120', '라이프파이낸셜', '금융');

UPDATE company AS company_row
SET people = mock_count.people,
    insight = mock_count.insight
FROM (VALUES
    ('C001', 12, 34),
    ('C002', 9, 27),
    ('C003', 15, 45),
    ('C004', 8, 22),
    ('C005', 9, 25),
    ('C006', 10, 29),
    ('C007', 14, 41),
    ('C008', 11, 33),
    ('C009', 13, 37),
    ('C010', 10, 30),
    ('C011', 16, 48),
    ('C012', 15, 44),
    ('C013', 14, 42),
    ('C014', 9, 26),
    ('C015', 12, 36),
    ('C016', 7, 19),
    ('C017', 8, 23),
    ('C018', 9, 27),
    ('C019', 11, 31),
    ('C020', 10, 28),
    ('C021', 11, 31),
    ('C022', 8, 24),
    ('C023', 7, 19),
    ('C024', 10, 28),
    ('C025', 6, 17),
    ('C026', 5, 15),
    ('C027', 9, 26),
    ('C028', 8, 22),
    ('C029', 12, 35),
    ('C030', 4, 12),
    ('C031', 7, 20),
    ('C032', 6, 18),
    ('C033', 5, 14),
    ('C034', 9, 27),
    ('C035', 6, 16),
    ('C036', 8, 23),
    ('C037', 4, 11),
    ('C038', 10, 29),
    ('C039', 7, 21),
    ('C040', 5, 13),
    ('C041', 11, 32),
    ('C042', 6, 17),
    ('C043', 8, 25),
    ('C044', 5, 14),
    ('C045', 4, 10),
    ('C046', 14, 40),
    ('C047', 10, 29),
    ('C048', 9, 26),
    ('C049', 12, 34),
    ('C050', 8, 23),
    ('C051', 7, 21),
    ('C052', 11, 30),
    ('C053', 6, 17),
    ('C054', 13, 37),
    ('C055', 8, 25),
    ('C056', 5, 15),
    ('C057', 9, 27),
    ('C058', 7, 20),
    ('C059', 10, 28),
    ('C060', 6, 18),
    ('C061', 8, 24),
    ('C062', 12, 33),
    ('C063', 5, 14),
    ('C064', 7, 19),
    ('C065', 9, 26),
    ('C066', 4, 12),
    ('C067', 8, 22),
    ('C068', 6, 16),
    ('C069', 5, 13),
    ('C070', 7, 20),
    ('C071', 10, 28),
    ('C072', 8, 24),
    ('C073', 7, 20),
    ('C074', 6, 17),
    ('C075', 9, 25),
    ('C076', 5, 14),
    ('C077', 8, 22),
    ('C078', 4, 11),
    ('C079', 11, 31),
    ('C080', 7, 19),
    ('C081', 9, 27),
    ('C082', 6, 16),
    ('C083', 5, 13),
    ('C084', 8, 23),
    ('C085', 4, 10),
    ('C086', 7, 18),
    ('C087', 6, 15),
    ('C088', 10, 29),
    ('C089', 5, 12),
    ('C090', 8, 21),
    ('C091', 9, 26),
    ('C092', 6, 17),
    ('C093', 5, 14),
    ('C094', 7, 19),
    ('C095', 4, 9),
    ('C096', 13, 38),
    ('C097', 10, 30),
    ('C098', 8, 23),
    ('C099', 6, 17),
    ('C100', 11, 32),
    ('C101', 7, 20),
    ('C102', 9, 27),
    ('C103', 5, 14),
    ('C104', 6, 16),
    ('C105', 8, 22),
    ('C106', 7, 19),
    ('C107', 10, 28),
    ('C108', 8, 24),
    ('C109', 5, 13),
    ('C110', 9, 25),
    ('C111', 4, 12),
    ('C112', 6, 15),
    ('C113', 7, 18),
    ('C114', 5, 14),
    ('C115', 8, 21),
    ('C116', 6, 17),
    ('C117', 4, 10),
    ('C118', 7, 19),
    ('C119', 9, 26),
    ('C120', 5, 13)
) AS mock_count(company_code, people, insight)
WHERE company_row.company_code = mock_count.company_code;

UPDATE company_insight
SET content = '반도체 제조와 데이터 처리 업무를 지원하는 Java와 Spring 기반 백엔드 시스템을 운영합니다.'
WHERE insight_id = 201;

UPDATE company_insight
SET content = '기술 전문성과 협업을 바탕으로 지속적인 학습과 문제 해결을 중시합니다.'
WHERE insight_id = 202;

UPDATE company_insight
SET content = '데이터 플랫폼과 제조 시스템을 개발할 백엔드 개발자를 채용합니다.'
WHERE insight_id = 203;

UPDATE company_insight
SET content = '기업의 AI 전환과 디지털 서비스를 위한 Java와 Spring 기반 백엔드 시스템을 개발합니다.'
WHERE insight_id = 204;

UPDATE company_insight
SET content = '고객의 문제를 AI와 디지털 기술로 해결하며 협업과 기술 공유를 중시합니다.'
WHERE insight_id = 205;

UPDATE company_insight
SET content = '엔터프라이즈 시스템과 AI 서비스 개발 경험이 있는 백엔드 개발자를 채용합니다.'
WHERE insight_id = 206;
