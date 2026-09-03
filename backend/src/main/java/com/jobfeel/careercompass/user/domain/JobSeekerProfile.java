package com.jobfeel.careercompass.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "job_seeker_profile")
public class JobSeekerProfile {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "desired_position_id")
    private Long desiredPositionId;

    protected JobSeekerProfile() {
    }

    public JobSeekerProfile(Long userId, Long desiredPositionId) {
        this.userId = userId;
        this.desiredPositionId = desiredPositionId;
    }

    public void changeDesiredPosition(Long desiredPositionId) {
        this.desiredPositionId = desiredPositionId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getDesiredPositionId() {
        return desiredPositionId;
    }
}
