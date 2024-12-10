import { Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { getTodo } from '@/api/todo'

export const Route = createFileRoute('/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    void queryClient.prefetchQuery(getTodo(params.id))
  },
  component: () => (
    <main className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <Todo />
      </Suspense>
    </main>
  ),
})

const Todo = () => {
  const { id } = Route.useParams()
  const { data } = useSuspenseQuery(getTodo(id))

  return <div>{data.title}</div>
}
