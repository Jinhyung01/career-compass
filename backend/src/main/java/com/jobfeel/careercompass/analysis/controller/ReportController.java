package com.jobfeel.careercompass.analysis.controller;

import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;
import com.jobfeel.careercompass.analysis.dto.ReportAcceptedResponse;
import com.jobfeel.careercompass.analysis.dto.ReportCreateRequest;
import com.jobfeel.careercompass.analysis.dto.ReportDownloadResponse;
import com.jobfeel.careercompass.analysis.dto.ReportListResponse;
import com.jobfeel.careercompass.analysis.dto.ReportResponse;
import com.jobfeel.careercompass.analysis.service.MockReportService;
import com.jobfeel.careercompass.analysis.support.MockReportCurrentUserProvider;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final MockReportService reportService;
    private final MockReportCurrentUserProvider currentUserProvider;

    public ReportController(
            MockReportService reportService,
            MockReportCurrentUserProvider currentUserProvider
    ) {
        this.reportService = reportService;
        this.currentUserProvider = currentUserProvider;
    }

    @PostMapping
    public ResponseEntity<ReportAcceptedResponse> createReport(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @Valid @RequestBody ReportCreateRequest request
    ) {
        long userId = currentUserProvider.getCurrentUserId(authorization);
        ReportAcceptedResponse response = reportService.createReport(userId, request);
        return ResponseEntity
                .accepted()
                .location(URI.create("/api/v1/reports/" + response.reportId()))
                .body(response);
    }

    @GetMapping
    public ResponseEntity<ReportListResponse> getReports(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @RequestParam(required = false) ReportType reportType,
            @RequestParam(required = false) ReportStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        long userId = currentUserProvider.getCurrentUserId(authorization);
        return ResponseEntity.ok(reportService.getReports(userId, reportType, status, page, size));
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<ReportResponse> getReport(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @PathVariable long reportId
    ) {
        long userId = currentUserProvider.getCurrentUserId(authorization);
        ReportResponse response = reportService.getReport(userId, reportId);
        ResponseEntity.BodyBuilder responseBuilder = ResponseEntity.ok();
        if (response.status() == ReportStatus.PENDING || response.status() == ReportStatus.PROCESSING) {
            responseBuilder.header(HttpHeaders.RETRY_AFTER, "2");
        }
        return responseBuilder.body(response);
    }

    @GetMapping("/{reportId}/download")
    public ResponseEntity<ReportDownloadResponse> getDownload(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization,
            @PathVariable long reportId
    ) {
        long userId = currentUserProvider.getCurrentUserId(authorization);
        return ResponseEntity.ok(reportService.getDownload(userId, reportId));
    }
}
