package com.jobfeel.careercompass.user.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import com.jobfeel.careercompass.common.error.ApiException;
import com.jobfeel.careercompass.user.domain.JobSeekerProfile;
import com.jobfeel.careercompass.user.domain.JobSeekerTech;
import com.jobfeel.careercompass.user.domain.ProfileContent;
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
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private ProfileRepository profileRepository;
    @Mock
    private JobSeekerTechRepository jobSeekerTechRepository;
    @Mock
    private ProfileContentRepository profileContentRepository;
    @Mock
    private ProfileQueryRepository profileQueryRepository;

    @InjectMocks
    private ProfileService profileService;

    @Captor
    private ArgumentCaptor<List<JobSeekerTech>> techCaptor;
    @Captor
    private ArgumentCaptor<List<ProfileContent>> contentCaptor;

    private ProfileUpsertRequest request(List<Long> techIds, String... categories) {
        List<ProfileContentRequest> contents = Arrays.stream(categories)
                .map(c -> new ProfileContentRequest(c, "내용-" + c))
                .toList();
        return new ProfileUpsertRequest(10L, techIds, contents);
    }

    // ---------------------------------------------------------------- GET

    @Test
    void getProfile_정상_Response_조립() {
        given(profileRepository.findByUserId(1L))
                .willReturn(Optional.of(new JobSeekerProfile(1L, 10L)));
        given(profileQueryRepository.findPositionName(10L)).willReturn("백엔드 개발자");
        given(jobSeekerTechRepository.findAllByIdUserId(1L))
                .willReturn(List.of(new JobSeekerTech(1L, 102L), new JobSeekerTech(1L, 101L)));
        given(profileQueryRepository.findTechNames(any()))
                .willReturn(Map.of(101L, "Java", 102L, "Spring"));
        ProfileContent content = new ProfileContent(
                1L, "PROJECT", "Spring Boot로 REST API를 구현했습니다.",
                OffsetDateTime.parse("2026-09-03T01:10:00Z"));
        ReflectionTestUtils.setField(content, "contentId", 1001L);
        given(profileContentRepository.findAllByUserIdOrderByContentId(1L))
                .willReturn(List.of(content));

        ProfileResponse res = profileService.getProfile(1L);

        assertThat(res.userId()).isEqualTo(1L);
        assertThat(res.desiredPosition().positionId()).isEqualTo(10L);
        assertThat(res.desiredPosition().positionName()).isEqualTo("백엔드 개발자");
        assertThat(res.techStacks())
                .extracting(TechStackResponse::techId)
                .containsExactly(101L, 102L); // techId 오름차순 정렬
        assertThat(res.techStacks())
                .extracting(TechStackResponse::techName)
                .containsExactly("Java", "Spring");
        assertThat(res.contents()).hasSize(1);
        ProfileContentResponse first = res.contents().get(0);
        assertThat(first.contentId()).isEqualTo(1001L);
        assertThat(first.category()).isEqualTo("PROJECT");
        assertThat(first.createdAt()).isEqualTo(OffsetDateTime.parse("2026-09-03T01:10:00Z"));
    }

    @Test
    void getProfile_없으면_PROFILE_NOT_FOUND() {
        given(profileRepository.findByUserId(1L)).willReturn(Optional.empty());

        assertThatThrownBy(() -> profileService.getProfile(1L))
                .isInstanceOfSatisfying(ApiException.class, e -> {
                    assertThat(e.getStatus()).isEqualTo(HttpStatus.NOT_FOUND);
                    assertThat(e.getCode()).isEqualTo("PROFILE_NOT_FOUND");
                });
    }

    // ---------------------------------------------------------------- PUT

    @Test
    void saveProfile_정상_기존_Tech_와_Content_전체_교체() {
        given(userRepository.existsById(1L)).willReturn(true);
        given(profileQueryRepository.existsPosition(10L)).willReturn(true);
        given(profileQueryRepository.findTechNames(any()))
                .willReturn(Map.of(101L, "Java", 102L, "Spring", 103L, "JPA"));
        JobSeekerProfile existing = new JobSeekerProfile(1L, 99L);
        given(profileRepository.findByUserId(1L)).willReturn(Optional.of(existing));
        // 9단계 재조회
        given(profileQueryRepository.findPositionName(10L)).willReturn("백엔드 개발자");
        given(jobSeekerTechRepository.findAllByIdUserId(1L)).willReturn(List.of(
                new JobSeekerTech(1L, 101L), new JobSeekerTech(1L, 102L), new JobSeekerTech(1L, 103L)));
        ProfileContent persisted = new ProfileContent(
                1L, "PROJECT", "내용-PROJECT", OffsetDateTime.parse("2026-09-03T00:00:00Z"));
        ReflectionTestUtils.setField(persisted, "contentId", 5001L);
        given(profileContentRepository.findAllByUserIdOrderByContentId(1L))
                .willReturn(List.of(persisted));

        ProfileResponse res = profileService.saveProfile(
                1L, request(List.of(101L, 102L, 103L), "PROJECT", "STUDY"));

        // delete 가 saveAll 보다 먼저 호출된다 (flush 순서 문제 방지)
        InOrder techOrder = inOrder(jobSeekerTechRepository);
        techOrder.verify(jobSeekerTechRepository).deleteAllByIdUserId(1L);
        techOrder.verify(jobSeekerTechRepository).saveAll(anyList());
        InOrder contentOrder = inOrder(profileContentRepository);
        contentOrder.verify(profileContentRepository).deleteAllByUserId(1L);
        contentOrder.verify(profileContentRepository).saveAll(anyList());

        // 요청값으로 전체 교체
        verify(jobSeekerTechRepository).saveAll(techCaptor.capture());
        assertThat(techCaptor.getValue())
                .extracting(t -> t.getId().getTechId())
                .containsExactly(101L, 102L, 103L);

        verify(profileContentRepository).saveAll(contentCaptor.capture());
        assertThat(contentCaptor.getValue())
                .extracting(ProfileContent::getCategory)
                .containsExactly("PROJECT", "STUDY");
        assertThat(contentCaptor.getValue()).allSatisfy(c -> {
            assertThat(c.getUserId()).isEqualTo(1L);
            assertThat(c.getCreatedAt()).isNotNull();
            assertThat(c.getContentId()).isNull(); // contentId 는 요청에서 받지 않는다
        });

        // profile upsert (update 분기)
        verify(profileRepository).save(existing);
        assertThat(existing.getDesiredPositionId()).isEqualTo(10L);

        // 반환값은 재조회 결과
        assertThat(res.contents())
                .extracting(ProfileContentResponse::contentId)
                .containsExactly(5001L);
    }

    @Test
    void saveProfile_Position_없음_INVALID_POSITION() {
        given(userRepository.existsById(1L)).willReturn(true);
        given(profileQueryRepository.existsPosition(10L)).willReturn(false);

        assertThatThrownBy(() -> profileService.saveProfile(1L, request(List.of(101L), "PROJECT")))
                .isInstanceOfSatisfying(ApiException.class, e -> {
                    assertThat(e.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
                    assertThat(e.getCode()).isEqualTo("INVALID_POSITION");
                });

        verify(profileRepository, never()).save(any());
        verify(jobSeekerTechRepository, never()).deleteAllByIdUserId(anyLong());
        verify(profileContentRepository, never()).deleteAllByUserId(anyLong());
    }

    @Test
    void saveProfile_Tech_하나라도_없음_INVALID_TECH_STACK() {
        given(userRepository.existsById(1L)).willReturn(true);
        given(profileQueryRepository.existsPosition(10L)).willReturn(true);
        given(profileQueryRepository.findTechNames(any())).willReturn(Map.of(101L, "Java")); // 2개 요청, 1개만 존재

        assertThatThrownBy(() ->
                profileService.saveProfile(1L, request(List.of(101L, 999L), "PROJECT")))
                .isInstanceOfSatisfying(ApiException.class, e -> {
                    assertThat(e.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
                    assertThat(e.getCode()).isEqualTo("INVALID_TECH_STACK");
                });

        verify(jobSeekerTechRepository, never()).deleteAllByIdUserId(anyLong());
    }

    @Test
    void saveProfile_Tech_중복_DUPLICATE_TECH_STACK() {
        given(userRepository.existsById(1L)).willReturn(true);
        given(profileQueryRepository.existsPosition(10L)).willReturn(true);

        assertThatThrownBy(() ->
                profileService.saveProfile(1L, request(List.of(101L, 101L), "PROJECT")))
                .isInstanceOfSatisfying(ApiException.class, e -> {
                    assertThat(e.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
                    assertThat(e.getCode()).isEqualTo("DUPLICATE_TECH_STACK");
                });

        // 중복 검사(3단계)는 존재 검사(4단계)보다 먼저다
        verify(profileQueryRepository, never()).findTechNames(any());
    }

    @Test
    void saveProfile_Category_오류_INVALID_PROFILE_CATEGORY() {
        given(userRepository.existsById(1L)).willReturn(true);
        given(profileQueryRepository.existsPosition(10L)).willReturn(true);
        given(profileQueryRepository.findTechNames(any())).willReturn(Map.of(101L, "Java"));

        assertThatThrownBy(() ->
                profileService.saveProfile(1L, request(List.of(101L), "NOT_A_CATEGORY")))
                .isInstanceOfSatisfying(ApiException.class, e -> {
                    assertThat(e.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
                    assertThat(e.getCode()).isEqualTo("INVALID_PROFILE_CATEGORY");
                });

        verify(profileContentRepository, never()).deleteAllByUserId(anyLong());
    }

    @Test
    void saveProfile_저장_중_예외는_그대로_전파된다() {
        given(userRepository.existsById(1L)).willReturn(true);
        given(profileQueryRepository.existsPosition(10L)).willReturn(true);
        given(profileQueryRepository.findTechNames(any())).willReturn(Map.of(101L, "Java"));
        given(profileRepository.findByUserId(1L))
                .willReturn(Optional.of(new JobSeekerProfile(1L, 10L)));
        given(profileContentRepository.saveAll(anyList()))
                .willThrow(new RuntimeException("DB 오류"));

        assertThatThrownBy(() -> profileService.saveProfile(1L, request(List.of(101L), "PROJECT")))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("DB 오류");

        // 저장을 시작한 뒤 예외 → @Transactional 이 전체 롤백 대상으로 삼는다 (여기서는 전파만 검증)
        verify(jobSeekerTechRepository).deleteAllByIdUserId(1L);
        verify(profileContentRepository).deleteAllByUserId(1L);
    }
}
