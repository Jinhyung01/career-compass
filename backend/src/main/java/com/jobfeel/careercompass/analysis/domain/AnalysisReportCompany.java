package com.jobfeel.careercompass.analysis.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "analysis_report_company")
public class AnalysisReportCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_company_id")
    private Long reportCompanyId;

    @Column(name = "report_id", nullable = false)
    private Long reportId;

    @Column(name = "company_code", nullable = false)
    private String companyCode;

    @Column(name = "position_id", nullable = false)
    private Long positionId;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "fit_score")
    private BigDecimal fitScore;

    protected AnalysisReportCompany() {
    }

    public AnalysisReportCompany(
            Long reportId,
            String companyCode,
            Long positionId,
            Integer rank,
            BigDecimal fitScore
    ) {
        this.reportId = reportId;
        this.companyCode = companyCode;
        this.positionId = positionId;
        this.rank = rank;
        this.fitScore = fitScore;
    }

    public AnalysisReportCompany(
            Long reportCompanyId,
            Long reportId,
            String companyCode,
            Long positionId,
            Integer rank,
            BigDecimal fitScore
    ) {
        this.reportCompanyId = reportCompanyId;
        this.reportId = reportId;
        this.companyCode = companyCode;
        this.positionId = positionId;
        this.rank = rank;
        this.fitScore = fitScore;
    }

    public Long getReportCompanyId() {
        return reportCompanyId;
    }

    public Long getReportId() {
        return reportId;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public Long getPositionId() {
        return positionId;
    }

    public Integer getRank() {
        return rank;
    }

    public BigDecimal getFitScore() {
        return fitScore;
    }
}
