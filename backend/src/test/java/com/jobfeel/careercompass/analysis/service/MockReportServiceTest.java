package com.jobfeel.careercompass.analysis.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobfeel.careercompass.analysis.domain.AnalysisReport;
import com.jobfeel.careercompass.analysis.domain.AnalysisReportCompany;
import com.jobfeel.careercompass.analysis.domain.AnalysisReportItem;
import com.jobfeel.careercompass.analysis.domain.ReportItemType;
import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;
import com.jobfeel.careercompass.analysis.dto.ReportAcceptedResponse;
import com.jobfeel.careercompass.analysis.dto.ReportCreateRequest;
import com.jobfeel.careercompass.analysis.dto.ReportListResponse;
import com.jobfeel.careercompass.analysis.dto.ReportResponse;
import com.jobfeel.careercompass.analysis.dto.result.FitAnalysisResultResponse;
import com.jobfeel.careercompass.analysis.dto.result.RecommendResultResponse;
import com.jobfeel.careercompass.analysis.error.ReportApiException;
import com.jobfeel.careercompass.analysis.repository.AnalysisReportCompanyRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisReportItemRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisReportRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisSourceQueryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MockReportServiceTest {

    private static final long USER_ID = 1L;
    private static final OffsetDateTime CREATED_AT = OffsetDateTime.of(
            2026, 9, 3, 2, 0, 0, 0, ZoneOffset.UTC
    );
    private static final OffsetDateTime COMPLETED_AT = CREATED_AT.plusSeconds(18);

    @Mock
    private AnalysisReportRepository reportRepository;
    @Mock
    private AnalysisReportCompanyRepository reportCompanyRepository;
    @Mock
    private AnalysisReportItemRepository reportItemRepository;
    @Mock
    private AnalysisSourceQueryRepository sourceQueryRepository;

    private MockReportService reportService;

    @BeforeEach
    void setUp() {
        reportService = new MockReportService(
                reportRepository,
                reportCompanyRepository,
                reportItemRepository,
                sourceQueryRepository,
                new ObjectMapper()
        );
    }

    @Test
    void createsRecommendMockRequest() {
        when(sourceQueryRepository.findDesiredPositionId(USER_ID)).thenReturn(Optional.of(10L));
        when(sourceQueryRepository.existsInProgressReport(USER_ID, ReportType.RECOMMEND, null, 10L))
                .thenReturn(false);

        ReportAcceptedResponse response = reportService.createReport(
                USER_ID,
                new ReportCreateRequest(ReportType.RECOMMEND, null)
        );

        assertThat(response.reportId()).isEqualTo(501L);
        assertThat(response.status()).isEqualTo(ReportStatus.PENDING);
        assertThat(response.reportType()).isEqualTo(ReportType.RECOMMEND);
    }

    @Test
    void rejectsFitAnalysisWhenCompanyDoesNotExist() {
        when(sourceQueryRepository.findDesiredPositionId(USER_ID)).thenReturn(Optional.of(10L));
        when(sourceQueryRepository.existsCompany("UNKNOWN")).thenReturn(false);

        assertThatThrownBy(() -> reportService.createReport(
                USER_ID,
                new ReportCreateRequest(ReportType.FIT_ANALYSIS, "UNKNOWN")
        ))
                .isInstanceOfSatisfying(ReportApiException.class, exception -> {
                    assertThat(exception.getStatus().value()).isEqualTo(404);
                    assertThat(exception.getCode()).isEqualTo("COMPANY_NOT_FOUND");
                });
    }

    @Test
    void rejectsFitAnalysisWhenTargetTechIsEmpty() {
        when(sourceQueryRepository.findDesiredPositionId(USER_ID)).thenReturn(Optional.of(10L));
        when(sourceQueryRepository.existsCompany("C001")).thenReturn(true);
        when(sourceQueryRepository.existsTargetTech("C001", 10L)).thenReturn(false);

        assertThatThrownBy(() -> reportService.createReport(
                USER_ID,
                new ReportCreateRequest(ReportType.FIT_ANALYSIS, "C001")
        ))
                .isInstanceOfSatisfying(ReportApiException.class, exception -> {
                    assertThat(exception.getStatus().value()).isEqualTo(422);
                    assertThat(exception.getCode()).isEqualTo("SCORE_NOT_CALCULABLE");
                });
    }

    @Test
    void rejectsDuplicateInProgressRequest() {
        when(sourceQueryRepository.findDesiredPositionId(USER_ID)).thenReturn(Optional.of(10L));
        when(sourceQueryRepository.existsInProgressReport(USER_ID, ReportType.RECOMMEND, null, 10L))
                .thenReturn(true);

        assertThatThrownBy(() -> reportService.createReport(
                USER_ID,
                new ReportCreateRequest(ReportType.RECOMMEND, null)
        ))
                .isInstanceOfSatisfying(ReportApiException.class, exception -> {
                    assertThat(exception.getStatus().value()).isEqualTo(409);
                    assertThat(exception.getCode()).isEqualTo("REPORT_ALREADY_IN_PROGRESS");
                });
    }

    @Test
    void returnsProcessingResponseWithoutResult() {
        AnalysisReport report = report(503L, USER_ID, ReportType.RECOMMEND, ReportStatus.PROCESSING, null);
        when(reportRepository.findById(503L)).thenReturn(Optional.of(report));

        ReportResponse response = reportService.getReport(USER_ID, 503L);

        assertThat(response.status()).isEqualTo(ReportStatus.PROCESSING);
        assertThat(response.result()).isNull();
        assertThat(response.error()).isNull();
        assertThat(response.pdfReady()).isFalse();
    }

    @Test
    void returnsFailedResponseWithMappedError() {
        AnalysisReport report = report(
                504L,
                USER_ID,
                ReportType.FIT_ANALYSIS,
                ReportStatus.FAILED,
                "LLM_GENERATION_FAILED"
        );
        when(reportRepository.findById(504L)).thenReturn(Optional.of(report));

        ReportResponse response = reportService.getReport(USER_ID, 504L);

        assertThat(response.error().code()).isEqualTo("LLM_GENERATION_FAILED");
        assertThat(response.error().message()).isEqualTo("분석 설명 생성에 실패했습니다.");
        assertThat(response.pdfReady()).isFalse();
    }

    @Test
    void buildsRecommendResultInRankOrder() {
        AnalysisReport report = report(501L, USER_ID, ReportType.RECOMMEND, ReportStatus.COMPLETED, null);
        AnalysisReportCompany first = recommendCompany(601L, "C001", 1);
        AnalysisReportCompany second = recommendCompany(602L, "C002", 2);
        when(reportRepository.findById(501L)).thenReturn(Optional.of(report));
        when(reportCompanyRepository.findAllByReportIdOrderByRankAsc(501L))
                .thenReturn(List.of(first, second));
        when(reportItemRepository.findAllByReportCompanyIdIn(List.of(601L, 602L)))
                .thenReturn(concat(recommendItems(601L), recommendItems(602L)));
        when(sourceQueryRepository.findCompanyName("C001")).thenReturn(Optional.of("예시테크"));
        when(sourceQueryRepository.findCompanyName("C002")).thenReturn(Optional.of("클라우드나인"));
        when(sourceQueryRepository.findPositionName(10L)).thenReturn(Optional.of("백엔드 개발자"));

        ReportResponse response = reportService.getReport(USER_ID, 501L);

        assertThat(response.result()).isInstanceOf(RecommendResultResponse.class);
        RecommendResultResponse result = (RecommendResultResponse) response.result();
        assertThat(result.recommendations()).hasSize(2);
        assertThat(result.recommendations()).extracting("rank").containsExactly(1, 2);
        assertThat(response.companyCode()).isNull();
        assertThat(response.fitScore()).isNull();
        assertThat(response.pdfReady()).isTrue();
    }

    @Test
    void buildsFitAnalysisResult() {
        AnalysisReport report = report(502L, USER_ID, ReportType.FIT_ANALYSIS, ReportStatus.COMPLETED, null);
        AnalysisReportCompany company = new AnalysisReportCompany(
                603L, 502L, "C001", 10L, null, new BigDecimal("75.00")
        );
        when(reportRepository.findById(502L)).thenReturn(Optional.of(report));
        when(reportCompanyRepository.findAllByReportIdOrderByRankAsc(502L)).thenReturn(List.of(company));
        when(reportItemRepository.findAllByReportCompanyIdIn(List.of(603L))).thenReturn(fitItems(603L));
        when(sourceQueryRepository.findCompanyName("C001")).thenReturn(Optional.of("예시테크"));
        when(sourceQueryRepository.findPositionName(10L)).thenReturn(Optional.of("백엔드 개발자"));

        ReportResponse response = reportService.getReport(USER_ID, 502L);

        assertThat(response.result()).isInstanceOf(FitAnalysisResultResponse.class);
        FitAnalysisResultResponse result = (FitAnalysisResultResponse) response.result();
        assertThat(response.companyCode()).isEqualTo("C001");
        assertThat(response.fitScore()).isEqualByComparingTo("75.00");
        assertThat(result.scoreDetail().matchedTechIds()).containsExactly(101L, 102L, 103L);
        assertThat(result.scoreDetail().missingTechIds()).containsExactly(104L);
    }

    @Test
    void distinguishesMissingReportFromAnotherUsersReport() {
        when(reportRepository.findById(999L)).thenReturn(Optional.empty());
        when(reportRepository.findById(501L)).thenReturn(Optional.of(
                report(501L, 2L, ReportType.RECOMMEND, ReportStatus.COMPLETED, null)
        ));

        assertThatThrownBy(() -> reportService.getReport(USER_ID, 999L))
                .isInstanceOfSatisfying(ReportApiException.class,
                        exception -> assertThat(exception.getCode()).isEqualTo("REPORT_NOT_FOUND"));
        assertThatThrownBy(() -> reportService.getReport(USER_ID, 501L))
                .isInstanceOfSatisfying(ReportApiException.class,
                        exception -> assertThat(exception.getCode()).isEqualTo("REPORT_ACCESS_DENIED"));
    }

    @Test
    void listsOnlyRepositoryFilteredReports() {
        AnalysisReport report = report(501L, USER_ID, ReportType.RECOMMEND, ReportStatus.COMPLETED, null);
        when(reportRepository.findAllByUserIdAndFilters(
                eq(USER_ID),
                eq(ReportType.RECOMMEND),
                eq(ReportStatus.COMPLETED),
                any(Pageable.class)
        )).thenReturn(new PageImpl<>(List.of(report)));

        ReportListResponse response = reportService.getReports(
                USER_ID,
                ReportType.RECOMMEND,
                ReportStatus.COMPLETED,
                0,
                20
        );

        assertThat(response.items()).hasSize(1);
        assertThat(response.items().getFirst().companyCode()).isNull();
        verify(reportRepository).findAllByUserIdAndFilters(
                eq(USER_ID),
                eq(ReportType.RECOMMEND),
                eq(ReportStatus.COMPLETED),
                any(Pageable.class)
        );
    }

    @Test
    void rejectsDownloadUntilReportIsCompleted() {
        AnalysisReport report = report(503L, USER_ID, ReportType.RECOMMEND, ReportStatus.PROCESSING, null);
        when(reportRepository.findById(503L)).thenReturn(Optional.of(report));

        assertThatThrownBy(() -> reportService.getDownload(USER_ID, 503L))
                .isInstanceOfSatisfying(ReportApiException.class, exception -> {
                    assertThat(exception.getStatus().value()).isEqualTo(409);
                    assertThat(exception.getCode()).isEqualTo("REPORT_NOT_READY");
                });
    }

    private AnalysisReport report(
            long reportId,
            long userId,
            ReportType reportType,
            ReportStatus status,
            String errorCode
    ) {
        return new AnalysisReport(
                reportId,
                userId,
                reportType,
                status,
                errorCode,
                status == ReportStatus.COMPLETED ? "reports/" + reportId + ".pdf" : null,
                CREATED_AT,
                status == ReportStatus.PROCESSING ? null : COMPLETED_AT
        );
    }

    private AnalysisReportCompany recommendCompany(long id, String companyCode, int rank) {
        return new AnalysisReportCompany(id, 501L, companyCode, 10L, rank, null);
    }

    private List<AnalysisReportItem> recommendItems(long reportCompanyId) {
        return List.of(
                item(reportCompanyId, ReportItemType.REASON, "\"추천 이유\""),
                item(reportCompanyId, ReportItemType.STRENGTHS, "[\"Java\",\"Spring\"]"),
                item(reportCompanyId, ReportItemType.GAPS, "[\"Docker\"]"),
                item(reportCompanyId, ReportItemType.RECOMMENDED_ACTIONS, "[\"배포 실습\"]"),
                item(reportCompanyId, ReportItemType.PREPARATION_DIRECTION, "\"운영 경험을 보강하세요.\"")
        );
    }

    private List<AnalysisReportItem> fitItems(long reportCompanyId) {
        return List.of(
                item(reportCompanyId, ReportItemType.SCORE_DETAIL,
                        "{\"targetTechIds\":[101,102,103,104],\"matchedTechIds\":[101,102,103],\"missingTechIds\":[104]}"),
                item(reportCompanyId, ReportItemType.FIT_REASONS, "[\"핵심 기술 4개 중 3개 보유\"]"),
                item(reportCompanyId, ReportItemType.STRENGTHS, "[\"Java\",\"Spring\",\"PostgreSQL\"]"),
                item(reportCompanyId, ReportItemType.GAPS, "[\"Docker\"]"),
                item(reportCompanyId, ReportItemType.RECOMMENDED_LEARNING, "[\"Docker 네트워크\"]"),
                item(reportCompanyId, ReportItemType.RECOMMENDED_PROJECTS, "[\"컨테이너 배포\"]"),
                item(reportCompanyId, ReportItemType.PREPARATION_DIRECTION, "\"배포 경험을 보강하세요.\""),
                item(reportCompanyId, ReportItemType.RESUME_HIGHLIGHTS, "[\"REST API 구현\"]")
        );
    }

    private AnalysisReportItem item(long reportCompanyId, ReportItemType type, String content) {
        return new AnalysisReportItem(null, reportCompanyId, type, content);
    }

    private List<AnalysisReportItem> concat(
            List<AnalysisReportItem> first,
            List<AnalysisReportItem> second
    ) {
        return java.util.stream.Stream.concat(first.stream(), second.stream()).toList();
    }
}
