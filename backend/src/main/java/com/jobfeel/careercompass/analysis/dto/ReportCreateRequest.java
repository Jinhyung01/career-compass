package com.jobfeel.careercompass.analysis.dto;

import com.jobfeel.careercompass.analysis.domain.ReportType;
import jakarta.validation.constraints.NotNull;

public record ReportCreateRequest(
        @NotNull ReportType reportType,
        String companyCode
) {
}
