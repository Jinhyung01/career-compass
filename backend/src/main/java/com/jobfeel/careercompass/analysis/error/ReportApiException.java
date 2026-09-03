package com.jobfeel.careercompass.analysis.error;

import org.springframework.http.HttpStatus;

public class ReportApiException extends RuntimeException {

    private final HttpStatus status;
    private final String code;

    public ReportApiException(HttpStatus status, String code, String message) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }
}
