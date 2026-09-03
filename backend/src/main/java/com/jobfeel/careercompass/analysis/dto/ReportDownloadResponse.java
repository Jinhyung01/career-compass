package com.jobfeel.careercompass.analysis.dto;

import java.time.OffsetDateTime;

public record ReportDownloadResponse(
        String fileName,
        String downloadUrl,
        OffsetDateTime expiresAt
) {
}
