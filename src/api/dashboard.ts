import { api } from '@/lib/api'
import type { Dashboard } from '@/types'

export async function getDashboards(): Promise<Dashboard[]> {
  return api.get<Dashboard[]>('/dashboards')
}

export async function getDashboard(id: string): Promise<Dashboard> {
  return api.get<Dashboard>(`/dashboards/${id}`)
}

export async function createDashboard(data: {
  title: string
  description?: string
}): Promise<Dashboard> {
  return api.post<Dashboard>('/dashboards', data)
}

export async function updateDashboard(
  id: string,
  data: Partial<Pick<Dashboard, 'title' | 'description' | 'status'>>
): Promise<Dashboard> {
  return api.patch<Dashboard>(`/dashboards/${id}`, data)
}

export async function deleteDashboard(id: string): Promise<void> {
  return api.delete(`/dashboards/${id}`)
}
