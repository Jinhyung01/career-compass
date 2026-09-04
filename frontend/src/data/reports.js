// 진단 리포트 더미 데이터.
//
// 사용자 모집단 DB 가 없으므로 다음은 담지 않는다:
//   - 백분위 / 상위 %  (다른 지원자와 비교해야 나오는 값)
//   - 비교 모수 N명 · 지원자 등급 분포
// 대신 현직자 인터뷰로 알 수 있는 것만 쓴다:
//   - 요구 항목을 꼽은 현직자 수와 비율 (demands)
//   - 그 요구를 메우기 위한 추천 프로젝트 기획 (projects)
//
// 등급(grade)은 상대 순위가 아니라 점수 구간 기준의 절대 등급이다.

const resumeCommon = [
  {
    before: 'RAG 파이프라인을 구축해 검색 성능을 개선했습니다.',
    after: '사내 문서 검색 RAG 설계·구축 — Recall@5 0.58 → 0.81 (정답셋 100문항 직접 라벨링)',
    why: '목적을 앞에 두고 전후 수치를 붙였습니다.'
  },
  {
    before: '팀 프로젝트로 추천 시스템을 만들었습니다.',
    after: '추천 시스템 개발 (3인 팀 / 후보 생성·오프라인 평가 담당) — CTR 2.1% → 3.4%',
    why: '맡은 파트를 괄호로 명시하면 기여도를 의심받지 않습니다.'
  },
  {
    before: 'Python, PyTorch, FastAPI를 사용할 수 있습니다.',
    after: 'Python · FastAPI로 추론 API 운영 (일 1.2만 요청, p95 340ms)',
    why: '스택 나열이 아니라 어디까지 해봤는지를 씁니다.'
  }
]

export const reports = [
  {
    id: 'r1',
    meta: { name: '김서현', companyName: 'SK Hynix', positionName: 'AI Engineer', code: 'JP-0002', date: '2026.09.03' },
    overall: { fitScore: 87, grade: 'A' },
    headline: '숫자로 설명할 수 있는 성과 경험이 가장 큰 개선 지점입니다.',
    skills: [
      { name: '직무 이해', value: 92 },
      { name: '정량 성과', value: 54, weak: true },
      { name: '협업 경험', value: 78 }
    ],
    details: [
      { group: '직무 이해', name: '도메인 지식', score: 94, judge: '우수', tone: 'good' },
      { group: '직무 이해', name: '기술 스택 적합', score: 90, judge: '우수', tone: 'good' },
      { group: '정량 성과', name: '지표 개선 경험', score: 48, judge: '보완', tone: 'bad' },
      { group: '정량 성과', name: '성과 서술력', score: 60, judge: '보통', tone: 'mid' },
      { group: '협업 경험', name: '교차 직군 협업', score: 82, judge: '우수', tone: 'good' },
      { group: '협업 경험', name: '문서·공유 습관', score: 74, judge: '보통', tone: 'mid' }
    ],
    insight: {
      title: '정량 성과가 비어 있습니다',
      lines: [
        '이 직무 현직자 12명 중 9명(75%)이 “숫자로 끝나는 성과”를 첫 기준으로 꼽았습니다.',
        '새 프로젝트보다 기존 프로젝트의 전후 수치를 복원하는 쪽이 빠릅니다.'
      ]
    },
    demands: {
      of: 12,
      items: [
        { item: '지표 개선 사례 (전후 수치)', count: 9 },
        { item: '문서 · 회고 기록', count: 8 },
        { item: '컨테이너 배포 경험', count: 7 },
        { item: '개인 기여 범위 구분', count: 6 },
        { item: '실험 설계 근거', count: 4 }
      ]
    },
    strengths: [
      'RAG 파이프라인 설계 경험이 공고 요구 수준을 상회합니다.',
      '학부 연구실 프로젝트에서 모델 선정 근거를 문서로 남긴 이력이 있습니다.',
      '기술 스택 3종이 이 직무 현직자가 꼽은 요구 항목과 겹칩니다.'
    ],
    gaps: [
      '프로젝트 결과를 수치로 제시한 사례가 확인되지 않습니다.',
      '개인 기여 범위가 팀 성과와 구분되어 있지 않습니다.',
      '운영·배포 단계까지 이어진 경험이 부족합니다.'
    ],
    jobFit: [
      { rank: 1, job: 'AI Engineer', score: 87, note: '현재 지원 직무' },
      { rank: 2, job: 'MLOps Engineer', score: 81, note: '배포 경험 보완 시 상승' },
      { rank: 3, job: 'Data Engineer', score: 76, note: '파이프라인 경험 인정' }
    ],
    actions: [
      { no: '01', title: '기존 프로젝트의 전후 지표 복원', meta: '예상 1주' },
      { no: '02', title: '개인 기여 범위 문장으로 분리', meta: '예상 3시간' },
      { no: '03', title: '추론 API 컨테이너 배포 1건', meta: '예상 2주' }
    ],
    recommendedProjects: [
      {
        no: 'P1',
        title: '공정 로그 이상 탐지 파이프라인',
        tag: '정량 성과 · 기술 스택',
        source: '현직자 12명 중 9명이 “숫자로 끝나는 성과”를 요구',
        why: '가장 크게 모자란 두 항목을 한 번에 메웁니다. 이상 탐지는 정확도·재현율처럼 숫자로 끝나는 과제라 성과 서술이 자연스럽게 남습니다.',
        todo: [
          '공개 반도체 공정 데이터셋(SECOM)으로 불량 라벨 분포 확인',
          '베이스라인(로지스틱 회귀)과 개선안(LightGBM)을 같은 지표로 비교',
          'FastAPI 추론 엔드포인트를 만들고 Docker 이미지로 감싸기',
          'GitHub Actions로 테스트 → 이미지 빌드까지 자동화'
        ],
        output: 'GitHub 저장소 · README 전후 지표 표 · 추론 API 데모',
        weeks: '3주',
        resume: '공정 불량 예측 모델 개선 — 재현율 0.61 → 0.83, 오탐 34% 감소 (SECOM 1,567건, 단독)'
      },
      {
        no: 'P2',
        title: '사내 문서 검색 RAG 평가 체계 붙이기',
        tag: '정량 성과',
        source: '현직자 12명 중 4명이 “실험 설계 근거”를 요구',
        why: '이미 만든 RAG를 새로 만들지 말고, 평가 체계를 붙여 숫자를 복원하는 쪽이 빠릅니다.',
        todo: [
          '기존 파이프라인에 정답셋 100문항을 직접 라벨링',
          'Recall@5 · MRR 두 지표로 개선 전후 측정',
          '청킹 크기와 리랭커 유무를 바꿔가며 4회 실험 기록',
          '실험 표를 README 최상단에 배치'
        ],
        output: '실험 기록 문서 · 정답셋 100문항 · 개선 전후 비교표',
        weeks: '2주',
        resume: '사내 문서 검색 RAG 개선 — Recall@5 0.58 → 0.81, 리랭커 도입 (응답 지연 12% 증가 감수)'
      },
      {
        no: 'P3',
        title: '온프렘 Kubernetes 배포 실습',
        tag: '기술 스택',
        source: '현직자 12명 중 7명이 “컨테이너 배포 경험”을 요구',
        why: '2026.08.21 인터뷰에서 팀이 온프렘 Kubernetes로 이전 중이라고 언급됐습니다. 깊이보다 “배포해본 적 있는지”를 봅니다.',
        todo: [
          'k3s로 단일 노드 클러스터 구성',
          'P1의 추론 API를 Deployment · Service로 올리기',
          'HPA로 부하 테스트(locust) 중 자동 확장 확인',
          '장애 재현 1회와 복구 과정을 문서로 남기기'
        ],
        output: 'manifest 저장소 · 부하 테스트 결과 · 장애 대응 기록',
        weeks: '3주',
        resume: 'k3s 기반 추론 서비스 배포 — 동시 200요청에서 p95 340ms 유지, HPA 2→5 파드 자동 확장'
      }
    ],
    resumeHighlights: resumeCommon,
    questions: [
      { q: '가장 성과가 좋았던 프로젝트의 지표를 말해보세요.', why: '정량 성과 항목이 낮아 확인 질문이 나올 가능성이 높습니다.' },
      { q: '해당 모델·스택을 선택한 근거는 무엇입니까?', why: '직무 이해 항목이 높아 심화 질문으로 이어집니다.' },
      { q: '팀에서 본인이 맡은 범위는 어디까지였습니까?', why: '개인 기여 범위가 이력서에 구분되어 있지 않습니다.' }
    ]
  },

  {
    id: 'r2',
    meta: { name: '김서현', companyName: 'SK Hynix', positionName: '양산 기술', code: 'JP-0001', date: '2026.08.08' },
    overall: { fitScore: 75, grade: 'B+' },
    headline: '공정 데이터를 다룬 경험은 있으나, 개선 결과가 기록으로 남아 있지 않습니다.',
    skills: [
      { name: '공정 이해', value: 81 },
      { name: '데이터 분석', value: 72 },
      { name: '개선 사례', value: 49, weak: true }
    ],
    details: [
      { group: '공정 이해', name: '장비·설비 이해', score: 84, judge: '우수', tone: 'good' },
      { group: '공정 이해', name: '품질 지표 해석', score: 78, judge: '보통', tone: 'mid' },
      { group: '데이터 분석', name: 'SQL · 통계', score: 76, judge: '보통', tone: 'mid' },
      { group: '데이터 분석', name: '시각화 · 리포팅', score: 68, judge: '보통', tone: 'mid' },
      { group: '개선 사례', name: '수율 개선 경험', score: 44, judge: '보완', tone: 'bad' },
      { group: '개선 사례', name: '재발 방지 조치', score: 54, judge: '보완', tone: 'bad' }
    ],
    insight: {
      title: '개선 결과가 기록으로 남아 있지 않습니다',
      lines: [
        '이 직무 현직자 12명 중 8명(67%)이 수율·불량률 개선 사례를 요구 항목으로 꼽았습니다.',
        '담당했던 라인의 전후 수치부터 다시 확인해보세요.'
      ]
    },
    demands: {
      of: 12,
      items: [
        { item: '수율 · 불량률 개선 사례', count: 8 },
        { item: '통계적 공정 관리(SPC)', count: 7 },
        { item: 'MES · 설비 로그 분석', count: 6 },
        { item: '현장 담당자 커뮤니케이션', count: 5 },
        { item: '재발 방지 조치 기록', count: 3 }
      ]
    },
    strengths: [
      '생산관리 인턴에서 라인 데이터를 직접 다룬 경험이 있습니다.',
      '통계 기반 품질 지표 해석이 직무 요구 수준에 부합합니다.',
      '현장 담당자와의 커뮤니케이션 이력이 확인됩니다.'
    ],
    gaps: [
      '개선 활동의 결과 수치가 이력서에 없습니다.',
      '재발 방지까지 이어진 사례가 확인되지 않습니다.',
      'MES · 설비 로그를 직접 다룬 기록이 부족합니다.'
    ],
    jobFit: [
      { rank: 1, job: '양산 기술', score: 75, note: '현재 지원 직무' },
      { rank: 2, job: '공정 데이터 분석', score: 72, note: 'SQL 경험 인정' },
      { rank: 3, job: '품질 Engineer', score: 64, note: '개선 사례 보완 필요' }
    ],
    actions: [
      { no: '01', title: '담당 라인 수율 전후 수치 정리', meta: '예상 1주' },
      { no: '02', title: '재발 방지 조치 1건 문서화', meta: '예상 3일' }
    ],
    recommendedProjects: [
      {
        no: 'P1',
        title: '설비 로그 기반 불량 원인 추적 리포트',
        tag: '개선 사례 · 데이터 분석',
        source: '현직자 12명 중 6명이 “MES · 설비 로그 분석”을 요구',
        why: '개선 사례가 가장 크게 비어 있습니다. 원인 추적은 “무엇을 얼마나 줄였는지”로 끝나는 과제라 수치가 남습니다.',
        todo: [
          '공개 제조 센서 데이터셋으로 불량 구간과 설비 파라미터 정렬',
          '관리도(X-bar, R)로 이상 구간 판정 기준 세우기',
          '상위 3개 원인 변수를 통계 검정으로 좁히기',
          '조치 전후 불량률 비교 표를 한 장으로 정리'
        ],
        output: '분석 노트북 · 관리도 · 원인 3종과 조치 전후 비교표',
        weeks: '3주',
        resume: '설비 로그 기반 불량 원인 추적 — 상위 3개 원인 규명, 조치 후 불량률 2.4% → 1.5%'
      },
      {
        no: 'P2',
        title: 'SPC 관리도 자동 리포팅 도구',
        tag: '데이터 분석',
        source: '현직자 12명 중 7명이 “통계적 공정 관리(SPC)”를 요구',
        why: '현장에서 매일 만드는 산출물을 자동화하면 도구 숙련도와 개선 효과를 동시에 보일 수 있습니다.',
        todo: [
          '라인별 계측값을 읽어 관리도와 공정능력지수(Cp, Cpk) 계산',
          '규격 이탈 구간을 자동 표시하고 일간 요약 생성',
          '수작업 대비 소요 시간 측정 (전/후)',
          '사용 설명서 1페이지 작성'
        ],
        output: 'Python 스크립트 · 일간 리포트 샘플 · 소요 시간 비교',
        weeks: '2주',
        resume: 'SPC 일간 리포트 자동화 — 수작업 90분 → 4분, Cpk 산출 라인 6개 확대'
      }
    ],
    resumeHighlights: [
      {
        before: '공정 데이터를 분석해 품질을 개선했습니다.',
        after: '설비 로그 기반 불량 원인 추적 — 조치 후 불량률 2.4% → 1.5% (단독, 3주)',
        why: '무엇을 얼마나 줄였는지가 문장 안에 있어야 합니다.'
      },
      {
        before: '생산관리 인턴으로 근무했습니다.',
        after: '생산관리 인턴 (라인 3개 일간 계측 데이터 관리) — 일간 리포트 자동화로 90분 → 4분',
        why: '담당 범위와 결과를 함께 적으면 검토가 빨라집니다.'
      }
    ],
    questions: [
      { q: '담당했던 공정에서 개선한 지표가 있습니까?', why: '개선 사례 항목이 가장 낮습니다.' },
      { q: '불량 원인을 어떤 순서로 좁혀갔습니까?', why: '문제 해결 절차를 확인하는 질문입니다.' },
      { q: '현장 담당자와 이견이 있었을 때 어떻게 했습니까?', why: '협업 이력이 있어 사례 질문으로 이어집니다.' }
    ]
  },

  {
    id: 'r3',
    meta: { name: '김서현', companyName: 'SK AX', positionName: '반도체 · AI Engineer', code: 'JP-0003', date: '2026.08.04' },
    overall: { fitScore: 82, grade: 'A-' },
    headline: '모델링 역량은 충분하지만, 운영 단계 경험이 점수를 눌렀습니다.',
    skills: [
      { name: '모델링', value: 88 },
      { name: '데이터 파이프라인', value: 74 },
      { name: '운영·배포', value: 57, weak: true }
    ],
    details: [
      { group: '모델링', name: '실험 설계', score: 90, judge: '우수', tone: 'good' },
      { group: '모델링', name: '평가 지표 선택', score: 86, judge: '우수', tone: 'good' },
      { group: '데이터 파이프라인', name: 'ETL 구성', score: 76, judge: '보통', tone: 'mid' },
      { group: '데이터 파이프라인', name: '데이터 품질 관리', score: 72, judge: '보통', tone: 'mid' },
      { group: '운영·배포', name: '컨테이너 · 배포', score: 52, judge: '보완', tone: 'bad' },
      { group: '운영·배포', name: '모니터링 · 장애 대응', score: 61, judge: '보통', tone: 'mid' }
    ],
    insight: {
      title: '배포까지 이어진 경험이 필요합니다',
      lines: [
        '이 직무 현직자 9명 중 6명(67%)이 “배포해본 적 있는지”를 요구 항목으로 꼽았습니다.',
        '깊이보다 한 번이라도 운영에 올려본 이력이 중요합니다.'
      ]
    },
    demands: {
      of: 9,
      items: [
        { item: '컨테이너 배포 경험', count: 6 },
        { item: '실험 설계 · 평가 지표 근거', count: 6 },
        { item: '데이터 품질 이슈 대응', count: 4 },
        { item: '모니터링 · 장애 대응', count: 3 },
        { item: 'CI/CD 구성', count: 2 }
      ]
    },
    strengths: [
      '실험 설계와 평가 지표 선택 근거가 명확하게 기록되어 있습니다.',
      'RAG · PyTorch 등 요구 스택이 현직자가 꼽은 항목과 일치합니다.',
      '데이터 품질 이슈를 직접 다룬 사례가 있습니다.'
    ],
    gaps: [
      '컨테이너 기반 배포 경험이 확인되지 않습니다.',
      '모델 서빙 이후 모니터링 이력이 없습니다.',
      '팀 규모 · 역할 분담이 이력서에 드러나지 않습니다.'
    ],
    jobFit: [
      { rank: 1, job: 'AI Engineer', score: 82, note: '현재 지원 직무' },
      { rank: 2, job: 'Research Engineer', score: 79, note: '실험 설계 강점' },
      { rank: 3, job: 'MLOps Engineer', score: 63, note: '배포 경험 부족' }
    ],
    actions: [
      { no: '01', title: '기존 모델 하나를 컨테이너로 배포', meta: '예상 2주' },
      { no: '02', title: '서빙 지표 모니터링 대시보드 구성', meta: '예상 1주' }
    ],
    recommendedProjects: [
      {
        no: 'P1',
        title: '모델 서빙 · 모니터링 최소 구성 만들기',
        tag: '운영·배포',
        source: '현직자 9명 중 6명이 “컨테이너 배포 경험”을 요구',
        why: '가장 낮은 항목이자, 현직자가 가장 많이 꼽은 요구입니다. 새 모델을 만들 필요 없이 기존 모델을 올리는 것으로 충분합니다.',
        todo: [
          '학습이 끝난 모델을 FastAPI로 감싸 Docker 이미지 만들기',
          'compose 로 API · Prometheus · Grafana 3개 컨테이너 기동',
          '요청 수 · 지연 · 오류율 3개 지표를 대시보드로 노출',
          '의도적으로 오류를 내고 알림이 뜨는지 확인해 기록'
        ],
        output: 'Dockerfile · compose 파일 · 대시보드 캡처 · 장애 재현 기록',
        weeks: '2주',
        resume: '추론 API 서빙·모니터링 구성 — p95 지연 340ms, 오류율 알림 임계 1% 설정 및 장애 재현 검증'
      },
      {
        no: 'P2',
        title: '데이터 품질 검증을 파이프라인에 넣기',
        tag: '데이터 파이프라인',
        source: '현직자 9명 중 4명이 “데이터 품질 이슈 대응”을 요구',
        why: '이미 겪어본 품질 이슈를 절차로 바꾸면, 경험이 재현 가능한 역량으로 읽힙니다.',
        todo: [
          '학습 데이터에 대한 스키마 · 결측 · 분포 검증 규칙 정의',
          '규칙 위반 시 적재를 중단하는 단계를 파이프라인에 추가',
          '과거 데이터에 규칙을 소급 적용해 걸러지는 비율 측정',
          '검증 리포트를 실행마다 파일로 남기기'
        ],
        output: '검증 규칙 정의서 · 파이프라인 코드 · 소급 적용 결과',
        weeks: '2주',
        resume: '학습 데이터 품질 검증 단계 도입 — 소급 적용 시 이상 레코드 3.1% 사전 차단'
      }
    ],
    resumeHighlights: [
      {
        before: '모델을 학습시켜 성능을 개선했습니다.',
        after: '분류 모델 개선 — F1 0.71 → 0.84 (평가 지표를 F1로 정한 근거 문서화, 단독)',
        why: '지표와 그 지표를 고른 이유가 함께 있으면 심화 질문에서 유리합니다.'
      },
      {
        before: 'Docker와 Kubernetes를 사용할 수 있습니다.',
        after: 'FastAPI 추론 API를 Docker로 배포·운영 — p95 340ms, 오류율 알림 임계 1%',
        why: '“사용할 수 있다”는 문장은 배포 경험 요구를 충족하지 못합니다.'
      }
    ],
    questions: [
      { q: '학습한 모델을 실제 서비스에 올려본 적이 있습니까?', why: '운영·배포 항목이 가장 낮습니다.' },
      { q: '평가 지표를 그 지표로 정한 이유는 무엇입니까?', why: '모델링 항목이 높아 심화 질문으로 이어집니다.' },
      { q: '데이터 품질 문제를 어떻게 발견했습니까?', why: '해당 경험이 이력서에 언급되어 있습니다.' }
    ]
  },

  {
    id: 'r4',
    meta: { name: '김서현', companyName: '포스코 퓨쳐엠', positionName: '반도체 · DX', code: 'JP-0004', date: '2026.08.01' },
    overall: { fitScore: 79, grade: 'A-' },
    headline: '현장 데이터와 IT를 잇는 경험이 이 직무에서 가장 높게 평가됐습니다.',
    skills: [
      { name: '현장 이해', value: 84 },
      { name: '데이터 활용', value: 80 },
      { name: '과제 기획', value: 62, weak: true }
    ],
    details: [
      { group: '현장 이해', name: '생산 공정 이해', score: 86, judge: '우수', tone: 'good' },
      { group: '현장 이해', name: '설비 데이터 해석', score: 81, judge: '우수', tone: 'good' },
      { group: '데이터 활용', name: 'Python · SQL', score: 83, judge: '우수', tone: 'good' },
      { group: '데이터 활용', name: '분석 결과 전달', score: 74, judge: '보통', tone: 'mid' },
      { group: '과제 기획', name: '문제 정의', score: 66, judge: '보통', tone: 'mid' },
      { group: '과제 기획', name: '효과 산정', score: 55, judge: '보완', tone: 'bad' }
    ],
    insight: {
      title: '과제의 기대 효과를 계산한 기록이 없습니다',
      lines: [
        '이 직무 현직자 8명 중 6명(75%)이 “기대 효과를 숫자로 적어오는지”를 요구 항목으로 꼽았습니다.',
        '이미 한 분석에 금액 · 시간 환산을 덧붙이는 것으로 시작할 수 있습니다.'
      ]
    },
    demands: {
      of: 8,
      items: [
        { item: '기대 효과 금액 · 시간 환산', count: 6 },
        { item: '현장과 IT를 이어본 경험', count: 6 },
        { item: 'Python · SQL 활용', count: 5 },
        { item: '분석 결과 전달 · 보고', count: 4 },
        { item: '문제 정의 기록', count: 2 }
      ]
    },
    strengths: [
      '현장 공정과 데이터 양쪽을 모두 다뤄본 이력이 있습니다.',
      'Python · SQL 활용 수준이 직무 요구를 넘어섭니다.',
      '설비 데이터 해석 경험이 현직자 요구 항목과 겹칩니다.'
    ],
    gaps: [
      '과제의 기대 효과를 수치로 산정한 경험이 없습니다.',
      '분석 결과를 의사결정으로 연결한 사례가 부족합니다.',
      '문제 정의 단계의 기록이 남아 있지 않습니다.'
    ],
    jobFit: [
      { rank: 1, job: 'DX · 데이터 기획', score: 79, note: '현재 지원 직무' },
      { rank: 2, job: '공정 데이터 분석', score: 77, note: '현장 이해 강점' },
      { rank: 3, job: 'BI Analyst', score: 70, note: '전달력 보완 시 상승' }
    ],
    actions: [
      { no: '01', title: '기존 분석 1건에 효과 금액 환산 붙이기', meta: '예상 3일' },
      { no: '02', title: '문제 정의 → 결론 1페이지 요약 작성', meta: '예상 1주' }
    ],
    recommendedProjects: [
      {
        no: 'P1',
        title: '공정 개선 과제 기획서 1건 처음부터 끝까지',
        tag: '과제 기획',
        source: '현직자 8명 중 6명이 “기대 효과 금액 · 시간 환산”을 요구',
        why: '가장 낮은 항목이 효과 산정입니다. 분석 실력을 더 쌓는 것보다, 기획서 형태로 한 건 완성하는 편이 요구에 정확히 맞습니다.',
        todo: [
          '공개 제조 데이터에서 개선 여지가 있는 지점 하나 고르기',
          '현재 손실을 시간 · 수량 · 금액 세 단위로 환산',
          '개선안 두 개를 비용과 기대 효과로 비교',
          '문제 정의 → 근거 → 개선안 → 기대 효과 순서로 2페이지 정리'
        ],
        output: '과제 기획서 2페이지 · 효과 산정 근거 표',
        weeks: '2주',
        resume: '공정 개선 과제 기획 — 연간 손실 1.2억원 산정, 개선안 2종 비교 후 회수기간 7개월 안 제시'
      },
      {
        no: 'P2',
        title: '한 장 보고서로 바꾸는 분석 전달 훈련',
        tag: '데이터 활용 · 전달',
        source: '현직자 8명 중 4명이 “분석 결과 전달 · 보고”를 요구',
        why: '분석은 되는데 전달이 약합니다. 이미 한 분석 3건을 각각 한 장으로 줄이는 훈련이 가장 짧은 경로입니다.',
        todo: [
          '기존 분석 3건을 각각 결론 한 문장으로 먼저 쓰기',
          '결론을 받치는 그래프는 한 장에 최대 2개만 남기기',
          '의사결정 선택지를 두 개로 제시하고 권고안 표시',
          '현직자 또는 동료에게 5분 안에 설명해 피드백 받기'
        ],
        output: '한 장 보고서 3건 · 피드백 기록',
        weeks: '1주',
        resume: '분석 결과 한 장 보고 체계 정리 — 보고 소요 25분 → 5분, 의사결정 선택지 2안 제시 형식 도입'
      }
    ],
    resumeHighlights: [
      {
        before: '설비 데이터를 분석했습니다.',
        after: '설비 데이터 분석으로 개선 지점 도출 — 연간 손실 1.2억원 산정, 회수기간 7개월 안 제시',
        why: 'DX 직무는 분석 자체보다 효과 산정을 먼저 확인합니다.'
      },
      {
        before: '분석 결과를 팀에 공유했습니다.',
        after: '분석 결과 한 장 보고 형식 정리 — 보고 25분 → 5분, 선택지 2안 제시로 의사결정 연결',
        why: '누구에게 어떻게 전달했는지가 드러나야 합니다.'
      }
    ],
    questions: [
      { q: '그 분석으로 회사가 얻은 효과는 얼마입니까?', why: '효과 산정 항목이 가장 낮습니다.' },
      { q: '현장에서 데이터가 안 맞을 때 어떻게 확인했습니까?', why: '현장 이해 항목이 높아 사례 질문으로 이어집니다.' },
      { q: '분석 결과를 누구에게 어떻게 전달했습니까?', why: '전달 경험이 이력서에 드러나지 않습니다.' }
    ]
  },

  {
    id: 'r5',
    meta: { name: '김서현', companyName: '카카오페이', positionName: 'Backend Engineer', code: 'JP-0005', date: '2026.07.22' },
    overall: { fitScore: 68, grade: 'B' },
    headline: '언어 숙련도는 충분하나 결제 도메인 경험이 확인되지 않습니다.',
    skills: [
      { name: '언어 · 프레임워크', value: 76 },
      { name: '시스템 설계', value: 61, weak: true },
      { name: '도메인 이해', value: 48, weak: true }
    ],
    details: [
      { group: '언어 · 프레임워크', name: 'Java · Spring', score: 78, judge: '보통', tone: 'mid' },
      { group: '언어 · 프레임워크', name: '테스트 작성', score: 73, judge: '보통', tone: 'mid' },
      { group: '시스템 설계', name: 'API 설계', score: 66, judge: '보통', tone: 'mid' },
      { group: '시스템 설계', name: '트랜잭션 · 정합성', score: 55, judge: '보완', tone: 'bad' },
      { group: '도메인 이해', name: '결제 · 정산 이해', score: 42, judge: '보완', tone: 'bad' },
      { group: '도메인 이해', name: '보안 · 규제 이해', score: 53, judge: '보완', tone: 'bad' }
    ],
    insight: {
      title: '정합성을 다룬 경험이 필요합니다',
      lines: [
        '이 직무 현직자 11명 중 8명(73%)이 “중복 요청과 부분 실패 처리”를 요구 항목으로 꼽았습니다.',
        '작은 프로젝트라도 재시도 · 멱등 처리를 직접 구현해보는 것이 가장 빠릅니다.'
      ]
    },
    demands: {
      of: 11,
      items: [
        { item: '중복 요청 · 부분 실패 처리', count: 8 },
        { item: '테스트 작성 기준', count: 7 },
        { item: 'Java · Spring 숙련', count: 6 },
        { item: 'API 설계 · 버저닝', count: 5 },
        { item: '결제 · 정산 도메인 이해', count: 4 }
      ]
    },
    strengths: [
      'Java · Spring 기반 프로젝트 이력이 꾸준히 확인됩니다.',
      '테스트 코드를 작성한 기록이 남아 있습니다.',
      'API 문서화 습관이 협업 항목에서 가점 요인입니다.'
    ],
    gaps: [
      '트랜잭션 정합성을 다룬 경험이 없습니다.',
      '결제 · 정산 도메인 용어 사용이 확인되지 않습니다.',
      '대용량 트래픽 환경 경험이 부족합니다.'
    ],
    jobFit: [
      { rank: 1, job: 'Backend Engineer', score: 68, note: '현재 지원 직무' },
      { rank: 2, job: 'API Platform Engineer', score: 66, note: '설계 경험 인정' },
      { rank: 3, job: 'QA Engineer', score: 61, note: '테스트 습관 반영' }
    ],
    actions: [
      { no: '01', title: '멱등키 기반 결제 재시도 예제 구현', meta: '예상 2주' },
      { no: '02', title: '정합성 실패 케이스 회고 문서 작성', meta: '예상 3일' }
    ],
    recommendedProjects: [
      {
        no: 'P1',
        title: '멱등 결제 API 미니 프로젝트',
        tag: '시스템 설계 · 도메인 이해',
        source: '현직자 11명 중 8명이 “중복 요청 · 부분 실패 처리”를 요구',
        why: '가장 많이 꼽힌 요구와 가장 낮은 두 항목이 정확히 겹칩니다. 규모는 작아도 정합성 설계를 직접 해보는 것이 핵심입니다.',
        todo: [
          '결제 요청 · 승인 · 취소 3개 API를 Spring으로 구현',
          '멱등키 테이블로 같은 요청이 두 번 와도 1건만 처리되게 만들기',
          '승인 후 원장 반영 실패를 강제로 일으켜 보상 트랜잭션 확인',
          '동시 요청 100건 테스트로 중복 결제 0건 검증'
        ],
        output: 'GitHub 저장소 · 동시성 테스트 결과 · 시퀀스 다이어그램',
        weeks: '2주',
        resume: '멱등 결제 API 구현 — 동시 100요청에서 중복 결제 0건, 원장 반영 실패 시 보상 트랜잭션 처리'
      },
      {
        no: 'P2',
        title: '실패 케이스부터 쓰는 테스트 정리',
        tag: '테스트',
        source: '현직자 11명 중 7명이 “테스트 작성 기준”을 요구',
        why: '테스트 습관은 이미 있으니, 무엇을 기준으로 쓰는지 설명 가능하게 만들면 강점으로 전환됩니다.',
        todo: [
          'P1의 실패 시나리오 10개를 먼저 목록으로 쓰기',
          '각 시나리오를 통합 테스트로 옮기고 통과 조건 명시',
          '커버리지 대신 “막은 실패 케이스 수”로 지표 잡기',
          '테스트 작성 기준을 README에 한 단락으로 정리'
        ],
        output: '통합 테스트 10건 · 테스트 작성 기준 문서',
        weeks: '1주',
        resume: '결제 실패 시나리오 10건 통합 테스트 작성 — 중복 요청·부분 실패·타임아웃 경로 검증'
      }
    ],
    resumeHighlights: [
      {
        before: 'Spring으로 REST API를 개발했습니다.',
        after: '멱등 결제 API 구현 — 동시 100요청에서 중복 결제 0건, 보상 트랜잭션으로 원장 정합성 보장',
        why: '결제 직무에서 가장 많이 확인하는 항목을 문장 안에 넣었습니다.'
      },
      {
        before: '테스트 코드를 작성했습니다.',
        after: '결제 실패 시나리오 10건 통합 테스트 — 중복 요청 · 부분 실패 · 타임아웃 경로 검증',
        why: '무엇을 막았는지가 커버리지 숫자보다 잘 읽힙니다.'
      }
    ],
    questions: [
      { q: '중복 요청이 들어오면 어떻게 처리하겠습니까?', why: '정합성 항목이 낮아 반드시 확인됩니다.' },
      { q: '트랜잭션이 중간에 실패하면 무엇부터 봅니까?', why: '시스템 설계 항목의 확인 질문입니다.' },
      { q: '테스트를 어떤 기준으로 작성했습니까?', why: '테스트 이력이 강점으로 잡혔습니다.' }
    ]
  },

  {
    id: 'r6',
    meta: { name: '김서현', companyName: '무신사', positionName: 'Data Analyst', code: 'JP-0006', date: '2026.07.14' },
    overall: { fitScore: 71, grade: 'B+' },
    headline: '지표를 뽑는 일은 익숙하지만, 실험으로 검증한 이력이 없습니다.',
    skills: [
      { name: 'SQL · 데이터 추출', value: 84 },
      { name: '지표 설계', value: 66 },
      { name: '실험 · 검증', value: 45, weak: true }
    ],
    details: [
      { group: 'SQL · 데이터 추출', name: '쿼리 작성', score: 87, judge: '우수', tone: 'good' },
      { group: 'SQL · 데이터 추출', name: '데이터 정합성 확인', score: 78, judge: '보통', tone: 'mid' },
      { group: '지표 설계', name: '핵심 지표 정의', score: 69, judge: '보통', tone: 'mid' },
      { group: '지표 설계', name: '대시보드 구성', score: 72, judge: '보통', tone: 'mid' },
      { group: '실험 · 검증', name: 'A/B 테스트 설계', score: 41, judge: '보완', tone: 'bad' },
      { group: '실험 · 검증', name: '결과 해석', score: 52, judge: '보완', tone: 'bad' }
    ],
    insight: {
      title: '실험으로 검증한 이력이 없습니다',
      lines: [
        '이 직무 현직자 7명 중 5명(71%)이 “가설을 세우고 실험으로 확인한 경험”을 요구 항목으로 꼽았습니다.',
        '이미 만든 대시보드에서 가설 하나를 골라 검증해보세요.'
      ]
    },
    demands: {
      of: 7,
      items: [
        { item: '가설 · A/B 테스트 경험', count: 5 },
        { item: '지표를 그 지표로 정한 근거', count: 5 },
        { item: '분석 → 의사결정 연결', count: 4 },
        { item: 'SQL 숙련', count: 3 },
        { item: '대시보드 사용률 관리', count: 2 }
      ]
    },
    strengths: [
      'SQL 쿼리 작성 수준이 직무 요구를 넘어섭니다.',
      '데이터 정합성 확인 절차를 스스로 만들어 쓴 이력이 있습니다.',
      '대시보드를 실제 사용자에게 배포한 경험이 있습니다.'
    ],
    gaps: [
      'A/B 테스트 설계 경험이 확인되지 않습니다.',
      '분석 결과가 의사결정으로 이어진 사례가 없습니다.',
      '지표 정의의 근거가 문서로 남아 있지 않습니다.'
    ],
    jobFit: [
      { rank: 1, job: 'Data Analyst', score: 71, note: '현재 지원 직무' },
      { rank: 2, job: 'BI Engineer', score: 74, note: '대시보드 경험 인정' },
      { rank: 3, job: 'Growth Analyst', score: 58, note: '실험 경험 필요' }
    ],
    actions: [
      { no: '01', title: '기존 대시보드 지표로 가설 1건 검증', meta: '예상 2주' },
      { no: '02', title: '지표 정의서 1페이지 작성', meta: '예상 2일' }
    ],
    recommendedProjects: [
      {
        no: 'P1',
        title: '가설 한 건을 끝까지 검증한 실험 기록',
        tag: '실험 · 검증',
        source: '현직자 7명 중 5명이 “가설 · A/B 테스트 경험”을 요구',
        why: '가장 낮은 항목이자 가장 많이 꼽힌 요구입니다. 실제 트래픽이 없어도 공개 커머스 데이터로 설계와 해석을 보일 수 있습니다.',
        todo: [
          '공개 커머스 로그에서 전환에 영향을 줄 변수 하나 고르기',
          '가설 · 지표 · 최소 표본 크기 · 중단 기준을 먼저 문서화',
          '집단을 나눠 비교하고 신뢰구간까지 계산',
          '결과가 유의하지 않은 경우의 결론까지 쓰기'
        ],
        output: '실험 설계 문서 · 분석 노트북 · 결론 한 장',
        weeks: '2주',
        resume: '전환율 가설 검증 실험 설계·분석 — 최소 표본 8,400건 산정, 전환 2.8% → 3.3% (95% CI 0.1~0.9%p)'
      },
      {
        no: 'P2',
        title: '지표 정의서와 대시보드 사용률 점검',
        tag: '지표 설계',
        source: '현직자 7명 중 5명이 “지표를 그 지표로 정한 근거”를 요구',
        why: '대시보드는 이미 만들었으니, 왜 그 지표인지와 실제로 쓰이는지를 채우면 그대로 강점이 됩니다.',
        todo: [
          '핵심 지표 5개의 정의 · 계산식 · 제외 조건 정리',
          '지표별로 어떤 의사결정에 쓰이는지 한 줄씩 적기',
          '대시보드 접속 로그로 주간 사용자 수 확인',
          '쓰이지 않는 지표는 근거를 적고 정리'
        ],
        output: '지표 정의서 1페이지 · 사용률 리포트',
        weeks: '1주',
        resume: '핵심 지표 정의서 작성 및 대시보드 정리 — 지표 12개 → 5개, 주간 사용자 4명 → 11명'
      }
    ],
    resumeHighlights: [
      {
        before: 'SQL로 데이터를 추출해 분석했습니다.',
        after: '전환율 가설 검증 실험 설계·분석 — 전환 2.8% → 3.3% (95% CI 0.1~0.9%p, 표본 8,400건)',
        why: '추출이 아니라 검증까지 갔다는 사실이 이 직무의 첫 기준입니다.'
      },
      {
        before: '대시보드를 만들어 팀에 공유했습니다.',
        after: '핵심 지표 정의서 작성 및 대시보드 정리 — 지표 12개 → 5개, 주간 사용자 4명 → 11명',
        why: '만든 것보다 쓰이게 만든 것이 평가됩니다.'
      }
    ],
    questions: [
      { q: 'A/B 테스트를 설계해본 적이 있습니까?', why: '실험 항목이 가장 낮습니다.' },
      { q: '그 지표를 핵심 지표로 정한 근거는 무엇입니까?', why: '지표 설계 항목의 확인 질문입니다.' },
      { q: '데이터가 이상할 때 어떤 순서로 확인합니까?', why: 'SQL 항목이 높아 심화 질문으로 이어집니다.' }
    ]
  }
]

export const reportById = id => reports.find(r => r.id === id) || reports[0]

// 기업명 → 그 기업에서 받은 가장 최근 진단 결과.
// match 점수는 기업의 속성이 아니라 진단 결과이므로, 진단한 기업에만 존재한다.
export const matchByCompany = reports.reduce((m, r) => {
  const prev = m[r.meta.companyName]
  if (!prev || r.meta.date > prev.date) {
    m[r.meta.companyName] = { id: r.id, score: r.overall.fitScore, date: r.meta.date, role: r.meta.positionName }
  }
  return m
}, {})
