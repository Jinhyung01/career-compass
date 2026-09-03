package com.jobfeel.careercompass.analysis.service;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class FitScoreCalculator {

    private static final BigDecimal TECH_WEIGHT = new BigDecimal("30");
    private static final BigDecimal POSITION_WEIGHT = new BigDecimal("20");
    private static final BigDecimal PROJECT_WEIGHT = new BigDecimal("30");
    private static final BigDecimal CULTURE_WEIGHT = new BigDecimal("20");

    public FitScoreResult calculate(
            List<Long> userTechIds,
            List<Long> targetTechIds,
            boolean positionMatches,
            BigDecimal projectExperienceSimilarity,
            BigDecimal cultureSimilarity
    ) {
        if (targetTechIds.isEmpty()) {
            throw new IllegalArgumentException("적합도 계산에는 기업 기술 정보가 필요합니다.");
        }

        Set<Long> userTechSet = new HashSet<>(userTechIds);
        List<Long> matched = targetTechIds.stream().filter(userTechSet::contains).sorted().toList();
        List<Long> missing = targetTechIds.stream().filter(id -> !userTechSet.contains(id)).sorted().toList();

        BigDecimal techScore = BigDecimal.valueOf(matched.size())
                .divide(BigDecimal.valueOf(targetTechIds.size()), 8, RoundingMode.HALF_UP)
                .multiply(TECH_WEIGHT)
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal positionScore = positionMatches
                ? POSITION_WEIGHT.setScale(2)
                : BigDecimal.ZERO.setScale(2);
        BigDecimal normalizedProjectSimilarity = normalize(projectExperienceSimilarity);
        BigDecimal normalizedCultureSimilarity = normalize(cultureSimilarity);
        BigDecimal projectScore = normalizedProjectSimilarity.multiply(PROJECT_WEIGHT)
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal cultureScore = normalizedCultureSimilarity.multiply(CULTURE_WEIGHT)
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = techScore.add(positionScore).add(projectScore).add(cultureScore)
                .setScale(2, RoundingMode.HALF_UP);

        return new FitScoreResult(
                total,
                targetTechIds.stream().sorted().toList(),
                matched,
                missing,
                techScore,
                positionScore,
                projectScore,
                cultureScore,
                normalizedProjectSimilarity,
                normalizedCultureSimilarity
        );
    }

    private BigDecimal normalize(BigDecimal similarity) {
        if (similarity == null || similarity.signum() < 0) {
            return BigDecimal.ZERO.setScale(4);
        }
        if (similarity.compareTo(BigDecimal.ONE) > 0) {
            return BigDecimal.ONE.setScale(4);
        }
        return similarity.setScale(4, RoundingMode.HALF_UP);
    }
}
