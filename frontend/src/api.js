const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'
const token = () => localStorage.getItem('accessToken')
const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token() && { Authorization: `Bearer ${token()}` }), ...options.headers } })
  const body = await response.json().catch(() => null)
  if (!response.ok) throw new Error(body?.message || '요청을 처리하지 못했습니다.')
  return body
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
  download: id => request(`/reports/${id}/download`)
}

export const waitForReport = async reportId => {
  while (true) {
    const report = await api.report(reportId)
    if (report.status === 'COMPLETED') return report
    if (report.status === 'FAILED') throw new Error(report.error?.message || '분석 생성에 실패했습니다.')
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
}
