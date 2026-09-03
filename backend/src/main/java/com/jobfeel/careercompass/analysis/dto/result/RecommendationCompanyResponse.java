package com.jobfeel.careercompass.analysis.dto.result;

import java.util.List;

public record RecommendationCompanyResponse(
        Integer rank,
        String companyCode,
        String companyName,
        Long positionId,
        String positionName,
        String reason,
        List<String> strengths,
        List<String> gaps,
        List<String> recommendedActions,
        String preparationDirection
) {
}
