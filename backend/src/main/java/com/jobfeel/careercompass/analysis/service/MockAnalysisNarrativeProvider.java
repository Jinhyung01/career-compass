package com.jobfeel.careercompass.analysis.service;

import org.springframework.stereotype.Component;

import java.util.List;

/**
 * OpenAI 연결 전까지 실제 응답 계약과 같은 구조를 반환하는 Mock AI 구현이다.
 */
@Component
public class MockAnalysisNarrativeProvider implements AnalysisNarrativeProvider {

    @Override
    public RecommendationNarrative recommendation(List<String> userTechNames) {
        List<String> strengths = userTechNames.isEmpty() ? List.of("프로필 경험") : userTechNames;
        return new RecommendationNarrative(
                "희망 직무와 등록된 기업 인사이트를 기준으로 추천했습니다.",
                strengths,
                List.of("기업별 실무 경험을 추가로 확인해 보세요."),
                List.of("기업 인사이트와 연결되는 프로젝트 경험을 정리하세요."),
                "지원 직무와 연결되는 경험을 구체적인 성과 중심으로 준비하세요."
        );
    }

    @Override
    public FitNarrative fitAnalysis(List<String> matchedTechNames, List<String> missingTechNames) {
        List<String> strengths = matchedTechNames.isEmpty() ? List.of("희망 직무 일치") : matchedTechNames;
        return new FitNarrative(
                List.of("기술, 직무, 프로젝트·경험, 조직문화의 네 항목을 가중 합산했습니다."),
                strengths,
                missingTechNames,
                missingTechNames,
                List.of("부족 기술을 활용한 작은 배포 프로젝트"),
                "점수 구성 항목 중 낮은 영역부터 근거 경험을 보강하세요.",
                matchedTechNames
        );
    }
}
