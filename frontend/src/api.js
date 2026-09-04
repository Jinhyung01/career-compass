import { isDemoSession } from './auth.js'
import { reportById, reports as demoReports } from './data/reports.js'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')
const token = () => localStorage.getItem('accessToken')

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

const demoDate = value => `${value.replaceAll('.', '-')}T00:00:00Z`
const demoReportItem = report => ({
  reportId: report.id,
  reportType: 'FIT_ANALYSIS',
  status: 'COMPLETED',
  companyCode: report.meta.companyName === 'SK Hynix' ? 'SK001' : null,
  companyName: report.meta.companyName,
  fitScore: report.overall.fitScore,
  createdAt: demoDate(report.meta.date)
})

const demoReportDetail = id => {
  const report = reportById(id)
  const score = report.overall.fitScore
  return {
    ...demoReportItem(report),
    result: {
      companyName: report.meta.companyName,
      positionName: report.meta.positionName,
      scoreDetail: {
        techScore: Math.round(score * 0.3),
        positionScore: Math.round(score * 0.2),
        projectExperienceScore: Math.round(score * 0.3),
        cultureScore: Math.round(score * 0.2)
      },
      fitReasons: report.insight.lines,
      strengths: report.strengths,
      gaps: report.gaps,
      recommendedLearning: report.actions.map(item => item.title),
      preparationDirection: report.headline,
      recommendedProjects: report.recommendedProjects.map(item => item.title),
      resumeHighlights: report.resumeHighlights.map(item => item.after)
    }
  }
}

const demoRequest = (path, responseType) => {
  if (path === '/me/profile') {
    return {
      desiredPosition: { positionId: 10, positionName: 'AI Engineer' },
      techStacks: [
        { techId: 101, techName: 'Java' },
        { techId: 102, techName: 'Spring' },
        { techId: 103, techName: 'PostgreSQL' }
      ],
      contents: []
    }
  }
  if (path.startsWith('/reports?')) {
    return { items: demoReports.map(demoReportItem), totalPages: 1, totalElements: demoReports.length }
  }
  if (path === '/reports') return { reportId: 'r1', status: 'PENDING' }
  if (/^\/reports\/[^/]+\/file$/.test(path)) {
    return responseType === 'blob'
      ? new Blob(['%PDF-1.4\n% Jobpill demo report\n'], { type: 'application/pdf' })
      : null
  }
  if (/^\/reports\/[^/]+$/.test(path)) return demoReportDetail(path.split('/').pop())
  // AI·프로필 목업에 없는 API는 실제 Backend로 전달한다.
  return undefined
}

const request = async (path, options = {}, responseType = 'json') => {
  if (isDemoSession.value && !path.startsWith('/auth/')) {
    const mocked = demoRequest(path, responseType)
    if (mocked !== undefined) return mocked
  }
  const headers = {
    ...(options.body && { 'Content-Type': 'application/json' }),
    ...(token() && { Authorization: `Bearer ${token()}` }),
    ...options.headers
  }
  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    if (response.status === 401) window.dispatchEvent(new Event('jobpill:unauthorized'))
    throw new ApiError(body?.message || '요청을 처리하지 못했습니다.', response.status, body?.code)
  }
  if (response.status === 204) return null
  return responseType === 'blob' ? response.blob() : response.json()
}

export const api = {
  register: payload => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: payload => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => request('/me/profile'),
  saveProfile: payload => request('/me/profile', { method: 'PUT', body: JSON.stringify(payload) }),
  companies: query => request(`/companies?${new URLSearchParams(query)}`),
  company: companyCode => request(`/companies/${companyCode}`),
  createReport: payload => request('/reports', { method: 'POST', body: JSON.stringify(payload) }),
  report: id => request(`/reports/${id}`),
  reports: query => request(`/reports?${new URLSearchParams({ size: 20, ...query })}`),
  download: id => request(`/reports/${id}/download`),
  downloadFile: id => request(`/reports/${id}/file`, { headers: { Accept: 'application/pdf' } }, 'blob')
}

export const waitForReport = async reportId => {
  while (true) {
    const report = await api.report(reportId)
    if (report.status === 'COMPLETED') return report
    if (report.status === 'FAILED') throw new Error(report.error?.message || '분석 생성에 실패했습니다.')
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
}

export const saveBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}
