package com.jobfeel.careercompass.user.service;

import com.jobfeel.careercompass.common.error.ApiException;
import com.jobfeel.careercompass.user.domain.JobSeekerProfile;
import com.jobfeel.careercompass.user.domain.JobSeekerTech;
import com.jobfeel.careercompass.user.domain.JobSeekerTechId;
import com.jobfeel.careercompass.user.domain.ProfileContent;
import com.jobfeel.careercompass.user.dto.PositionResponse;
import com.jobfeel.careercompass.user.dto.ProfileContentRequest;
import com.jobfeel.careercompass.user.dto.ProfileContentResponse;
import com.jobfeel.careercompass.user.dto.ProfileResponse;
import com.jobfeel.careercompass.user.dto.ProfileUpsertRequest;
import com.jobfeel.careercompass.user.dto.TechStackResponse;
import com.jobfeel.careercompass.user.repository.JobSeekerTechRepository;
import com.jobfeel.careercompass.user.repository.ProfileContentRepository;
import com.jobfeel.careercompass.user.repository.ProfileQueryRepository;
import com.jobfeel.careercompass.user.repository.ProfileRepository;
import com.jobfeel.careercompass.user.repository.UserRepository;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final JobSeekerTechRepository jobSeekerTechRepository;
    private final ProfileContentRepository profileContentRepository;
    private final ProfileQueryRepository profileQueryRepository;

    public ProfileService(UserRepository userRepository,
                          ProfileRepository profileRepository,
                          JobSeekerTechRepository jobSeekerTechRepository,
                          ProfileContentRepository profileContentRepository,
                          ProfileQueryRepository profileQueryRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.jobSeekerTechRepository = jobSeekerTechRepository;
        this.profileContentRepository = profileContentRepository;
        this.profileQueryRepository = profileQueryRepository;
    }

    private static final Set<String> ALLOWED_CATEGORIES =
            Set.of("PROJECT", "EXPERIENCE", "STUDY", "PREFERRED_CULTURE");

    @Transactional(readOnly = true)
    public ProfileResponse getProfile(long userId) {
        JobSeekerProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND, "PROFILE_NOT_FOUND", "프로필이 존재하지 않습니다."));
        return assembleProfile(profile);
    }

    /**
     * 프로필 전체 저장. 검증을 모두 통과한 뒤에만 저장을 시작한다.
     * job_seeker_profile / job_seeker_tech / profile_content 를 하나의 트랜잭션에서 교체한다.
     */
    @Transactional
    public ProfileResponse saveProfile(long userId, ProfileUpsertRequest request) {
        // 1. 사용자 존재
        if (!userRepository.existsById(userId)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "사용자가 존재하지 않습니다.");
        }

        // 2. 직무 존재
        long desiredPositionId = request.desiredPositionId();
        if (!profileQueryRepository.existsPosition(desiredPositionId)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_POSITION", "존재하지 않는 직무입니다.");
        }

        // 3. 기술 스택 중복
        List<Long> techIds = request.techIds();
        if (new HashSet<>(techIds).size() != techIds.size()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "DUPLICATE_TECH_STACK", "중복된 기술 스택이 있습니다.");
        }

        // 4. 기술 스택 전부 존재 (findTechNames 결과 size 로 판정, 별도 exists 쿼리 없음)
        Map<Long, String> techNames = profileQueryRepository.findTechNames(techIds);
        if (techNames.size() != techIds.size()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_TECH_STACK", "존재하지 않는 기술 스택이 있습니다.");
        }

        // 5. 카테고리 허용값
        for (ProfileContentRequest content : request.contents()) {
            if (!ALLOWED_CATEGORIES.contains(content.category())) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_PROFILE_CATEGORY",
                        "허용되지 않은 category 입니다: " + content.category());
            }
        }

        // 6. job_seeker_profile insert or update
        JobSeekerProfile profile = profileRepository.findByUserId(userId)
                .map(existing -> {
                    existing.changeDesiredPosition(desiredPositionId);
                    return existing;
                })
                .orElseGet(() -> new JobSeekerProfile(userId, desiredPositionId));
        profileRepository.save(profile);

        // 7. job_seeker_tech 전체 삭제 후 재저장 (벌크 delete 로 flush 순서 문제 방지)
        jobSeekerTechRepository.deleteAllByIdUserId(userId);
        jobSeekerTechRepository.saveAll(
                techIds.stream().map(techId -> new JobSeekerTech(userId, techId)).toList());

        // 8. profile_content 전체 삭제 후 재저장 (같은 category 다중 저장 허용)
        profileContentRepository.deleteAllByUserId(userId);
        OffsetDateTime now = OffsetDateTime.now(ZoneOffset.UTC);
        profileContentRepository.saveAll(
                request.contents().stream()
                        .map(c -> new ProfileContent(userId, c.category(), c.content(), now))
                        .toList());

        // 9. GET 과 동일한 Response 반환
        return getProfile(userId);
    }

    /**
     * GET 과 PUT 응답을 동일하게 조립한다. 저장 이후 재조회 결과로도 호출된다.
     */
    private ProfileResponse assembleProfile(JobSeekerProfile profile) {
        long userId = profile.getUserId();

        PositionResponse desiredPosition = null;
        Long positionId = profile.getDesiredPositionId();
        if (positionId != null) {
            String positionName = profileQueryRepository.findPositionName(positionId);
            desiredPosition = new PositionResponse(positionId, positionName);
        }

        List<Long> techIds = jobSeekerTechRepository.findAllByIdUserId(userId).stream()
                .map(JobSeekerTech::getId)
                .map(JobSeekerTechId::getTechId)
                .sorted()
                .toList();
        Map<Long, String> techNames = profileQueryRepository.findTechNames(techIds);
        List<TechStackResponse> techStacks = techIds.stream()
                .map(techId -> new TechStackResponse(techId, techNames.get(techId)))
                .toList();

        List<ProfileContentResponse> contents =
                profileContentRepository.findAllByUserIdOrderByContentId(userId).stream()
                        .map(c -> new ProfileContentResponse(
                                c.getContentId(),
                                c.getCategory(),
                                c.getContent(),
                                toUtc(c)))
                        .toList();

        return new ProfileResponse(userId, desiredPosition, techStacks, contents);
    }

    private static OffsetDateTime toUtc(ProfileContent content) {
        return content.getCreatedAt() == null
                ? null
                : content.getCreatedAt().withOffsetSameInstant(ZoneOffset.UTC);
    }
}
