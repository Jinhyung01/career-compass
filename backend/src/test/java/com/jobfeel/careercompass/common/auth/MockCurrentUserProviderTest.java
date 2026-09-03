package com.jobfeel.careercompass.common.auth;

import com.jobfeel.careercompass.common.error.ApiException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class MockCurrentUserProviderTest {

    private final MockCurrentUserProvider provider = new MockCurrentUserProvider();

    @Test
    @DisplayName("정상 Header이면 사용자 ID 1을 반환한다")
    void returnsMockUserId_whenHeaderIsValid() {
        long userId = provider.getCurrentUserId("Bearer mock-access-token");

        assertThat(userId).isEqualTo(1L);
    }

    @Test
    @DisplayName("Header가 없으면(Null) 401을 발생시킨다")
    void throws401_whenHeaderIsNull() {
        assertThatThrownBy(() -> provider.getCurrentUserId(null))
                .isInstanceOf(ApiException.class)
                .satisfies(ex -> {
                    ApiException apiException = (ApiException) ex;
                    assertThat(apiException.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED);
                    assertThat(apiException.getCode()).isEqualTo("AUTHENTICATION_REQUIRED");
                });
    }

    @Test
    @DisplayName("Header가 빈 문자열이면 401을 발생시킨다")
    void throws401_whenHeaderIsBlank() {
        assertThatThrownBy(() -> provider.getCurrentUserId("   "))
                .isInstanceOf(ApiException.class)
                .satisfies(ex -> assertThat(((ApiException) ex).getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED));
    }

    @Test
    @DisplayName("Bearer Prefix가 없으면 401을 발생시킨다")
    void throws401_whenBearerPrefixIsMissing() {
        assertThatThrownBy(() -> provider.getCurrentUserId("mock-access-token"))
                .isInstanceOf(ApiException.class)
                .satisfies(ex -> {
                    ApiException apiException = (ApiException) ex;
                    assertThat(apiException.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED);
                    assertThat(apiException.getCode()).isEqualTo("AUTHENTICATION_REQUIRED");
                });
    }

    @Test
    @DisplayName("다른 Token이면 401을 발생시킨다")
    void throws401_whenTokenDoesNotMatch() {
        assertThatThrownBy(() -> provider.getCurrentUserId("Bearer other-token"))
                .isInstanceOf(ApiException.class)
                .satisfies(ex -> {
                    ApiException apiException = (ApiException) ex;
                    assertThat(apiException.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED);
                    assertThat(apiException.getCode()).isEqualTo("AUTHENTICATION_REQUIRED");
                });
    }
}
