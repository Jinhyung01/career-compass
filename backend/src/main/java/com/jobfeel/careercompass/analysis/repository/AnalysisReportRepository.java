package com.jobfeel.careercompass.analysis.repository;

import com.jobfeel.careercompass.analysis.domain.AnalysisReport;
import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnalysisReportRepository extends JpaRepository<AnalysisReport, Long> {

    @Query("""
            select report
            from AnalysisReport report
            where report.userId = :userId
              and (:reportType is null or report.reportType = :reportType)
              and (:status is null or report.status = :status)
            order by report.createdAt desc, report.reportId desc
            """)
    Page<AnalysisReport> findAllByUserIdAndFilters(
            @Param("userId") Long userId,
            @Param("reportType") ReportType reportType,
            @Param("status") ReportStatus status,
            Pageable pageable
    );
}
