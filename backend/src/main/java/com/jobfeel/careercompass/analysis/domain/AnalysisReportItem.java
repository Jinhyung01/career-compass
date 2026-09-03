package com.jobfeel.careercompass.analysis.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "analysis_report_item")
public class AnalysisReportItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "report_company_id", nullable = false)
    private Long reportCompanyId;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_type", nullable = false)
    private ReportItemType itemType;

    @Column(name = "content", nullable = false)
    private String content;

    protected AnalysisReportItem() {
    }

    public AnalysisReportItem(Long reportCompanyId, ReportItemType itemType, String content) {
        this.reportCompanyId = reportCompanyId;
        this.itemType = itemType;
        this.content = content;
    }

    public AnalysisReportItem(Long itemId, Long reportCompanyId, ReportItemType itemType, String content) {
        this.itemId = itemId;
        this.reportCompanyId = reportCompanyId;
        this.itemType = itemType;
        this.content = content;
    }

    public Long getItemId() {
        return itemId;
    }

    public Long getReportCompanyId() {
        return reportCompanyId;
    }

    public ReportItemType getItemType() {
        return itemType;
    }

    public String getContent() {
        return content;
    }
}
