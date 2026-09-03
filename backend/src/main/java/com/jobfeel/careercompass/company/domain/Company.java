package com.jobfeel.careercompass.company.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "company")
public class Company {

    @Id
    @Column(name = "company_code", length = 20)
    private String companyCode;

    @Column(name = "company_name", nullable = false, length = 100)
    private String companyName;

    @Column(length = 50)
    private String industry;

    protected Company() {
    }

    public Company(String companyCode, String companyName, String industry) {
        this.companyCode = companyCode;
        this.companyName = companyName;
        this.industry = industry;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getIndustry() {
        return industry;
    }
}
