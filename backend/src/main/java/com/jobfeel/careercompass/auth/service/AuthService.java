package com.jobfeel.careercompass.auth.service;

import com.jobfeel.careercompass.auth.dto.LoginRequest;
import com.jobfeel.careercompass.auth.dto.LoginResponse;
import com.jobfeel.careercompass.auth.dto.SignupRequest;
import com.jobfeel.careercompass.auth.dto.UserResponse;
import com.jobfeel.careercompass.common.auth.JwtTokenService;
import com.jobfeel.careercompass.common.error.ApiException;
import com.jobfeel.careercompass.user.domain.User;
import com.jobfeel.careercompass.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Service
public class AuthService {

    private static final String DEFAULT_ROLE = "JOB_SEEKER";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenService jwtTokenService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
    }

    @Transactional
    public UserResponse register(SignupRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "EMAIL_ALREADY_EXISTS", "이미 사용 중인 이메일입니다.");
        }

        User saved;
        try {
            saved = userRepository.saveAndFlush(new User(
                    email,
                    passwordEncoder.encode(request.password()),
                    request.name().trim(),
                    DEFAULT_ROLE,
                    OffsetDateTime.now(ZoneOffset.UTC)
            ));
        } catch (DataIntegrityViolationException exception) {
            throw new ApiException(HttpStatus.CONFLICT, "EMAIL_ALREADY_EXISTS", "이미 사용 중인 이메일입니다.");
        }
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.email().trim())
                .filter(found -> passwordEncoder.matches(request.password(), found.getPasswordHash()))
                .orElseThrow(() -> new ApiException(
                        HttpStatus.UNAUTHORIZED,
                        "INVALID_CREDENTIALS",
                        "이메일 또는 비밀번호가 올바르지 않습니다."
                ));

        String token = jwtTokenService.createAccessToken(user);
        return new LoginResponse(
                token,
                "Bearer",
                jwtTokenService.getExpirationSeconds(),
                new LoginResponse.UserSummary(user.getUserId(), user.getName(), user.getRole())
        );
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getUserId(),
                user.getEmail(),
                user.getName(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
