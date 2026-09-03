package com.jobfeel.careercompass.analysis.repository;

import com.jobfeel.careercompass.analysis.domain.ReportType;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
@Lazy
public class AnalysisSourceQueryRepository {

    private final JdbcTemplate jdbcTemplate;

    public AnalysisSourceQueryRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<Long> findDesiredPositionId(long userId) {
        try {
            Long positionId = jdbcTemplate.queryForObject(
                    "select desired_position_id from job_seeker_profile where user_id = ?",
                    Long.class,
                    userId
            );
            return Optional.ofNullable(positionId);
        } catch (EmptyResultDataAccessException exception) {
            return Optional.empty();
        }
    }

    public boolean existsCompany(String companyCode) {
        Long count = jdbcTemplate.queryForObject(
                "select count(*) from company where company_code = ?",
                Long.class,
                companyCode
        );
        return count != null && count > 0;
    }

    public boolean existsTargetTech(String companyCode, long positionId) {
        Long count = jdbcTemplate.queryForObject(
                """
                select count(distinct insight_tech.tech_id)
                from company_insight insight
                join company_insight_tech insight_tech on insight_tech.insight_id = insight.insight_id
                where insight.company_code = ?
                  and (insight.position_id = ? or insight.position_id is null)
                """,
                Long.class,
                companyCode,
                positionId
        );
        return count != null && count > 0;
    }

    public List<Long> findUserTechIds(long userId) {
        return jdbcTemplate.queryForList(
                "select tech_id from job_seeker_tech where user_id = ? order by tech_id",
                Long.class,
                userId
        );
    }

    public List<Long> findTargetTechIds(String companyCode, long positionId) {
        return jdbcTemplate.queryForList(
                """
                select distinct insight_tech.tech_id
                from company_insight insight
                join company_insight_tech insight_tech on insight_tech.insight_id = insight.insight_id
                where insight.company_code = ?
                  and (insight.position_id = ? or insight.position_id is null)
                order by insight_tech.tech_id
                """,
                Long.class,
                companyCode,
                positionId
        );
    }

    public boolean matchesPosition(String companyCode, long desiredPositionId) {
        Long count = jdbcTemplate.queryForObject(
                """
                select count(*)
                from company_insight
                where company_code = ? and position_id = ?
                """,
                Long.class,
                companyCode,
                desiredPositionId
        );
        return count != null && count > 0;
    }

    public boolean existsProfileContent(long userId, Collection<String> categories) {
        if (categories.isEmpty()) {
            return false;
        }
        String placeholders = String.join(",", Collections.nCopies(categories.size(), "?"));
        Object[] parameters = new Object[categories.size() + 1];
        parameters[0] = userId;
        int index = 1;
        for (String category : categories) {
            parameters[index++] = category;
        }
        Long count = jdbcTemplate.queryForObject(
                "select count(*) from profile_content where user_id = ? and category in (" + placeholders + ")",
                Long.class,
                parameters
        );
        return count != null && count > 0;
    }

    public boolean existsCompanyInsight(
            String companyCode,
            long positionId,
            Collection<String> categories
    ) {
        if (categories.isEmpty()) {
            return false;
        }
        String placeholders = String.join(",", Collections.nCopies(categories.size(), "?"));
        Object[] parameters = new Object[categories.size() + 2];
        parameters[0] = companyCode;
        parameters[1] = positionId;
        int index = 2;
        for (String category : categories) {
            parameters[index++] = category;
        }
        Long count = jdbcTemplate.queryForObject(
                """
                select count(*) from company_insight
                where company_code = ?
                  and (position_id = ? or position_id is null)
                  and category in (""" + placeholders + ")",
                Long.class,
                parameters
        );
        return count != null && count > 0;
    }

    public List<CompanyCandidate> findRecommendationCandidates(long positionId, int limit) {
        return jdbcTemplate.query(
                """
                select company.company_code, company.company_name
                from company
                where exists (
                    select 1 from company_insight insight
                    where insight.company_code = company.company_code
                      and (insight.position_id = ? or insight.position_id is null)
                )
                order by company.company_code
                limit ?
                """,
                (rs, rowNum) -> new CompanyCandidate(
                        rs.getString("company_code"),
                        rs.getString("company_name")
                ),
                positionId,
                limit
        );
    }

    public Map<Long, String> findTechNames(Collection<Long> techIds) {
        if (techIds.isEmpty()) {
            return Map.of();
        }
        String placeholders = String.join(",", Collections.nCopies(techIds.size(), "?"));
        Map<Long, String> names = new LinkedHashMap<>();
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                "select tech_id, tech_name from tech_stack where tech_id in (" + placeholders + ")",
                techIds.toArray()
        );
        for (Map<String, Object> row : rows) {
            names.put(((Number) row.get("tech_id")).longValue(), (String) row.get("tech_name"));
        }
        return names;
    }

    public boolean existsInProgressReport(
            long userId,
            ReportType reportType,
            String companyCode,
            long positionId
    ) {
        String sql = reportType == ReportType.RECOMMEND
                ? """
                  select count(*)
                  from analysis_report report
                  join analysis_report_company report_company on report_company.report_id = report.report_id
                  where report.user_id = ?
                    and report.report_type = 'RECOMMEND'
                    and report.status in ('PENDING', 'PROCESSING')
                    and report_company.position_id = ?
                  """
                : """
                  select count(*)
                  from analysis_report report
                  join analysis_report_company report_company on report_company.report_id = report.report_id
                  where report.user_id = ?
                    and report.report_type = 'FIT_ANALYSIS'
                    and report.status in ('PENDING', 'PROCESSING')
                    and report_company.position_id = ?
                    and report_company.company_code = ?
                  """;

        Long count = reportType == ReportType.RECOMMEND
                ? jdbcTemplate.queryForObject(sql, Long.class, userId, positionId)
                : jdbcTemplate.queryForObject(sql, Long.class, userId, positionId, companyCode);
        return count != null && count > 0;
    }

    public Optional<String> findCompanyName(String companyCode) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(
                    "select company_name from company where company_code = ?",
                    String.class,
                    companyCode
            ));
        } catch (EmptyResultDataAccessException exception) {
            return Optional.empty();
        }
    }

    public Optional<String> findPositionName(long positionId) {
        try {
            return Optional.ofNullable(jdbcTemplate.queryForObject(
                    "select position_name from job_position where position_id = ?",
                    String.class,
                    positionId
            ));
        } catch (EmptyResultDataAccessException exception) {
            return Optional.empty();
        }
    }

    public record CompanyCandidate(String companyCode, String companyName) {
    }
}
