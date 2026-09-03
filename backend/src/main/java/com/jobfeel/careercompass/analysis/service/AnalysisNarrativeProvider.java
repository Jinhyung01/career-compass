package com.jobfeel.careercompass.analysis.service;

import java.util.List;

public interface AnalysisNarrativeProvider {

    RecommendationNarrative recommendation(List<String> userTechNames);

    FitNarrative fitAnalysis(List<String> matchedTechNames, List<String> missingTechNames);

    record RecommendationNarrative(
            String reason,
            List<String> strengths,
            List<String> gaps,
            List<String> recommendedActions,
            String preparationDirection
    ) {
    }

    record FitNarrative(
            List<String> fitReasons,
            List<String> strengths,
            List<String> gaps,
            List<String> recommendedLearning,
            List<String> recommendedProjects,
            String preparationDirection,
            List<String> resumeHighlights
    ) {
    }
}
