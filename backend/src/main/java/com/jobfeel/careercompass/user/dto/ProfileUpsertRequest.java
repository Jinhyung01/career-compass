package com.jobfeel.careercompass.user.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ProfileUpsertRequest(

        @NotNull
        Long desiredPositionId,

        // 중복 금지(DUPLICATE_TECH_STACK)와 존재 여부(INVALID_TECH_STACK)는 ProfileService 에서 검증한다.
        @NotNull
        List<@NotNull Long> techIds,

        @NotNull
        @Valid
        List<ProfileContentRequest> contents
) {
}
