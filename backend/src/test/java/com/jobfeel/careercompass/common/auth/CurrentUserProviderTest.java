package com.jobfeel.careercompass.common.auth;

import com.jobfeel.careercompass.common.error.ApiException;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CurrentUserProviderTest {

    private final CurrentUserProvider provider = new CurrentUserProvider();

    @Test
    void returnsUserIdFromJwtSubject() {
        Jwt jwt = new Jwt(
                "token",
                Instant.now(),
                Instant.now().plusSeconds(60),
                Map.of("alg", "HS256"),
                Map.of("sub", "42")
        );

        JwtAuthenticationToken authentication = new JwtAuthenticationToken(jwt, List.of(), "42");
        authentication.setAuthenticated(true);
        assertThat(provider.getCurrentUserId(authentication)).isEqualTo(42L);
    }

    @Test
    void rejectsMissingAuthentication() {
        assertThatThrownBy(() -> provider.getCurrentUserId(null))
                .isInstanceOfSatisfying(ApiException.class,
                        exception -> assertThat(exception.getCode()).isEqualTo("AUTHENTICATION_REQUIRED"));
    }
}
