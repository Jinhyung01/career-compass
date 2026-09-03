package com.jobfeel.careercompass.analysis.dto;

import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;

import java.time.OffsetDateTime;

public record ReportAcceptedResponse(
        Long reportId,
        ReportType reportType,
        ReportStatus status,
        OffsetDateTime createdAt
) {
}
