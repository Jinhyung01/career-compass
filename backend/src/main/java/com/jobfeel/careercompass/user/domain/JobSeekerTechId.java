package com.jobfeel.careercompass.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class JobSeekerTechId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "tech_id")
    private Long techId;

    protected JobSeekerTechId() {
    }

    public JobSeekerTechId(Long userId, Long techId) {
        this.userId = userId;
        this.techId = techId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getTechId() {
        return techId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        JobSeekerTechId that = (JobSeekerTechId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(techId, that.techId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, techId);
    }
}
