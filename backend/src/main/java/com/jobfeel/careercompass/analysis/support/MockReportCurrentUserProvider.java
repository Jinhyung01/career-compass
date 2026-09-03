package com.jobfeel.careercompass.analysis.support;

import com.jobfeel.careercompass.analysis.error.ReportApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class MockReportCurrentUserProvider {

    private static final String MOCK_AUTHORIZATION = "Bearer mock-access-token";
    private static final long MOCK_USER_ID = 1L;

    public long getCurrentUserId(String authorizationHeader) {
        if (!MOCK_AUTHORIZATION.equals(authorizationHeader)) {
            throw new ReportApiException(
                    HttpStatus.UNAUTHORIZED,
                    "AUTHENTICATION_REQUIRED",
                    "인증이 필요합니다."
            );
        }
        return MOCK_USER_ID;
    }
}
