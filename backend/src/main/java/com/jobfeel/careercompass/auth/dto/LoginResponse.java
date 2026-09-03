package com.jobfeel.careercompass.auth.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        UserSummary user
) {

    public record UserSummary(
            long userId,
            String name,
            String role
    ) {
    }
}
