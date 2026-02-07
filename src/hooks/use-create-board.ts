import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBoard } from '@/api/board'
import { DASHBOARD_QUERY_KEYS } from './use-dashboard-data'

export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { title: string; description?: string }) =>
      createBoard({ title: data.title, description: data.description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.projects })
    },
  })
}
