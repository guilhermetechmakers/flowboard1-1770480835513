import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDashboards,
  getDashboard,
  createDashboard,
  updateDashboard,
  deleteDashboard,
} from '@/api/dashboard'
import type { Dashboard } from '@/types'

export const DASHBOARD_CRUD_KEYS = {
  list: ['dashboard', 'list'] as const,
  detail: (id: string) => ['dashboard', 'detail', id] as const,
}

export function useDashboards() {
  return useQuery({
    queryKey: DASHBOARD_CRUD_KEYS.list,
    queryFn: getDashboards,
  })
}

export function useDashboard(id: string | null) {
  return useQuery({
    queryKey: DASHBOARD_CRUD_KEYS.detail(id ?? ''),
    queryFn: () => getDashboard(id!),
    enabled: !!id,
  })
}

export function useCreateDashboard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { title: string; description?: string }) =>
      createDashboard({ title: data.title, description: data.description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_CRUD_KEYS.list })
    },
  })
}

export function useUpdateDashboard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<Pick<Dashboard, 'title' | 'description' | 'status'>>
    }) => updateDashboard(id, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_CRUD_KEYS.list })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_CRUD_KEYS.detail(updated.id) })
    },
  })
}

export function useDeleteDashboard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteDashboard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_CRUD_KEYS.list })
    },
  })
}
