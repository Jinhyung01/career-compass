package com.jobfeel.careercompass.analysis.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ReportListItemResponse(
        Long reportId,
        ReportType reportType,
        ReportStatus status,
        String companyCode,
        String companyName,
        BigDecimal fitScore,
        OffsetDateTime createdAt,
        @JsonInclude(JsonInclude.Include.ALWAYS) OffsetDateTime completedAt
) {
}
