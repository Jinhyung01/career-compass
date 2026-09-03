package com.jobfeel.careercompass.user.repository;

import com.jobfeel.careercompass.user.domain.JobSeekerProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<JobSeekerProfile, Long> {

    Optional<JobSeekerProfile> findByUserId(Long userId);
}
