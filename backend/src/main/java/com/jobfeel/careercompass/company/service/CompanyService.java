package com.jobfeel.careercompass.company.service;

import com.jobfeel.careercompass.company.dto.CompanyResponse;
import com.jobfeel.careercompass.company.dto.CompanySearchResponse;
import com.jobfeel.careercompass.company.repository.CompanyRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public CompanySearchResponse search(
            String query,
            String industry,
            int page,
            int size
    ) {
        String normalizedQuery = normalize(query);
        String normalizedIndustry = normalize(industry);
        var companies = companyRepository.search(
                normalizedQuery,
                normalizedIndustry,
                PageRequest.of(page, size)
        );

        var items = companies.getContent().stream()
                .map(company -> new CompanyResponse(
                        company.getCompanyCode(),
                        company.getCompanyName(),
                        company.getIndustry()
                ))
                .toList();

        return new CompanySearchResponse(
                items,
                companies.getNumber(),
                companies.getSize(),
                companies.getTotalElements(),
                companies.getTotalPages()
        );
    }

    private String normalize(String value) {
        return StringUtils.hasText(value) ? value : null;
    }
}
