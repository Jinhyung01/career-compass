package com.jobfeel.careercompass.analysis.repository;

import com.jobfeel.careercompass.analysis.domain.AnalysisReportItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface AnalysisReportItemRepository extends JpaRepository<AnalysisReportItem, Long> {

    List<AnalysisReportItem> findAllByReportCompanyIdIn(Collection<Long> reportCompanyIds);
}
