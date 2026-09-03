package com.jobfeel.careercompass.analysis.controller;

import com.jobfeel.careercompass.analysis.domain.ReportStatus;
import com.jobfeel.careercompass.analysis.domain.ReportType;
import com.jobfeel.careercompass.analysis.dto.ReportAcceptedResponse;
import com.jobfeel.careercompass.analysis.dto.ReportCreateRequest;
import com.jobfeel.careercompass.analysis.dto.ReportDownloadResponse;
import com.jobfeel.careercompass.analysis.dto.ReportListResponse;
import com.jobfeel.careercompass.analysis.dto.ReportResponse;
import com.jobfeel.careercompass.analysis.service.ReportPdfService;
import com.jobfeel.careercompass.analysis.service.ReportService;
import com.jobfeel.careercompass.common.auth.CurrentUserProvider;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final ReportService reportService;
    private final ReportPdfService reportPdfService;
    private final CurrentUserProvider currentUserProvider;

    public ReportController(
            ReportService reportService,
            ReportPdfService reportPdfService,
            CurrentUserProvider currentUserProvider
    ) {
        this.reportService = reportService;
        this.reportPdfService = reportPdfService;
        this.currentUserProvider = currentUserProvider;
    }

    @PostMapping
    public ResponseEntity<ReportAcceptedResponse> createReport(
            Authentication authentication,
            @Valid @RequestBody ReportCreateRequest request
    ) {
        long userId = currentUserProvider.getCurrentUserId(authentication);
        ReportAcceptedResponse response = reportService.createReport(userId, request);
        return ResponseEntity
                .accepted()
                .location(URI.create("/api/v1/reports/" + response.reportId()))
                .body(response);
    }

    @GetMapping
    public ResponseEntity<ReportListResponse> getReports(
            Authentication authentication,
            @RequestParam(required = false) ReportType reportType,
            @RequestParam(required = false) ReportStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        long userId = currentUserProvider.getCurrentUserId(authentication);
        return ResponseEntity.ok(reportService.getReports(userId, reportType, status, page, size));
    }

    @GetMapping("/{reportId}")
    public ResponseEntity<ReportResponse> getReport(
            Authentication authentication,
            @PathVariable long reportId
    ) {
        long userId = currentUserProvider.getCurrentUserId(authentication);
        ReportResponse response = reportService.getReport(userId, reportId);
        ResponseEntity.BodyBuilder responseBuilder = ResponseEntity.ok();
        if (response.status() == ReportStatus.PENDING || response.status() == ReportStatus.PROCESSING) {
            responseBuilder.header(HttpHeaders.RETRY_AFTER, "2");
        }
        return responseBuilder.body(response);
    }

    @GetMapping("/{reportId}/download")
    public ResponseEntity<ReportDownloadResponse> getDownload(
            Authentication authentication,
            @PathVariable long reportId
    ) {
        long userId = currentUserProvider.getCurrentUserId(authentication);
        return ResponseEntity.ok(reportService.getDownload(userId, reportId));
    }

    @GetMapping(value = "/{reportId}/file", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> downloadFile(
            Authentication authentication,
            @PathVariable long reportId
    ) {
        long userId = currentUserProvider.getCurrentUserId(authentication);
        byte[] pdf = reportPdfService.createPdf(reportService.getDownloadableReport(userId, reportId));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report-" + reportId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
