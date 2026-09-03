package com.jobfeel.careercompass.analysis.dto.result;

import java.util.List;

public record FitAnalysisResultResponse(
        String companyName,
        Long positionId,
        String positionName,
        ScoreDetailResponse scoreDetail,
        List<String> fitReasons,
        List<String> strengths,
        List<String> gaps,
        List<String> recommendedLearning,
        List<String> recommendedProjects,
        String preparationDirection,
        List<String> resumeHighlights
) {
}
