import { queryOptions } from '@tanstack/react-query'

const apiURL = 'https://jsonplaceholder.typicode.com/todos'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const getTodos = queryOptions({
  queryKey: ['todos'],
  queryFn: async () => {
    const res = await fetch(apiURL)
    return res.json() as Promise<Todo[]>
  },
})

export const getTodo = (id: string) =>
  queryOptions({
    queryKey: ['todo', id],
    queryFn: async () => {
      const res = await fetch(`${apiURL}/${id}`)
      return res.json() as Promise<Todo>
    },
  })
