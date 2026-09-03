package com.jobfeel.careercompass.analysis.repository;

import com.jobfeel.careercompass.analysis.domain.AnalysisReportCompany;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalysisReportCompanyRepository extends JpaRepository<AnalysisReportCompany, Long> {

    List<AnalysisReportCompany> findAllByReportIdOrderByRankAsc(Long reportId);
}
