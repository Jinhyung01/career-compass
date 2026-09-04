import { api } from '../api.js'
import { companies as mockCompanies } from './companies.js'

// 현재 Backend에는 직무·기술 마스터 조회 API가 없어 Flyway V2의 식별자를 사용한다.
export const positionOptions = [
  { id: 10, name: '백엔드 개발자' }
]

export const techOptions = [
  { id: 101, name: 'Java' },
  { id: 102, name: 'Spring' },
  { id: 103, name: 'PostgreSQL' },
  { id: 104, name: 'Docker' }
]

const normalizeName = value => value?.toLowerCase().replace(/\s+/g, '') || ''

export const enrichCompany = company => {
  const mock = mockCompanies.find(item =>
    item.companyCode === company.companyCode ||
    normalizeName(item.companyName) === normalizeName(company.companyName)
  )

  return {
    ...(mock || {}),
    ...company,
    role: mock?.role || company.industry || '직무 정보 준비 중',
    interviewed: mock?.interviewed || '정보 없음',
    freshness: mock?.freshness || 0,
    jobs: mock?.jobs || [],
    culture: mock?.culture || [],
    insiders: mock?.insiders || [],
    domain: mock?.domain || ''
  }
}

export const fetchAllCompanies = async query => {
  const first = await api.companies({ ...(query && { query }), page: 0, size: 100 })
  const rest = first.totalPages > 1
    ? await Promise.all(
        Array.from({ length: first.totalPages - 1 }, (_, index) =>
          api.companies({ ...(query && { query }), page: index + 1, size: 100 })
        )
      )
    : []

  return [first, ...rest].flatMap(page => page.items).map(enrichCompany)
}

export const formatDate = value => value ? new Date(value).toLocaleDateString('ko-KR') : '-'

export const gradeOf = score => {
  if (score >= 85) return 'A'
  if (score >= 70) return 'B'
  if (score >= 55) return 'C'
  return 'D'
}
