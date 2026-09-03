package com.jobfeel.careercompass.analysis.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobfeel.careercompass.analysis.domain.AnalysisReport;
import com.jobfeel.careercompass.analysis.domain.AnalysisReportCompany;
import com.jobfeel.careercompass.analysis.domain.AnalysisReportItem;
import com.jobfeel.careercompass.analysis.domain.ReportItemType;
import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;
import com.jobfeel.careercompass.analysis.dto.ReportAcceptedResponse;
import com.jobfeel.careercompass.analysis.dto.ReportCreateRequest;
import com.jobfeel.careercompass.analysis.dto.ReportDownloadResponse;
import com.jobfeel.careercompass.analysis.dto.ReportErrorResponse;
import com.jobfeel.careercompass.analysis.dto.ReportListItemResponse;
import com.jobfeel.careercompass.analysis.dto.ReportListResponse;
import com.jobfeel.careercompass.analysis.dto.ReportResponse;
import com.jobfeel.careercompass.analysis.dto.result.FitAnalysisResultResponse;
import com.jobfeel.careercompass.analysis.dto.result.RecommendResultResponse;
import com.jobfeel.careercompass.analysis.dto.result.RecommendationCompanyResponse;
import com.jobfeel.careercompass.analysis.dto.result.ScoreDetailResponse;
import com.jobfeel.careercompass.analysis.error.ReportApiException;
import com.jobfeel.careercompass.analysis.repository.AnalysisReportCompanyRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisReportItemRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisReportRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisSourceQueryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Collection;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class MockReportService {

    private static final long RECOMMEND_MOCK_REPORT_ID = 501L;
    private static final long FIT_ANALYSIS_MOCK_REPORT_ID = 502L;
    private static final int MAX_RECOMMENDATIONS = 5;
    private static final TypeReference<List<String>> STRING_LIST_TYPE = new TypeReference<>() {
    };

    private final AnalysisReportRepository reportRepository;
    private final AnalysisReportCompanyRepository reportCompanyRepository;
    private final AnalysisReportItemRepository reportItemRepository;
    private final AnalysisSourceQueryRepository sourceQueryRepository;
    private final ObjectMapper objectMapper;

    public MockReportService(
            @Lazy AnalysisReportRepository reportRepository,
            @Lazy AnalysisReportCompanyRepository reportCompanyRepository,
            @Lazy AnalysisReportItemRepository reportItemRepository,
            @Lazy AnalysisSourceQueryRepository sourceQueryRepository,
            ObjectMapper objectMapper
    ) {
        this.reportRepository = reportRepository;
        this.reportCompanyRepository = reportCompanyRepository;
        this.reportItemRepository = reportItemRepository;
        this.sourceQueryRepository = sourceQueryRepository;
        this.objectMapper = objectMapper;
    }

    public ReportAcceptedResponse createReport(long userId, ReportCreateRequest request) {
        validateCreateRequest(request);

        long positionId = sourceQueryRepository.findDesiredPositionId(userId)
                .orElseThrow(() -> new ReportApiException(
                        HttpStatus.CONFLICT,
                        "PROFILE_INCOMPLETE",
                        "프로필의 희망 직무를 먼저 입력해 주세요."
                ));

        if (request.reportType() == ReportType.FIT_ANALYSIS) {
            validateFitAnalysisTarget(request.companyCode(), positionId);
        }

        if (sourceQueryRepository.existsInProgressReport(
                userId,
                request.reportType(),
                request.companyCode(),
                positionId
        )) {
            throw new ReportApiException(
                    HttpStatus.CONFLICT,
                    "REPORT_ALREADY_IN_PROGRESS",
                    "동일한 분석이 이미 진행 중입니다."
            );
        }

        long reportId = request.reportType() == ReportType.RECOMMEND
                ? RECOMMEND_MOCK_REPORT_ID
                : FIT_ANALYSIS_MOCK_REPORT_ID;

        return new ReportAcceptedResponse(
                reportId,
                request.reportType(),
                ReportStatus.PENDING,
                OffsetDateTime.now(ZoneOffset.UTC)
        );
    }

    public ReportResponse getReport(long userId, long reportId) {
        AnalysisReport report = getOwnedReport(userId, reportId);

        if (report.getStatus() == ReportStatus.FAILED) {
            return failedResponse(report);
        }
        if (report.getStatus() != ReportStatus.COMPLETED) {
            return inProgressResponse(report);
        }
        return completedResponse(report);
    }

    public ReportListResponse getReports(
            long userId,
            ReportType reportType,
            ReportStatus status,
            int page,
            int size
    ) {
        validatePage(page, size);

        Page<AnalysisReport> reports = reportRepository.findAllByUserIdAndFilters(
                userId,
                reportType,
                status,
                PageRequest.of(page, size)
        );

        List<ReportListItemResponse> items = reports.getContent().stream()
                .map(this::toListItem)
                .toList();

        return new ReportListResponse(
                items,
                reports.getNumber(),
                reports.getSize(),
                reports.getTotalElements(),
                reports.getTotalPages()
        );
    }

    public ReportDownloadResponse getDownload(long userId, long reportId) {
        AnalysisReport report = getOwnedReport(userId, reportId);
        if (report.getStatus() != ReportStatus.COMPLETED) {
            throw new ReportApiException(
                    HttpStatus.CONFLICT,
                    "REPORT_NOT_READY",
                    "완료된 리포트만 다운로드할 수 있습니다."
            );
        }

        OffsetDateTime expiresAt = OffsetDateTime.now(ZoneOffset.UTC).plusMinutes(5);
        return new ReportDownloadResponse(
                "report-" + reportId + ".pdf",
                "https://example.invalid/mock/report-" + reportId + ".pdf",
                expiresAt
        );
    }

    private void validateCreateRequest(ReportCreateRequest request) {
        if (request == null || request.reportType() == null) {
            throw new ReportApiException(
                    HttpStatus.BAD_REQUEST,
                    "VALIDATION_ERROR",
                    "reportType은 필수입니다."
            );
        }

        if (request.reportType() == ReportType.RECOMMEND && request.companyCode() != null) {
            throw new ReportApiException(
                    HttpStatus.BAD_REQUEST,
                    "INVALID_REPORT_REQUEST",
                    "RECOMMEND 요청에는 companyCode를 보낼 수 없습니다."
            );
        }

        if (request.reportType() == ReportType.FIT_ANALYSIS
                && !StringUtils.hasText(request.companyCode())) {
            throw new ReportApiException(
                    HttpStatus.BAD_REQUEST,
                    "INVALID_REPORT_REQUEST",
                    "FIT_ANALYSIS 요청에는 companyCode가 필요합니다."
            );
        }
    }

    private void validateFitAnalysisTarget(String companyCode, long positionId) {
        if (!sourceQueryRepository.existsCompany(companyCode)) {
            throw new ReportApiException(
                    HttpStatus.NOT_FOUND,
                    "COMPANY_NOT_FOUND",
                    "기업을 찾을 수 없습니다."
            );
        }
        if (!sourceQueryRepository.existsTargetTech(companyCode, positionId)) {
            throw new ReportApiException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    "SCORE_NOT_CALCULABLE",
                    "적합도 점수를 계산할 기업 기술 정보가 없습니다."
            );
        }
    }

    private AnalysisReport getOwnedReport(long userId, long reportId) {
        AnalysisReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ReportApiException(
                        HttpStatus.NOT_FOUND,
                        "REPORT_NOT_FOUND",
                        "리포트를 찾을 수 없습니다."
                ));

        if (report.getUserId() != userId) {
            throw new ReportApiException(
                    HttpStatus.FORBIDDEN,
                    "REPORT_ACCESS_DENIED",
                    "다른 사용자의 리포트에 접근할 수 없습니다."
            );
        }
        return report;
    }

    private ReportResponse inProgressResponse(AnalysisReport report) {
        return new ReportResponse(
                report.getReportId(),
                report.getReportType(),
                report.getStatus(),
                report.getCreatedAt(),
                report.getCompletedAt(),
                null,
                null,
                null,
                null,
                false
        );
    }

    private ReportResponse failedResponse(AnalysisReport report) {
        return new ReportResponse(
                report.getReportId(),
                report.getReportType(),
                report.getStatus(),
                report.getCreatedAt(),
                report.getCompletedAt(),
                null,
                null,
                null,
                toReportError(report.getErrorCode()),
                false
        );
    }

    private ReportResponse completedResponse(AnalysisReport report) {
        List<AnalysisReportCompany> companies = reportCompanyRepository
                .findAllByReportIdOrderByRankAsc(report.getReportId());

        if (report.getReportType() == ReportType.RECOMMEND) {
            RecommendResultResponse result = buildRecommendResult(companies);
            return new ReportResponse(
                    report.getReportId(),
                    report.getReportType(),
                    report.getStatus(),
                    report.getCreatedAt(),
                    report.getCompletedAt(),
                    null,
                    null,
                    result,
                    null,
                    true
            );
        }

        AnalysisReportCompany company = companies.stream()
                .findFirst()
                .orElseThrow(this::invalidReportData);
        Map<ReportItemType, String> items = findItemsByCompanyIds(List.of(company.getReportCompanyId()))
                .getOrDefault(company.getReportCompanyId(), Map.of());
        FitAnalysisResultResponse result = buildFitAnalysisResult(company, items);

        return new ReportResponse(
                report.getReportId(),
                report.getReportType(),
                report.getStatus(),
                report.getCreatedAt(),
                report.getCompletedAt(),
                company.getCompanyCode(),
                company.getFitScore(),
                result,
                null,
                true
        );
    }

    private RecommendResultResponse buildRecommendResult(List<AnalysisReportCompany> companies) {
        List<AnalysisReportCompany> selectedCompanies = companies.stream()
                .limit(MAX_RECOMMENDATIONS)
                .toList();
        if (selectedCompanies.isEmpty()) {
            return new RecommendResultResponse(List.of());
        }

        List<Long> companyIds = selectedCompanies.stream()
                .map(AnalysisReportCompany::getReportCompanyId)
                .toList();
        Map<Long, Map<ReportItemType, String>> itemGroups = findItemsByCompanyIds(companyIds);

        List<RecommendationCompanyResponse> recommendations = new ArrayList<>();
        for (AnalysisReportCompany company : selectedCompanies) {
            Map<ReportItemType, String> items = itemGroups.getOrDefault(
                    company.getReportCompanyId(),
                    Map.of()
            );
            recommendations.add(new RecommendationCompanyResponse(
                    company.getRank(),
                    company.getCompanyCode(),
                    requiredCompanyName(company.getCompanyCode()),
                    company.getPositionId(),
                    requiredPositionName(company.getPositionId()),
                    readText(requiredItem(items, ReportItemType.REASON)),
                    readStringList(requiredItem(items, ReportItemType.STRENGTHS)),
                    readStringList(requiredItem(items, ReportItemType.GAPS)),
                    readStringList(requiredItem(items, ReportItemType.RECOMMENDED_ACTIONS)),
                    readText(requiredItem(items, ReportItemType.PREPARATION_DIRECTION))
            ));
        }
        return new RecommendResultResponse(recommendations);
    }

    private FitAnalysisResultResponse buildFitAnalysisResult(
            AnalysisReportCompany company,
            Map<ReportItemType, String> items
    ) {
        return new FitAnalysisResultResponse(
                requiredCompanyName(company.getCompanyCode()),
                company.getPositionId(),
                requiredPositionName(company.getPositionId()),
                readScoreDetail(requiredItem(items, ReportItemType.SCORE_DETAIL)),
                readStringList(requiredItem(items, ReportItemType.FIT_REASONS)),
                readStringList(requiredItem(items, ReportItemType.STRENGTHS)),
                readStringList(requiredItem(items, ReportItemType.GAPS)),
                readStringList(requiredItem(items, ReportItemType.RECOMMENDED_LEARNING)),
                readStringList(requiredItem(items, ReportItemType.RECOMMENDED_PROJECTS)),
                readText(requiredItem(items, ReportItemType.PREPARATION_DIRECTION)),
                readStringList(requiredItem(items, ReportItemType.RESUME_HIGHLIGHTS))
        );
    }

    private Map<Long, Map<ReportItemType, String>> findItemsByCompanyIds(Collection<Long> companyIds) {
        Map<Long, Map<ReportItemType, String>> grouped = new HashMap<>();
        for (AnalysisReportItem item : reportItemRepository.findAllByReportCompanyIdIn(companyIds)) {
            grouped.computeIfAbsent(item.getReportCompanyId(), ignored -> new EnumMap<>(ReportItemType.class))
                    .putIfAbsent(item.getItemType(), item.getContent());
        }
        return grouped;
    }

    private ReportListItemResponse toListItem(AnalysisReport report) {
        if (report.getReportType() == ReportType.RECOMMEND) {
            return new ReportListItemResponse(
                    report.getReportId(),
                    report.getReportType(),
                    report.getStatus(),
                    null,
                    null,
                    null,
                    report.getCreatedAt(),
                    report.getCompletedAt()
            );
        }

        AnalysisReportCompany company = reportCompanyRepository
                .findAllByReportIdOrderByRankAsc(report.getReportId())
                .stream()
                .findFirst()
                .orElse(null);
        String companyName = company == null
                ? null
                : sourceQueryRepository.findCompanyName(company.getCompanyCode()).orElse(null);

        return new ReportListItemResponse(
                report.getReportId(),
                report.getReportType(),
                report.getStatus(),
                company == null ? null : company.getCompanyCode(),
                companyName,
                company == null ? null : company.getFitScore(),
                report.getCreatedAt(),
                report.getCompletedAt()
        );
    }

    private String requiredCompanyName(String companyCode) {
        return sourceQueryRepository.findCompanyName(companyCode)
                .orElseThrow(this::invalidReportData);
    }

    private String requiredPositionName(long positionId) {
        return sourceQueryRepository.findPositionName(positionId)
                .orElseThrow(this::invalidReportData);
    }

    private String requiredItem(Map<ReportItemType, String> items, ReportItemType itemType) {
        String value = items.get(itemType);
        if (value == null) {
            throw invalidReportData();
        }
        return value;
    }

    private String readText(String content) {
        String trimmed = content.trim();
        if (!trimmed.startsWith("\"")) {
            return content;
        }
        try {
            return objectMapper.readValue(content, String.class);
        } catch (JsonProcessingException exception) {
            throw invalidReportData(exception);
        }
    }

    private List<String> readStringList(String content) {
        try {
            return objectMapper.readValue(content, STRING_LIST_TYPE);
        } catch (JsonProcessingException exception) {
            throw invalidReportData(exception);
        }
    }

    private ScoreDetailResponse readScoreDetail(String content) {
        try {
            return objectMapper.readValue(content, ScoreDetailResponse.class);
        } catch (JsonProcessingException exception) {
            throw invalidReportData(exception);
        }
    }

    private ReportErrorResponse toReportError(String errorCode) {
        String normalizedCode = StringUtils.hasText(errorCode)
                ? errorCode
                : "ANALYSIS_INTERNAL_ERROR";
        String message = switch (normalizedCode) {
            case "EMBEDDING_GENERATION_FAILED" -> "프로필 또는 검색용 임베딩 생성에 실패했습니다.";
            case "VECTOR_SEARCH_FAILED" -> "벡터 검색에 실패했습니다.";
            case "LLM_GENERATION_FAILED" -> "분석 설명 생성에 실패했습니다.";
            case "INVALID_LLM_RESPONSE" -> "AI 응답 형식 검증에 실패했습니다.";
            case "PDF_GENERATION_FAILED" -> "PDF 생성 또는 외부 저장에 실패했습니다.";
            default -> "분석 처리 중 내부 오류가 발생했습니다.";
        };
        return new ReportErrorResponse(normalizedCode, message);
    }

    private void validatePage(int page, int size) {
        if (page < 0 || size < 1 || size > 100) {
            throw new ReportApiException(
                    HttpStatus.BAD_REQUEST,
                    "VALIDATION_ERROR",
                    "page는 0 이상, size는 1 이상 100 이하여야 합니다."
            );
        }
    }

    private ReportApiException invalidReportData() {
        return new ReportApiException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "INVALID_REPORT_DATA",
                "저장된 리포트 데이터 형식이 올바르지 않습니다."
        );
    }

    private ReportApiException invalidReportData(Exception cause) {
        ReportApiException exception = invalidReportData();
        exception.initCause(cause);
        return exception;
    }
}
