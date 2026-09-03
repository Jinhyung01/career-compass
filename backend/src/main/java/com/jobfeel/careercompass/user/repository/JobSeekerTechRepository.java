package com.jobfeel.careercompass.user.repository;

import com.jobfeel.careercompass.user.domain.JobSeekerTech;
import com.jobfeel.careercompass.user.domain.JobSeekerTechId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobSeekerTechRepository extends JpaRepository<JobSeekerTech, JobSeekerTechId> {

    List<JobSeekerTech> findAllByIdUserId(Long userId);

    /**
     * 벌크 DELETE. delete 후 같은 (user_id, tech_id) 를 재삽입할 때 flush 순서로 인한 PK 충돌을 막기 위해
     * flushAutomatically(삭제 전 대기 변경 flush) + clearAutomatically(삭제 후 컨텍스트 clear) 를 적용한다.
     */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from JobSeekerTech t where t.id.userId = :userId")
    void deleteAllByIdUserId(@Param("userId") Long userId);
}
