# 잡필 (Career Compass)

현직자 인터뷰 데이터를 기반으로 기업 추천과 개인 맞춤형 취업 분석을 제공할 예정인 3일 미니 프로젝트입니다. 현재 저장소에는 팀 공통 개발환경만 구성되어 있습니다.

## 기술 스택

- Frontend: Vue 3, Vite, JavaScript, Vue Router
- Backend: Java 21, Spring Boot 3.5.16, Gradle, Spring Data JPA, Validation, Flyway, Actuator
- Database: PostgreSQL 17, pgvector 0.8.6
- Development: Docker Compose

## 저장소 구조

```text
career-compass/
├── frontend/              # Vue 개발 서버
├── backend/               # Spring Boot 모놀리식 애플리케이션
├── .github/workflows/     # CI
├── docker-compose.yml
└── .env.example
```

## 사전 요구사항

- Git
- Docker Desktop (Docker Compose 포함)

로컬에 Node.js, Java, PostgreSQL을 별도로 설치할 필요는 없습니다.

## 실행

```bash
git clone <repository-url>
cd career-compass
docker compose up
```

`.env` 없이 개발용 기본값으로 실행됩니다. 값을 바꾸려면 `.env.example`을 복사해 `.env`를 만들고 수정하세요.
호스트의 `5432` 포트가 이미 사용 중이면 `.env`의 `POSTGRES_PORT`만 다른 값으로 변경할 수 있으며, 컨테이너 내부 backend 연결은 계속 `db:5432`를 사용합니다.

## 접속 주소

- Frontend: http://localhost:5173
- Backend health: http://localhost:8080/actuator/health
- PostgreSQL: `localhost:5432`

## 종료 및 재빌드

```bash
# 종료 (DB 데이터 유지)
docker compose down

# DB 볼륨까지 초기화
docker compose down -v

# dependency 또는 Dockerfile 변경 후 재빌드
docker compose up --build
```

## 로컬 명령

```bash
cd frontend && npm ci && npm run build
cd backend && ./gradlew test
```
