package com.jobfeel.careercompass.analysis.dto.result;

import java.util.List;

public record ScoreDetailResponse(
        List<Long> targetTechIds,
        List<Long> matchedTechIds,
        List<Long> missingTechIds
) {
}
