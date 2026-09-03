package com.jobfeel.careercompass.user.dto;

import java.util.List;

public record ProfileResponse(
        long userId,
        PositionResponse desiredPosition,
        List<TechStackResponse> techStacks,
        List<ProfileContentResponse> contents
) {
}
