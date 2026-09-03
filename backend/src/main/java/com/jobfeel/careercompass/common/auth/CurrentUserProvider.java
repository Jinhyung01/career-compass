package com.jobfeel.careercompass.common.auth;

import com.jobfeel.careercompass.common.error.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserProvider {

    public long getCurrentUserId(Authentication authentication) {
        if (!(authentication instanceof JwtAuthenticationToken jwtAuthentication)
                || !authentication.isAuthenticated()) {
            throw authenticationRequired();
        }

        try {
            return Long.parseLong(jwtAuthentication.getToken().getSubject());
        } catch (NumberFormatException exception) {
            throw authenticationRequired();
        }
    }

    private ApiException authenticationRequired() {
        return new ApiException(
                HttpStatus.UNAUTHORIZED,
                "AUTHENTICATION_REQUIRED",
                "인증 정보가 없거나 유효하지 않습니다."
        );
    }
}
