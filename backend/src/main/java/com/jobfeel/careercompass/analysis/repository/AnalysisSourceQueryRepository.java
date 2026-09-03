package com.jobfeel.careercompass.analysis.repository;

import com.jobfeel.careercompass.analysis.domain.ReportType;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

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
}
