package com.jobfeel.careercompass.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobfeel.careercompass.auth.dto.LoginRequest;
import com.jobfeel.careercompass.auth.dto.LoginResponse;
import com.jobfeel.careercompass.auth.dto.SignupRequest;
import com.jobfeel.careercompass.auth.dto.UserResponse;
import com.jobfeel.careercompass.auth.service.MockAuthService;
import com.jobfeel.careercompass.common.error.ApiException;
import com.jobfeel.careercompass.common.error.GlobalExceptionHandler;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@Import(GlobalExceptionHandler.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MockAuthService mockAuthService;

    @Test
    @DisplayName("정상 Register 요청이면 201과 필수 응답 필드를 반환한다")
    void register_success() throws Exception {
        SignupRequest request = new SignupRequest("new-seeker@example.com", "test1234!", "홍길동");
        UserResponse response = new UserResponse(2L, request.email(), request.name(), "JOB_SEEKER", Instant.parse("2026-09-03T01:00:00Z"));

        given(mockAuthService.register(any(SignupRequest.class))).willReturn(response);

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userId").value(2))
                .andExpect(jsonPath("$.email").value(request.email()))
                .andExpect(jsonPath("$.name").value(request.name()))
                .andExpect(jsonPath("$.role").value("JOB_SEEKER"))
                .andExpect(jsonPath("$.createdAt").exists());
    }

    @Test
    @DisplayName("Email 형식이 잘못되면 400 VALIDATION_ERROR를 반환한다")
    void register_invalidEmail_returns400() throws Exception {
        String invalidJson = """
                {
                  "email": "not-an-email",
                  "password": "test1234!",
                  "name": "홍길동"
                }
                """;

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    @DisplayName("Password가 8자 미만이면 400 VALIDATION_ERROR를 반환한다")
    void register_shortPassword_returns400() throws Exception {
        String invalidJson = """
                {
                  "email": "new-seeker@example.com",
                  "password": "short",
                  "name": "홍길동"
                }
                """;

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    @DisplayName("정상 Login 요청이면 200과 mock-access-token을 반환한다")
    void login_success() throws Exception {
        LoginRequest request = new LoginRequest("seeker@example.com", "test1234!");
        LoginResponse response = new LoginResponse(
                "mock-access-token",
                "Bearer",
                3600L,
                new LoginResponse.UserSummary(1L, "홍길동", "JOB_SEEKER")
        );

        given(mockAuthService.login(any(LoginRequest.class))).willReturn(response);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("mock-access-token"))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.expiresIn").value(3600))
                .andExpect(jsonPath("$.user.userId").value(1))
                .andExpect(jsonPath("$.user.role").value("JOB_SEEKER"));
    }

    @Test
    @DisplayName("Email 또는 Password가 틀리면 401 INVALID_CREDENTIALS를 반환한다")
    void login_invalidCredentials_returns401() throws Exception {
        LoginRequest request = new LoginRequest("wrong@example.com", "wrong-password");

        given(mockAuthService.login(any(LoginRequest.class)))
                .willThrow(new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS", "이메일 또는 비밀번호가 올바르지 않습니다."));

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("INVALID_CREDENTIALS"));
    }

    @Test
    @DisplayName("잘못된 JSON이면 400 INVALID_REQUEST를 반환한다")
    void login_malformedJson_returns400() throws Exception {
        String malformedJson = "{ this is not valid json ";

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(malformedJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_REQUEST"));
    }
}
