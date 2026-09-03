package com.jobfeel.careercompass.analysis.service;

import java.math.BigDecimal;
import java.util.List;

public record FitScoreResult(
        BigDecimal totalScore,
        List<Long> targetTechIds,
        List<Long> matchedTechIds,
        List<Long> missingTechIds,
        BigDecimal techScore,
        BigDecimal positionScore,
        BigDecimal projectExperienceScore,
        BigDecimal cultureScore,
        BigDecimal projectExperienceSimilarity,
        BigDecimal cultureSimilarity
) {
}
