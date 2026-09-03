package com.jobfeel.careercompass.user.repository;

import com.jobfeel.careercompass.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    // boolean existsById(Long userId) 는 CrudRepository 에서 상속받는다.
}
