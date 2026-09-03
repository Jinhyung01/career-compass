package com.jobfeel.careercompass.auth.dto;

import java.time.OffsetDateTime;

public record UserResponse(
        long userId,
        String email,
        String name,
        String role,
        OffsetDateTime createdAt
) {
}
