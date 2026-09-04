# Jobpill 더미 데이터 목록

프런트엔드 작업본(`src/`)에 하드코딩되어 있는 모든 더미 데이터를 화면·컴포넌트별로 빠짐없이 정리했습니다.
DB 설계·시딩 작업자가 참고할 수 있도록 **어떤 화면의 어떤 파일에서 쓰이는지**, **필드 구조**, **원문 텍스트**를 그대로 옮겼습니다.

- 소스 기준: `src/` 전체 (`views/`, `components/`, `api.js`, `App.vue`)
- 작성일: 2026.09.03
- 표기: 코드에 있는 그대로(한글 라벨, 단위 문자열 등)를 보존했고, 필드명은 실제 변수명을 그대로 씁니다.

---

## 목차

1. [라우트 구조](#1-라우트-구조)
2. [사용자(User) / 세션](#2-사용자user--세션)
3. [기업(Company)](#3-기업company)
4. [기업 상세 — 직무(Job)](#4-기업-상세--직무job)
5. [기업 상세 — 현직자 인터뷰(Insight)](#5-기업-상세--현직자-인터뷰insight)
6. [기업 상세 — 기업 문화 지표(Culture)](#6-기업-상세--기업-문화-지표culture)
7. [진단(Diagnosis) 입력 폼 — 프로필](#7-진단diagnosis-입력폼--프로필)
8. [진단 진행 중 — 분석 스텝](#8-진단-진행-중--분석-스텝)
9. [진단 리포트(Report)](#9-진단-리포트report)
10. [마이페이지 — 진단 기록 / 점수 추이](#10-마이페이지--진단-기록--점수-추이)
11. [마이페이지 — 요금제(Plan)](#11-마이페이지--요금제plan)
12. [홈 — 통계 · 카피](#12-홈--통계--카피)
13. [공통 UI 텍스트 (로그인·푸터·GNB)](#13-공통-ui-텍스트-로그인푸터gnb)
14. [API 계약 (연동 시 맞춰야 할 엔드포인트)](#14-api-계약-연동-시-맞춰야-할-엔드포인트)
15. [정리 — 엔티티 후보 요약](#15-정리--엔티티-후보-요약)

---

## 1. 라우트 구조

`src/App.vue`

| 경로 | 화면 컴포넌트 | 설명 |
|---|---|---|
| `/` | `Home.vue` | 랜딩 |
| `/login` | `Login.vue` | 로그인 / 회원가입 (탭 전환) |
| `/profile` | `Profile.vue` | 진단 STEP 01/02 — 프로필 입력 |
| `/companies` | `Companies.vue` | 기업관 목록 |
| `/company` | `CompanyDetail.vue` | 기업 상세 (현재 쿼리 파라미터 없이 고정 데이터 하나만 표시) |
| `/analyzing` | `Analyzing.vue` | 진단 STEP — 분석 진행 중 (연출용, 완료 시 `/report`로 자동 이동) |
| `/report` | `Report.vue` | 진단 STEP 02/02 — 리포트 결과 |
| `/mypage` | `MyPage.vue` | 진단 기록 + 요금제 관리 |

> 현재 `/company`, `/report`는 특정 id를 받지 않고 항상 동일한 하드코딩 데이터를 보여줍니다. 실제 연동 시 `#/company/:id`, `#/report/:id` 형태로 바뀌어야 합니다.

---

## 2. 사용자(User) / 세션

여러 화면에 흩어져 나오는 "나"에 대한 값들입니다. 한 사람의 정보로 통일되어 있습니다.

| 필드 | 값 | 출처 |
|---|---|---|
| 이름 | `김서현` | `Report.vue` meta.name |
| 이메일 | (이전 버전에 있었으나 현재 파일에는 없음 — 과거 `tjgurdls9@gmail.com` 사용 이력 있음) | — |
| 리포트 코드 | `JP-0002` | `Report.vue` meta.code |
| 마지막 로그인 시 마지막 분석 | `SK Hynix · AI Engineer` | `Login.vue` 안내 문구 |
| 결제 수단 | `신한카드 ···· 1024` | `MyPage.vue` |
| 현재 요금제 | `CAREER PLUS`, `₩29,000/월`, `무제한 진단 · 현직자 리뷰 월 2회 · 공고 알림` | `MyPage.vue` 템플릿 하드코딩 |

---

## 3. 기업(Company)

`src/views/Companies.vue` — 목록 화면. 배열 변수명 `companies`.

필드 스키마:

```
{
  name: string        // 기업명
  role: string         // 대표 노출 직무 (문자열 하나, "A · B" 형태로 복수 직무 표기)
  sector: string        // 업종
  area: string          // 근무 지역
  people: number         // 인터뷰한 현직자 수
  insights: number        // 인사이트(인터뷰 발췌) 건수
  interviewed: string       // 최근 인터뷰 일자 "YYYY.MM.DD"
  fresh: boolean          // 12개월 이내 갱신 여부 → "최신" / "갱신 예정" 배지
  match: number          // 나와의 매치 점수(%)
  primary?: boolean        // true면 CTA가 "진단 보기"(검정 버튼), 아니면 "저장"(라인 버튼)
}
```

데이터 (총 6개):

| name | role | sector | area | people | insights | interviewed | fresh | match | primary |
|---|---|---|---|---|---|---|---|---|---|
| SK Hynix | 양산 기술 · AI Engineer | 반도체 | 경기 | 12 | 34 | 2026.08.21 | true | 91 | true |
| SK AX | AI Engineer · MLOps | IT 서비스 | 서울 | 9 | 27 | 2026.07.30 | true | 84 | — |
| 토스 | ML Engineer | 금융 | 서울 | 8 | 25 | 2026.08.02 | true | 79 | — |
| 오늘의집 | Product Designer | 커머스 | 서울 | 7 | 21 | 2026.06.12 | true | 61 | — |
| 카카오페이 | UX Designer | 금융 | 경기 | 6 | 18 | 2026.05.02 | true | 58 | — |
| 무신사 | Service Designer | 커머스 | 서울 | 5 | 14 | 2025.11.18 | false | 54 | — |

필터 옵션(정적 상수):
- 업종(`sectors`): `전체, 반도체, IT 서비스, 커머스, 금융`
- 근무 지역 체크박스: `서울, 경기, 원격 가능`
- "최근 12개월 내 인터뷰만" 토글
- "매치 점수 70 이상" 슬라이더 (현재 UI만 있고 실제 필터링에는 연결 안 됨, 값 70 고정 표시)

목록 상단 통계 문구(하드코딩, 위 6개 기업 리스트와 수치가 맞지 않음 — 전체 마스터 데이터 기준으로 보임):
> 등록 기업 **214곳** · 인터뷰한 현직자 **1,284명** · 최근 12개월 내 갱신 **92%**

---

## 4. 기업 상세 — 직무(Job)

`src/views/CompanyDetail.vue` — 현재 SK Hynix 고정. 배열 변수명 `jobs`.

필드 스키마:
```
{
  name: string       // 직무명
  people: number      // 이 직무로 인터뷰한 현직자 수
  fit: number         // 나와의 적합도(%)
  need: string[]       // 이 직무에서 요구하는 핵심 키워드 3개
}
```

데이터 (기업: SK Hynix, 총 3개):

| name | people | fit | need |
|---|---|---|---|
| 양산 기술 | 5 | 87 | 공정 데이터 분석, Python, 수율 개선 사례 |
| AI Engineer | 4 | 82 | Kubernetes, MLOps, 실험 관리 |
| 공정 개발 | 3 | 61 | 반도체 소자, 장비 이해, 통계 |

기업 상세 헤더 고정값:
- 기업명: `SK Hynix`
- 업종: `반도체`
- 현직자: `12명`, 인사이트: `34건`, 최근 인터뷰: `2026.08.21`
- 정보 최신성: `94%` (부가 설명: "인사이트 34건 중 32건이 최근 12개월 내 인터뷰입니다. 오래된 2건은 갱신 예정으로 표시됩니다.")

---

## 5. 기업 상세 — 현직자 인터뷰(Insight)

`src/views/CompanyDetail.vue` — 배열 변수명 `insiders`.

필드 스키마:
```
{
  role: string      // 인터뷰이 직무
  years: string      // 연차 ("N년차")
  date: string       // 인터뷰 일자 "YYYY.MM.DD"
  current: boolean    // true = 최신 취급, false = "갱신 예정" 배지 노출
  quote: string      // 인터뷰 발췌 원문
  tag: string        // 카테고리 라벨 (서류 기준 / 기술 스택 / 전형 / 기업 문화 등)
}
```

데이터 (기업: SK Hynix, 총 4건):

1. **AI Engineer · 3년차 · 2026.08.21 · current: true · tag: 서류 기준**
   > "서류에서 제일 먼저 보는 건 숫자입니다. '개선했다'는 문장은 안 읽고 넘어가요. 수율이든 처리 시간이든 전후가 적혀 있으면 그 사람 것부터 봅니다."

2. **양산 기술 · 6년차 · 2026.08.14 · current: true · tag: 기술 스택**
   > "올해부터 온프렘 쿠버네티스로 옮기는 중이라 컨테이너를 아예 안 만져본 분은 온보딩이 두 달 걸립니다. 깊이는 안 봐요, 배포해본 적 있는지만 봅니다."

3. **채용 담당 · 4년차 · 2026.07.30 · current: true · tag: 전형**
   > "신입도 지표를 말할 수 있으면 경력 무관으로 검토합니다. 반대로 경력이 있어도 프로젝트 설명이 기능 나열이면 통과가 어렵습니다."

4. **공정 개발 · 9년차 · 2025.10.02 · current: false · tag: 기업 문화**
   > "문서로 남기는 문화라 슬랙보다 위키를 먼저 봅니다. 회의 전에 문서를 읽고 오는 게 기본입니다."

---

## 6. 기업 상세 — 기업 문화 지표(Culture)

`src/views/CompanyDetail.vue` — 배열 변수명 `culture`.

필드 스키마:
```
{ name: string, value: number(0-100), note: string }
```

데이터 (기업: SK Hynix, 총 4개):

| name | value | note |
|---|---|---|
| 문서 기반 협업 | 88 | 인터뷰 12건 중 9건에서 언급 |
| 실험 · 배포 속도 | 74 | 분기 단위 릴리스 |
| 온보딩 체계 | 66 | 멘토 배정 · 2개월 |
| 주니어 성장 지원 | 71 | 사내 스터디 · 학회 지원 |

기업 상세 하단 안내 카드(고정 텍스트):
> "지금 프로필로는 87점입니다" / "부족한 항목은 정량 성과 서술 하나입니다. 프로젝트 전후 수치를 채우고 다시 분석하면 같은 기업에서 105점 만점 기준 상위 8%까지 올라갑니다."
> "현직자는 서비스에 직접 글을 쓰지 않습니다. 인터뷰로 얻은 내용을 관리자가 검수해 등록하고, 기술 스택과 인재상이 바뀌는 주기를 고려해 12개월마다 다시 인터뷰합니다."

---

## 7. 진단(Diagnosis) 입력폼 — 프로필

`src/views/Profile.vue`

### 7-1. 지난 분석 이력 (사이드바) — 배열 `past`
```
{ company: string, role: string, date: string, score: number }
```

| company | role | date | score |
|---|---|---|---|
| SK Hynix | 양산 기술 | 2026.08.08 | 87 |
| SK AX | 반도체 · AI Engineer | 2026.08.04 | 82 |

### 7-2. 입력 폼 선택지 (정적 옵션 목록)

- 지원 기업(`companies`): `SK Hynix, SK AX, 오늘의집, 카카오페이, 무신사, 토스`
- 희망 직무(`roles`): `AI Engineer, 양산 기술, Product Designer, Backend Engineer, Data Analyst`
- 기술 스택(`allStacks`, 중복 선택): `Python, RAG, FastAPI, PyTorch, Kubernetes, Airflow, SQL, React, TypeScript`

### 7-3. 폼 초기값 (`form`)
```
{
  company: 'SK Hynix',
  role: 'AI Engineer',
  stacks: ['Python', 'RAG', 'FastAPI']
}
```

### 7-4. 우측 안내 카드 고정 문구
> "직무만 정해도 진단은 시작할 수 있어요." / "기업까지 적으면 공고 데이터를 더 정확하게 좁혀볼게요."
> "SK Hynix에는 인터뷰한 현직자가 12명 있습니다. 마지막 인터뷰는 2026.08.21입니다." (기업명·인원·날짜가 선택값과 무관하게 고정)

체크리스트 상태는 폼 값에 따라 자동 계산됨(더미 데이터 아님): 희망 직무 입력 완료 / 기술 스택 N개 선택 / 이력 업로드 대기.

---

## 8. 진단 진행 중 — 분석 스텝

`src/views/Analyzing.vue` — 배열 `steps`. 실제로는 연출용 타이머(합계 약 8.2초)이며, 종료 시 `#/report`로 자동 이동합니다.

```
{ label: string, note: string, ms: number(연출 지속시간) }
```

| label | note | ms |
|---|---|---|
| 프로필 파싱 | 입력한 스택·프로젝트를 항목으로 분해합니다 | 1400 |
| 인터뷰 코퍼스 검색 | SK Hynix 현직자 12명, 인터뷰 34건을 불러옵니다 | 2200 |
| 항목별 대조 | 요구 수준과 내 수준을 역량 단위로 맞춰봅니다 | 2600 |
| 리포트 작성 | 강점·부족한 역량·보완할 점을 순서대로 정리합니다 | 2000 |

상단 고정 캡션: `SK Hynix · 양산 기술 · AI Engineer`
본문: "현직자 인터뷰 34건과 입력한 프로필을 항목별로 대조하는 중입니다. 보통 10초 안에 끝납니다."

> 실제 연동 시 이 화면은 `api.js`의 `waitForReport(reportId)`(2초 폴링)로 대체되는 자리입니다. 현재는 백엔드 상태값 대신 프런트에서 타이머로 흉내만 냅니다.

---

## 9. 진단 리포트(Report)

`src/views/Report.vue` — 현재 SK Hynix / AI Engineer 진단 결과 하나로 고정.

### 9-1. 리포트 메타 (`meta`)
```
{
  name: '김서현',
  company: 'SK Hynix',
  role: 'AI Engineer',
  code: 'JP-0002',
  date: '2026.09.03'
}
```

### 9-2. 종합 점수 (배너, 하드코딩 — meta와 별도 변수 없이 템플릿에 직접 삽입)
- Match Score: **87** (`data-count="87"`)
- 부가 설명: `% 상위 18%`

### 9-3. 역량 분포 — 배열 `skills`
```
{ name: string, value: number(0-100), weak?: boolean }
```

| name | value | weak |
|---|---|---|
| 직무 이해 | 92 | — |
| 정량 성과 | 54 | true |
| 협업 경험 | 78 | — |

우측 "핵심 진단" 카드 고정 텍스트:
> "정량 성과가 비어 있어요" / "지원 공고의 68%가 지표 개선 사례를 요구합니다." / "새 프로젝트보다 기존 프로젝트의 전후 수치를 찾아보세요."

### 9-4. 지원자 분포 히스토그램 — 배열 `bins` (컴포넌트: `Histogram.vue`)
```
{ grade: string, count: number, me?: boolean, avg?: boolean }
```

| grade | count | 비고 |
|---|---|---|
| D | 29 | |
| C | 34 | |
| C+ | 55 | |
| B- | 72 | |
| B | 112 | avg: true (지원자 평균) |
| B+ | 128 | |
| A- | 77 | |
| A | 42 | me: true (내 위치) |
| A+ | 29 | |

전체 모수: `578`명 (`:total="578"`, Report.vue 템플릿에 하드코딩)

### 9-5. 추천 실행안 — 배열 `actions`
```
{ no: string, title: string, meta: string(소요시간) }
```

| no | title | meta |
|---|---|---|
| 01 | 프로젝트 리텐션 지표 정리 | 예상 2주 |
| 02 | 현직자 1:1 포트폴리오 리뷰 | 예상 40분 |

### 9-6. 이력서 강조 지점 — 배열 `resumePoints` (문자열 배열)

1. "프로젝트 제목 옆에 '정확도 61% → 84%'처럼 전후 수치를 붙일 것"
2. "'RAG 파이프라인 구축'을 '검색 정확도 개선을 위한 RAG 파이프라인 설계·구축'으로 목적을 앞에 둘 것"
3. "팀 프로젝트는 맡은 파트를 괄호로 명시할 것 (3인 팀 / 검색·평가 담당)"

### 9-7. 이번 주 실행 계획 (Task) — 배열 `tasks` (`ref`, 화면에서 체크 가능한 상태값 포함)
```
{ title: string, desc?: string, done: boolean, group?: string, badge: string }
```

| title | desc | done | group | badge |
|---|---|---|---|---|
| 프로젝트별 목표·기간·사용자 수 적기 | 노션 또는 메모에 세 프로젝트의 기본 수치를 모읍니다. | true | 오늘 | 진행 중 |
| 전후 지표와 의사결정 연결하기 | — | false | 다음 | D+2 |
| 현직자에게 수정본 리뷰 요청하기 | — | false | — | D+5 |

진행률 카드: 완료 개수 / 전체 개수 (계산값, 위 tasks 배열 기준 1/3)

FOCUS 카드 고정 텍스트:
> "이번 주에는 새 프로젝트를 시작하지 않습니다." / "기존 경험의 숫자를 찾는 데만 시간을 쓰세요." / 완료 예상: **2주**

---

## 10. 마이페이지 — 진단 기록 / 점수 추이

`src/views/MyPage.vue`

### 10-1. 요약 통계 — 배열 `stats`
```
{ name: string, value: string, unit?: string }
```

| name | value | unit |
|---|---|---|
| 최근 변화 | +12 | 점 |
| 완료한 계획 | 5 | — |
| 현직자 리뷰 | 2 | — |

### 10-2. 진단 기록 테이블 — 배열 `rows`
```
{ date: string, title: string, match: string, delta: string, status: string, live?: boolean }
```

| date | title | match | delta | status | live |
|---|---|---|---|---|---|
| 2026.09.03 | SK Hynix AI Engineer 진단 | 87% | +12 | 진행 중 | true |
| 2026.08.13 | SK Hynix 양산 기술 진단 | 75% | +4 | 완료 | — |
| 2026.08.04 | SK AX AI Engineer 진단 | 71% | +10 | 완료 | — |
| 2026.07.28 | SK AX MLOps 진단 | 61% | — | 보관 | — |

### 10-3. 점수 추이 그래프 — 배열 `trend`
```
{ date: string, value: number, last?: boolean }
```

| date | value | last |
|---|---|---|
| 07.28 | 61 | — |
| 08.04 | 71 | — |
| 08.13 | 75 | — |
| 09.03 | 87 | true |

> `trend`와 9-4의 `bins`/Report의 87점, 10-2의 `rows` 최신 항목(87%)이 서로 같은 진단 1건을 가리키는 것으로 보이나, 현재 코드에는 이 사이를 연결하는 id가 없습니다. DB 설계 시 `report_id`로 묶어야 합니다.

---

## 11. 마이페이지 — 요금제(Plan)

`src/views/MyPage.vue`

### 11-1. 현재 요금제 (템플릿 하드코딩, 배열 아님)
- 플랜명: `CAREER PLUS`
- 가격: `₩29,000 / 월`
- 포함 내역: `무제한 진단 · 현직자 리뷰 월 2회 · 공고 알림`

### 11-2. 요금제 비교 — 배열 `plans`
```
{ name: string, price: string, features: string, cta: string, current?: boolean, recommend?: boolean }
```

| name | price | features | cta | current | recommend |
|---|---|---|---|---|---|
| FREE | ₩0 | 월 1회 진단 · 기본 리포트 | 현재 아님 | — | — |
| PLUS | ₩29,000 | 무제한 진단 · 리뷰 2회 | 사용 중 | true | true |
| PRO | ₩59,000 | 리뷰 월 6회 · 1:1 세션 | 업그레이드 | — | — |

### 11-3. 결제 수단
- `신한카드 ···· 1024` (템플릿 하드코딩)

---

## 12. 홈 — 통계 · 카피

`src/views/Home.vue`

### 12-1. 기존 서비스 대비 비교 — 배열 `alternatives`
```
{ name: string, limit: string, gap: string }
```

| name | limit | gap |
|---|---|---|
| 채용공고 | 기업이 직접 쓴 홍보 문구. 실제 업무와 온도차가 크다. | "Python 활용 능력"이 어느 수준인지 알 수 없음 |
| 잡플래닛 · 블라인드 | 만족도 후기 중심이라 내 역량과 대조가 안 된다. | 평점은 있지만 내 기준점이 없음 |
| 취업 커뮤니티 | 정보가 비구조적이고 검색이 되지 않는다. | 같은 질문이 매년 반복됨 |
| ChatGPT | 공개된 정보만 안다. | 인터뷰로만 얻는 내부 기준은 모름 |

### 12-2. 4주 사이클 — 배열 `steps`
```
{ no: string, title: string, body: string, badge?: string, live?: boolean, cta?: boolean }
```

| no | title | body | badge/cta |
|---|---|---|---|
| 01 | 서비스 원칙 읽기 | 지금 가장 중요한 기준부터 확인합니다. | badge: 진행 중 (live) |
| 02 | 데이터 기준 보기 | 현직자의 언어로 구체화합니다. | badge: 다음 단계 |
| 03 | 무료 진단 시작 | 행동으로 옮기고 결과를 남깁니다. | cta: true ("시작하기" 버튼, `#/profile`로 링크) |

### 12-3. 하단 통계 타일 — 배열 `stats`
```
{ cap: string, value: number, suffix: string, note: string, decimals?: number }
```

| cap | value | decimals | note |
|---|---|---|---|
| 누적 진단 | 12840 | — | 건의 진단 리포트 |
| 현직자 데이터 | 214 | — | 개 직무 기준 |
| 리뷰 만족도 | 4.9 | 1 | / 5.0 |

+ 고정 타일(데이터 아님, 링크 카드): "START NOW / 첫 진단은 무료 / 3분이면 시작할 수 있어요." (`#/profile`)

### 12-4. 히어로 상단 유리 카드 (고정, `Home.vue` 템플릿 하드코딩 — 위 12-3과 다른 스냅샷)
- TODAY'S DIAGNOSIS: **87%** 직무 적합도
- 직무 이해 92 / 정량 성과 54 / 협업 경험 78
- "현직자 12명의 인터뷰와 대조한 결과입니다."

> 이 값은 Report.vue의 9-2·9-3과 동일한 수치 세트입니다(87 / 92 / 54 / 78). 같은 샘플 리포트를 홈 히어로에도 재사용 중입니다.

### 12-5. 카피 (더미 텍스트, 데이터화 불필요하지만 참고용으로 수록)

- 히어로 킥커: `AI CAREER CONSULTING`
- 히어로 헤드라인: "현직자가 보는 기준으로 / 당신의 부족한 경험을 찾습니다."
- 리드: "채용 공고와 현직자 인터뷰를 대조해, 다음 프로젝트를 제시합니다."
- "네 가지 모두 읽는 정보입니다. Jobpill이 주는 것은 내 프로필과 대조된 정보입니다."
- 아웃트로: "읽을 정보는 이미 많습니다. 대조할 기준이 없었을 뿐입니다."
- 원칙: "진단은 판단이 아니라 좌표입니다."

---

## 13. 공통 UI 텍스트 (로그인·푸터·GNB)

### 13-1. `Login.vue`
- 로그인 모드 안내: "다시 오셨네요" / "마지막 분석은 SK Hynix · AI Engineer였습니다." (→ 2절 사용자 세션과 동일한 값, 데이터 연동 필요)
- 회원가입 모드 안내: "3분이면 첫 분석까지 끝납니다" / "가입 후 바로 프로필을 입력하면 첫 리포트를 무료로 받습니다."
- 소셜 로그인 버튼: 카카오 / 구글 / 네이버 (연동 없음, UI만)

### 13-2. `AuthAside.vue` (로그인 화면 좌측 패널)
- 헤드라인: "3분 뒤, 합격까지 남은 경험을 보게 됩니다"
- 서브: "첫 진단은 무료이며 결과는 계정에 저장됩니다."
- 리스트: "✓ 리포트 자동 저장 / ✓ 현직자 데이터 교차 검증 / ✓ 업로드 파일 보관"

### 13-3. `TopNav.vue` — GNB 메뉴 (정적 상수 `menu`)
```
{ key: 'profile', label: '컨설팅', href: '#/profile' }
{ key: 'companies', label: '기업관', href: '#/companies' }
```

### 13-4. `SiteFooter.vue`
- 브랜드 설명: "현직자에게 직접 물어 정리한 기준으로, 내 프로필을 대조합니다."
- 서비스 링크: 내 정보 입력(`#/profile`), 분석 결과(`#/report`), 기업관(`#/companies`)
- 계정 링크: 로그인/회원가입(`#/login`), 마이페이지(`#/mypage`)
- 정책 링크: 이용약관, 개인정보 처리방침 (둘 다 `#/`로 연결, 실제 페이지 없음)
- 하단 고지: "인터뷰 자료는 관리자가 검수해 등록하며 조사 시점을 함께 표시합니다. 업로드한 파일은 30일 뒤 자동 삭제됩니다." / "© 2026 Jobpill"

---

## 14. API 계약 (연동 시 맞춰야 할 엔드포인트)

`src/api.js` — 현재 프런트가 기대하는 REST 인터페이스입니다. 위 더미 데이터들은 실제로는 이 엔드포인트들의 응답으로 대체되어야 합니다.

```
POST   /auth/register
POST   /auth/login
GET    /me/profile
PUT    /me/profile
GET    /companies?{query}
GET    /companies/:companyCode
POST   /reports
GET    /reports/:id
GET    /reports?{size, ...query}
GET    /reports/:id/download
```

- `BASE_URL` 기본값: `/api/v1` (환경변수 `VITE_API_BASE_URL`로 override 가능)
- 인증: `localStorage.accessToken` → `Authorization: Bearer` 헤더
- `waitForReport(reportId)`: `/reports/:id`를 2초 간격 폴링, `status`가 `COMPLETED`/`FAILED`가 될 때까지 대기 (→ 8절 Analyzing 화면이 이 흐름을 흉내만 내는 중)

> 현재 어떤 화면도 실제로 `api.js`를 호출하지 않습니다(전부 로컬 하드코딩 배열). 연동 시점에 화면 데이터를 이 엔드포인트 응답으로 바꿔 끼우면 됩니다.

---

## 15. 정리 — 엔티티 후보 요약

더미 데이터를 훑어보면 아래와 같은 테이블/엔티티가 필요해 보입니다 (설계 참고용 제안, 강제 아님):

| 엔티티 | 주요 필드 | 관련 더미 데이터 |
|---|---|---|
| **User** | name, email, current_plan, payment_method | 2, 11 |
| **Company** | name, sector, area, interviewed_at, is_fresh, insight_count, interviewee_count | 3 |
| **Job** (Company 하위) | company_id, name, required_keywords[] | 4 |
| **CompanyInsight** (인터뷰 발췌) | company_id, role, years, interviewed_at, is_current, quote, tag | 5 |
| **CompanyCulture** | company_id, name, value, note | 6 |
| **UserProfile** | user_id, target_company, target_role, stacks[] | 7 |
| **Report** (진단 결과) | user_id, company_id, role, score, percentile, created_at | 9 |
| **ReportSkill** (역량 분포) | report_id, name, value | 9-3 |
| **ReportDistribution** (히스토그램) | report_id, grade, count, is_me, is_avg | 9-4 |
| **ReportAction** (추천 실행안) | report_id, title, estimated_time | 9-5 |
| **ReportResumePoint** | report_id, text | 9-6 |
| **ReportTask** (실행 계획 체크리스트) | report_id, title, desc, done, group, badge | 9-7 |
| **ScoreHistory** (점수 추이) | user_id, report_id, date, value | 10-3 |
| **Plan** (요금제 마스터) | name, price, features | 11-2 |

세션 종료 후 **Report(87점, SK Hynix, AI Engineer)** 하나가 홈 히어로 카드 / 마이페이지 진단 기록 최신행 / 점수 추이 마지막 점 / 리포트 화면 전체에서 반복 재사용되고 있으므로, 실 데이터로 바꿀 때 이 4곳을 같은 `report_id`로 묶어야 화면 간 수치가 어긋나지 않습니다.
