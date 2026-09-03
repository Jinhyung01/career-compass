package com.jobfeel.careercompass.company.controller;

import com.jobfeel.careercompass.common.auth.CurrentUserProvider;
import com.jobfeel.careercompass.common.error.ApiException;
import com.jobfeel.careercompass.company.dto.CompanyResponse;
import com.jobfeel.careercompass.company.dto.CompanySearchResponse;
import com.jobfeel.careercompass.company.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController {

    private final CompanyService companyService;
    private final CurrentUserProvider currentUserProvider;

    public CompanyController(
            CompanyService companyService,
            CurrentUserProvider currentUserProvider
    ) {
        this.companyService = companyService;
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping
    public CompanySearchResponse search(
            Authentication authentication,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String industry,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        currentUserProvider.getCurrentUserId(authentication);
        if (page < 0 || size < 1 || size > 100) {
            throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "VALIDATION_ERROR",
                    "요청 값이 올바르지 않습니다."
            );
        }
        return companyService.search(query, industry, page, size);
    }

    @GetMapping("/{companyCode}")
    public CompanyResponse getCompany(
            Authentication authentication,
            @PathVariable String companyCode
    ) {
        currentUserProvider.getCurrentUserId(authentication);
        return companyService.getCompany(companyCode);
    }
}
