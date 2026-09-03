package com.jobfeel.careercompass.common.auth;

import com.jobfeel.careercompass.common.error.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * 보호 API에서 사용하는 Mock 사용자 해석기.
 *
 * 실제 JWT·Spring Security 없이 고정된 Mock Token
 * ({@code mock-access-token})만 검증하여 사용자 ID를 반환한다.
 *
 * B·C·D는 Controller에서 아래 형태로 사용한다.
 * <pre>
 * &#64;RequestHeader(value = "Authorization", required = false) String authorization
 * long userId = mockCurrentUserProvider.getCurrentUserId(authorization);
 * </pre>
 */
@Component
public class MockCurrentUserProvider {

    private static final String BEARER_PREFIX = "Bearer ";
    private static final String MOCK_TOKEN = "mock-access-token";
    private static final long MOCK_USER_ID = 1L;

    public long getCurrentUserId(String authorizationHeader) {
        if (!StringUtils.hasText(authorizationHeader)) {
            throw authenticationRequired();
        }

        if (!authorizationHeader.startsWith(BEARER_PREFIX)) {
            throw authenticationRequired();
        }

        String token = authorizationHeader.substring(BEARER_PREFIX.length());

        if (!MOCK_TOKEN.equals(token)) {
            throw authenticationRequired();
        }

        return MOCK_USER_ID;
    }

    private ApiException authenticationRequired() {
        return new ApiException(
                HttpStatus.UNAUTHORIZED,
                "AUTHENTICATION_REQUIRED",
                "인증 정보가 없거나 유효하지 않습니다."
        );
    }
}
