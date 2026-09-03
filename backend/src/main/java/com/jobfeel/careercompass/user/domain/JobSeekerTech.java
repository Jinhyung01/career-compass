package com.jobfeel.careercompass.user.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "job_seeker_tech")
public class JobSeekerTech {

    @EmbeddedId
    private JobSeekerTechId id;

    protected JobSeekerTech() {
    }

    public JobSeekerTech(long userId, long techId) {
        this.id = new JobSeekerTechId(userId, techId);
    }

    public JobSeekerTechId getId() {
        return id;
    }
}
