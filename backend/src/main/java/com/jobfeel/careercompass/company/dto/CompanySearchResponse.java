package com.jobfeel.careercompass.company.dto;

import java.util.List;

public record CompanySearchResponse(
        List<CompanyResponse> items,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
