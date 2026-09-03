package com.jobfeel.careercompass.analysis.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ReportResponse(
        Long reportId,
        ReportType reportType,
        ReportStatus status,
        OffsetDateTime createdAt,
        @JsonInclude(JsonInclude.Include.ALWAYS) OffsetDateTime completedAt,
        String companyCode,
        BigDecimal fitScore,
        @JsonInclude(JsonInclude.Include.ALWAYS) Object result,
        @JsonInclude(JsonInclude.Include.ALWAYS) ReportErrorResponse error,
        boolean pdfReady
) {
}
