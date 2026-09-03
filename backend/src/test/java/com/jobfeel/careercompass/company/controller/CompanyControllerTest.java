package com.jobfeel.careercompass.company.controller;

import com.jobfeel.careercompass.common.auth.CurrentUserProvider;
import com.jobfeel.careercompass.common.error.ApiException;
import com.jobfeel.careercompass.common.error.GlobalExceptionHandler;
import com.jobfeel.careercompass.company.dto.CompanyResponse;
import com.jobfeel.careercompass.company.dto.CompanySearchResponse;
import com.jobfeel.careercompass.company.service.CompanyService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.ArgumentMatchers.isNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CompanyController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class CompanyControllerTest {

    private static final String AUTHORIZATION = "Bearer mock-access-token";

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CompanyService companyService;
    @MockitoBean
    private CurrentUserProvider currentUserProvider;

    @BeforeEach
    void authenticate() {
        given(currentUserProvider.getCurrentUserId(isNull())).willReturn(1L);
    }

    @Test
    void returnsUnauthorizedWhenTokenIsMissing() throws Exception {
        given(currentUserProvider.getCurrentUserId(isNull())).willThrow(
                new ApiException(HttpStatus.UNAUTHORIZED, "AUTHENTICATION_REQUIRED", "인증이 필요합니다."));
        mockMvc.perform(get("/api/v1/companies"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTHENTICATION_REQUIRED"));
    }

    @Test
    void returnsCompaniesWithPaging() throws Exception {
        given(companyService.search("SK", "반도체", 0, 20))
                .willReturn(new CompanySearchResponse(
                        List.of(new CompanyResponse("C001", "SK hynix", "반도체", 12, 34)),
                        0,
                        20,
                        1,
                        1
                ));

        mockMvc.perform(get("/api/v1/companies")
                        .header(HttpHeaders.AUTHORIZATION, AUTHORIZATION)
                        .queryParam("query", "SK")
                        .queryParam("industry", "반도체"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[0].companyCode").value("C001"))
                .andExpect(jsonPath("$.items[0].companyName").value("SK hynix"))
                .andExpect(jsonPath("$.items[0].industry").value("반도체"))
                .andExpect(jsonPath("$.items[0].people").value(12))
                .andExpect(jsonPath("$.items[0].insight").value(34))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.totalPages").value(1));
    }

    @Test
    void rejectsNegativePage() throws Exception {
        mockMvc.perform(get("/api/v1/companies")
                        .header(HttpHeaders.AUTHORIZATION, AUTHORIZATION)
                        .queryParam("page", "-1"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void rejectsZeroSize() throws Exception {
        mockMvc.perform(get("/api/v1/companies")
                        .header(HttpHeaders.AUTHORIZATION, AUTHORIZATION)
                        .queryParam("size", "0"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void rejectsSizeGreaterThanOneHundred() throws Exception {
        mockMvc.perform(get("/api/v1/companies")
                        .header(HttpHeaders.AUTHORIZATION, AUTHORIZATION)
                        .queryParam("size", "101"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void returnsCompanyDetail() throws Exception {
        given(companyService.getCompany("C001"))
                .willReturn(new CompanyResponse("C001", "SK hynix", "반도체", 12, 34));

        mockMvc.perform(get("/api/v1/companies/C001")
                        .header(HttpHeaders.AUTHORIZATION, AUTHORIZATION))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.companyCode").value("C001"))
                .andExpect(jsonPath("$.companyName").value("SK hynix"))
                .andExpect(jsonPath("$.industry").value("반도체"))
                .andExpect(jsonPath("$.people").value(12))
                .andExpect(jsonPath("$.insight").value(34));
    }

    @Test
    void returnsNotFoundWhenCompanyDoesNotExist() throws Exception {
        given(companyService.getCompany("UNKNOWN"))
                .willThrow(new ApiException(
                        HttpStatus.NOT_FOUND,
                        "COMPANY_NOT_FOUND",
                        "기업을 찾을 수 없습니다."
                ));

        mockMvc.perform(get("/api/v1/companies/UNKNOWN")
                        .header(HttpHeaders.AUTHORIZATION, AUTHORIZATION))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("COMPANY_NOT_FOUND"));
    }
}
