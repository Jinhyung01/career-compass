package com.jobfeel.careercompass.analysis.error;

import com.jobfeel.careercompass.analysis.controller.ReportController;
import com.jobfeel.careercompass.analysis.dto.ReportErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice(assignableTypes = ReportController.class)
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ReportExceptionHandler {

    @ExceptionHandler(ReportApiException.class)
    public ResponseEntity<ReportErrorResponse> handleReportApiException(ReportApiException exception) {
        return ResponseEntity
                .status(exception.getStatus())
                .body(new ReportErrorResponse(exception.getCode(), exception.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ReportErrorResponse> handleValidationException() {
        return ResponseEntity
                .badRequest()
                .body(new ReportErrorResponse("VALIDATION_ERROR", "요청 필드를 확인해 주세요."));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ReportErrorResponse> handleConstraintViolationException() {
        return ResponseEntity
                .badRequest()
                .body(new ReportErrorResponse("VALIDATION_ERROR", "요청 필드를 확인해 주세요."));
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class})
    public ResponseEntity<ReportErrorResponse> handleInvalidRequestException() {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ReportErrorResponse("INVALID_REQUEST", "요청 형식이 올바르지 않습니다."));
    }
}
