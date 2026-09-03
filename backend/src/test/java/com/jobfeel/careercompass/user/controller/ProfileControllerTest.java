package com.jobfeel.careercompass.user.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jobfeel.careercompass.common.auth.MockCurrentUserProvider;
import com.jobfeel.careercompass.common.error.ApiException;
import com.jobfeel.careercompass.user.dto.PositionResponse;
import com.jobfeel.careercompass.user.dto.ProfileContentResponse;
import com.jobfeel.careercompass.user.dto.ProfileResponse;
import com.jobfeel.careercompass.user.dto.ProfileUpsertRequest;
import com.jobfeel.careercompass.user.dto.TechStackResponse;
import com.jobfeel.careercompass.user.service.ProfileService;
import java.time.OffsetDateTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProfileController.class)
class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProfileService profileService;
    @MockitoBean
    private MockCurrentUserProvider mockCurrentUserProvider;

    private static final String TOKEN = "Bearer mock-access-token";

    private ProfileResponse sampleResponse() {
        return new ProfileResponse(
                1L,
                new PositionResponse(10L, "백엔드 개발자"),
                List.of(new TechStackResponse(101L, "Java"), new TechStackResponse(102L, "Spring")),
                List.of(new ProfileContentResponse(
                        1001L, "PROJECT", "Spring Boot로 REST API를 구현했습니다.",
                        OffsetDateTime.parse("2026-09-03T01:10:00Z"))));
    }

    @Test
    void Token_없으면_401() throws Exception {
        given(mockCurrentUserProvider.getCurrentUserId(isNull())).willThrow(
                new ApiException(HttpStatus.UNAUTHORIZED, "AUTHENTICATION_REQUIRED", "인증이 필요합니다."));

        mockMvc.perform(get("/api/v1/me/profile"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTHENTICATION_REQUIRED"))
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    void GET_정상_200_필수필드_민감필드_없음() throws Exception {
        given(mockCurrentUserProvider.getCurrentUserId(any())).willReturn(1L);
        given(profileService.getProfile(1L)).willReturn(sampleResponse());

        mockMvc.perform(get("/api/v1/me/profile").header("Authorization", TOKEN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.desiredPosition.positionId").value(10))
                .andExpect(jsonPath("$.desiredPosition.positionName").value("백엔드 개발자"))
                .andExpect(jsonPath("$.techStacks[0].techId").value(101))
                .andExpect(jsonPath("$.techStacks[0].techName").value("Java"))
                .andExpect(jsonPath("$.techStacks[1].techId").value(102))
                .andExpect(jsonPath("$.contents[0].contentId").value(1001))
                .andExpect(jsonPath("$.contents[0].category").value("PROJECT"))
                .andExpect(jsonPath("$.contents[0].createdAt").value("2026-09-03T01:10:00Z"))
                .andExpect(jsonPath("$..passwordHash").doesNotExist())
                .andExpect(jsonPath("$..contentHash").doesNotExist())
                .andExpect(jsonPath("$..embedding").doesNotExist());
    }

    @Test
    void PUT_정상_200() throws Exception {
        given(mockCurrentUserProvider.getCurrentUserId(any())).willReturn(1L);
        given(profileService.saveProfile(eq(1L), any(ProfileUpsertRequest.class)))
                .willReturn(sampleResponse());

        String body = """
                {
                  "desiredPositionId": 10,
                  "techIds": [101, 102],
                  "contents": [
                    {"category": "PROJECT", "content": "Spring Boot로 REST API를 구현했습니다."}
                  ]
                }
                """;

        mockMvc.perform(put("/api/v1/me/profile")
                        .header("Authorization", TOKEN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.contents[0].category").value("PROJECT"))
                .andExpect(jsonPath("$..passwordHash").doesNotExist())
                .andExpect(jsonPath("$..contentHash").doesNotExist())
                .andExpect(jsonPath("$..embedding").doesNotExist());
    }

    @Test
    void PUT_필수값_누락_400() throws Exception {
        // desiredPositionId 누락 → @Valid 실패가 컨트롤러 본문 진입 전에 발생
        String body = """
                {
                  "techIds": [101],
                  "contents": [{"category": "PROJECT", "content": "x"}]
                }
                """;

        mockMvc.perform(put("/api/v1/me/profile")
                        .header("Authorization", TOKEN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));

        verify(profileService, never()).saveProfile(anyLong(), any());
    }

    @Test
    void PUT_잘못된_Category_400() throws Exception {
        given(mockCurrentUserProvider.getCurrentUserId(any())).willReturn(1L);
        given(profileService.saveProfile(eq(1L), any(ProfileUpsertRequest.class))).willThrow(
                new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PROFILE_CATEGORY",
                        "허용되지 않은 category 입니다."));

        String body = """
                {
                  "desiredPositionId": 10,
                  "techIds": [101],
                  "contents": [{"category": "NOT_A_CATEGORY", "content": "x"}]
                }
                """;

        mockMvc.perform(put("/api/v1/me/profile")
                        .header("Authorization", TOKEN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_PROFILE_CATEGORY"));
    }
}
