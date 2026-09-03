package com.jobfeel.careercompass.user.dto;

import java.time.OffsetDateTime;

public record ProfileContentResponse(
        long contentId,
        String category,
        String content,
        OffsetDateTime createdAt
) {
}
