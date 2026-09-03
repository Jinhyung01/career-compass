// 기업 더미 데이터 — DUMMY_COMPANIES_100.md + DUMMY_COMPANY_DETAILS_100.json 를 합쳐 생성.
// 기업관 목록·기업 상세·컨설팅 기업 선택이 모두 이 배열 하나를 본다.
// DB 에 없는 컬럼(sector · area · fresh · primary)은 담지 않는다.
// match 점수는 진단 결과라 여기 두지 않고 src/data/reports.js 에서 가져온다.
// 합성 데이터이며 실제 기업 정보가 아니다.
export const companies = [
  {
    "companyCode": "SK001",
    "companyName": "SK Hynix",
    "role": "양산 기술 · AI Engineer",
    "people": 12,
    "insight": 34,
    "interviewed": "2026.08.21",
    "freshness": 94,
    "jobs": [
      {
        "name": "양산 기술",
        "people": 5,
        "fit": 87,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "AI Engineer",
        "people": 4,
        "fit": 82,
        "need": [
          "Kubernetes",
          "MLOps",
          "실험 관리"
        ]
      },
      {
        "name": "공정 개발",
        "people": 3,
        "fit": 61,
        "need": [
          "반도체 소자",
          "장비 이해",
          "통계"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "3년차",
        "date": "2026.08.21",
        "current": true,
        "quote": "서류에서 제일 먼저 보는 건 숫자입니다. “개선했다”는 문장은 안 읽고 넘어가요. 수율이든 처리 시간이든 전후가 적혀 있으면 그 사람 것부터 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "양산 기술",
        "years": "6년차",
        "date": "2026.08.14",
        "current": true,
        "quote": "올해부터 온프렘 쿠버네티스로 옮기는 중이라 컨테이너를 아예 안 만져본 분은 온보딩이 두 달 걸립니다. 깊이는 안 봐요, 배포해본 적 있는지만 봅니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "4년차",
        "date": "2026.07.30",
        "current": true,
        "quote": "신입도 지표를 말할 수 있으면 경력 무관으로 검토합니다. 반대로 경력이 있어도 프로젝트 설명이 기능 나열이면 통과가 어렵습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "9년차",
        "date": "2025.10.02",
        "current": false,
        "quote": "문서로 남기는 문화라 슬랙보다 위키를 먼저 봅니다. 회의 전에 문서를 읽고 오는 게 기본입니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 88,
        "note": "인터뷰 12건 중 9건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 74,
        "note": "분기 단위 릴리스"
      },
      {
        "name": "온보딩 체계",
        "value": 66,
        "note": "멘토 배정 · 2개월"
      },
      {
        "name": "주니어 성장 지원",
        "value": 71,
        "note": "사내 스터디 · 학회 지원"
      }
    ],
    "domain": "skhynix.com"
  },
  {
    "companyCode": "SK002",
    "companyName": "SK AX",
    "role": "반도체 · AI Engineer",
    "people": 9,
    "insight": 27,
    "interviewed": "2026.08.04",
    "freshness": 90,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 4,
        "fit": 82,
        "need": [
          "실험 설계",
          "평가 지표",
          "RAG"
        ]
      },
      {
        "name": "MLOps Engineer",
        "people": 3,
        "fit": 63,
        "need": [
          "컨테이너 배포",
          "모니터링",
          "CI/CD"
        ]
      },
      {
        "name": "Data Engineer",
        "people": 2,
        "fit": 74,
        "need": [
          "ETL",
          "데이터 품질",
          "SQL"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "5년차",
        "date": "2026.08.04",
        "current": true,
        "quote": "모델을 만든 이야기보다, 그 모델을 어디에 올려서 무엇을 바꿨는지를 먼저 확인합니다.",
        "tag": "서류 기준"
      },
      {
        "role": "MLOps Engineer",
        "years": "3년차",
        "date": "2026.07.28",
        "current": true,
        "quote": "배포 경험은 깊이보다 한 번이라도 운영에 올려봤는지를 봅니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "7년차",
        "date": "2026.07.11",
        "current": true,
        "quote": "프로젝트 설명은 맡은 범위와 판단 근거가 분리되어 있으면 검토가 빠릅니다.",
        "tag": "전형"
      },
      {
        "role": "Data Engineer",
        "years": "4년차",
        "date": "2025.10.20",
        "current": false,
        "quote": "데이터 품질 이슈를 어떻게 발견했는지 물어보는 편입니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 85,
        "note": "인터뷰 9건 중 7건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 79,
        "note": "스프린트 단위 릴리스"
      },
      {
        "name": "온보딩 체계",
        "value": 72,
        "note": "멘토 배정 · 6주"
      },
      {
        "name": "주니어 성장 지원",
        "value": 80,
        "note": "사내 스터디 · 컨퍼런스 지원"
      }
    ],
    "domain": "skax.co.kr"
  },
  {
    "companyCode": "PC001",
    "companyName": "포스코 퓨쳐엠",
    "role": "반도체 · DX",
    "people": 8,
    "insight": 22,
    "interviewed": "2026.08.01",
    "freshness": 88,
    "jobs": [
      {
        "name": "DX · 데이터 기획",
        "people": 3,
        "fit": 79,
        "need": [
          "문제 정의",
          "효과 산정",
          "현장 이해"
        ]
      },
      {
        "name": "공정 데이터 분석",
        "people": 3,
        "fit": 77,
        "need": [
          "Python",
          "SQL",
          "설비 로그"
        ]
      },
      {
        "name": "BI Analyst",
        "people": 2,
        "fit": 70,
        "need": [
          "대시보드",
          "지표 정의",
          "보고"
        ]
      }
    ],
    "insiders": [
      {
        "role": "DX 기획",
        "years": "6년차",
        "date": "2026.08.01",
        "current": true,
        "quote": "과제를 가져올 때 기대 효과를 숫자로 적어오면 검토 순서가 앞당겨집니다.",
        "tag": "서류 기준"
      },
      {
        "role": "공정 데이터 분석",
        "years": "4년차",
        "date": "2026.07.24",
        "current": true,
        "quote": "현장 데이터가 장부와 안 맞는 경우가 많아, 확인 절차를 스스로 만드는 분을 선호합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "9년차",
        "date": "2026.07.02",
        "current": true,
        "quote": "현장과 IT 어느 한쪽만 아는 지원자보다, 둘을 이어본 경험을 높게 봅니다.",
        "tag": "전형"
      },
      {
        "role": "BI Analyst",
        "years": "3년차",
        "date": "2025.11.30",
        "current": false,
        "quote": "분석 결과를 누구에게 어떻게 전달했는지까지 적어주면 좋습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 78,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "현장 온보딩",
        "value": 86,
        "note": "입사 첫 6주 현장 배치"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 64,
        "note": "반기 단위 과제 사이클"
      },
      {
        "name": "주니어 성장 지원",
        "value": 74,
        "note": "직무 교육 · 자격 취득 지원"
      }
    ],
    "domain": "poscofuturem.com"
  },
  {
    "companyCode": "KP001",
    "companyName": "카카오페이",
    "role": "Backend Engineer · Payments",
    "people": 11,
    "insight": 31,
    "interviewed": "2026.07.22",
    "freshness": 83,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 5,
        "fit": 68,
        "need": [
          "Java · Spring",
          "트랜잭션 정합성",
          "테스트"
        ]
      },
      {
        "name": "API Platform Engineer",
        "people": 3,
        "fit": 66,
        "need": [
          "API 설계",
          "버저닝",
          "문서화"
        ]
      },
      {
        "name": "QA Engineer",
        "people": 3,
        "fit": 61,
        "need": [
          "자동화 테스트",
          "회귀 시나리오",
          "릴리스 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "5년차",
        "date": "2026.07.22",
        "current": true,
        "quote": "중복 요청과 부분 실패를 어떻게 처리했는지가 서류에서 가장 눈에 띕니다.",
        "tag": "서류 기준"
      },
      {
        "role": "API Platform",
        "years": "7년차",
        "date": "2026.07.05",
        "current": true,
        "quote": "작은 프로젝트라도 멱등 처리를 직접 구현해본 이력이 있으면 대화가 빨라집니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "5년차",
        "date": "2026.06.18",
        "current": true,
        "quote": "테스트 코드를 어떤 기준으로 작성했는지 물어봅니다.",
        "tag": "전형"
      },
      {
        "role": "QA Engineer",
        "years": "4년차",
        "date": "2025.12.09",
        "current": false,
        "quote": "릴리스 전 검증 절차를 문서로 남기는 편입니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 82,
        "note": "인터뷰 11건 중 9건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 88,
        "note": "주 단위 릴리스"
      },
      {
        "name": "온보딩 체계",
        "value": 75,
        "note": "멘토 배정 · 8주"
      },
      {
        "name": "주니어 성장 지원",
        "value": 77,
        "note": "사내 스터디 · 도서 지원"
      }
    ],
    "domain": "kakaopay.com"
  },
  {
    "companyCode": "MS001",
    "companyName": "무신사",
    "role": "Data Analyst · Growth",
    "people": 7,
    "insight": 20,
    "interviewed": "2026.07.14",
    "freshness": 81,
    "jobs": [
      {
        "name": "Data Analyst",
        "people": 3,
        "fit": 71,
        "need": [
          "SQL",
          "지표 정의",
          "실험 해석"
        ]
      },
      {
        "name": "BI Engineer",
        "people": 2,
        "fit": 74,
        "need": [
          "대시보드",
          "데이터 모델링",
          "자동화"
        ]
      },
      {
        "name": "Growth Analyst",
        "people": 2,
        "fit": 58,
        "need": [
          "A/B 테스트",
          "가설 설계",
          "리텐션 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Analyst",
        "years": "4년차",
        "date": "2026.07.14",
        "current": true,
        "quote": "쿼리 실력보다, 그 지표를 왜 핵심으로 봤는지를 먼저 묻습니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Growth Analyst",
        "years": "6년차",
        "date": "2026.06.27",
        "current": true,
        "quote": "가설을 세우고 실험으로 확인해본 경험이 한 건이라도 있으면 좋습니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "3년차",
        "date": "2026.06.10",
        "current": true,
        "quote": "분석이 어떤 의사결정으로 이어졌는지까지 적어주세요.",
        "tag": "전형"
      },
      {
        "role": "BI Engineer",
        "years": "5년차",
        "date": "2025.11.05",
        "current": false,
        "quote": "대시보드를 만들고 끝내지 않고 사용 여부까지 챙기는 문화입니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 76,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 90,
        "note": "주 단위 실험 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 68,
        "note": "멘토 배정 · 4주"
      },
      {
        "name": "주니어 성장 지원",
        "value": 73,
        "note": "사내 스터디 · 데이터 교육"
      }
    ],
    "domain": "musinsa.com"
  },
  {
    "companyCode": "D001",
    "companyName": "파운드리원",
    "people": 11,
    "insight": 31,
    "interviewed": "2026.08.29",
    "freshness": 91,
    "jobs": [
      {
        "name": "공정 개발",
        "people": 5,
        "fit": 90,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "Data Engineer",
        "people": 3,
        "fit": 85,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "양산 기술",
        "people": 3,
        "fit": 78,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "공정 개발",
        "years": "2년차",
        "date": "2026.08.29",
        "current": true,
        "quote": "파운드리원의 공정 개발는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Data Engineer",
        "years": "4년차",
        "date": "2026.08.22",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.08",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "양산 기술",
        "years": "8년차",
        "date": "2026.07.15",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 91,
        "note": "인터뷰 11건 중 8건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 83,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 76,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 87,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "공정 개발 · Data Engineer"
  },
  {
    "companyCode": "D002",
    "companyName": "실리콘웨이브",
    "people": 8,
    "insight": 24,
    "interviewed": "2026.08.27",
    "freshness": 92,
    "jobs": [
      {
        "name": "양산 기술",
        "people": 4,
        "fit": 86,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "AI Engineer",
        "people": 2,
        "fit": 81,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "공정 개발",
        "people": 2,
        "fit": 74,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      }
    ],
    "insiders": [
      {
        "role": "양산 기술",
        "years": "2년차",
        "date": "2026.08.27",
        "current": true,
        "quote": "실리콘웨이브의 양산 기술는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "AI Engineer",
        "years": "4년차",
        "date": "2026.08.20",
        "current": true,
        "quote": "입사 초반에는 공정 데이터 분석을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.06",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.07.13",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 87,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 79,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 72,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 83,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "양산 기술 · AI Engineer"
  },
  {
    "companyCode": "D003",
    "companyName": "엣지메모리",
    "people": 7,
    "insight": 19,
    "interviewed": "2026.08.24",
    "freshness": 93,
    "jobs": [
      {
        "name": "반도체 AI",
        "people": 4,
        "fit": 82,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "MLOps",
        "people": 2,
        "fit": 77,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 70,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "반도체 AI",
        "years": "2년차",
        "date": "2026.08.24",
        "current": true,
        "quote": "엣지메모리의 반도체 AI는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "MLOps",
        "years": "4년차",
        "date": "2026.08.17",
        "current": true,
        "quote": "입사 초반에는 MES 연동을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.03",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.07.10",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 83,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 75,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 68,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 79,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "반도체 AI · MLOps"
  },
  {
    "companyCode": "D004",
    "companyName": "코어다이",
    "people": 10,
    "insight": 28,
    "interviewed": "2026.08.20",
    "freshness": 94,
    "jobs": [
      {
        "name": "공정 개발",
        "people": 5,
        "fit": 78,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "장비 SW",
        "people": 3,
        "fit": 73,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "양산 기술",
        "people": 2,
        "fit": 66,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "공정 개발",
        "years": "2년차",
        "date": "2026.08.20",
        "current": true,
        "quote": "코어다이의 공정 개발는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "장비 SW",
        "years": "4년차",
        "date": "2026.08.13",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.30",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "양산 기술",
        "years": "8년차",
        "date": "2026.07.06",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 79,
        "note": "인터뷰 10건 중 7건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 71,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 64,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 75,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "공정 개발 · 장비 SW"
  },
  {
    "companyCode": "D005",
    "companyName": "나노브릿지",
    "people": 6,
    "insight": 17,
    "interviewed": "2026.08.18",
    "freshness": 95,
    "jobs": [
      {
        "name": "수율 분석",
        "people": 3,
        "fit": 75,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "Python Engineer",
        "people": 1,
        "fit": 70,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "공정 개발",
        "people": 2,
        "fit": 63,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      }
    ],
    "insiders": [
      {
        "role": "수율 분석",
        "years": "2년차",
        "date": "2026.08.18",
        "current": true,
        "quote": "나노브릿지의 수율 분석는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Python Engineer",
        "years": "4년차",
        "date": "2026.08.11",
        "current": true,
        "quote": "입사 초반에는 공정 데이터 분석을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.28",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.07.04",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 76,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 68,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 61,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 72,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "수율 분석 · Python Engineer"
  },
  {
    "companyCode": "D006",
    "companyName": "웨이퍼링크",
    "people": 5,
    "insight": 15,
    "interviewed": "2026.08.15",
    "freshness": 96,
    "jobs": [
      {
        "name": "양산 기술",
        "people": 3,
        "fit": 72,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "자동화 Engineer",
        "people": 1,
        "fit": 67,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 60,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "양산 기술",
        "years": "2년차",
        "date": "2026.08.15",
        "current": true,
        "quote": "웨이퍼링크의 양산 기술는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "자동화 Engineer",
        "years": "4년차",
        "date": "2026.08.08",
        "current": true,
        "quote": "입사 초반에는 MES 연동을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.25",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.07.01",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 73,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 65,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 58,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 69,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "양산 기술 · 자동화 Engineer"
  },
  {
    "companyCode": "D007",
    "companyName": "마이크로픽셀",
    "people": 9,
    "insight": 26,
    "interviewed": "2026.08.12",
    "freshness": 96,
    "jobs": [
      {
        "name": "공정 개발",
        "people": 5,
        "fit": 70,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "품질 Engineer",
        "people": 2,
        "fit": 65,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "양산 기술",
        "people": 2,
        "fit": 58,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "공정 개발",
        "years": "2년차",
        "date": "2026.08.12",
        "current": true,
        "quote": "마이크로픽셀의 공정 개발는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "품질 Engineer",
        "years": "4년차",
        "date": "2026.08.05",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.22",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "양산 기술",
        "years": "8년차",
        "date": "2026.06.28",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 71,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 63,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 56,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 67,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "공정 개발 · 품질 Engineer"
  },
  {
    "companyCode": "D008",
    "companyName": "오로라칩",
    "people": 8,
    "insight": 22,
    "interviewed": "2026.08.10",
    "freshness": 90,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 4,
        "fit": 68,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "데이터 분석",
        "people": 2,
        "fit": 63,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "공정 개발",
        "people": 2,
        "fit": 56,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "2년차",
        "date": "2026.08.10",
        "current": true,
        "quote": "오로라칩의 AI Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "데이터 분석",
        "years": "4년차",
        "date": "2026.08.03",
        "current": true,
        "quote": "입사 초반에는 공정 데이터 분석을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.20",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.06.26",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 69,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 61,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 54,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 65,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "AI Engineer · 데이터 분석"
  },
  {
    "companyCode": "D009",
    "companyName": "테라소자",
    "people": 12,
    "insight": 35,
    "interviewed": "2026.08.07",
    "freshness": 91,
    "jobs": [
      {
        "name": "소자 개발",
        "people": 6,
        "fit": 66,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "연구 Engineer",
        "people": 3,
        "fit": 61,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "공정 개발",
        "people": 3,
        "fit": 54,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "소자 개발",
        "years": "2년차",
        "date": "2026.08.07",
        "current": true,
        "quote": "테라소자의 소자 개발는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "연구 Engineer",
        "years": "4년차",
        "date": "2026.07.31",
        "current": true,
        "quote": "입사 초반에는 MES 연동을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.17",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.06.23",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 67,
        "note": "인터뷰 12건 중 8건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 59,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 52,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 63,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "소자 개발 · 연구 Engineer"
  },
  {
    "companyCode": "D010",
    "companyName": "블루다이오드",
    "people": 4,
    "insight": 12,
    "interviewed": "2026.08.04",
    "freshness": 92,
    "jobs": [
      {
        "name": "장비 SW",
        "people": 2,
        "fit": 64,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 59,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 52,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "장비 SW",
        "years": "2년차",
        "date": "2026.08.04",
        "current": true,
        "quote": "블루다이오드의 장비 SW는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Backend Engineer",
        "years": "4년차",
        "date": "2026.07.28",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.14",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.06.20",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 65,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 57,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 50,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 61,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "장비 SW · Backend Engineer"
  },
  {
    "companyCode": "D011",
    "companyName": "세미큐브",
    "people": 7,
    "insight": 20,
    "interviewed": "2026.08.01",
    "freshness": 93,
    "jobs": [
      {
        "name": "공정 데이터",
        "people": 4,
        "fit": 63,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "BI Analyst",
        "people": 2,
        "fit": 58,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 51,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      }
    ],
    "insiders": [
      {
        "role": "공정 데이터",
        "years": "2년차",
        "date": "2026.08.01",
        "current": true,
        "quote": "세미큐브의 공정 데이터는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "BI Analyst",
        "years": "4년차",
        "date": "2026.07.25",
        "current": true,
        "quote": "입사 초반에는 공정 데이터 분석을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.11",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.06.17",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 64,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 56,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 49,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 60,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "공정 데이터 · BI Analyst"
  },
  {
    "companyCode": "D012",
    "companyName": "리드실리콘",
    "people": 6,
    "insight": 18,
    "interviewed": "2026.07.28",
    "freshness": 94,
    "jobs": [
      {
        "name": "양산 기술",
        "people": 3,
        "fit": 61,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "공정 자동화",
        "people": 1,
        "fit": 56,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "공정 개발",
        "people": 2,
        "fit": 49,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "양산 기술",
        "years": "2년차",
        "date": "2026.07.28",
        "current": true,
        "quote": "리드실리콘의 양산 기술는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "공정 자동화",
        "years": "4년차",
        "date": "2026.07.21",
        "current": true,
        "quote": "입사 초반에는 MES 연동을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.07",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.06.13",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 62,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 54,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 47,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 58,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "양산 기술 · 공정 자동화"
  },
  {
    "companyCode": "D013",
    "companyName": "칩포레스트",
    "people": 5,
    "insight": 14,
    "interviewed": "2026.07.25",
    "freshness": 95,
    "jobs": [
      {
        "name": "반도체 AI",
        "people": 3,
        "fit": 59,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "Research Engineer",
        "people": 1,
        "fit": 54,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 47,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "반도체 AI",
        "years": "2년차",
        "date": "2026.07.25",
        "current": true,
        "quote": "칩포레스트의 반도체 AI는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Research Engineer",
        "years": "4년차",
        "date": "2026.07.18",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.04",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.06.10",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 60,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 52,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 45,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 56,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "반도체 AI · Research Engineer"
  },
  {
    "companyCode": "D014",
    "companyName": "인텔리다이",
    "people": 9,
    "insight": 27,
    "interviewed": "2026.07.22",
    "freshness": 96,
    "jobs": [
      {
        "name": "수율 개선",
        "people": 5,
        "fit": 84,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "ML Engineer",
        "people": 2,
        "fit": 79,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "공정 개발",
        "people": 2,
        "fit": 72,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      }
    ],
    "insiders": [
      {
        "role": "수율 개선",
        "years": "2년차",
        "date": "2026.07.22",
        "current": true,
        "quote": "인텔리다이의 수율 개선는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "ML Engineer",
        "years": "4년차",
        "date": "2026.07.15",
        "current": true,
        "quote": "입사 초반에는 공정 데이터 분석을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.01",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.06.07",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 85,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 77,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 70,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 81,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "수율 개선 · ML Engineer"
  },
  {
    "companyCode": "D015",
    "companyName": "모듈러스칩",
    "people": 6,
    "insight": 16,
    "interviewed": "2026.07.19",
    "freshness": 96,
    "jobs": [
      {
        "name": "공정 개발",
        "people": 3,
        "fit": 73,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "Simulation Engineer",
        "people": 1,
        "fit": 68,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "양산 기술",
        "people": 2,
        "fit": 61,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "공정 개발",
        "years": "2년차",
        "date": "2026.07.19",
        "current": true,
        "quote": "모듈러스칩의 공정 개발는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Simulation Engineer",
        "years": "4년차",
        "date": "2026.07.12",
        "current": true,
        "quote": "입사 초반에는 MES 연동을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.28",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "양산 기술",
        "years": "8년차",
        "date": "2026.06.04",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 74,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 66,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 59,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 70,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "공정 개발 · Simulation Engineer"
  },
  {
    "companyCode": "D016",
    "companyName": "웨이퍼랩스",
    "people": 8,
    "insight": 23,
    "interviewed": "2026.07.16",
    "freshness": 90,
    "jobs": [
      {
        "name": "장비 제어",
        "people": 4,
        "fit": 71,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "C++ Engineer",
        "people": 2,
        "fit": 66,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "공정 개발",
        "people": 2,
        "fit": 59,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "장비 제어",
        "years": "2년차",
        "date": "2026.07.16",
        "current": true,
        "quote": "웨이퍼랩스의 장비 제어는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "C++ Engineer",
        "years": "4년차",
        "date": "2026.07.09",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.25",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.06.01",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 72,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 64,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 57,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 68,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "장비 제어 · C++ Engineer"
  },
  {
    "companyCode": "D017",
    "companyName": "소자플로우",
    "people": 4,
    "insight": 11,
    "interviewed": "2026.07.13",
    "freshness": 91,
    "jobs": [
      {
        "name": "공정 데이터",
        "people": 2,
        "fit": 57,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "Cloud Engineer",
        "people": 1,
        "fit": 52,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 45,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      }
    ],
    "insiders": [
      {
        "role": "공정 데이터",
        "years": "2년차",
        "date": "2026.07.13",
        "current": true,
        "quote": "소자플로우의 공정 데이터는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Cloud Engineer",
        "years": "4년차",
        "date": "2026.07.06",
        "current": true,
        "quote": "입사 초반에는 공정 데이터 분석을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.22",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.05.29",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 58,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 50,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 43,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 54,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "공정 데이터 · Cloud Engineer"
  },
  {
    "companyCode": "D018",
    "companyName": "실리콘포지",
    "people": 10,
    "insight": 29,
    "interviewed": "2026.07.09",
    "freshness": 92,
    "jobs": [
      {
        "name": "양산 기술",
        "people": 5,
        "fit": 69,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "Quality Analyst",
        "people": 3,
        "fit": 64,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "공정 개발",
        "people": 2,
        "fit": 57,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "양산 기술",
        "years": "2년차",
        "date": "2026.07.09",
        "current": true,
        "quote": "실리콘포지의 양산 기술는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Quality Analyst",
        "years": "4년차",
        "date": "2026.07.02",
        "current": true,
        "quote": "입사 초반에는 MES 연동을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.18",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.05.25",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 70,
        "note": "인터뷰 10건 중 7건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 62,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 55,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 66,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "양산 기술 · Quality Analyst"
  },
  {
    "companyCode": "D019",
    "companyName": "크리스탈웨이퍼",
    "people": 7,
    "insight": 21,
    "interviewed": "2026.07.06",
    "freshness": 93,
    "jobs": [
      {
        "name": "공정 개발",
        "people": 4,
        "fit": 76,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "Python Engineer",
        "people": 2,
        "fit": 71,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "양산 기술",
        "people": 1,
        "fit": 64,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "공정 개발",
        "years": "2년차",
        "date": "2026.07.06",
        "current": true,
        "quote": "크리스탈웨이퍼의 공정 개발는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Python Engineer",
        "years": "4년차",
        "date": "2026.06.29",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.15",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "양산 기술",
        "years": "8년차",
        "date": "2026.05.22",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 77,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 69,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 62,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 73,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "공정 개발 · Python Engineer"
  },
  {
    "companyCode": "D020",
    "companyName": "하이브다이",
    "people": 5,
    "insight": 13,
    "interviewed": "2026.06.30",
    "freshness": 94,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 3,
        "fit": 67,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "비전 검사",
        "people": 1,
        "fit": 62,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 55,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "2년차",
        "date": "2026.06.30",
        "current": true,
        "quote": "하이브다이의 AI Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "비전 검사",
        "years": "4년차",
        "date": "2026.06.23",
        "current": true,
        "quote": "입사 초반에는 공정 데이터 분석을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.09",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.05.16",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 68,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 60,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 53,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 64,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "AI Engineer · 비전 검사"
  },
  {
    "companyCode": "D021",
    "companyName": "메모리펄스",
    "people": 11,
    "insight": 32,
    "interviewed": "2026.06.24",
    "freshness": 95,
    "jobs": [
      {
        "name": "생산기술",
        "people": 5,
        "fit": 74,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "데이터 엔지니어",
        "people": 3,
        "fit": 69,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "공정 개발",
        "people": 3,
        "fit": 62,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "생산기술",
        "years": "2년차",
        "date": "2026.06.24",
        "current": true,
        "quote": "메모리펄스의 생산기술는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "데이터 엔지니어",
        "years": "4년차",
        "date": "2026.06.17",
        "current": true,
        "quote": "입사 초반에는 MES 연동을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.03",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.05.10",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 75,
        "note": "인터뷰 11건 중 8건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 67,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 60,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 71,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "생산기술 · 데이터 엔지니어"
  },
  {
    "companyCode": "D022",
    "companyName": "나노포커스",
    "people": 6,
    "insight": 17,
    "interviewed": "2026.06.17",
    "freshness": 96,
    "jobs": [
      {
        "name": "장비 SW",
        "people": 3,
        "fit": 62,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "IoT Engineer",
        "people": 1,
        "fit": 57,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "공정 개발",
        "people": 2,
        "fit": 50,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "장비 SW",
        "years": "2년차",
        "date": "2026.06.17",
        "current": true,
        "quote": "나노포커스의 장비 SW는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "IoT Engineer",
        "years": "4년차",
        "date": "2026.06.10",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.27",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.05.03",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 63,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 55,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 48,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 59,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "장비 SW · IoT Engineer"
  },
  {
    "companyCode": "D023",
    "companyName": "칩메이커스",
    "people": 8,
    "insight": 25,
    "interviewed": "2026.06.10",
    "freshness": 96,
    "jobs": [
      {
        "name": "공정 개발",
        "people": 4,
        "fit": 65,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "통계 Engineer",
        "people": 2,
        "fit": 60,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "양산 기술",
        "people": 2,
        "fit": 53,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      }
    ],
    "insiders": [
      {
        "role": "공정 개발",
        "years": "2년차",
        "date": "2026.06.10",
        "current": true,
        "quote": "칩메이커스의 공정 개발는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "통계 Engineer",
        "years": "4년차",
        "date": "2026.06.03",
        "current": true,
        "quote": "입사 초반에는 공정 데이터 분석을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.20",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "양산 기술",
        "years": "8년차",
        "date": "2026.04.26",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 66,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 58,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 51,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 62,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "공정 개발 · 통계 Engineer"
  },
  {
    "companyCode": "D024",
    "companyName": "다이노바",
    "people": 5,
    "insight": 14,
    "interviewed": "2026.05.28",
    "freshness": 90,
    "jobs": [
      {
        "name": "양산 기술",
        "people": 3,
        "fit": 60,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      },
      {
        "name": "MES Engineer",
        "people": 1,
        "fit": 55,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 48,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "양산 기술",
        "years": "2년차",
        "date": "2026.05.28",
        "current": true,
        "quote": "다이노바의 양산 기술는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "MES Engineer",
        "years": "4년차",
        "date": "2026.05.21",
        "current": true,
        "quote": "입사 초반에는 MES 연동을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.07",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2026.04.13",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 61,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 53,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 46,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 57,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "양산 기술 · MES Engineer"
  },
  {
    "companyCode": "D025",
    "companyName": "포토닉스랩",
    "people": 4,
    "insight": 10,
    "interviewed": "2025.12.12",
    "freshness": 66,
    "jobs": [
      {
        "name": "소자 개발",
        "people": 2,
        "fit": 55,
        "need": [
          "MES 연동",
          "통계적 공정 관리",
          "현장 문제 해결"
        ]
      },
      {
        "name": "Optics Engineer",
        "people": 1,
        "fit": 50,
        "need": [
          "C++",
          "장비 제어",
          "로그 분석"
        ]
      },
      {
        "name": "공정 개발",
        "people": 1,
        "fit": 43,
        "need": [
          "공정 데이터 분석",
          "Python",
          "수율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "소자 개발",
        "years": "2년차",
        "date": "2025.12.12",
        "current": true,
        "quote": "포토닉스랩의 소자 개발는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Optics Engineer",
        "years": "4년차",
        "date": "2025.12.05",
        "current": true,
        "quote": "입사 초반에는 C++을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2025.11.21",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "공정 개발",
        "years": "8년차",
        "date": "2025.10.28",
        "current": false,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 56,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 48,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "현장 온보딩",
        "value": 41,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 52,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "소자 개발 · Optics Engineer"
  },
  {
    "companyCode": "D026",
    "companyName": "클라우드포지",
    "people": 14,
    "insight": 40,
    "interviewed": "2026.08.30",
    "freshness": 92,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 7,
        "fit": 93,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Cloud",
        "people": 4,
        "fit": 88,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Data Engineer",
        "people": 3,
        "fit": 81,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.08.30",
        "current": true,
        "quote": "클라우드포지의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Cloud",
        "years": "4년차",
        "date": "2026.08.23",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.09",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Data Engineer",
        "years": "8년차",
        "date": "2026.07.16",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 94,
        "note": "인터뷰 14건 중 10건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 86,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 79,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 90,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Cloud"
  },
  {
    "companyCode": "D027",
    "companyName": "브릿지웍스",
    "people": 10,
    "insight": 29,
    "interviewed": "2026.08.28",
    "freshness": 93,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 5,
        "fit": 89,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "MLOps",
        "people": 3,
        "fit": 84,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 77,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "2년차",
        "date": "2026.08.28",
        "current": true,
        "quote": "브릿지웍스의 AI Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "MLOps",
        "years": "4년차",
        "date": "2026.08.21",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.07",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.14",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 90,
        "note": "인터뷰 10건 중 7건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 82,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 75,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 86,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "AI Engineer · MLOps"
  },
  {
    "companyCode": "D028",
    "companyName": "루멘소프트",
    "people": 9,
    "insight": 26,
    "interviewed": "2026.08.26",
    "freshness": 94,
    "jobs": [
      {
        "name": "Frontend Engineer",
        "people": 5,
        "fit": 85,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "React",
        "people": 2,
        "fit": 80,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 73,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Frontend Engineer",
        "years": "2년차",
        "date": "2026.08.26",
        "current": true,
        "quote": "루멘소프트의 Frontend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "React",
        "years": "4년차",
        "date": "2026.08.19",
        "current": true,
        "quote": "입사 초반에는 Kubernetes을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.05",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.12",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 86,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 78,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 71,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 82,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Frontend Engineer · React"
  },
  {
    "companyCode": "D029",
    "companyName": "데이터캐노피",
    "people": 12,
    "insight": 34,
    "interviewed": "2026.08.23",
    "freshness": 95,
    "jobs": [
      {
        "name": "Data Engineer",
        "people": 6,
        "fit": 81,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Platform",
        "people": 3,
        "fit": 76,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 3,
        "fit": 69,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Engineer",
        "years": "2년차",
        "date": "2026.08.23",
        "current": true,
        "quote": "데이터캐노피의 Data Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Platform",
        "years": "4년차",
        "date": "2026.08.16",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.02",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.09",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 82,
        "note": "인터뷰 12건 중 8건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 74,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 67,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 78,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Engineer · Platform"
  },
  {
    "companyCode": "D030",
    "companyName": "스택하버",
    "people": 8,
    "insight": 23,
    "interviewed": "2026.08.21",
    "freshness": 96,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 4,
        "fit": 79,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Java",
        "people": 2,
        "fit": 74,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Data Engineer",
        "people": 2,
        "fit": 67,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.08.21",
        "current": true,
        "quote": "스택하버의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Java",
        "years": "4년차",
        "date": "2026.08.14",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.31",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Data Engineer",
        "years": "8년차",
        "date": "2026.07.07",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 80,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 72,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 65,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 76,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Java"
  },
  {
    "companyCode": "D031",
    "companyName": "플로우코드",
    "people": 7,
    "insight": 21,
    "interviewed": "2026.08.19",
    "freshness": 96,
    "jobs": [
      {
        "name": "Full-stack Engineer",
        "people": 4,
        "fit": 77,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "TypeScript",
        "people": 2,
        "fit": 72,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 65,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Full-stack Engineer",
        "years": "2년차",
        "date": "2026.08.19",
        "current": true,
        "quote": "플로우코드의 Full-stack Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "TypeScript",
        "years": "4년차",
        "date": "2026.08.12",
        "current": true,
        "quote": "입사 초반에는 Kubernetes을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.29",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.05",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 78,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 70,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 63,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 74,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Full-stack Engineer · TypeScript"
  },
  {
    "companyCode": "D032",
    "companyName": "모노클라우드",
    "people": 11,
    "insight": 30,
    "interviewed": "2026.08.16",
    "freshness": 90,
    "jobs": [
      {
        "name": "Cloud Engineer",
        "people": 5,
        "fit": 88,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Kubernetes",
        "people": 3,
        "fit": 83,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 3,
        "fit": 76,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Cloud Engineer",
        "years": "2년차",
        "date": "2026.08.16",
        "current": true,
        "quote": "모노클라우드의 Cloud Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Kubernetes",
        "years": "4년차",
        "date": "2026.08.09",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.26",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.02",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 89,
        "note": "인터뷰 11건 중 8건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 81,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 74,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 85,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Cloud Engineer · Kubernetes"
  },
  {
    "companyCode": "D033",
    "companyName": "큐브스택",
    "people": 6,
    "insight": 17,
    "interviewed": "2026.08.13",
    "freshness": 91,
    "jobs": [
      {
        "name": "DevOps Engineer",
        "people": 3,
        "fit": 74,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "AWS",
        "people": 1,
        "fit": 69,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 62,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "DevOps Engineer",
        "years": "2년차",
        "date": "2026.08.13",
        "current": true,
        "quote": "큐브스택의 DevOps Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "AWS",
        "years": "4년차",
        "date": "2026.08.06",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.23",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.29",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 75,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 67,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 60,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 71,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "DevOps Engineer · AWS"
  },
  {
    "companyCode": "D034",
    "companyName": "코어링크",
    "people": 13,
    "insight": 37,
    "interviewed": "2026.08.11",
    "freshness": 92,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 6,
        "fit": 83,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "API",
        "people": 3,
        "fit": 78,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Data Engineer",
        "people": 4,
        "fit": 71,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.08.11",
        "current": true,
        "quote": "코어링크의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "API",
        "years": "4년차",
        "date": "2026.08.04",
        "current": true,
        "quote": "입사 초반에는 Kubernetes을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.21",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Data Engineer",
        "years": "8년차",
        "date": "2026.06.27",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 84,
        "note": "인터뷰 13건 중 9건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 76,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 69,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 80,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · API"
  },
  {
    "companyCode": "D035",
    "companyName": "스파크온",
    "people": 8,
    "insight": 25,
    "interviewed": "2026.08.08",
    "freshness": 93,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 4,
        "fit": 80,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "RAG",
        "people": 2,
        "fit": 75,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 68,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "2년차",
        "date": "2026.08.08",
        "current": true,
        "quote": "스파크온의 AI Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "RAG",
        "years": "4년차",
        "date": "2026.08.01",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.18",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.24",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 81,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 73,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 66,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 77,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "AI Engineer · RAG"
  },
  {
    "companyCode": "D036",
    "companyName": "그로스웨이브",
    "people": 5,
    "insight": 15,
    "interviewed": "2026.08.05",
    "freshness": 94,
    "jobs": [
      {
        "name": "Data Analyst",
        "people": 3,
        "fit": 68,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Experiment",
        "people": 1,
        "fit": 63,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 56,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Analyst",
        "years": "2년차",
        "date": "2026.08.05",
        "current": true,
        "quote": "그로스웨이브의 Data Analyst는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Experiment",
        "years": "4년차",
        "date": "2026.07.29",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.15",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.21",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 69,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 61,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 54,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 65,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Analyst · Experiment"
  },
  {
    "companyCode": "D037",
    "companyName": "네오파이프",
    "people": 9,
    "insight": 27,
    "interviewed": "2026.08.02",
    "freshness": 95,
    "jobs": [
      {
        "name": "Platform Engineer",
        "people": 5,
        "fit": 72,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Go",
        "people": 2,
        "fit": 67,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 60,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Platform Engineer",
        "years": "2년차",
        "date": "2026.08.02",
        "current": true,
        "quote": "네오파이프의 Platform Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Go",
        "years": "4년차",
        "date": "2026.07.26",
        "current": true,
        "quote": "입사 초반에는 Kubernetes을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.12",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.18",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 73,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 65,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 58,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 69,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Platform Engineer · Go"
  },
  {
    "companyCode": "D038",
    "companyName": "코드브릭",
    "people": 7,
    "insight": 20,
    "interviewed": "2026.07.30",
    "freshness": 96,
    "jobs": [
      {
        "name": "Security Engineer",
        "people": 4,
        "fit": 69,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Backend",
        "people": 2,
        "fit": 64,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 57,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Security Engineer",
        "years": "2년차",
        "date": "2026.07.30",
        "current": true,
        "quote": "코드브릭의 Security Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Backend",
        "years": "4년차",
        "date": "2026.07.23",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.09",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.15",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 70,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 62,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 55,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 66,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Security Engineer · Backend"
  },
  {
    "companyCode": "D039",
    "companyName": "오픈메트릭",
    "people": 10,
    "insight": 28,
    "interviewed": "2026.07.27",
    "freshness": 96,
    "jobs": [
      {
        "name": "Data Engineer",
        "people": 5,
        "fit": 75,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Airflow",
        "people": 3,
        "fit": 70,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 63,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Engineer",
        "years": "2년차",
        "date": "2026.07.27",
        "current": true,
        "quote": "오픈메트릭의 Data Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Airflow",
        "years": "4년차",
        "date": "2026.07.20",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.06",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.12",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 76,
        "note": "인터뷰 10건 중 7건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 68,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 61,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 72,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Engineer · Airflow"
  },
  {
    "companyCode": "D040",
    "companyName": "프리즘테크",
    "people": 6,
    "insight": 18,
    "interviewed": "2026.07.24",
    "freshness": 90,
    "jobs": [
      {
        "name": "Frontend Engineer",
        "people": 3,
        "fit": 71,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Vue",
        "people": 1,
        "fit": 66,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 59,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Frontend Engineer",
        "years": "2년차",
        "date": "2026.07.24",
        "current": true,
        "quote": "프리즘테크의 Frontend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Vue",
        "years": "4년차",
        "date": "2026.07.17",
        "current": true,
        "quote": "입사 초반에는 Kubernetes을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.03",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.09",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 72,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 64,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 57,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 68,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Frontend Engineer · Vue"
  },
  {
    "companyCode": "D041",
    "companyName": "비트포레스트",
    "people": 8,
    "insight": 24,
    "interviewed": "2026.07.20",
    "freshness": 91,
    "jobs": [
      {
        "name": "ML Engineer",
        "people": 4,
        "fit": 86,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Recommendation",
        "people": 2,
        "fit": 81,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 74,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "ML Engineer",
        "years": "2년차",
        "date": "2026.07.20",
        "current": true,
        "quote": "비트포레스트의 ML Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Recommendation",
        "years": "4년차",
        "date": "2026.07.13",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.29",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.05",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 87,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 79,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 72,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 83,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "ML Engineer · Recommendation"
  },
  {
    "companyCode": "D042",
    "companyName": "넥스트큐",
    "people": 12,
    "insight": 33,
    "interviewed": "2026.07.17",
    "freshness": 92,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 6,
        "fit": 78,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Kotlin",
        "people": 3,
        "fit": 73,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Data Engineer",
        "people": 3,
        "fit": 66,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.07.17",
        "current": true,
        "quote": "넥스트큐의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Kotlin",
        "years": "4년차",
        "date": "2026.07.10",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.26",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Data Engineer",
        "years": "8년차",
        "date": "2026.06.02",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 79,
        "note": "인터뷰 12건 중 8건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 71,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 64,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 75,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Kotlin"
  },
  {
    "companyCode": "D043",
    "companyName": "스위프트랩",
    "people": 5,
    "insight": 14,
    "interviewed": "2026.07.14",
    "freshness": 93,
    "jobs": [
      {
        "name": "SRE",
        "people": 3,
        "fit": 64,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Observability",
        "people": 1,
        "fit": 59,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 52,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      }
    ],
    "insiders": [
      {
        "role": "SRE",
        "years": "2년차",
        "date": "2026.07.14",
        "current": true,
        "quote": "스위프트랩의 SRE는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Observability",
        "years": "4년차",
        "date": "2026.07.07",
        "current": true,
        "quote": "입사 초반에는 Kubernetes을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.23",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.30",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 65,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 57,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 50,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 61,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "SRE · Observability"
  },
  {
    "companyCode": "D044",
    "companyName": "에이펙스데이터",
    "people": 7,
    "insight": 19,
    "interviewed": "2026.07.10",
    "freshness": 94,
    "jobs": [
      {
        "name": "Data Analyst",
        "people": 4,
        "fit": 67,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "SQL",
        "people": 2,
        "fit": 62,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 55,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Analyst",
        "years": "2년차",
        "date": "2026.07.10",
        "current": true,
        "quote": "에이펙스데이터의 Data Analyst는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "SQL",
        "years": "4년차",
        "date": "2026.07.03",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.19",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.26",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 68,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 60,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 53,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 64,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Analyst · SQL"
  },
  {
    "companyCode": "D045",
    "companyName": "인사이트웍스",
    "people": 9,
    "insight": 26,
    "interviewed": "2026.07.07",
    "freshness": 95,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 5,
        "fit": 82,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "NLP",
        "people": 2,
        "fit": 77,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 70,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "2년차",
        "date": "2026.07.07",
        "current": true,
        "quote": "인사이트웍스의 AI Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "NLP",
        "years": "4년차",
        "date": "2026.06.30",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.16",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.23",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 83,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 75,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 68,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 79,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "AI Engineer · NLP"
  },
  {
    "companyCode": "D046",
    "companyName": "패킷랩",
    "people": 4,
    "insight": 12,
    "interviewed": "2026.06.29",
    "freshness": 96,
    "jobs": [
      {
        "name": "Network Engineer",
        "people": 2,
        "fit": 60,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Cloud",
        "people": 1,
        "fit": 55,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 48,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Network Engineer",
        "years": "2년차",
        "date": "2026.06.29",
        "current": true,
        "quote": "패킷랩의 Network Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Cloud",
        "years": "4년차",
        "date": "2026.06.22",
        "current": true,
        "quote": "입사 초반에는 Kubernetes을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.08",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.15",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 61,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 53,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 46,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 57,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Network Engineer · Cloud"
  },
  {
    "companyCode": "D047",
    "companyName": "테크노트",
    "people": 8,
    "insight": 22,
    "interviewed": "2026.06.22",
    "freshness": 96,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 4,
        "fit": 73,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Spring",
        "people": 2,
        "fit": 68,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Data Engineer",
        "people": 2,
        "fit": 61,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.06.22",
        "current": true,
        "quote": "테크노트의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Spring",
        "years": "4년차",
        "date": "2026.06.15",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.01",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Data Engineer",
        "years": "8년차",
        "date": "2026.05.08",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 74,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 66,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 59,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 70,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Spring"
  },
  {
    "companyCode": "D048",
    "companyName": "솔리드웨어",
    "people": 6,
    "insight": 16,
    "interviewed": "2026.06.15",
    "freshness": 90,
    "jobs": [
      {
        "name": "QA Engineer",
        "people": 3,
        "fit": 65,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Automation",
        "people": 1,
        "fit": 60,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 53,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "QA Engineer",
        "years": "2년차",
        "date": "2026.06.15",
        "current": true,
        "quote": "솔리드웨어의 QA Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Automation",
        "years": "4년차",
        "date": "2026.06.08",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.25",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.01",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 66,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 58,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 51,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 62,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "QA Engineer · Automation"
  },
  {
    "companyCode": "D049",
    "companyName": "링크메이커",
    "people": 5,
    "insight": 13,
    "interviewed": "2026.05.21",
    "freshness": 91,
    "jobs": [
      {
        "name": "Product Manager",
        "people": 3,
        "fit": 58,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      },
      {
        "name": "B2B",
        "people": 1,
        "fit": 53,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 46,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Product Manager",
        "years": "2년차",
        "date": "2026.05.21",
        "current": true,
        "quote": "링크메이커의 Product Manager는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "B2B",
        "years": "4년차",
        "date": "2026.05.14",
        "current": true,
        "quote": "입사 초반에는 Kubernetes을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.04.30",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.04.06",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 59,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 51,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 44,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 55,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Product Manager · B2B"
  },
  {
    "companyCode": "D050",
    "companyName": "스페이스오브",
    "people": 7,
    "insight": 20,
    "interviewed": "2025.11.14",
    "freshness": 67,
    "jobs": [
      {
        "name": "MLOps Engineer",
        "people": 4,
        "fit": 70,
        "need": [
          "Kubernetes",
          "CI/CD",
          "장애 대응"
        ]
      },
      {
        "name": "Kubernetes",
        "people": 2,
        "fit": 65,
        "need": [
          "API 설계",
          "Java · Spring",
          "테스트 자동화"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 58,
        "need": [
          "SQL",
          "Airflow",
          "데이터 품질 관리"
        ]
      }
    ],
    "insiders": [
      {
        "role": "MLOps Engineer",
        "years": "2년차",
        "date": "2025.11.14",
        "current": true,
        "quote": "스페이스오브의 MLOps Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Kubernetes",
        "years": "4년차",
        "date": "2025.11.07",
        "current": true,
        "quote": "입사 초반에는 API 설계을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2025.10.24",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2025.09.30",
        "current": false,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "문서 기반 협업",
        "value": 71,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 63,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 56,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "기술 공유",
        "value": 67,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "MLOps Engineer · Kubernetes"
  },
  {
    "companyCode": "D051",
    "companyName": "픽앤플로우",
    "people": 10,
    "insight": 28,
    "interviewed": "2026.08.31",
    "freshness": 93,
    "jobs": [
      {
        "name": "Product Designer",
        "people": 5,
        "fit": 91,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "UX",
        "people": 3,
        "fit": 86,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Data Analyst",
        "people": 2,
        "fit": 79,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Product Designer",
        "years": "2년차",
        "date": "2026.08.31",
        "current": true,
        "quote": "픽앤플로우의 Product Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "UX",
        "years": "4년차",
        "date": "2026.08.24",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.10",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Data Analyst",
        "years": "8년차",
        "date": "2026.07.17",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 92,
        "note": "인터뷰 10건 중 7건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 84,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 77,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 88,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Product Designer · UX"
  },
  {
    "companyCode": "D052",
    "companyName": "마켓브리즈",
    "people": 8,
    "insight": 24,
    "interviewed": "2026.08.29",
    "freshness": 94,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 4,
        "fit": 84,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Commerce",
        "people": 2,
        "fit": 79,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 72,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.08.29",
        "current": true,
        "quote": "마켓브리즈의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Commerce",
        "years": "4년차",
        "date": "2026.08.22",
        "current": true,
        "quote": "입사 초반에는 트래픽 대응을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.08",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.07.15",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 85,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 77,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 70,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 81,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Commerce"
  },
  {
    "companyCode": "D053",
    "companyName": "데일리픽",
    "people": 7,
    "insight": 20,
    "interviewed": "2026.08.27",
    "freshness": 95,
    "jobs": [
      {
        "name": "Data Analyst",
        "people": 4,
        "fit": 79,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Growth",
        "people": 2,
        "fit": 74,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 67,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Analyst",
        "years": "2년차",
        "date": "2026.08.27",
        "current": true,
        "quote": "데일리픽의 Data Analyst는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Growth",
        "years": "4년차",
        "date": "2026.08.20",
        "current": true,
        "quote": "입사 초반에는 사용자 리서치을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.06",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.07.13",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 80,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 72,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 65,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 76,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Analyst · Growth"
  },
  {
    "companyCode": "D054",
    "companyName": "오브젝트룸",
    "people": 6,
    "insight": 17,
    "interviewed": "2026.08.24",
    "freshness": 96,
    "jobs": [
      {
        "name": "Service Designer",
        "people": 3,
        "fit": 76,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "UX Research",
        "people": 1,
        "fit": 71,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 64,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Service Designer",
        "years": "2년차",
        "date": "2026.08.24",
        "current": true,
        "quote": "오브젝트룸의 Service Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "UX Research",
        "years": "4년차",
        "date": "2026.08.17",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.03",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.07.10",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 77,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 69,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 62,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 73,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Service Designer · UX Research"
  },
  {
    "companyCode": "D055",
    "companyName": "포켓플랜",
    "people": 9,
    "insight": 25,
    "interviewed": "2026.08.22",
    "freshness": 96,
    "jobs": [
      {
        "name": "Frontend Engineer",
        "people": 5,
        "fit": 73,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "React",
        "people": 2,
        "fit": 68,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 61,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Frontend Engineer",
        "years": "2년차",
        "date": "2026.08.22",
        "current": true,
        "quote": "포켓플랜의 Frontend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "React",
        "years": "4년차",
        "date": "2026.08.15",
        "current": true,
        "quote": "입사 초반에는 트래픽 대응을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.01",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.07.08",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 74,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 66,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 59,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 70,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Frontend Engineer · React"
  },
  {
    "companyCode": "D056",
    "companyName": "테이블온",
    "people": 5,
    "insight": 14,
    "interviewed": "2026.08.20",
    "freshness": 90,
    "jobs": [
      {
        "name": "Product Manager",
        "people": 3,
        "fit": 69,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Platform",
        "people": 1,
        "fit": 64,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 57,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Product Manager",
        "years": "2년차",
        "date": "2026.08.20",
        "current": true,
        "quote": "테이블온의 Product Manager는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Platform",
        "years": "4년차",
        "date": "2026.08.13",
        "current": true,
        "quote": "입사 초반에는 사용자 리서치을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.30",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.07.06",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 70,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 62,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 55,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 66,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Product Manager · Platform"
  },
  {
    "companyCode": "D057",
    "companyName": "리빙메이트",
    "people": 8,
    "insight": 22,
    "interviewed": "2026.08.18",
    "freshness": 91,
    "jobs": [
      {
        "name": "UX Designer",
        "people": 4,
        "fit": 71,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Mobile",
        "people": 2,
        "fit": 66,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 59,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "UX Designer",
        "years": "2년차",
        "date": "2026.08.18",
        "current": true,
        "quote": "리빙메이트의 UX Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Mobile",
        "years": "4년차",
        "date": "2026.08.11",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.28",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.07.04",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 72,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 64,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 57,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 68,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "UX Designer · Mobile"
  },
  {
    "companyCode": "D058",
    "companyName": "모먼트샵",
    "people": 4,
    "insight": 11,
    "interviewed": "2026.08.15",
    "freshness": 92,
    "jobs": [
      {
        "name": "Brand Designer",
        "people": 2,
        "fit": 63,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Commerce",
        "people": 1,
        "fit": 58,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 51,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Brand Designer",
        "years": "2년차",
        "date": "2026.08.15",
        "current": true,
        "quote": "모먼트샵의 Brand Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Commerce",
        "years": "4년차",
        "date": "2026.08.08",
        "current": true,
        "quote": "입사 초반에는 트래픽 대응을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.25",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.07.01",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 64,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 56,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 49,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 60,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Brand Designer · Commerce"
  },
  {
    "companyCode": "D059",
    "companyName": "셀렉트웨이",
    "people": 11,
    "insight": 31,
    "interviewed": "2026.08.12",
    "freshness": 93,
    "jobs": [
      {
        "name": "Data Engineer",
        "people": 5,
        "fit": 87,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Recommendation",
        "people": 3,
        "fit": 82,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Product Designer",
        "people": 3,
        "fit": 75,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Engineer",
        "years": "2년차",
        "date": "2026.08.12",
        "current": true,
        "quote": "셀렉트웨이의 Data Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Recommendation",
        "years": "4년차",
        "date": "2026.08.05",
        "current": true,
        "quote": "입사 초반에는 사용자 리서치을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.22",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.06.28",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 88,
        "note": "인터뷰 11건 중 8건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 80,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 73,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 84,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Engineer · Recommendation"
  },
  {
    "companyCode": "D060",
    "companyName": "온더바스켓",
    "people": 7,
    "insight": 19,
    "interviewed": "2026.08.09",
    "freshness": 94,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 4,
        "fit": 74,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Java",
        "people": 2,
        "fit": 69,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 62,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.08.09",
        "current": true,
        "quote": "온더바스켓의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Java",
        "years": "4년차",
        "date": "2026.08.02",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.19",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.06.25",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 75,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 67,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 60,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 71,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Java"
  },
  {
    "companyCode": "D061",
    "companyName": "스타일포트",
    "people": 9,
    "insight": 27,
    "interviewed": "2026.08.06",
    "freshness": 95,
    "jobs": [
      {
        "name": "Product Designer",
        "people": 5,
        "fit": 82,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Design System",
        "people": 2,
        "fit": 77,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Data Analyst",
        "people": 2,
        "fit": 70,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Product Designer",
        "years": "2년차",
        "date": "2026.08.06",
        "current": true,
        "quote": "스타일포트의 Product Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Design System",
        "years": "4년차",
        "date": "2026.07.30",
        "current": true,
        "quote": "입사 초반에는 트래픽 대응을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.16",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Data Analyst",
        "years": "8년차",
        "date": "2026.06.22",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 83,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 75,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 68,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 79,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Product Designer · Design System"
  },
  {
    "companyCode": "D062",
    "companyName": "플레이트랩",
    "people": 6,
    "insight": 16,
    "interviewed": "2026.08.03",
    "freshness": 96,
    "jobs": [
      {
        "name": "Data Analyst",
        "people": 3,
        "fit": 66,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "SQL",
        "people": 1,
        "fit": 61,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 54,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Analyst",
        "years": "2년차",
        "date": "2026.08.03",
        "current": true,
        "quote": "플레이트랩의 Data Analyst는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "SQL",
        "years": "4년차",
        "date": "2026.07.27",
        "current": true,
        "quote": "입사 초반에는 사용자 리서치을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.13",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.06.19",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 67,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 59,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 52,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 63,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Analyst · SQL"
  },
  {
    "companyCode": "D063",
    "companyName": "마일드마켓",
    "people": 5,
    "insight": 13,
    "interviewed": "2026.07.31",
    "freshness": 96,
    "jobs": [
      {
        "name": "Service Designer",
        "people": 3,
        "fit": 61,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "CX",
        "people": 1,
        "fit": 56,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 49,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Service Designer",
        "years": "2년차",
        "date": "2026.07.31",
        "current": true,
        "quote": "마일드마켓의 Service Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "CX",
        "years": "4년차",
        "date": "2026.07.24",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.10",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.06.16",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 62,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 54,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 47,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 58,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Service Designer · CX"
  },
  {
    "companyCode": "D064",
    "companyName": "카트웨이브",
    "people": 8,
    "insight": 23,
    "interviewed": "2026.07.28",
    "freshness": 90,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 4,
        "fit": 80,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Search",
        "people": 2,
        "fit": 75,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 68,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "2년차",
        "date": "2026.07.28",
        "current": true,
        "quote": "카트웨이브의 AI Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Search",
        "years": "4년차",
        "date": "2026.07.21",
        "current": true,
        "quote": "입사 초반에는 트래픽 대응을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.07",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.06.13",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 81,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 73,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 66,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 77,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "AI Engineer · Search"
  },
  {
    "companyCode": "D065",
    "companyName": "홈픽셀",
    "people": 4,
    "insight": 10,
    "interviewed": "2026.07.25",
    "freshness": 91,
    "jobs": [
      {
        "name": "UX Researcher",
        "people": 2,
        "fit": 57,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Product",
        "people": 1,
        "fit": 52,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 45,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "UX Researcher",
        "years": "2년차",
        "date": "2026.07.25",
        "current": true,
        "quote": "홈픽셀의 UX Researcher는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Product",
        "years": "4년차",
        "date": "2026.07.18",
        "current": true,
        "quote": "입사 초반에는 사용자 리서치을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.04",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.06.10",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 58,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 50,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 43,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 54,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "UX Researcher · Product"
  },
  {
    "companyCode": "D066",
    "companyName": "그린바스켓",
    "people": 7,
    "insight": 18,
    "interviewed": "2026.07.21",
    "freshness": 92,
    "jobs": [
      {
        "name": "Full-stack Engineer",
        "people": 4,
        "fit": 68,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Node.js",
        "people": 2,
        "fit": 63,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 56,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Full-stack Engineer",
        "years": "2년차",
        "date": "2026.07.21",
        "current": true,
        "quote": "그린바스켓의 Full-stack Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Node.js",
        "years": "4년차",
        "date": "2026.07.14",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.30",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.06.06",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 69,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 61,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 54,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 65,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Full-stack Engineer · Node.js"
  },
  {
    "companyCode": "D067",
    "companyName": "큐레이션랩",
    "people": 6,
    "insight": 15,
    "interviewed": "2026.07.18",
    "freshness": 93,
    "jobs": [
      {
        "name": "Content Designer",
        "people": 3,
        "fit": 64,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "UX Writing",
        "people": 1,
        "fit": 59,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 52,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Content Designer",
        "years": "2년차",
        "date": "2026.07.18",
        "current": true,
        "quote": "큐레이션랩의 Content Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "UX Writing",
        "years": "4년차",
        "date": "2026.07.11",
        "current": true,
        "quote": "입사 초반에는 트래픽 대응을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.27",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.06.03",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 65,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 57,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 50,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 61,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Content Designer · UX Writing"
  },
  {
    "companyCode": "D068",
    "companyName": "딜라이트몰",
    "people": 10,
    "insight": 29,
    "interviewed": "2026.07.15",
    "freshness": 94,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 5,
        "fit": 77,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Payments",
        "people": 3,
        "fit": 72,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 65,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.07.15",
        "current": true,
        "quote": "딜라이트몰의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Payments",
        "years": "4년차",
        "date": "2026.07.08",
        "current": true,
        "quote": "입사 초반에는 사용자 리서치을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.24",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.05.31",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 78,
        "note": "인터뷰 10건 중 7건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 70,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 63,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 74,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Payments"
  },
  {
    "companyCode": "D069",
    "companyName": "버티컬픽",
    "people": 5,
    "insight": 12,
    "interviewed": "2026.07.11",
    "freshness": 95,
    "jobs": [
      {
        "name": "Product Manager",
        "people": 3,
        "fit": 70,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Data",
        "people": 1,
        "fit": 65,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 58,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Product Manager",
        "years": "2년차",
        "date": "2026.07.11",
        "current": true,
        "quote": "버티컬픽의 Product Manager는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Data",
        "years": "4년차",
        "date": "2026.07.04",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.20",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.05.27",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 71,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 63,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 56,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 67,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Product Manager · Data"
  },
  {
    "companyCode": "D070",
    "companyName": "포레스트웨어",
    "people": 8,
    "insight": 21,
    "interviewed": "2026.07.08",
    "freshness": 96,
    "jobs": [
      {
        "name": "Frontend Engineer",
        "people": 4,
        "fit": 75,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "TypeScript",
        "people": 2,
        "fit": 70,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 63,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Frontend Engineer",
        "years": "2년차",
        "date": "2026.07.08",
        "current": true,
        "quote": "포레스트웨어의 Frontend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "TypeScript",
        "years": "4년차",
        "date": "2026.07.01",
        "current": true,
        "quote": "입사 초반에는 트래픽 대응을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.17",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.05.24",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 76,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 68,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 61,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 72,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Frontend Engineer · TypeScript"
  },
  {
    "companyCode": "D071",
    "companyName": "리테일노바",
    "people": 9,
    "insight": 26,
    "interviewed": "2026.07.04",
    "freshness": 96,
    "jobs": [
      {
        "name": "ML Engineer",
        "people": 5,
        "fit": 83,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Personalization",
        "people": 2,
        "fit": 78,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 71,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "ML Engineer",
        "years": "2년차",
        "date": "2026.07.04",
        "current": true,
        "quote": "리테일노바의 ML Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Personalization",
        "years": "4년차",
        "date": "2026.06.27",
        "current": true,
        "quote": "입사 초반에는 사용자 리서치을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.13",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.05.20",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 84,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 76,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 69,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 80,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "ML Engineer · Personalization"
  },
  {
    "companyCode": "D072",
    "companyName": "스토어메트릭",
    "people": 6,
    "insight": 17,
    "interviewed": "2026.06.27",
    "freshness": 90,
    "jobs": [
      {
        "name": "Data Engineer",
        "people": 3,
        "fit": 72,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Analytics",
        "people": 1,
        "fit": 67,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Product Designer",
        "people": 2,
        "fit": 60,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Engineer",
        "years": "2년차",
        "date": "2026.06.27",
        "current": true,
        "quote": "스토어메트릭의 Data Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Analytics",
        "years": "4년차",
        "date": "2026.06.20",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.06",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.05.13",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 73,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 65,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 58,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 69,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Engineer · Analytics"
  },
  {
    "companyCode": "D073",
    "companyName": "브랜드픽",
    "people": 5,
    "insight": 14,
    "interviewed": "2026.06.20",
    "freshness": 91,
    "jobs": [
      {
        "name": "Brand Designer",
        "people": 3,
        "fit": 59,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Visual",
        "people": 1,
        "fit": 54,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 47,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Brand Designer",
        "years": "2년차",
        "date": "2026.06.20",
        "current": true,
        "quote": "브랜드픽의 Brand Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Visual",
        "years": "4년차",
        "date": "2026.06.13",
        "current": true,
        "quote": "입사 초반에는 트래픽 대응을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.30",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.05.06",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 60,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 52,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 45,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 56,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Brand Designer · Visual"
  },
  {
    "companyCode": "D074",
    "companyName": "오더브릿지",
    "people": 7,
    "insight": 19,
    "interviewed": "2026.06.13",
    "freshness": 92,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 4,
        "fit": 67,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      },
      {
        "name": "Logistics",
        "people": 2,
        "fit": 62,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 55,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.06.13",
        "current": true,
        "quote": "오더브릿지의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Logistics",
        "years": "4년차",
        "date": "2026.06.06",
        "current": true,
        "quote": "입사 초반에는 사용자 리서치을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.23",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2026.04.29",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 68,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 60,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 53,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 64,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Logistics"
  },
  {
    "companyCode": "D075",
    "companyName": "라이프캐비닛",
    "people": 4,
    "insight": 9,
    "interviewed": "2025.12.05",
    "freshness": 68,
    "jobs": [
      {
        "name": "Service Designer",
        "people": 2,
        "fit": 54,
        "need": [
          "사용자 리서치",
          "Figma",
          "전환율 개선 사례"
        ]
      },
      {
        "name": "CX",
        "people": 1,
        "fit": 49,
        "need": [
          "SQL",
          "A/B 테스트",
          "퍼널 분석"
        ]
      },
      {
        "name": "Product Designer",
        "people": 1,
        "fit": 42,
        "need": [
          "트래픽 대응",
          "결제 도메인",
          "모니터링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Service Designer",
        "years": "2년차",
        "date": "2025.12.05",
        "current": true,
        "quote": "라이프캐비닛의 Service Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "CX",
        "years": "4년차",
        "date": "2025.11.28",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2025.11.14",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Product Designer",
        "years": "8년차",
        "date": "2025.10.21",
        "current": false,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "고객 문제 중심",
        "value": 55,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "실험 · 배포 속도",
        "value": 47,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 40,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "직무 간 협업",
        "value": 51,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Service Designer · CX"
  },
  {
    "companyCode": "D076",
    "companyName": "핀브릿지",
    "people": 13,
    "insight": 38,
    "interviewed": "2026.08.30",
    "freshness": 94,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 6,
        "fit": 94,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Payments",
        "people": 3,
        "fit": 89,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "ML Engineer",
        "people": 4,
        "fit": 82,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.08.30",
        "current": true,
        "quote": "핀브릿지의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Payments",
        "years": "4년차",
        "date": "2026.08.23",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.09",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "ML Engineer",
        "years": "8년차",
        "date": "2026.07.16",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 95,
        "note": "인터뷰 13건 중 9건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 87,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 80,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 91,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Payments"
  },
  {
    "companyCode": "D077",
    "companyName": "머니웨이브",
    "people": 10,
    "insight": 30,
    "interviewed": "2026.08.28",
    "freshness": 95,
    "jobs": [
      {
        "name": "ML Engineer",
        "people": 5,
        "fit": 89,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Credit",
        "people": 3,
        "fit": 84,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 77,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "ML Engineer",
        "years": "2년차",
        "date": "2026.08.28",
        "current": true,
        "quote": "머니웨이브의 ML Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Credit",
        "years": "4년차",
        "date": "2026.08.21",
        "current": true,
        "quote": "입사 초반에는 거래 API을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.07",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.14",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 90,
        "note": "인터뷰 10건 중 7건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 82,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 75,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 86,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "ML Engineer · Credit"
  },
  {
    "companyCode": "D078",
    "companyName": "클리어캐시",
    "people": 8,
    "insight": 23,
    "interviewed": "2026.08.26",
    "freshness": 96,
    "jobs": [
      {
        "name": "Data Engineer",
        "people": 4,
        "fit": 86,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Risk",
        "people": 2,
        "fit": 81,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 74,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Engineer",
        "years": "2년차",
        "date": "2026.08.26",
        "current": true,
        "quote": "클리어캐시의 Data Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Risk",
        "years": "4년차",
        "date": "2026.08.19",
        "current": true,
        "quote": "입사 초반에는 Python을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.05",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.12",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 87,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 79,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 72,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 83,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Engineer · Risk"
  },
  {
    "companyCode": "D079",
    "companyName": "코인포트",
    "people": 6,
    "insight": 17,
    "interviewed": "2026.08.23",
    "freshness": 96,
    "jobs": [
      {
        "name": "Security Engineer",
        "people": 3,
        "fit": 81,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Platform",
        "people": 1,
        "fit": 76,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 69,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Security Engineer",
        "years": "2년차",
        "date": "2026.08.23",
        "current": true,
        "quote": "코인포트의 Security Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Platform",
        "years": "4년차",
        "date": "2026.08.16",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.08.02",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.09",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 82,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 74,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 67,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 78,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Security Engineer · Platform"
  },
  {
    "companyCode": "D080",
    "companyName": "페이로직",
    "people": 11,
    "insight": 32,
    "interviewed": "2026.08.21",
    "freshness": 90,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 5,
        "fit": 88,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Kotlin",
        "people": 3,
        "fit": 83,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "ML Engineer",
        "people": 3,
        "fit": 76,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.08.21",
        "current": true,
        "quote": "페이로직의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Kotlin",
        "years": "4년차",
        "date": "2026.08.14",
        "current": true,
        "quote": "입사 초반에는 거래 API을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.31",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "ML Engineer",
        "years": "8년차",
        "date": "2026.07.07",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 89,
        "note": "인터뷰 11건 중 8건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 81,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 74,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 85,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Kotlin"
  },
  {
    "companyCode": "D081",
    "companyName": "인슈어랩",
    "people": 7,
    "insight": 20,
    "interviewed": "2026.08.19",
    "freshness": 91,
    "jobs": [
      {
        "name": "Data Analyst",
        "people": 4,
        "fit": 75,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Insurance",
        "people": 2,
        "fit": 70,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 63,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Analyst",
        "years": "2년차",
        "date": "2026.08.19",
        "current": true,
        "quote": "인슈어랩의 Data Analyst는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Insurance",
        "years": "4년차",
        "date": "2026.08.12",
        "current": true,
        "quote": "입사 초반에는 Python을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.29",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.05",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 76,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 68,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 61,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 72,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Analyst · Insurance"
  },
  {
    "companyCode": "D082",
    "companyName": "뱅크플로우",
    "people": 9,
    "insight": 27,
    "interviewed": "2026.08.17",
    "freshness": 92,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 5,
        "fit": 83,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Fraud Detection",
        "people": 2,
        "fit": 78,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 71,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "2년차",
        "date": "2026.08.17",
        "current": true,
        "quote": "뱅크플로우의 AI Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Fraud Detection",
        "years": "4년차",
        "date": "2026.08.10",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.27",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.07.03",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 84,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 76,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 69,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 80,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "AI Engineer · Fraud Detection"
  },
  {
    "companyCode": "D083",
    "companyName": "크레딧포레스트",
    "people": 5,
    "insight": 14,
    "interviewed": "2026.08.14",
    "freshness": 93,
    "jobs": [
      {
        "name": "Product Manager",
        "people": 3,
        "fit": 69,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Finance",
        "people": 1,
        "fit": 64,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 57,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Product Manager",
        "years": "2년차",
        "date": "2026.08.14",
        "current": true,
        "quote": "크레딧포레스트의 Product Manager는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Finance",
        "years": "4년차",
        "date": "2026.08.07",
        "current": true,
        "quote": "입사 초반에는 거래 API을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.24",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.30",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 70,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 62,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 55,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 66,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Product Manager · Finance"
  },
  {
    "companyCode": "D084",
    "companyName": "세이프월렛",
    "people": 6,
    "insight": 16,
    "interviewed": "2026.08.11",
    "freshness": 94,
    "jobs": [
      {
        "name": "UX Designer",
        "people": 3,
        "fit": 72,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Fintech",
        "people": 1,
        "fit": 67,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 60,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "UX Designer",
        "years": "2년차",
        "date": "2026.08.11",
        "current": true,
        "quote": "세이프월렛의 UX Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Fintech",
        "years": "4년차",
        "date": "2026.08.04",
        "current": true,
        "quote": "입사 초반에는 Python을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.21",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.27",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 73,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 65,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 58,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 69,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "UX Designer · Fintech"
  },
  {
    "companyCode": "D085",
    "companyName": "머니큐브",
    "people": 8,
    "insight": 22,
    "interviewed": "2026.08.08",
    "freshness": 95,
    "jobs": [
      {
        "name": "Frontend Engineer",
        "people": 4,
        "fit": 78,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "React",
        "people": 2,
        "fit": 73,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 66,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Frontend Engineer",
        "years": "2년차",
        "date": "2026.08.08",
        "current": true,
        "quote": "머니큐브의 Frontend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "React",
        "years": "4년차",
        "date": "2026.08.01",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.18",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.24",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 79,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 71,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 64,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 75,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Frontend Engineer · React"
  },
  {
    "companyCode": "D086",
    "companyName": "캐시노트랩",
    "people": 7,
    "insight": 19,
    "interviewed": "2026.08.05",
    "freshness": 96,
    "jobs": [
      {
        "name": "Data Engineer",
        "people": 4,
        "fit": 64,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "SQL",
        "people": 2,
        "fit": 59,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 52,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Engineer",
        "years": "2년차",
        "date": "2026.08.05",
        "current": true,
        "quote": "캐시노트랩의 Data Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "SQL",
        "years": "4년차",
        "date": "2026.07.29",
        "current": true,
        "quote": "입사 초반에는 거래 API을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.15",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.21",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 65,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 57,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 50,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 61,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Engineer · SQL"
  },
  {
    "companyCode": "D087",
    "companyName": "파이낸스온",
    "people": 10,
    "insight": 28,
    "interviewed": "2026.08.02",
    "freshness": 96,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 5,
        "fit": 76,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Java",
        "people": 3,
        "fit": 71,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "ML Engineer",
        "people": 2,
        "fit": 64,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.08.02",
        "current": true,
        "quote": "파이낸스온의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Java",
        "years": "4년차",
        "date": "2026.07.26",
        "current": true,
        "quote": "입사 초반에는 Python을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.12",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "ML Engineer",
        "years": "8년차",
        "date": "2026.06.18",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 77,
        "note": "인터뷰 10건 중 7건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 69,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 62,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 73,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Java"
  },
  {
    "companyCode": "D088",
    "companyName": "리스크메이커",
    "people": 8,
    "insight": 24,
    "interviewed": "2026.07.29",
    "freshness": 90,
    "jobs": [
      {
        "name": "ML Engineer",
        "people": 4,
        "fit": 85,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "MLOps",
        "people": 2,
        "fit": 80,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 73,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "ML Engineer",
        "years": "2년차",
        "date": "2026.07.29",
        "current": true,
        "quote": "리스크메이커의 ML Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "MLOps",
        "years": "4년차",
        "date": "2026.07.22",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.08",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.14",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 86,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 78,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 71,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 82,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "ML Engineer · MLOps"
  },
  {
    "companyCode": "D089",
    "companyName": "밸런스페이",
    "people": 5,
    "insight": 13,
    "interviewed": "2026.07.26",
    "freshness": 91,
    "jobs": [
      {
        "name": "Product Designer",
        "people": 3,
        "fit": 62,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "UX",
        "people": 1,
        "fit": 57,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 50,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Product Designer",
        "years": "2년차",
        "date": "2026.07.26",
        "current": true,
        "quote": "밸런스페이의 Product Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "UX",
        "years": "4년차",
        "date": "2026.07.19",
        "current": true,
        "quote": "입사 초반에는 거래 API을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.05",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.11",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 63,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 55,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 48,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 59,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Product Designer · UX"
  },
  {
    "companyCode": "D090",
    "companyName": "이지론",
    "people": 9,
    "insight": 25,
    "interviewed": "2026.07.23",
    "freshness": 92,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 5,
        "fit": 71,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "API",
        "people": 2,
        "fit": 66,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "ML Engineer",
        "people": 2,
        "fit": 59,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.07.23",
        "current": true,
        "quote": "이지론의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "API",
        "years": "4년차",
        "date": "2026.07.16",
        "current": true,
        "quote": "입사 초반에는 Python을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.07.02",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "ML Engineer",
        "years": "8년차",
        "date": "2026.06.08",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 72,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 64,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 57,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 68,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · API"
  },
  {
    "companyCode": "D091",
    "companyName": "알파시큐어",
    "people": 4,
    "insight": 12,
    "interviewed": "2026.07.19",
    "freshness": 93,
    "jobs": [
      {
        "name": "Security Engineer",
        "people": 2,
        "fit": 68,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Detection",
        "people": 1,
        "fit": 63,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 56,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Security Engineer",
        "years": "2년차",
        "date": "2026.07.19",
        "current": true,
        "quote": "알파시큐어의 Security Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Detection",
        "years": "4년차",
        "date": "2026.07.12",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.28",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.04",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 69,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 61,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 54,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 65,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Security Engineer · Detection"
  },
  {
    "companyCode": "D092",
    "companyName": "포트폴리오뱅크",
    "people": 6,
    "insight": 15,
    "interviewed": "2026.07.16",
    "freshness": 94,
    "jobs": [
      {
        "name": "Data Analyst",
        "people": 3,
        "fit": 66,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "BI",
        "people": 1,
        "fit": 61,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 54,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Analyst",
        "years": "2년차",
        "date": "2026.07.16",
        "current": true,
        "quote": "포트폴리오뱅크의 Data Analyst는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "BI",
        "years": "4년차",
        "date": "2026.07.09",
        "current": true,
        "quote": "입사 초반에는 거래 API을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.25",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.06.01",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 67,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 59,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 52,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 63,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Analyst · BI"
  },
  {
    "companyCode": "D093",
    "companyName": "페이퍼리스",
    "people": 7,
    "insight": 18,
    "interviewed": "2026.07.12",
    "freshness": 95,
    "jobs": [
      {
        "name": "Service Designer",
        "people": 4,
        "fit": 60,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Customer",
        "people": 2,
        "fit": 55,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 48,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Service Designer",
        "years": "2년차",
        "date": "2026.07.12",
        "current": true,
        "quote": "페이퍼리스의 Service Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Customer",
        "years": "4년차",
        "date": "2026.07.05",
        "current": true,
        "quote": "입사 초반에는 Python을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.21",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.28",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 61,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 53,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 46,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 57,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Service Designer · Customer"
  },
  {
    "companyCode": "D094",
    "companyName": "자산플래닛",
    "people": 5,
    "insight": 14,
    "interviewed": "2026.07.09",
    "freshness": 96,
    "jobs": [
      {
        "name": "AI Engineer",
        "people": 3,
        "fit": 79,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "NLP",
        "people": 1,
        "fit": 74,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 67,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "AI Engineer",
        "years": "2년차",
        "date": "2026.07.09",
        "current": true,
        "quote": "자산플래닛의 AI Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "NLP",
        "years": "4년차",
        "date": "2026.07.02",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.18",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.25",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 80,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 72,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 65,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 76,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "AI Engineer · NLP"
  },
  {
    "companyCode": "D095",
    "companyName": "마이캐피탈",
    "people": 8,
    "insight": 21,
    "interviewed": "2026.07.05",
    "freshness": 96,
    "jobs": [
      {
        "name": "Backend Engineer",
        "people": 4,
        "fit": 73,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Cloud",
        "people": 2,
        "fit": 68,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "ML Engineer",
        "people": 2,
        "fit": 61,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Backend Engineer",
        "years": "2년차",
        "date": "2026.07.05",
        "current": true,
        "quote": "마이캐피탈의 Backend Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Cloud",
        "years": "4년차",
        "date": "2026.06.28",
        "current": true,
        "quote": "입사 초반에는 거래 API을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.14",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "ML Engineer",
        "years": "8년차",
        "date": "2026.05.21",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 74,
        "note": "인터뷰 8건 중 6건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 66,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 59,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 70,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Backend Engineer · Cloud"
  },
  {
    "companyCode": "D096",
    "companyName": "트러스트핀",
    "people": 6,
    "insight": 17,
    "interviewed": "2026.06.28",
    "freshness": 90,
    "jobs": [
      {
        "name": "Data Engineer",
        "people": 3,
        "fit": 70,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Airflow",
        "people": 1,
        "fit": 65,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 58,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Data Engineer",
        "years": "2년차",
        "date": "2026.06.28",
        "current": true,
        "quote": "트러스트핀의 Data Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Airflow",
        "years": "4년차",
        "date": "2026.06.21",
        "current": true,
        "quote": "입사 초반에는 Python을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.06.07",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.14",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 71,
        "note": "인터뷰 6건 중 4건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 63,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 56,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 67,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Data Engineer · Airflow"
  },
  {
    "companyCode": "D097",
    "companyName": "세이프브릿지",
    "people": 4,
    "insight": 10,
    "interviewed": "2026.06.21",
    "freshness": 91,
    "jobs": [
      {
        "name": "UX Researcher",
        "people": 2,
        "fit": 58,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Service",
        "people": 1,
        "fit": 53,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 46,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "UX Researcher",
        "years": "2년차",
        "date": "2026.06.21",
        "current": true,
        "quote": "세이프브릿지의 UX Researcher는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Service",
        "years": "4년차",
        "date": "2026.06.14",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.31",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.05.07",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 59,
        "note": "인터뷰 4건 중 3건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 51,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 44,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 55,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "UX Researcher · Service"
  },
  {
    "companyCode": "D098",
    "companyName": "인베스트큐",
    "people": 7,
    "insight": 19,
    "interviewed": "2026.06.14",
    "freshness": 92,
    "jobs": [
      {
        "name": "Product Manager",
        "people": 4,
        "fit": 65,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Data",
        "people": 2,
        "fit": 60,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 53,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Product Manager",
        "years": "2년차",
        "date": "2026.06.14",
        "current": true,
        "quote": "인베스트큐의 Product Manager는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Data",
        "years": "4년차",
        "date": "2026.06.07",
        "current": true,
        "quote": "입사 초반에는 거래 API을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.24",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.04.30",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 66,
        "note": "인터뷰 7건 중 5건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 58,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 51,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 62,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Product Manager · Data"
  },
  {
    "companyCode": "D099",
    "companyName": "페이체인",
    "people": 9,
    "insight": 26,
    "interviewed": "2026.05.30",
    "freshness": 93,
    "jobs": [
      {
        "name": "Platform Engineer",
        "people": 5,
        "fit": 80,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      },
      {
        "name": "Kubernetes",
        "people": 2,
        "fit": 75,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 2,
        "fit": 68,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Platform Engineer",
        "years": "2년차",
        "date": "2026.05.30",
        "current": true,
        "quote": "페이체인의 Platform Engineer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "Kubernetes",
        "years": "4년차",
        "date": "2026.05.23",
        "current": true,
        "quote": "입사 초반에는 Python을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2026.05.09",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2026.04.15",
        "current": true,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 81,
        "note": "인터뷰 9건 중 6건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 73,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 66,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 77,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Platform Engineer · Kubernetes"
  },
  {
    "companyCode": "D100",
    "companyName": "라이프파이낸셜",
    "people": 5,
    "insight": 13,
    "interviewed": "2025.11.28",
    "freshness": 69,
    "jobs": [
      {
        "name": "Service Designer",
        "people": 3,
        "fit": 56,
        "need": [
          "Python",
          "모델 평가",
          "피처 엔지니어링"
        ]
      },
      {
        "name": "CX",
        "people": 1,
        "fit": 51,
        "need": [
          "SQL",
          "리스크 지표",
          "데이터 검증"
        ]
      },
      {
        "name": "Backend Engineer",
        "people": 1,
        "fit": 44,
        "need": [
          "거래 API",
          "Java · Kotlin",
          "장애 대응"
        ]
      }
    ],
    "insiders": [
      {
        "role": "Service Designer",
        "years": "2년차",
        "date": "2025.11.28",
        "current": true,
        "quote": "라이프파이낸셜의 Service Designer는 작업을 끝냈다는 말보다 어떤 지표를 바꿨는지 설명하는 답변을 먼저 봅니다.",
        "tag": "서류 기준"
      },
      {
        "role": "CX",
        "years": "4년차",
        "date": "2025.11.21",
        "current": true,
        "quote": "입사 초반에는 SQL을 실제 업무에 적용해보는 경험이 온보딩 속도를 좌우합니다.",
        "tag": "기술 스택"
      },
      {
        "role": "채용 담당",
        "years": "6년차",
        "date": "2025.11.07",
        "current": true,
        "quote": "프로젝트 소개는 맡은 역할, 판단 근거, 결과 수치를 순서대로 말하면 검토하기 쉽습니다.",
        "tag": "전형"
      },
      {
        "role": "Backend Engineer",
        "years": "8년차",
        "date": "2025.10.14",
        "current": false,
        "quote": "문서와 회고가 남아 있으면 협업 과정과 다음 개선 방향을 함께 확인할 수 있습니다.",
        "tag": "기업 문화"
      }
    ],
    "culture": [
      {
        "name": "리스크 기반 의사결정",
        "value": 57,
        "note": "인터뷰 5건 중 4건에서 언급"
      },
      {
        "name": "문서 기반 협업",
        "value": 49,
        "note": "분기 단위 개선 사이클"
      },
      {
        "name": "온보딩 체계",
        "value": 42,
        "note": "입사 첫 8주 멘토 배정"
      },
      {
        "name": "주니어 성장 지원",
        "value": 53,
        "note": "사내 스터디 · 직무 교육 지원"
      }
    ],
    "role": "Service Designer · CX"
  }
]

export const byCode = code => companies.find(c => c.companyCode === code) || companies[0]

// 홈 통계용 집계
export const totals = {
  companies: companies.length,
  insiders: companies.reduce((n, c) => n + c.people, 0),
  insights: companies.reduce((n, c) => n + c.insight, 0)
}
