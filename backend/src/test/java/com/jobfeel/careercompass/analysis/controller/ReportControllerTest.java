package com.jobfeel.careercompass.analysis.controller;

import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;
import com.jobfeel.careercompass.analysis.dto.ReportAcceptedResponse;
import com.jobfeel.careercompass.analysis.dto.ReportDownloadResponse;
import com.jobfeel.careercompass.analysis.dto.ReportListResponse;
import com.jobfeel.careercompass.analysis.dto.ReportResponse;
import com.jobfeel.careercompass.analysis.error.ReportExceptionHandler;
import com.jobfeel.careercompass.analysis.service.MockReportService;
import com.jobfeel.careercompass.analysis.support.MockReportCurrentUserProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReportController.class)
@Import({MockReportCurrentUserProvider.class, ReportExceptionHandler.class})
class ReportControllerTest {

    private static final String AUTHORIZATION = "Bearer mock-access-token";
    private static final OffsetDateTime CREATED_AT = OffsetDateTime.of(
            2026, 9, 3, 2, 0, 0, 0, ZoneOffset.UTC
    );

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MockReportService reportService;

    @Test
    void rejectsRequestWithoutAuthorization() throws Exception {
        mockMvc.perform(get("/api/v1/reports"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTHENTICATION_REQUIRED"));
    }

    @Test
    void createsRecommendReport() throws Exception {
        when(reportService.createReport(eq(1L), any())).thenReturn(new ReportAcceptedResponse(
                501L,
                ReportType.RECOMMEND,
                ReportStatus.PENDING,
                CREATED_AT
        ));

        mockMvc.perform(post("/api/v1/reports")
                        .header("Authorization", AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"reportType\":\"RECOMMEND\"}"))
                .andExpect(status().isAccepted())
                .andExpect(header().string("Location", "/api/v1/reports/501"))
                .andExpect(jsonPath("$.reportId").value(501))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void rejectsInvalidReportType() throws Exception {
        mockMvc.perform(post("/api/v1/reports")
                        .header("Authorization", AUTHORIZATION)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"reportType\":\"UNKNOWN\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_REQUEST"));
    }

    @Test
    void returnsRetryAfterWhileProcessing() throws Exception {
        when(reportService.getReport(1L, 503L)).thenReturn(new ReportResponse(
                503L,
                ReportType.RECOMMEND,
                ReportStatus.PROCESSING,
                CREATED_AT,
                null,
                null,
                null,
                null,
                null,
                false
        ));

        mockMvc.perform(get("/api/v1/reports/503")
                        .header("Authorization", AUTHORIZATION))
                .andExpect(status().isOk())
                .andExpect(header().string("Retry-After", "2"))
                .andExpect(jsonPath("$.status").value("PROCESSING"))
                .andExpect(jsonPath("$.completedAt").isEmpty())
                .andExpect(jsonPath("$.result").isEmpty())
                .andExpect(jsonPath("$.error").isEmpty())
                .andExpect(jsonPath("$.pdfReady").value(false));
    }

    @Test
    void returnsReportList() throws Exception {
        when(reportService.getReports(
                1L,
                ReportType.FIT_ANALYSIS,
                ReportStatus.COMPLETED,
                0,
                20
        )).thenReturn(new ReportListResponse(List.of(), 0, 20, 0, 0));

        mockMvc.perform(get("/api/v1/reports")
                        .header("Authorization", AUTHORIZATION)
                        .queryParam("reportType", "FIT_ANALYSIS")
                        .queryParam("status", "COMPLETED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items").isArray())
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(20));
    }

    @Test
    void returnsMockDownloadInformation() throws Exception {
        when(reportService.getDownload(1L, 502L)).thenReturn(new ReportDownloadResponse(
                "report-502.pdf",
                "https://example.invalid/mock/report-502.pdf",
                CREATED_AT.plusMinutes(5)
        ));

        mockMvc.perform(get("/api/v1/reports/502/download")
                        .header("Authorization", AUTHORIZATION))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fileName").value("report-502.pdf"))
                .andExpect(jsonPath("$.downloadUrl").value("https://example.invalid/mock/report-502.pdf"));
    }
}
