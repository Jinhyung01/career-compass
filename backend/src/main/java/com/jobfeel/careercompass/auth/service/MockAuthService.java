package com.jobfeel.careercompass.auth.service;

import com.jobfeel.careercompass.auth.dto.LoginRequest;
import com.jobfeel.careercompass.auth.dto.LoginResponse;
import com.jobfeel.careercompass.auth.dto.SignupRequest;
import com.jobfeel.careercompass.auth.dto.UserResponse;
import com.jobfeel.careercompass.common.error.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;

/**
 * Mock 회원가입·로그인 로직.
 *
 * 실제 {@code users} 테이블 Insert, 중복 Email 검사, JWT 발급은 하지 않는다.
 * Password는 어떤 형태로도 저장·Log 기록하지 않는다.
 */
@Service
public class MockAuthService {

    private static final long MOCK_REGISTER_USER_ID = 2L;
    private static final String MOCK_ROLE = "JOB_SEEKER";

    private static final String SEED_LOGIN_EMAIL = "seeker@example.com";
    private static final String SEED_LOGIN_PASSWORD = "test1234!";

    private static final String MOCK_ACCESS_TOKEN = "mock-access-token";
    private static final String TOKEN_TYPE = "Bearer";
    private static final long EXPIRES_IN_SECONDS = 3600L;

    private static final long SEED_USER_ID = 1L;
    private static final String SEED_USER_NAME = "홍길동";

    public UserResponse register(SignupRequest request) {
        // 입력 Password는 어떤 필드에도 저장하지 않는다.
        return new UserResponse(
                MOCK_REGISTER_USER_ID,
                request.email(),
                request.name(),
                MOCK_ROLE,
                Instant.now()
        );
    }

    public LoginResponse login(LoginRequest request) {
        boolean matches = SEED_LOGIN_EMAIL.equals(request.email())
                && SEED_LOGIN_PASSWORD.equals(request.password());

        if (!matches) {
            throw new ApiException(
                    HttpStatus.UNAUTHORIZED,
                    "INVALID_CREDENTIALS",
                    "이메일 또는 비밀번호가 올바르지 않습니다."
            );
        }

        LoginResponse.UserSummary user = new LoginResponse.UserSummary(
                SEED_USER_ID,
                SEED_USER_NAME,
                MOCK_ROLE
        );

        return new LoginResponse(
                MOCK_ACCESS_TOKEN,
                TOKEN_TYPE,
                EXPIRES_IN_SECONDS,
                user
        );
    }
}
