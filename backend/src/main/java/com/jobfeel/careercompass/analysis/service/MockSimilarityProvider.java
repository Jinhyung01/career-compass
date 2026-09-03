package com.jobfeel.careercompass.analysis.service;

import com.jobfeel.careercompass.analysis.repository.AnalysisSourceQueryRepository;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Set;

/**
 * 임베딩 생성 전 단계의 유일한 Mock 경계다. 실제 OpenAI 연동 시 이 구현만 교체한다.
 */
@Component
public class MockSimilarityProvider implements SimilarityProvider {

    private static final BigDecimal PROJECT_SIMILARITY = new BigDecimal("0.7500");
    private static final BigDecimal CULTURE_SIMILARITY = new BigDecimal("0.8000");

    private final AnalysisSourceQueryRepository sourceQueryRepository;

    public MockSimilarityProvider(AnalysisSourceQueryRepository sourceQueryRepository) {
        this.sourceQueryRepository = sourceQueryRepository;
    }

    @Override
    public BigDecimal projectExperienceSimilarity(long userId, String companyCode, long positionId) {
        boolean hasProfileSource = sourceQueryRepository.existsProfileContent(
                userId, Set.of("PROJECT", "EXPERIENCE"));
        boolean hasCompanySource = sourceQueryRepository.existsCompanyInsight(
                companyCode, positionId, Set.of("PROJECT", "WORK", "ACTUAL_WORK", "HIRING", "TECH"));
        return hasProfileSource && hasCompanySource ? PROJECT_SIMILARITY : BigDecimal.ZERO;
    }

    @Override
    public BigDecimal cultureSimilarity(long userId, String companyCode, long positionId) {
        boolean hasProfileSource = sourceQueryRepository.existsProfileContent(
                userId, Set.of("PREFERRED_CULTURE"));
        boolean hasCompanySource = sourceQueryRepository.existsCompanyInsight(
                companyCode, positionId, Set.of("CULTURE", "TALENT", "VALUES"));
        return hasProfileSource && hasCompanySource ? CULTURE_SIMILARITY : BigDecimal.ZERO;
    }
}
