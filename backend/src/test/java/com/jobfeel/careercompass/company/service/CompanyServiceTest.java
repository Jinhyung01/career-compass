package com.jobfeel.careercompass.company.service;

import com.jobfeel.careercompass.company.domain.Company;
import com.jobfeel.careercompass.company.dto.CompanyResponse;
import com.jobfeel.careercompass.company.repository.CompanyRepository;
import com.jobfeel.careercompass.common.error.ApiException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private CompanyService companyService;

    @Test
    void searchesAllCompaniesWhenFiltersAreMissing() {
        PageRequest pageable = PageRequest.of(0, 20);
        when(companyRepository.search(null, null, pageable))
                .thenReturn(new PageImpl<>(
                        List.of(
                                new Company("C001", "SK hynix", "반도체"),
                                new Company("C002", "SK AX", "IT서비스")
                        ),
                        pageable,
                        2
                ));

        var response = companyService.search(null, null, 0, 20);

        assertThat(response.items()).containsExactly(
                new CompanyResponse("C001", "SK hynix", "반도체"),
                new CompanyResponse("C002", "SK AX", "IT서비스")
        );
        assertThat(response.page()).isZero();
        assertThat(response.size()).isEqualTo(20);
        assertThat(response.totalElements()).isEqualTo(2);
        assertThat(response.totalPages()).isEqualTo(1);
    }

    @Test
    void treatsBlankFiltersAsMissing() {
        PageRequest pageable = PageRequest.of(0, 20);
        when(companyRepository.search(null, null, pageable))
                .thenReturn(new PageImpl<>(List.of(), pageable, 0));

        var response = companyService.search("   ", "", 0, 20);

        assertThat(response.items()).isEmpty();
        verify(companyRepository).search(null, null, pageable);
    }

    @Test
    void searchesByCompanyNameQuery() {
        PageRequest pageable = PageRequest.of(0, 20);
        when(companyRepository.search("hynix", null, pageable))
                .thenReturn(new PageImpl<>(
                        List.of(new Company("C001", "SK hynix", "반도체")),
                        pageable,
                        1
                ));

        var response = companyService.search("hynix", null, 0, 20);

        assertThat(response.items()).containsExactly(
                new CompanyResponse("C001", "SK hynix", "반도체")
        );
        verify(companyRepository).search("hynix", null, pageable);
    }

    @Test
    void searchesByIndustry() {
        PageRequest pageable = PageRequest.of(0, 20);
        when(companyRepository.search(null, "반도체", pageable))
                .thenReturn(new PageImpl<>(
                        List.of(new Company("C001", "SK hynix", "반도체")),
                        pageable,
                        1
                ));

        var response = companyService.search(null, "반도체", 0, 20);

        assertThat(response.items()).containsExactly(
                new CompanyResponse("C001", "SK hynix", "반도체")
        );
        verify(companyRepository).search(null, "반도체", pageable);
    }

    @Test
    void searchesByQueryAndIndustryTogether() {
        PageRequest pageable = PageRequest.of(1, 10);
        when(companyRepository.search("SK", "반도체", pageable))
                .thenReturn(new PageImpl<>(
                        List.of(new Company("C001", "SK hynix", "반도체")),
                        pageable,
                        11
                ));

        var response = companyService.search("SK", "반도체", 1, 10);

        assertThat(response.items()).containsExactly(
                new CompanyResponse("C001", "SK hynix", "반도체")
        );
        assertThat(response.page()).isEqualTo(1);
        assertThat(response.size()).isEqualTo(10);
        assertThat(response.totalElements()).isEqualTo(11);
        assertThat(response.totalPages()).isEqualTo(2);
        verify(companyRepository).search("SK", "반도체", pageable);
    }

    @Test
    void returnsEmptyItemsWhenNoCompanyMatches() {
        PageRequest pageable = PageRequest.of(0, 20);
        when(companyRepository.search("없는기업", null, pageable))
                .thenReturn(new PageImpl<>(List.of(), pageable, 0));

        var response = companyService.search("없는기업", null, 0, 20);

        assertThat(response.items()).isEmpty();
        assertThat(response.totalElements()).isZero();
        assertThat(response.totalPages()).isZero();
    }

    @Test
    void returnsCompanyDetail() {
        when(companyRepository.findById("C001"))
                .thenReturn(Optional.of(new Company("C001", "SK hynix", "반도체")));

        var response = companyService.getCompany("C001");

        assertThat(response).isEqualTo(
                new CompanyResponse("C001", "SK hynix", "반도체")
        );
    }

    @Test
    void throwsCompanyNotFoundWhenCompanyDoesNotExist() {
        when(companyRepository.findById("UNKNOWN"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> companyService.getCompany("UNKNOWN"))
                .isInstanceOfSatisfying(ApiException.class, exception -> {
                    assertThat(exception.getStatus()).isEqualTo(HttpStatus.NOT_FOUND);
                    assertThat(exception.getCode()).isEqualTo("COMPANY_NOT_FOUND");
                });
    }
}
