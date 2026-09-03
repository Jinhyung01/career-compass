package com.jobfeel.careercompass.company.service;

import com.jobfeel.careercompass.company.domain.Company;
import com.jobfeel.careercompass.company.dto.CompanyResponse;
import com.jobfeel.careercompass.company.repository.CompanyRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
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
                                new Company("C001", "예시테크", "IT"),
                                new Company("C002", "클라우드나인", "IT")
                        ),
                        pageable,
                        2
                ));

        var response = companyService.search(null, null, 0, 20);

        assertThat(response.items()).containsExactly(
                new CompanyResponse("C001", "예시테크", "IT"),
                new CompanyResponse("C002", "클라우드나인", "IT")
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
        when(companyRepository.search("예시", null, pageable))
                .thenReturn(new PageImpl<>(
                        List.of(new Company("C001", "예시테크", "IT")),
                        pageable,
                        1
                ));

        var response = companyService.search("예시", null, 0, 20);

        assertThat(response.items()).containsExactly(
                new CompanyResponse("C001", "예시테크", "IT")
        );
        verify(companyRepository).search("예시", null, pageable);
    }

    @Test
    void searchesByIndustry() {
        PageRequest pageable = PageRequest.of(0, 20);
        when(companyRepository.search(null, "IT", pageable))
                .thenReturn(new PageImpl<>(
                        List.of(new Company("C001", "예시테크", "IT")),
                        pageable,
                        1
                ));

        var response = companyService.search(null, "IT", 0, 20);

        assertThat(response.items()).containsExactly(
                new CompanyResponse("C001", "예시테크", "IT")
        );
        verify(companyRepository).search(null, "IT", pageable);
    }

    @Test
    void searchesByQueryAndIndustryTogether() {
        PageRequest pageable = PageRequest.of(1, 10);
        when(companyRepository.search("예시", "IT", pageable))
                .thenReturn(new PageImpl<>(
                        List.of(new Company("C001", "예시테크", "IT")),
                        pageable,
                        11
                ));

        var response = companyService.search("예시", "IT", 1, 10);

        assertThat(response.items()).containsExactly(
                new CompanyResponse("C001", "예시테크", "IT")
        );
        assertThat(response.page()).isEqualTo(1);
        assertThat(response.size()).isEqualTo(10);
        assertThat(response.totalElements()).isEqualTo(11);
        assertThat(response.totalPages()).isEqualTo(2);
        verify(companyRepository).search("예시", "IT", pageable);
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
}
