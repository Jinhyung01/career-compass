package com.jobfeel.careercompass.analysis.service;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FitScoreCalculatorTest {

    private final FitScoreCalculator calculator = new FitScoreCalculator();

    @Test
    void calculatesWeightedScoreFromFourComponents() {
        FitScoreResult result = calculator.calculate(
                List.of(101L, 102L, 103L),
                List.of(101L, 102L, 103L, 104L),
                true,
                new BigDecimal("0.75"),
                new BigDecimal("0.80")
        );

        assertThat(result.techScore()).isEqualByComparingTo("22.50");
        assertThat(result.positionScore()).isEqualByComparingTo("20.00");
        assertThat(result.projectExperienceScore()).isEqualByComparingTo("22.50");
        assertThat(result.cultureScore()).isEqualByComparingTo("16.00");
        assertThat(result.totalScore()).isEqualByComparingTo("81.00");
        assertThat(result.missingTechIds()).containsExactly(104L);
    }

    @Test
    void clampsSimilarityToZeroAndOne() {
        FitScoreResult result = calculator.calculate(
                List.of(),
                List.of(101L),
                false,
                new BigDecimal("-0.2"),
                new BigDecimal("1.2")
        );

        assertThat(result.projectExperienceScore()).isEqualByComparingTo("0.00");
        assertThat(result.cultureScore()).isEqualByComparingTo("20.00");
        assertThat(result.totalScore()).isEqualByComparingTo("20.00");
    }

    @Test
    void rejectsMissingTargetTechnologyData() {
        assertThatThrownBy(() -> calculator.calculate(
                List.of(), List.of(), false, BigDecimal.ZERO, BigDecimal.ZERO))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
