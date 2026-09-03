package com.jobfeel.careercompass.auth.dto;

import java.time.Instant;

public record UserResponse(
        long userId,
        String email,
        String name,
        String role,
        Instant createdAt
) {
}
