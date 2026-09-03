package com.jobfeel.careercompass.analysis.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "analysis_report")
public class AnalysisReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_type", nullable = false)
    private ReportType reportType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ReportStatus status;

    @Column(name = "error_code")
    private String errorCode;

    @Column(name = "pdf_object_key")
    private String pdfObjectKey;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "completed_at")
    private OffsetDateTime completedAt;

    protected AnalysisReport() {
    }

    public AnalysisReport(
            Long reportId,
            Long userId,
            ReportType reportType,
            ReportStatus status,
            String errorCode,
            String pdfObjectKey,
            OffsetDateTime createdAt,
            OffsetDateTime completedAt
    ) {
        this.reportId = reportId;
        this.userId = userId;
        this.reportType = reportType;
        this.status = status;
        this.errorCode = errorCode;
        this.pdfObjectKey = pdfObjectKey;
        this.createdAt = createdAt;
        this.completedAt = completedAt;
    }

    public Long getReportId() {
        return reportId;
    }

    public Long getUserId() {
        return userId;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public ReportStatus getStatus() {
        return status;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getPdfObjectKey() {
        return pdfObjectKey;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getCompletedAt() {
        return completedAt;
    }
}
