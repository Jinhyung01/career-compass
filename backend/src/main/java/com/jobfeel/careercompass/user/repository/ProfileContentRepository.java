package com.jobfeel.careercompass.user.repository;

import com.jobfeel.careercompass.user.domain.ProfileContent;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfileContentRepository extends JpaRepository<ProfileContent, Long> {

    List<ProfileContent> findAllByUserIdOrderByContentId(Long userId);

    /**
     * 벌크 DELETE. 전체 삭제 후 재삽입 시 flush 순서 문제를 막기 위해
     * flushAutomatically + clearAutomatically 를 적용한다.
     */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from ProfileContent c where c.userId = :userId")
    void deleteAllByUserId(@Param("userId") Long userId);
}
