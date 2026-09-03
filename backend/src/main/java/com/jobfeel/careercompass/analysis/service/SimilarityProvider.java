package com.jobfeel.careercompass.analysis.service;

import java.math.BigDecimal;

public interface SimilarityProvider {

    BigDecimal projectExperienceSimilarity(long userId, String companyCode, long positionId);

    BigDecimal cultureSimilarity(long userId, String companyCode, long positionId);
}
