package com.jobfeel.careercompass.company.dto;

public record CompanyResponse(
        String companyCode,
        String companyName,
        String industry,
        int people,
        int insight
) {
    public CompanyResponse(String companyCode, String companyName, String industry) {
        this(companyCode, companyName, industry, 0, 0);
    }
}
