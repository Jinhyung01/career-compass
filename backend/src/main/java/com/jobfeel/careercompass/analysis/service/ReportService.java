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
import com.jobfeel.careercompass.analysis.repository.AnalysisReportCompanyRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisReportItemRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisReportRepository;
import com.jobfeel.careercompass.analysis.repository.AnalysisSourceQueryRepository;
import com.jobfeel.careercompass.common.error.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
public class ReportService {

    private static final int MAX_RECOMMENDATIONS = 5;
    private static final TypeReference<List<String>> STRING_LIST_TYPE = new TypeReference<>() {
    };

    private final AnalysisReportRepository reportRepository;
    private final AnalysisReportCompanyRepository reportCompanyRepository;
    private final AnalysisReportItemRepository reportItemRepository;
    private final AnalysisSourceQueryRepository sourceQueryRepository;
    private final FitScoreCalculator fitScoreCalculator;
    private final SimilarityProvider similarityProvider;
    private final AnalysisNarrativeProvider narrativeProvider;
    private final ObjectMapper objectMapper;
    private final String backendBaseUrl;

    public ReportService(
            AnalysisReportRepository reportRepository,
            AnalysisReportCompanyRepository reportCompanyRepository,
            AnalysisReportItemRepository reportItemRepository,
            AnalysisSourceQueryRepository sourceQueryRepository,
            FitScoreCalculator fitScoreCalculator,
            SimilarityProvider similarityProvider,
            AnalysisNarrativeProvider narrativeProvider,
            ObjectMapper objectMapper,
            @Value("${app.backend-base-url:http://localhost:8080}") String backendBaseUrl
    ) {
        this.reportRepository = reportRepository;
        this.reportCompanyRepository = reportCompanyRepository;
        this.reportItemRepository = reportItemRepository;
        this.sourceQueryRepository = sourceQueryRepository;
        this.fitScoreCalculator = fitScoreCalculator;
        this.similarityProvider = similarityProvider;
        this.narrativeProvider = narrativeProvider;
        this.objectMapper = objectMapper;
        this.backendBaseUrl = backendBaseUrl.replaceAll("/+$", "");
    }

    /**
     * 요청과 결과를 실제 DB에 저장한다. AI 설명과 임베딩 유사도만 현재 Mock 구현을 사용한다.
     */
    @Transactional
    public ReportAcceptedResponse createReport(long userId, ReportCreateRequest request) {
        validateCreateRequest(request);
        long positionId = sourceQueryRepository.findDesiredPositionId(userId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.CONFLICT,
                        "PROFILE_INCOMPLETE",
                        "프로필의 희망 직무를 먼저 입력해 주세요."
                ));

        if (request.reportType() == ReportType.FIT_ANALYSIS) {
            validateFitAnalysisTarget(request.companyCode(), positionId);
        }
        if (sourceQueryRepository.existsInProgressReport(
                userId, request.reportType(), request.companyCode(), positionId)) {
            throw new ApiException(
                    HttpStatus.CONFLICT,
                    "REPORT_ALREADY_IN_PROGRESS",
                    "동일한 분석이 이미 진행 중입니다."
            );
        }

        OffsetDateTime createdAt = OffsetDateTime.now(ZoneOffset.UTC);
        AnalysisReport report = reportRepository.save(new AnalysisReport(userId, request.reportType(), createdAt));

        if (request.reportType() == ReportType.RECOMMEND) {
            createRecommendationResult(report.getReportId(), userId, positionId);
        } else {
            createFitAnalysisResult(report.getReportId(), userId, request.companyCode(), positionId);
        }
        report.complete("reports/" + report.getReportId() + ".pdf", OffsetDateTime.now(ZoneOffset.UTC));

        return new ReportAcceptedResponse(
                report.getReportId(),
                report.getReportType(),
                ReportStatus.PENDING,
                createdAt
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
                userId, reportType, status, PageRequest.of(page, size));
        List<ReportListItemResponse> items = reports.getContent().stream().map(this::toListItem).toList();
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
        ensureDownloadReady(report);
        return new ReportDownloadResponse(
                "report-" + reportId + ".pdf",
                backendBaseUrl + "/api/v1/reports/" + reportId + "/file",
                OffsetDateTime.now(ZoneOffset.UTC).plusMinutes(5)
        );
    }

    public AnalysisReport getDownloadableReport(long userId, long reportId) {
        AnalysisReport report = getOwnedReport(userId, reportId);
        ensureDownloadReady(report);
        return report;
    }

    private void createRecommendationResult(long reportId, long userId, long positionId) {
        List<AnalysisSourceQueryRepository.CompanyCandidate> candidates =
                sourceQueryRepository.findRecommendationCandidates(positionId, MAX_RECOMMENDATIONS);
        List<String> techNames = new ArrayList<>(
                sourceQueryRepository.findTechNames(sourceQueryRepository.findUserTechIds(userId)).values());
        AnalysisNarrativeProvider.RecommendationNarrative narrative = narrativeProvider.recommendation(techNames);

        int rank = 1;
        for (AnalysisSourceQueryRepository.CompanyCandidate candidate : candidates) {
            AnalysisReportCompany company = reportCompanyRepository.save(new AnalysisReportCompany(
                    reportId, candidate.companyCode(), positionId, rank++, null));
            saveItems(company.getReportCompanyId(), Map.of(
                    ReportItemType.REASON, toJson(narrative.reason()),
                    ReportItemType.STRENGTHS, toJson(narrative.strengths()),
                    ReportItemType.GAPS, toJson(narrative.gaps()),
                    ReportItemType.RECOMMENDED_ACTIONS, toJson(narrative.recommendedActions()),
                    ReportItemType.PREPARATION_DIRECTION, toJson(narrative.preparationDirection())
            ));
        }
    }

    private void createFitAnalysisResult(long reportId, long userId, String companyCode, long positionId) {
        List<Long> userTechIds = sourceQueryRepository.findUserTechIds(userId);
        List<Long> targetTechIds = sourceQueryRepository.findTargetTechIds(companyCode, positionId);
        FitScoreResult score = fitScoreCalculator.calculate(
                userTechIds,
                targetTechIds,
                sourceQueryRepository.matchesPosition(companyCode, positionId),
                similarityProvider.projectExperienceSimilarity(userId, companyCode, positionId),
                similarityProvider.cultureSimilarity(userId, companyCode, positionId)
        );

        AnalysisReportCompany company = reportCompanyRepository.save(new AnalysisReportCompany(
                reportId, companyCode, positionId, null, score.totalScore()));
        Map<Long, String> techNames = sourceQueryRepository.findTechNames(targetTechIds);
        List<String> matchedNames = score.matchedTechIds().stream().map(techNames::get).toList();
        List<String> missingNames = score.missingTechIds().stream().map(techNames::get).toList();

        ScoreDetailResponse scoreDetail = new ScoreDetailResponse(
                score.targetTechIds(),
                score.matchedTechIds(),
                score.missingTechIds(),
                score.techScore(),
                score.positionScore(),
                score.projectExperienceScore(),
                score.cultureScore(),
                score.projectExperienceSimilarity(),
                score.cultureSimilarity()
        );
        AnalysisNarrativeProvider.FitNarrative narrative =
                narrativeProvider.fitAnalysis(matchedNames, missingNames);

        saveItems(company.getReportCompanyId(), Map.of(
                ReportItemType.SCORE_DETAIL, toJson(scoreDetail),
                ReportItemType.FIT_REASONS, toJson(narrative.fitReasons()),
                ReportItemType.STRENGTHS, toJson(narrative.strengths()),
                ReportItemType.GAPS, toJson(narrative.gaps()),
                ReportItemType.RECOMMENDED_LEARNING, toJson(narrative.recommendedLearning()),
                ReportItemType.RECOMMENDED_PROJECTS, toJson(narrative.recommendedProjects()),
                ReportItemType.PREPARATION_DIRECTION, toJson(narrative.preparationDirection()),
                ReportItemType.RESUME_HIGHLIGHTS, toJson(narrative.resumeHighlights())
        ));
    }

    private void saveItems(long reportCompanyId, Map<ReportItemType, String> values) {
        List<AnalysisReportItem> items = values.entrySet().stream()
                .map(entry -> new AnalysisReportItem(reportCompanyId, entry.getKey(), entry.getValue()))
                .toList();
        reportItemRepository.saveAll(items);
    }

    private void validateCreateRequest(ReportCreateRequest request) {
        if (request == null || request.reportType() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "VALIDATION_ERROR", "reportType은 필수입니다.");
        }
        if (request.reportType() == ReportType.RECOMMEND && request.companyCode() != null) {
            throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "INVALID_REPORT_REQUEST",
                    "RECOMMEND 요청에는 companyCode를 보낼 수 없습니다."
            );
        }
        if (request.reportType() == ReportType.FIT_ANALYSIS && !StringUtils.hasText(request.companyCode())) {
            throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "INVALID_REPORT_REQUEST",
                    "FIT_ANALYSIS 요청에는 companyCode가 필요합니다."
            );
        }
    }

    private void validateFitAnalysisTarget(String companyCode, long positionId) {
        if (!sourceQueryRepository.existsCompany(companyCode)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "COMPANY_NOT_FOUND", "기업을 찾을 수 없습니다.");
        }
        if (!sourceQueryRepository.existsTargetTech(companyCode, positionId)) {
            throw new ApiException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    "SCORE_NOT_CALCULABLE",
                    "적합도 점수를 계산할 기업 기술 정보가 없습니다."
            );
        }
    }

    private AnalysisReport getOwnedReport(long userId, long reportId) {
        AnalysisReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND, "REPORT_NOT_FOUND", "리포트를 찾을 수 없습니다."));
        if (!report.getUserId().equals(userId)) {
            throw new ApiException(
                    HttpStatus.FORBIDDEN, "REPORT_ACCESS_DENIED", "다른 사용자의 리포트에 접근할 수 없습니다.");
        }
        return report;
    }

    private void ensureDownloadReady(AnalysisReport report) {
        if (report.getStatus() != ReportStatus.COMPLETED || !StringUtils.hasText(report.getPdfObjectKey())) {
            throw new ApiException(
                    HttpStatus.CONFLICT, "REPORT_NOT_READY", "완료된 리포트만 다운로드할 수 있습니다.");
        }
    }

    private ReportResponse inProgressResponse(AnalysisReport report) {
        return new ReportResponse(
                report.getReportId(), report.getReportType(), report.getStatus(), report.getCreatedAt(),
                report.getCompletedAt(), null, null, null, null, false);
    }

    private ReportResponse failedResponse(AnalysisReport report) {
        return new ReportResponse(
                report.getReportId(), report.getReportType(), report.getStatus(), report.getCreatedAt(),
                report.getCompletedAt(), null, null, null, toReportError(report.getErrorCode()), false);
    }

    private ReportResponse completedResponse(AnalysisReport report) {
        List<AnalysisReportCompany> companies =
                reportCompanyRepository.findAllByReportIdOrderByRankAsc(report.getReportId());
        if (report.getReportType() == ReportType.RECOMMEND) {
            return new ReportResponse(
                    report.getReportId(), report.getReportType(), report.getStatus(), report.getCreatedAt(),
                    report.getCompletedAt(), null, null, buildRecommendResult(companies), null,
                    StringUtils.hasText(report.getPdfObjectKey()));
        }

        AnalysisReportCompany company = companies.stream().findFirst().orElseThrow(this::invalidReportData);
        Map<ReportItemType, String> items = findItemsByCompanyIds(List.of(company.getReportCompanyId()))
                .getOrDefault(company.getReportCompanyId(), Map.of());
        return new ReportResponse(
                report.getReportId(), report.getReportType(), report.getStatus(), report.getCreatedAt(),
                report.getCompletedAt(), company.getCompanyCode(), company.getFitScore(),
                buildFitAnalysisResult(company, items), null, StringUtils.hasText(report.getPdfObjectKey()));
    }

    private RecommendResultResponse buildRecommendResult(List<AnalysisReportCompany> companies) {
        List<Long> ids = companies.stream().limit(MAX_RECOMMENDATIONS)
                .map(AnalysisReportCompany::getReportCompanyId).toList();
        Map<Long, Map<ReportItemType, String>> itemGroups = findItemsByCompanyIds(ids);
        List<RecommendationCompanyResponse> recommendations = companies.stream()
                .limit(MAX_RECOMMENDATIONS)
                .map(company -> {
                    Map<ReportItemType, String> items = itemGroups.getOrDefault(company.getReportCompanyId(), Map.of());
                    return new RecommendationCompanyResponse(
                            company.getRank(), company.getCompanyCode(), requiredCompanyName(company.getCompanyCode()),
                            company.getPositionId(), requiredPositionName(company.getPositionId()),
                            readText(requiredItem(items, ReportItemType.REASON)),
                            readStringList(requiredItem(items, ReportItemType.STRENGTHS)),
                            readStringList(requiredItem(items, ReportItemType.GAPS)),
                            readStringList(requiredItem(items, ReportItemType.RECOMMENDED_ACTIONS)),
                            readText(requiredItem(items, ReportItemType.PREPARATION_DIRECTION)));
                }).toList();
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
        if (companyIds.isEmpty()) {
            return grouped;
        }
        for (AnalysisReportItem item : reportItemRepository.findAllByReportCompanyIdIn(companyIds)) {
            grouped.computeIfAbsent(item.getReportCompanyId(), ignored -> new EnumMap<>(ReportItemType.class))
                    .putIfAbsent(item.getItemType(), item.getContent());
        }
        return grouped;
    }

    private ReportListItemResponse toListItem(AnalysisReport report) {
        if (report.getReportType() == ReportType.RECOMMEND) {
            return new ReportListItemResponse(
                    report.getReportId(), report.getReportType(), report.getStatus(), null, null, null,
                    report.getCreatedAt(), report.getCompletedAt());
        }
        AnalysisReportCompany company = reportCompanyRepository.findAllByReportIdOrderByRankAsc(report.getReportId())
                .stream().findFirst().orElse(null);
        String companyName = company == null
                ? null : sourceQueryRepository.findCompanyName(company.getCompanyCode()).orElse(null);
        return new ReportListItemResponse(
                report.getReportId(), report.getReportType(), report.getStatus(),
                company == null ? null : company.getCompanyCode(), companyName,
                company == null ? null : company.getFitScore(), report.getCreatedAt(), report.getCompletedAt());
    }

    private String requiredCompanyName(String companyCode) {
        return sourceQueryRepository.findCompanyName(companyCode).orElseThrow(this::invalidReportData);
    }

    private String requiredPositionName(long positionId) {
        return sourceQueryRepository.findPositionName(positionId).orElseThrow(this::invalidReportData);
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

    private String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException exception) {
            throw new ApiException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "ANALYSIS_INTERNAL_ERROR",
                    "분석 결과를 저장할 수 없습니다."
            );
        }
    }

    private ReportErrorResponse toReportError(String errorCode) {
        String normalizedCode = StringUtils.hasText(errorCode) ? errorCode : "ANALYSIS_INTERNAL_ERROR";
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
            throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "VALIDATION_ERROR",
                    "page는 0 이상, size는 1 이상 100 이하여야 합니다."
            );
        }
    }

    private ApiException invalidReportData() {
        return new ApiException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "INVALID_REPORT_DATA",
                "저장된 리포트 데이터 형식이 올바르지 않습니다."
        );
    }

    private ApiException invalidReportData(Exception cause) {
        ApiException exception = invalidReportData();
        exception.initCause(cause);
        return exception;
    }
}
