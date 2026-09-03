package com.jobfeel.careercompass.user.repository;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * job_position, tech_stack 은 C 담당 테이블이므로 user 패키지에 Entity 를 만들지 않고
 * 필요한 값만 조회한다.
 */
@Repository
public class ProfileQueryRepository {

    private final NamedParameterJdbcTemplate jdbc;

    public ProfileQueryRepository(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public boolean existsPosition(long positionId) {
        Boolean exists = jdbc.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM job_position WHERE position_id = :id)",
                new MapSqlParameterSource("id", positionId),
                Boolean.class);
        return Boolean.TRUE.equals(exists);
    }

    public Map<Long, String> findTechNames(Collection<Long> techIds) {
        Map<Long, String> result = new LinkedHashMap<>();
        if (techIds == null || techIds.isEmpty()) {
            return result;
        }
        jdbc.query(
                "SELECT tech_id, tech_name FROM tech_stack WHERE tech_id IN (:ids)",
                new MapSqlParameterSource("ids", techIds),
                rs -> {
                    result.put(rs.getLong("tech_id"), rs.getString("tech_name"));
                });
        return result;
    }

    public String findPositionName(long positionId) {
        try {
            return jdbc.queryForObject(
                    "SELECT position_name FROM job_position WHERE position_id = :id",
                    new MapSqlParameterSource("id", positionId),
                    String.class);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
