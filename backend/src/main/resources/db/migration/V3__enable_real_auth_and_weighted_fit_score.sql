-- V1/V2 are immutable after merge. This migration upgrades the seed account for
-- BCrypt login and aligns the seeded fit report with the 30/20/30/20 score model.

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
