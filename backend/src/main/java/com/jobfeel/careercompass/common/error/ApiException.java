package com.jobfeel.careercompass.common.error;

import org.springframework.http.HttpStatus;

/**
 * 담당 A~D 전 기능에서 공통으로 사용하는 API 예외.
 *
 * GlobalExceptionHandler가 이 예외를 잡아
 * status/code/message를 그대로 {@link ErrorResponse}로 변환한다.
 */
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String code;

    public ApiException(HttpStatus status, String code, String message) {
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
