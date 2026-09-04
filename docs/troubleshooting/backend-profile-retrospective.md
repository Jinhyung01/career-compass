# career-compass 개발 트러블슈팅 정리

**Backend B — 사용자 프로필 API** · 개발환경 / Git 협업 / 구현 / 검증 / 통합 전 과정

| | | | |
|---|---|---|---|
| **프로젝트** | career-compass (AI 취업 분석 서비스) | **담당** | Backend B |
| **범위** | `GET·PUT /api/v1/me/profile` · `user` 패키지 | **브랜치** | `feat/user-profile` → PR #5 머지 완료 |
| **스택** | Vue 3 + Vite / Spring Boot + Gradle / PostgreSQL(pgvector) / Docker Compose | **기간** | 2026-09-03 ~ 09-04 |

---

## 요약

구현 착수부터 4개 브랜치 통합·전체 API 스모크 테스트까지 진행하며 마주친 문제 **17건**을 정리했다.

| 구분 | 건수 | 비고 |
|---|---|---|
| 직접 해결 | 14 | 담당 범위 내에서 해결 완료 |
| 타 담당자 전달 | 3 | 수정 권한 밖의 영역 — 아래 표 참고 |

**결과** — `user` 패키지 프로덕션 파일 19개 / 단위 테스트 13개 통과 / PR #5 main 머지 완료 / 전체 API 스모크 **29건 중 28 PASS · 0 FAIL · 1 SKIP**.

통합 시점에 A·C·D의 공용 코드가 들어왔을 때 **B 코드는 한 줄도 수정 없이 컴파일·동작**했다. 미머지 상태에서 상대방 문서의 시그니처를 그대로 스텁으로 만들어 개발한 전략(G-01)이 유효했다.

---

## PM 확인 필요 — 미해결 항목

B 담당 범위 밖이라 직접 수정할 수 없는 항목이다. 각각 재현 조건과 수정안까지 정리해 해당 담당자에게 전달했으나, 처리 여부는 별도 확인이 필요하다.

| 우선순위 | 항목 | 담당 | 영향 |
|---|---|---|---|
| **높음** | `/api/v1/**` CORS 미설정 | A | **FE 연동 시 전체 API가 브라우저에서 차단됨.** 현재 스모크가 전부 PASS라 드러나지 않은 상태 (N-01) |
| 중간 | 인증 Provider 이원화 | D | 같은 토큰인데 API마다 인증 결과가 달라질 수 있음 (N-02) |
| 중간 | 오류 코드 명세서 미문서화 | A | 실제 20종 사용 중이나 명세서 §3.2에 통합 표 없음 — FE가 참조할 근거 부재 |
| 중간 | 403 소유권 검증용 Seed 부재 | C·D | 스모크 1건 SKIP 사유. 다른 사용자 소유 리포트 Seed 필요 (V-04) |
| 낮음 | `UserResponse.createdAt` 타입 불일치 | A | `Instant` 하나만 다름. 직렬화 결과는 동일 |

> **가장 시급한 것은 CORS다.** 백엔드 스모크가 28/29 PASS인 상태이지만, 이 수치는 CORS에 대해 아무것도 보증하지 않는다. FE가 `/api/v1/**`을 브라우저에서 호출하는 순간 전 API가 preflight 단계에서 막힌다. FE 연동 착수 전에 처리되어야 한다.

---

## 전체 목록

| No | 분류 | 제목 | 상태 |
|---|---|---|---|
| E-01 | 개발환경 | Docker로 실행했는데 다른 프로젝트 화면이 뜨는 문제 (5173 포트 충돌) | 해결 |
| E-02 | 개발환경 | `docker compose down -v`가 DB 외의 것까지 삭제하는 문제 | 해결 |
| G-01 | 협업 경계 | 공용 코드 미머지로 컴파일 불가 — 임시 스텁 4개 | 해결 |
| G-02 | 협업 경계 | `git add .`에 커밋하면 안 되는 파일이 딸려 들어가는 문제 | 해결 |
| G-03 | 협업 경계 | 계획한 커밋 분할이 컴파일 불가 상태를 만드는 문제 | 해결 |
| G-04 | 협업 경계 | 로컬 스텁과 실제 파일의 경로 충돌 — 머지 자체가 거부됨 | 해결 |
| I-01 | 구현 | delete 직후 insert 시 PK 충돌 (Hibernate flush 순서) | 해결 |
| I-02 | 구현 | 검증 계층 충돌 — 애노테이션이 명세 오류 코드를 덮어씀 | 해결 |
| I-03 | 구현 | `createdAt`이 UTC로 나오지 않는데 설정 파일은 수정 금지 | 해결 |
| I-04 | 구현 | 같은 빈 내부 호출에서 `@Transactional`이 적용되지 않는 문제 | 해결 |
| V-01 | 검증 | CI에 PostgreSQL이 없어 통합 테스트를 쓸 수 없는 문제 | 해결 |
| V-02 | 검증 | Mockito 테스트가 통과해도 실제 스키마 매핑은 검증되지 않는 문제 | 해결 |
| V-03 | 검증 | 단위 테스트 작성 중 걸린 것 2건 (NPE · deprecated API) | 해결 |
| V-04 | 검증 | 스모크 테스트 설계 — 재실행 안전성과 검증 불가 케이스 | 해결 |
| N-01 | 통합 | CORS 미설정 — curl은 전부 통과하는데 브라우저에선 전멸 | **담당자 전달** |
| N-02 | 통합 | 인증 Provider 이원화 — 같은 토큰인데 API마다 결과가 다름 | **담당자 전달** |
| N-03 | 통합 | 통합 검증의 전제가 아직 성립하지 않은 상태에서의 실행 | 해결 |

---

## 1. 개발환경

### E-01 · Docker로 실행했는데 다른 프로젝트 화면이 뜨는 문제

**증상** — Docker Compose로 `career-compass`를 실행한 뒤 `http://localhost:5173`에 접속했으나, 이전에 작업하던 `skala-vue` 프로젝트 화면이 표시됐다.

| | |
|---|---|
| 기대 화면 | 잡필 개발환경 / Backend 상태 확인 (career-compass) |
| 실제 화면 | 기존 `skala-vue` 프로젝트 |
| 대상 포트 | 5173 (Docker Frontend 사용 중) |

**원인 분석**

*① 컨테이너 상태 확인 — 정상*

```bash
docker compose ps
```

Frontend / Backend / DB 모두 정상 실행 중이었고, Frontend는 5173을 정상 바인딩하고 있었다.

```
0.0.0.0:5173->5173/tcp
```

컨테이너가 뜨지 않아 생긴 문제는 아니므로, 원인 후보를 컨테이너 밖으로 옮겼다.

*② 포트 점유 프로세스 확인 — 문제 발견*

```bash
lsof -i :5173
```

```
node      16000 ... TCP localhost:5173 (LISTEN)
com.docke 25229 ... TCP *:5173      (LISTEN)
```

Docker 외에 별도의 Node 프로세스가 같은 포트를 듣고 있었다. `localhost:5173`으로 들어온 요청은 이 프로세스가 먼저 가져간다.

*③ 실행 경로 추적 — 정체 확인*

```bash
ps -ww -p 16000 -o pid,ppid,command
```

```
node /Users/hayeon/workspace/10 Vue/skala-vue/node_modules/.bin/vite
```

이전 프로젝트 `skala-vue`의 Vite 개발 서버가 종료되지 않고 백그라운드에 남아 있었다.

**해결**

```bash
lsof -i :5173                              # 1. 포트 사용 프로세스 확인
ps -ww -p <PID> -o pid,ppid,command        # 2. 실행 경로로 프로젝트 특정
kill <PID>                                 # 3. 충돌 프로세스 종료
docker compose up -d                       # 4. Docker 실행
curl http://localhost:5173/src/App.vue     # 5. 실제 응답으로 검증
```

Vite dev 서버는 소스 파일을 그대로 서빙하므로 `App.vue`를 받아보면 어느 프로젝트인지 바로 구분된다. 종료 후에는 현재 프로젝트의 `App.vue`가 반환됐다.

> **핵심 — Docker의 문제가 아니었다.** 컨테이너는 정상 동작했지만, 로컬에 남아 있던 Vite 개발 서버와 Docker Frontend가 같은 포트를 두고 충돌하면서 의도하지 않은 프로젝트가 노출됐다. 화면만 보고 판단하면 "Docker 빌드가 잘못됐다"고 오진하기 쉽고, 재빌드를 아무리 반복해도 증상이 그대로였을 문제다.

**배운 점**

- 컨테이너가 "실행 중"인 것과, 그 포트로 들어온 요청을 "컨테이너가 처리하는 것"은 별개다.
- 브라우저 화면은 캐시 등 변수가 섞이므로 `curl`로 응답 본문을 직접 확인하는 편이 확실하다.
- 프로젝트를 옮길 때 이전 dev 서버를 확실히 내려야 한다. 터미널 탭을 닫아도 프로세스는 남을 수 있다.

*관련 — DB 포트(5432) 충돌 시에는 프로세스를 죽이는 대신 `.env`에 `POSTGRES_PORT=5433`처럼 Host 공개 Port만 변경한다. 컨테이너 내부 연결은 계속 `db:5432`를 쓰므로 코드 변경이 필요 없다.*

### E-02 · `docker compose down -v`가 DB 외의 것까지 삭제하는 문제

**증상** — Migration이 반영되지 않아 습관적으로 `docker compose down -v`로 초기화했더니, 다시 올릴 때 Backend 부팅에 몇 분이 걸렸다. Gradle이 의존성을 처음부터 다시 받고 있었다.

**원인** — `-v`는 PostgreSQL 데이터 볼륨만 지우는 것이 아니라 Compose가 정의한 **Named Volume 전체**를 삭제한다. 여기엔 Frontend의 `node_modules`와 Backend의 Gradle Cache가 포함된다.

**해결 — 상황별로 명령을 나눔**

| 상황 | 명령 |
|---|---|
| 소스만 수정 | 아무것도 하지 않음 (Backend hot reload가 자동 재컴파일·재시작) |
| Migration 미적용 | `docker compose restart backend` 부터 시도 |
| 일반 종료 | `docker compose down` — DB 데이터 유지 |
| Seed 완전 초기화 | `docker compose down -v` — 꼭 필요할 때만 |

`--build`도 마찬가지로 `Dockerfile`이나 `build.gradle`이 바뀌었을 때만 필요하다.

**배운 점** — "안 되면 일단 초기화"는 팀 프로젝트에서 비용이 크다. 볼륨은 다른 팀원 작업에도 영향을 준다.

---

## 2. Git 협업 경계

4명이 패키지를 나눠 병렬 개발하는 구조였고, 담당 외 파일은 읽기만 허용됐다. 이 절의 문제들은 전부 "규칙을 어기지 않으면서 진행할 방법"을 찾는 과정에서 나왔다.

### G-01 · 공용 코드 미머지로 컴파일 불가 — 임시 스텁 4개

**증상** — 프로필 API는 담당 A 소유의 두 가지에 의존한다. 둘 다 아직 `main`에 없었다.

- `common/auth/MockCurrentUserProvider` — Authorization 헤더에서 사용자 ID를 얻는 경로
- `common/error/` — `ApiException` · `ErrorResponse` · `GlobalExceptionHandler`. `{code, message}` 형태로 404·400을 응답하려면 필요

기다리면 착수 자체가 불가능하고, 직접 만들면 남의 패키지를 커밋하게 된다.

**해결 — 스텁을 만들되 커밋 경로에서 원천 차단**

1. A의 설계 문서(`01-A-common-auth.md`) 3·4절의 **시그니처를 그대로** 따라 최소 스텁 4개 생성
2. 각 파일 맨 위에 "커밋 금지 · A 머지 시 삭제" 주석
3. `.git/info/exclude`에 4개 경로 등록 → `git status`에 `user/`만 잡힘
4. A 머지 후 스텁 삭제하고 실제 구현으로 교체

패키지 위치도 정정했다. 처음 `auth/`에 두었으나 A의 문서가 `common/auth/`로 명시하고 있어 `com.jobfeel.careercompass.common.auth`로 옮겼다. **B 코드의 import가 A 머지 후에도 그대로 유효하도록** 하기 위한 조정이다.

> **주의 — PR 타이밍.** 스텁이 커밋되지 않았으므로, A의 브랜치가 `main`에 머지되기 전에 PR을 올리면 GitHub Actions가 해당 클래스를 찾지 못해 빌드가 실패한다. 로컬 컴파일 통과가 CI 통과를 뜻하지 않는다. 푸시는 하되 PR은 공용 코드 머지 이후로 미뤘다.

**결과** — A·C·D 머지 후 `compileJava`·전체 `test` 모두 통과. B의 `user` 패키지는 **한 줄도 수정하지 않았다.** import 경로·시그니처·오류 코드 문자열 가정이 전부 A의 실제 구현과 일치했다.

**배운 점**

- 공용 코드를 기다리며 멈추는 것과 남의 영역을 침범하는 것 사이에, **"상대 문서의 계약대로 스텁 + 커밋 차단"** 이라는 선택지가 있다.
- 이 방식이 성립하는 조건은 **설계 문서가 시그니처 수준까지 확정돼 있는 것**이다. 문서가 부실했다면 머지 후 대규모 수정이 발생했을 것이다.
- 단, 로컬과 CI의 상태가 다르다는 부채를 만든다. 부채가 해소되는 시점(=공용 코드 머지)을 PR 조건으로 명시해야 한다.

### G-02 · `git add .`에 커밋하면 안 되는 파일이 딸려 들어가는 문제

**증상** — 커밋하려는데 `git status`에 6개 항목이 잡혔다.

```
추적하지 않는 파일:
        CLAUDE.md
        DEVLOG-user-profile.md
        backend/bin/
        backend/src/main/java/com/jobfeel/careercompass/user/
        backend/src/test/java/com/jobfeel/careercompass/user/
        career-compass-backend-tasks/
```

팀 git convention은 `git add .`를 쓰라고 되어 있는데, 이 상태로 실행하면 커밋하면 안 되는 것이 4개 섞인다.

**원인 분석 — 항목별 분류**

| 항목 | 판단 |
|---|---|
| `user/` (main·test) | 커밋 대상 — 실제 구현물 |
| `backend/bin/` | 제외 — 빌드 산출물 |
| `CLAUDE.md` | 제외 — 개인 작업 규칙, 팀 repo에 넣을 것 아님 |
| `DEVLOG-*.md` | 제외 — 개인 개발 로그 |
| `career-compass-backend-tasks/` | 제외 — 팀 문서 폴더, 내가 올릴 것 아님 |

**해결** — `.gitignore`는 공용 파일이라 개인 사정으로 수정하지 않는다는 규칙이 있었다. 대신 로컬에만 적용되는 `.git/info/exclude`를 사용했다.

```bash
cat >> .git/info/exclude << 'EOF'
CLAUDE.md
DEVLOG-user-profile.md
backend/bin/
career-compass-backend-tasks/
EOF

git status   # user/ 두 개만 남는지 확인
```

이렇게 해두면 팀 컨벤션대로 `git add .`를 그대로 써도 안전해진다.

**배운 점**

- `.gitignore`(공유)와 `.git/info/exclude`(개인)의 용도가 다르다. 개인 사정은 후자로 해결한다.
- `backend/bin/`은 사실 팀 `.gitignore`에 들어가는 게 맞는 항목이다. 다른 팀원도 똑같이 겪을 문제이므로 개인 회피로 끝내지 말고 팀에 제안해야 한다.

### G-03 · 계획한 커밋 분할이 컴파일 불가 상태를 만드는 문제

**증상** — 작업 전에 커밋을 4덩이(Entity+Repository / GET / PUT / 테스트)로 계획했었다. 그런데 GET과 PUT이 **같은 `ProfileService.java` 파일**에 들어 있어서, 2번과 3번을 나누려면 `git add -p`로 파일 일부만 스테이징해야 했다. 그렇게 하면 2번 커밋 시점의 코드가 컴파일되지 않는다.

**해결 — 3분할**

```
feat(be): Profile Entity Repository 구현
feat(be): Profile 조회·저장 API 구현
test(api): Profile API 테스트 추가
```

"커밋 하나 = 하나의 작업 목적"이라는 컨벤션 원칙은 그대로 지켜지고, 모든 커밋 시점이 빌드 가능한 상태가 된다.

**배운 점** — 커밋 분할 계획은 파일 구조가 확정된 뒤에 다시 검토해야 한다. 깔끔한 히스토리보다 각 커밋이 빌드 가능한 것이 우선이다. bisect와 롤백이 그 전제 위에서 동작한다.

### G-04 · 로컬 스텁과 실제 파일의 경로 충돌 — 머지 자체가 거부됨

**증상(잠재)** — `.git/info/exclude`로 제외한 스텁이 A의 tracked 파일과 **정확히 같은 경로**에 있다. 이 상태로 `git merge origin/feat/mock-auth`를 실행하면 Git이 머지를 거부한다.

```
error: The following untracked working tree files would be overwritten by merge
```

**원인** — exclude는 "커밋 대상에서 뺀다"는 뜻이지 "파일이 없다"는 뜻이 아니다. 머지가 그 경로에 파일을 쓰려 할 때 Git은 추적하지 않는 파일을 덮어쓰지 않는다.

**해결** — 머지 직전 스텁 4개를 `rm`. 실제로는 원격 PR 머지 후 로컬 재동기화 과정에서 처리되어, 스텁이 A의 실제 구현으로 교체되고 `.git/info/exclude`는 개인 파일 전용으로 재작성됐다.

**배운 점** — 로컬 전용 스텁은 만드는 시점에 **"머지 직전 삭제"를 체크리스트에 함께 넣어야 한다.** G-01의 전략에 따라오는 필수 후속 조치다.

---

## 3. 구현

### I-01 · delete 직후 insert 시 PK 충돌 (Hibernate flush 순서)

**증상** — `PUT /me/profile`은 기존 Tech·Content를 **전량 삭제 후 재삽입**하는 구조다. 기존 `job_seeker_tech`를 지우고 같은 `(user_id, tech_id)`를 다시 넣으면 PK 제약 위반이 발생할 수 있다.

**원인** — 파생 삭제(`deleteAllBy…`)는 엔티티를 `SELECT`한 뒤 `em.remove()`로 **큐에만 쌓고** 커밋 시점에 flush한다. 이후 `saveAll()`의 `INSERT`가 `DELETE`보다 먼저 flush되면서 충돌한다. JPA의 쓰기 지연(write-behind)이 SQL 순서를 재배치하기 때문이다.

**해결** — 벌크 `@Modifying` 쿼리로 전환했다.

```java
@Modifying(clearAutomatically = true, flushAutomatically = true)
@Query("delete from JobSeekerTech t where t.id.userId = :userId")
void deleteAllByIdUserId(@Param("userId") Long userId);
```

- `flushAutomatically` — 삭제 전에 대기 중인 변경을 먼저 내보내 **순서를 확정**
- `clearAutomatically` — 삭제 후 영속성 컨텍스트를 비워 **stale 엔티티가 재삽입·재조회에 끼어들지 않게** 함

**배운 점** — ORM이 SQL을 언제 내보내는지 모르면, 코드 순서와 실제 실행 순서가 다르다는 사실 자체를 의심하지 못한다. 재현이 간헐적이라 발생 후에 찾으면 시간이 많이 드는 유형이라, 설계 단계에서 구조를 바꾸는 편이 저렴했다.

### I-02 · 검증 계층 충돌 — 애노테이션이 명세 오류 코드를 덮어씀

**증상** — DTO에 `@UniqueElements`(techIds)와 `@Pattern`(category)을 붙이면, 위반 시 응답이 `VALIDATION_ERROR`로 나간다. 그런데 명세는 이 두 경우에 각각 `DUPLICATE_TECH_STACK` / `INVALID_PROFILE_CATEGORY`를 요구한다.

**원인** — 바인딩 시점의 Bean Validation이 서비스 검증보다 **먼저** 걸린다. 같은 API 계약이 검증이 어느 계층에서 걸리느냐에 따라 달라지는 상황이다.

**해결** — `@UniqueElements`·`@Pattern`을 제거하고 중복·허용값 검증을 **서비스 한 곳으로 모아** 명세의 정확한 code를 반환하게 했다. `@NotNull`·`@NotBlank`·원소 `@NotNull`은 유지 — 필수값 누락은 명세상으로도 `VALIDATION_ERROR`가 맞다.

최종 검증 순서는 다음과 같다. 검증을 **전부 통과한 뒤에** 저장을 시작한다.

| 순서 | 검증 | 실패 시 |
|---|---|---|
| 1 | `userRepository.existsById` | 404 `USER_NOT_FOUND` |
| 2 | `profileQueryRepository.existsPosition` | 400 `INVALID_POSITION` |
| 3 | techIds 중복 (`HashSet` size 비교) | 400 `DUPLICATE_TECH_STACK` |
| 4 | techIds 전부 존재 (`findTechNames` size 비교, 별도 exists 쿼리 없음) | 400 `INVALID_TECH_STACK` |
| 5 | category 허용값 4종 | 400 `INVALID_PROFILE_CATEGORY` |

**배운 점** — 편리한 애노테이션이 API 계약을 조용히 바꿀 수 있다. "어디서 검증하는가"는 스타일 문제가 아니라 **응답 계약의 일부**다. 후속 명세 감사에서 B의 오류 응답이 계층과 무관하게 명세와 일치한 것은 이 결정 덕분이었다.

### I-03 · `createdAt`이 UTC로 나오지 않는데 설정 파일은 수정 금지

**증상** — `TIMESTAMPTZ → OffsetDateTime` 매핑이 JVM 존 오프셋을 따라가서 응답이 `Z`로 끝나지 않을 수 있다. 명세는 UTC ISO 8601을 요구한다.

**원인** — `spring.jackson.time-zone`을 `application.yml`에 넣으면 해결되지만, 해당 파일은 담당 A 소유로 **B의 수정 금지 대상**이다.

**해결** — 전역 설정 대신 응답 조립 시점에 정규화했다.

```java
createdAt.withOffsetSameInstant(ZoneOffset.UTC)   // null-safe
```

컨트롤러 테스트에서 `2026-09-03T01:10:00Z` 형식을 검증 항목에 포함시켰다.

**배운 점** — 수정 권한이 없는 영역에 손대는 대신, 담당 범위 안에서 같은 결과를 내는 지점을 찾는 것이 협업 규칙을 지키는 방법이다. 다만 전역 설정이 아니므로 **다른 담당자가 같은 문제를 각자 겪는다**는 한계는 남는다.

### I-04 · 같은 빈 내부 호출에서 `@Transactional`이 적용되지 않는 문제

**증상** — `saveProfile` 마지막에 같은 빈의 `getProfile`을 호출해 저장 결과를 반환하는데, `getProfile`에 붙은 `@Transactional(readOnly = true)`가 적용될지 불확실했다.

**원인** — Spring AOP는 프록시 기반이라 **self-invocation을 가로채지 못한다.** 내부 호출에서는 중첩된 `@Transactional` 애노테이션이 무시된다.

**해결** — 이 경우엔 **의도한 동작이 맞다.** `getProfile`이 현재 진행 중인 RW 트랜잭션에서 그대로 실행되어 방금 쓴 데이터를 읽는다. 만약 `readOnly = true`가 실제로 적용됐다면 오히려 문제가 됐을 상황이다. 코드에 이 판단을 주석으로 남겼다.

**배운 점** — 프레임워크 동작을 확인했을 때 결론이 "고칠 필요 없음"이라도, **왜 고치지 않았는지를 남겨야** 다음 사람이 같은 검토를 반복하지 않는다.

---

## 4. 테스트·검증 설계

### V-01 · CI에 PostgreSQL이 없어 통합 테스트를 쓸 수 없는 문제

**증상** — `@SpringBootTest`는 DB·Flyway 부팅이 필요해 CI에서 실패한다. 현재 CI 파이프라인에는 PostgreSQL 서비스가 없다.

**해결** — 테스트를 두 층으로 나눴다.

| 대상 | 방식 |
|---|---|
| Controller | `@WebMvcTest(ProfileController.class)` + `@MockitoBean` — 5건 |
| Service | 순수 `MockitoExtension` (JUnit + Mockito) — 8건 |
| 실제 DB · Flyway · JPA 매핑 | 단위 테스트로 덮지 않고 **Docker Compose 스모크로 분리** (V-02) |

스캐폴드에 있던 `CareerCompassApplicationTests`(`@SpringBootTest`)는 B 소유가 아니며 DB 없이 실패한다. 통합 스모크는 별도 담당이다.

### V-02 · Mockito 테스트가 통과해도 실제 스키마 매핑은 검증되지 않는 문제

**증상** — 단위 테스트 13개가 전부 통과했지만, Repository가 mock이라 **실제 SQL이 한 번도 나가지 않았다.** Entity가 실제 테이블과 맞는지는 검증되지 않은 상태였다.

**해결 — Docker Compose 부팅 자체를 검증 단계로 사용**

```bash
docker compose down -v          # C의 V2 Seed 반영을 위해 초기화
docker compose up
docker compose logs backend | grep -i flyway
```

부팅 로그에서 세 가지를 확인 지점으로 삼았다.

| 확인 항목 | 의미 |
|---|---|
| `Successfully applied 2 migrations` | V1·V2 스키마가 실제로 반영됨 |
| Hibernate 매핑 에러 없음 | **Entity가 실제 스키마와 일치.** Mockito로는 확인 불가능한 부분 |
| `Started CareerCompassApplication` | 기동 완료 |

그다음 실제 API를 호출해 Seed 데이터가 기대대로 조립되는지 확인했다.

```bash
curl -i http://localhost:8080/api/v1/me/profile \
  -H "Authorization: Bearer mock-access-token"
```

**배운 점** — Mock 기반 테스트는 **로직**을 검증하지 **매핑**을 검증하지 않는다. 통과 개수와 안전함은 비례하지 않는다. CI 제약으로 통합 테스트를 못 쓰는 환경에서는 Docker 부팅 로그 자체가 스키마 검증 수단이 된다. "떴다"가 아니라 **무엇을 확인할지 정해두고** 봐야 한다.

### V-03 · 단위 테스트 작성 중 걸린 것 2건

**① `contentId` 언박싱 NPE**

`ProfileContentResponse(long contentId, …)` 조립 시 mock 엔티티의 `contentId`가 null이라 NPE가 났다. 실제 흐름에선 DB가 `BIGSERIAL`로 채우지만, 리포지토리를 mock하면 채워질 경로가 없다.

프로덕션 엔티티에 테스트 전용 생성자를 추가하지 않고, 테스트 쪽에서 해결했다.

```java
ReflectionTestUtils.setField(content, "contentId", 1001L);
```

**② `@MockBean` deprecated**

Spring Boot 3.5에서 `@MockBean`은 제거 예정이다. Spring Framework 6.2의 bean override로 대체됐다. `org.springframework.test.context.bean.override.mockito.MockitoBean`으로 교체 — 동작은 동일하다.

**배운 점** — 테스트 편의를 위해 프로덕션 코드에 구멍(테스트 전용 생성자·setter)을 내지 않는 원칙을 지켰다. 테스트 쪽 도구로 해결할 수 있는 문제가 대부분이다.

### V-04 · 스모크 테스트 설계 — 재실행 안전성과 검증 불가 케이스

전체 API 스모크 스크립트(`curl` + `jq`)를 작성하면서 세 가지를 다뤘다.

**① PUT이 상태를 바꾸므로 재실행이 안전하지 않다**

3번 스텝의 `PUT`이 프로필을 교체하기 때문에, 그냥 두면 두 번째 실행부터 앞 스텝의 기대값이 깨진다. 스텝 3c에서 Seed 값을 복원하되, `content_id`와 `created_at`은 **전체 교체 특성상 복원 불가**(새 BIGSERIAL·새 타임스탬프)다.

그래서 2번 검증을 **정확한 id가 아니라 category 집합과 개수로** 작성해 재실행 안전성을 확보했다.

**② 409가 날 것 같았지만 SQL을 읽고 확인**

`POST /reports {RECOMMEND}` 스텝에서, Seed에 PROCESSING 상태 리포트(503)가 있으니 `409 REPORT_ALREADY_IN_PROGRESS`가 나올 것으로 우려했다. 실제 쿼리를 읽어보니 `existsInProgressReport`가 `analysis_report_company`와 INNER JOIN하는데, 503은 해당 company 행이 없어 JOIN 결과가 0 → `false` → 정상 202였다.

> **기대 status는 스펙이 아니라 코드(SQL)까지 읽고 확정한다.** 짐작으로 작성하면 스크립트가 틀린 것을 정답으로 굳혀 버린다.

**③ 403은 현재 구성으로 검증 불가 → SKIP 처리**

Seed의 `analysis_report`가 전부 `user_id=1`이고 Mock Token도 항상 `user_id=1`이라, `REPORT_ACCESS_DENIED` 조건을 HTTP로 만들 수 없다. 억지로 통과시키는 대신 **SKIP으로 명시하고 사유를 남겨** C·D에게 다른 사용자 소유 리포트 Seed 보강을 요청했다.

**최종 결과 — 총 29건 · PASS 28 · FAIL 0 · SKIP 1**

**배운 점** — 스모크 스크립트는 한 번 쓰고 버리는 것이 아니라 **회귀 검증 자산**이다. 재실행 안전성을 처음부터 설계에 넣어야 그 역할을 한다. 그리고 검증할 수 없는 케이스는 조용히 빼는 것보다 SKIP으로 드러내는 편이 낫다.

---

## 5. 통합 검증

### N-01 · CORS 미설정 — curl은 전부 통과하는데 브라우저에선 전멸 · **미해결(A)**

**증상** — 4명의 브랜치를 통합한 뒤 전체 스모크가 28 PASS / 0 FAIL로 나왔다. 수치상 문제가 없어 보였지만, 별도 점검에서 `/api/v1/**`에 **CORS 설정이 전혀 없다**는 것이 확인됐다.

| 확인 위치 | 결과 |
|---|---|
| `@CrossOrigin` | 없음 |
| `WebMvcConfigurer.addCorsMappings` / `CorsFilter` | 없음 |
| `application.yml` | `management.endpoints.web.cors`만 있음 → **Actuator 전용** |
| `SecurityFilterChain` | 없음 (Spring Security 미사용) |
| `docker-compose.yml` 리버스 프록시 | 없음 (FE·BE 각자 포트 직노출) |
| `frontend/vite.config.js` proxy | **없음** — `VITE_API_BASE_URL`로 브라우저가 직접 크로스오리진 호출 |

**원인 분석 — 왜 아무도 눈치채지 못했나**

> **검증 수단이 증상을 가리고 있었다.**
>
> **① 스모크가 curl 기반이다.** CORS는 브라우저가 강제하는 정책이라 curl은 애초에 영향을 받지 않는다. 28 PASS는 CORS에 대해 아무것도 말해주지 않는 숫자였다.
>
> **② FE가 아직 `/actuator/health` 하나만 호출하고 있었다.** 그 경로는 Actuator 전용 CORS로 뚫려 있어 정상 동작했고, 그래서 "FE–BE 연동은 되고 있다"고 착각하기 쉬웠다.

**영향 범위 — 프로필 API가 가장 먼저 깨진다**

`PUT /api/v1/me/profile`은 `Content-Type: application/json` + `Authorization` 헤더를 쓰므로 브라우저가 **preflight OPTIONS**를 먼저 보낸다. GET도 `Authorization` 때문에 마찬가지다. 즉 401/404 같은 애플리케이션 로직에 도달하기 **이전 단계**에서 막힌다.

**대응** — `common/`과 `application.yml`은 A 소유라 직접 수정할 수 없는 영역이다. 수정 대신 구체적인 제안까지 포함해 전달했다.

```java
// common/config/WebCorsConfig.java (제안)
registry.addMapping("/api/v1/**")
    .allowedOrigins(allowedOrigin)
    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
    .allowedHeaders("*")
    .exposedHeaders("Location", "Retry-After")
    .allowCredentials(false)
    .maxAge(3600);
```

- `exposedHeaders`의 `Location` — D의 `POST /reports`가 202와 함께 반환하는 헤더로, 명시하지 않으면 브라우저 JS가 읽지 못한다.
- origin은 docker-compose가 이미 넘기고 있는 `APP_CORS_ALLOWED_ORIGIN`을 재사용하면 된다.
- Vite proxy로도 개발 중엔 우회되지만 **빌드·프로덕션에선 동작하지 않으므로** 백엔드 설정이 필요하다.

**배운 점**

- 테스트가 통과했다는 것은 "테스트한 범위에서 통과했다"는 뜻이다. curl 스모크는 브라우저 환경을 대신하지 못한다.
- 수정 권한이 없는 영역의 문제는 재현 조건·영향 범위·수정안까지 정리해서 넘겨야 실제로 처리된다.

### N-02 · 인증 Provider 이원화 — 같은 토큰인데 API마다 결과가 다름 · **미해결(D)**

**증상** — `analysis` 패키지가 공통 규칙(`00-common.md` §4)에 명시된 A의 `common.auth.MockCurrentUserProvider` 대신 자체 `MockReportCurrentUserProvider`를 사용하고 있었다.

**왜 문제인가** — 두 구현의 Bearer 파싱 규칙이 다르고, 자체 구현 쪽이 더 엄격하다(토큰 문자열 완전일치). 공백이나 대소문자 차이에서 한쪽은 통과하고 한쪽은 401을 반환할 수 있다. Frontend 입장에선 **같은 토큰을 보냈는데 API마다 인증 동작이 다른** 상황이 되고, 재현이 까다로워 디버깅 비용이 큰 유형의 버그다.

같은 패키지에서 발견된 중복·불일치를 함께 전달했다.

| 항목 | 내용 |
|---|---|
| 응답 DTO 중복 | `ReportErrorResponse`가 `common.error.ErrorResponse`와 형태 동일 |
| 오류 메시지 | 같은 코드(`VALIDATION_ERROR`, `INVALID_REQUEST`)에 `ReportExceptionHandler`와 `GlobalExceptionHandler`가 서로 다른 message 반환 |
| 타입 불일치 (A) | `UserResponse.createdAt`만 `Instant`, 나머지 시각 필드는 전부 `OffsetDateTime` |
| 명세 보완 (A) | 명세서 §3.2에 HTTP status만 있고 오류 코드 표가 없음 — 실제 20종 사용 중 |

**배운 점** — 패키지 단위로 병렬 개발하면 **같은 역할의 코드가 중복 구현**되기 쉽다. 개별 패키지 테스트로는 절대 드러나지 않고, 통합 후 교차 검증에서만 보인다. "동작은 하는데 규칙이 다른" 문제는 FAIL로 잡히지 않으므로 명세 대조가 별도로 필요하다.

*참고 — 명세서 전체 대조 결과, 미구현 API 0건 / 명세에 없는 API 0건 / 경로·Method·성공 Status 불일치 0건이었다. 문제는 전부 "명세에 없는데 실제로 쓰이는 것"과 "구현 간 규칙 차이" 쪽이었다.*

### N-03 · 통합 검증의 전제가 아직 성립하지 않은 상태에서의 실행

**증상** — "A·C의 브랜치를 머지했다"는 전제로 통합 검증 절차를 시작하려 했으나, `git branch -r`에 `origin/main`뿐이었다. `main`에 A·C 코드도 V2 Seed도 없었고 B 작업도 아직 커밋 전이었다.

**원인** — A·C가 아직 push/PR 전이었다.

**해결** — 없는 브랜치를 머지하거나 스텁을 삭제하는 동작을 **실행하지 않고 중단**했다. 현황만 정리해 보고하고, A·C·D가 실제로 머지된 뒤 재실행했다.

**배운 점** — 통합 스크립트나 절차는 `git branch -r` / `git ls-files`로 **전제(브랜치·파일의 존재)를 먼저 확인**하고 시작해야 한다. 전제가 깨진 상태로 진행하면 로컬 작업물이 손상될 수 있는 단계였다.

---

## 6. 회고

17건을 놓고 보면 성격이 네 갈래로 나뉜다.

| 유형 | 해당 건 · 공통점 |
|---|---|
| **환경 상태** | E-01, E-02 — 도구가 "무엇을 실제로 하고 있는지" 확인하지 않고 짐작해서 생긴 문제. 재빌드·초기화 같은 반사적 대응이 오히려 원인 파악을 늦춘다. |
| **협업 경계** | G-01~04 — 내 작업물과 남의 영역, 공유 설정과 개인 설정의 경계를 다루는 문제. **규칙을 우회하지 않으면서 진행할 방법**을 찾는 것이 핵심이었다. |
| **프레임워크의 암묵적 동작** | I-01, I-02, I-04 — ORM의 flush 순서, Bean Validation의 실행 시점, AOP 프록시의 한계. 코드에 쓴 순서와 실제 동작이 다른 지점들이다. |
| **검증 사각지대** | V-02, N-01, N-02 — 전부 "테스트는 통과했는데 문제가 있는" 유형. 단위 테스트는 매핑을 못 보고, curl은 CORS를 못 보고, 개별 패키지 테스트는 구현 중복을 못 본다. |

> **가장 크게 남은 것 — 통과한 테스트 개수는 안전함의 근거가 되지 못한다.**
>
> 스모크 28 PASS / 0 FAIL 상태에서 브라우저를 붙이면 전 API가 깨지는 상황이 실제로 존재했다. "무엇을 검증했는가"보다 **"이 검증 수단은 무엇을 못 보는가"**를 묻는 편이 문제를 더 빨리 찾아냈다.

**두 번째로 남은 것 — 문서가 정확하면 병렬 개발이 실제로 병렬이 된다.**

A의 공용 코드가 없는 상태에서 그 문서의 시그니처만 보고 스텁을 만들어 개발했고, 실제 머지 후 B 코드는 한 줄도 수정하지 않았다. 이건 운이 아니라 A가 설계 문서에 시그니처와 오류 코드 문자열까지 적어 둔 결과다. 반대로 명세서에 오류 코드 통합 표가 없어서 20종이 문서 밖에서 쓰이고 있는 상황(N-02)은 같은 원리가 반대로 작동한 사례다.

**남은 리스크는 전부 B 담당 밖이다** — CORS(A), 명세서 오류 코드 표(A), 403 검증용 Seed(C·D), 인증 Provider 통일(D). 문서 앞의 *PM 확인 필요* 표를 참고.
