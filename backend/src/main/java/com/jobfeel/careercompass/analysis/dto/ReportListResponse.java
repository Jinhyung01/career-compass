package com.jobfeel.careercompass.analysis.dto;

import java.util.List;

public record ReportListResponse(
        List<ReportListItemResponse> items,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
