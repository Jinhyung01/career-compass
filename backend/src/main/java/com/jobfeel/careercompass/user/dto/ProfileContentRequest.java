package com.jobfeel.careercompass.user.dto;

import jakarta.validation.constraints.NotBlank;

public record ProfileContentRequest(

        // 허용값(PROJECT/EXPERIENCE/STUDY/PREFERRED_CULTURE) 검증은 ProfileService 에서
        // INVALID_PROFILE_CATEGORY 로 처리한다.
        @NotBlank
        String category,

        @NotBlank
        String content
) {
}
