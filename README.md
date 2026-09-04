# Job Pill

> 현직자 인터뷰 데이터를 기반으로 기업을 추천하고, 취업 준비 방향을 분석하는 서비스

Job Pill은 사용자의 희망 직무, 기술 스택, 프로젝트 경험과 기업 인사이트를 비교하여 기업 추천과 적합도 분석 리포트를 제공합니다.

현재 회원 인증, 프로필 관리, 기업 조회, 분석 리포트 생성·조회 및 PDF 출력 흐름이 구현되어 있습니다. 분석 서술과 유사도 계산은 Mock으로 동작하며, 실제 OpenAI API는 아직 호출하지 않습니다.

## 주요 기능

| 영역 | 기능 | 현재 상태 |
| --- | --- | --- |
| 인증 | 회원가입, 로그인, JWT 인증 | 구현 |
| 프로필 | 희망 직무, 기술 스택, 경험 내용 조회·수정 | 구현 |
| 기업 | 기업 목록 검색, 상세 조회 | 구현 |
| 분석 | 기업 추천, 특정 기업 적합도 분석 | Mock AI 기반 구현 |
| 리포트 | 분석 이력·결과 조회, PDF 생성 | 구현 |
| OpenAI | API Key 전달을 위한 환경설정 | 준비 완료, 실제 호출 미구현 |

## 기술 스택

- Frontend: Vue 3, Vite 7, JavaScript, Vue Router
- Backend: Java 21, Spring Boot 3.5.16, Gradle, Spring Data JPA, Spring Security, JWT, Validation, Flyway, Actuator
- Database: PostgreSQL 17, pgvector 0.8.6
- Development: Docker Compose

## 저장소 구조

```text
career-compass/
├── frontend/                # Vue 애플리케이션
├── backend/                 # Spring Boot 모놀리식 애플리케이션
│   └── src/main/resources/
│       └── db/migration/    # Flyway 스키마와 초기 데이터
├── docs/                    # 개발 및 협업 문서
├── .github/workflows/       # GitHub Actions CI
├── docker-compose.yml
└── .env.example
```

## 빠른 시작

### 사전 요구사항

- Git
- Docker Desktop

로컬에 Java, Node.js, PostgreSQL을 별도로 설치할 필요는 없습니다.

### 실행

```bash
git clone git@github.com:Jinhyung01/career-compass.git
cd career-compass
docker compose up --build
```

첫 빌드가 끝나면 다음부터는 `docker compose up`만 실행하면 됩니다.

### 접속 주소

| 서비스 | 주소 |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8080 |
| Backend Health | http://localhost:8080/actuator/health |
| PostgreSQL | `localhost:5432` |

### 종료 및 초기화

```bash
# 종료: DB 데이터 유지
docker compose down

# 종료 후 DB 데이터까지 삭제
docker compose down -v

# dependency 또는 Dockerfile 변경 후 재빌드
docker compose up --build
```

> `docker compose down -v`는 로컬 Docker DB 데이터를 삭제합니다. 필요한 데이터가 없는지 확인한 후 실행하세요.

## 환경변수

기본 개발환경은 `.env` 없이 실행됩니다. 값을 변경해야 할 때만 다음과 같이 준비합니다.

```bash
cp .env.example .env
```

`.env`에는 DB 접속 정보, 외부 노출 포트, JWT Secret, OpenAI API Key를 설정할 수 있습니다. 실제 Secret은 커밋하지 않습니다.

호스트의 `5432` 포트를 이미 다른 PostgreSQL이 사용 중이라면 `.env`에서 다음 값만 변경하세요.

```dotenv
POSTGRES_PORT=5433
```

이 설정은 호스트 접속 포트만 변경합니다. Backend는 계속 Docker 내부 주소 `db:5432`로 DB에 연결합니다.

## API 요약

모든 서비스 API는 `/api/v1`을 Prefix로 사용합니다.

| Method | Endpoint | 설명 | 인증 |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | 회원가입 | 불필요 |
| POST | `/api/v1/auth/login` | 로그인 | 불필요 |
| GET, PUT | `/api/v1/me/profile` | 내 프로필 조회·수정 | 필요 |
| GET | `/api/v1/companies` | 기업 검색 | 필요 |
| GET | `/api/v1/companies/{companyCode}` | 기업 상세 조회 | 필요 |
| POST | `/api/v1/reports` | 분석 리포트 생성 | 필요 |
| GET | `/api/v1/reports` | 리포트 목록 조회 | 필요 |
| GET | `/api/v1/reports/{reportId}` | 리포트 상세 조회 | 필요 |
| GET | `/api/v1/reports/{reportId}/file` | PDF 파일 다운로드 | 필요 |

상세 Endpoint와 요청·응답 형식은 [API 명세서 v3](docs/specifications/api-spec-v3.pdf)를 확인하세요.

## 테스트와 빌드

```bash
# Frontend build
cd frontend
npm ci
npm run build

# Backend test
cd backend
./gradlew test
```

Pull Request와 `main` push 시 GitHub Actions에서도 Frontend build와 Backend test가 실행됩니다.

## 팀 문서

- [Architecture](docs/architecture/): 시스템·백엔드·AI 파이프라인·배포 구조 및 AI-Ready 설계
- [Specifications](docs/specifications/): API 명세서·Use Case·사용자 흐름도·화면 흐름도
- [Guides](docs/guides/): 개발환경 및 Git 협업 가이드
- [Database](docs/database/): ERD

## 협업 원칙

- `main`에 직접 push하지 않고 짧게 유지하는 작업 Branch에서 개발합니다.
- 하나의 Commit에는 하나의 목적만 포함합니다.
- API 계약이나 이미 병합된 Flyway Migration을 임의로 변경하지 않습니다.
- 작업 시작 전 최신 `main`을 반영하고, Pull Request의 CI 통과를 확인합니다.

자세한 Branch·Commit·PR 규칙은 [Git Convention](docs/guides/git-convention.pdf)을 따릅니다.
