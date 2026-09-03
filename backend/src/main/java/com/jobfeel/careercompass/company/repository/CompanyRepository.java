package com.jobfeel.careercompass.company.repository;

import com.jobfeel.careercompass.company.domain.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanyRepository extends JpaRepository<Company, String> {

    @Query("""
            SELECT c
            FROM Company c
            WHERE (CAST(:query AS String) IS NULL
                   OR LOWER(c.companyName) LIKE LOWER(CONCAT('%', CAST(:query AS String), '%')))
              AND (CAST(:industry AS String) IS NULL
                   OR c.industry = CAST(:industry AS String))
            """)
    Page<Company> search(
            @Param("query") String query,
            @Param("industry") String industry,
            Pageable pageable
    );
}
