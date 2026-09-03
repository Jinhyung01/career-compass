package com.jobfeel.careercompass.analysis.dto.result;

import java.util.List;

public record RecommendResultResponse(
        List<RecommendationCompanyResponse> recommendations
) {
}
