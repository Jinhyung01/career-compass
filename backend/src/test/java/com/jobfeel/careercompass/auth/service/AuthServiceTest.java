package com.jobfeel.careercompass.auth.service;

import com.jobfeel.careercompass.auth.dto.LoginRequest;
import com.jobfeel.careercompass.auth.dto.SignupRequest;
import com.jobfeel.careercompass.common.auth.JwtTokenService;
import com.jobfeel.careercompass.common.error.ApiException;
import com.jobfeel.careercompass.user.domain.User;
import com.jobfeel.careercompass.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.OffsetDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtTokenService jwtTokenService;
    @InjectMocks
    private AuthService authService;

    @Test
    void registerHashesPasswordAndStoresUser() {
        given(userRepository.existsByEmailIgnoreCase("new@example.com")).willReturn(false);
        given(passwordEncoder.encode("test1234!")).willReturn("bcrypt-hash");
        given(userRepository.saveAndFlush(any(User.class))).willAnswer(invocation -> {
            User user = invocation.getArgument(0);
            ReflectionTestUtils.setField(user, "userId", 2L);
            return user;
        });

        var response = authService.register(new SignupRequest("NEW@example.com", "test1234!", "홍길동"));

        assertThat(response.userId()).isEqualTo(2L);
        assertThat(response.email()).isEqualTo("new@example.com");
        verify(passwordEncoder).encode("test1234!");
    }

    @Test
    void loginValidatesPasswordAndIssuesJwt() {
        User user = new User("seeker@example.com", "bcrypt-hash", "홍길동", "JOB_SEEKER", OffsetDateTime.now());
        ReflectionTestUtils.setField(user, "userId", 1L);
        given(userRepository.findByEmailIgnoreCase("seeker@example.com")).willReturn(Optional.of(user));
        given(passwordEncoder.matches("test1234!", "bcrypt-hash")).willReturn(true);
        given(jwtTokenService.createAccessToken(user)).willReturn("signed.jwt.token");
        given(jwtTokenService.getExpirationSeconds()).willReturn(3600L);

        var response = authService.login(new LoginRequest("seeker@example.com", "test1234!"));

        assertThat(response.accessToken()).isEqualTo("signed.jwt.token");
        assertThat(response.user().userId()).isEqualTo(1L);
    }

    @Test
    void loginRejectsInvalidPassword() {
        User user = new User("seeker@example.com", "bcrypt-hash", "홍길동", "JOB_SEEKER", OffsetDateTime.now());
        given(userRepository.findByEmailIgnoreCase("seeker@example.com")).willReturn(Optional.of(user));
        given(passwordEncoder.matches("wrong-password", "bcrypt-hash")).willReturn(false);

        assertThatThrownBy(() -> authService.login(new LoginRequest("seeker@example.com", "wrong-password")))
                .isInstanceOfSatisfying(ApiException.class,
                        exception -> assertThat(exception.getCode()).isEqualTo("INVALID_CREDENTIALS"));
    }
}
