import { Suspense } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { getTodos } from '@/api/todo'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    void queryClient.prefetchQuery(getTodos)
  },
  component: () => {
    return (
      <main className="container grid grid-cols-3 gap-4 py-4">
        <Suspense fallback="loading...">
          <TodoList />
        </Suspense>
      </main>
    )
  },
})

const TodoList = () => {
  const { data } = useSuspenseQuery(getTodos)

  return data.map((todo) => (
    <Link key={todo.id} to={`/${todo.id}`}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{todo.title}</CardTitle>
          <CardDescription>{todo.completed ? 'Completed' : 'Incomplete'}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  ))
}
