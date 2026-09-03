package com.jobfeel.careercompass.common.error;

/**
 * 공통 에러 응답 형태.
 *
 * <pre>
 * {
 *   "code": "ERROR_CODE",
 *   "message": "에러 설명"
 * }
 * </pre>
 */
public record ErrorResponse(String code, String message) {
}
