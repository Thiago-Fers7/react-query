import { useQueryClient, useMutation } from "@tanstack/react-query"
import { sleep } from "../utils/sleep"
import { User } from "./useUser"

export function useCreateUser() {
  const queryClient = useQueryClient()

  const { mutate, isPending, data } = useMutation({
    mutationFn: async (data: { name: string, email: string, createdAt: Date }): Promise<User> => {
      await sleep()

      const response = await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Erro ao criar usuário')
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['users'], (old: User[]) => [...old, data])
    }
  })

  return {
    createdUser: data,
    isLoading: isPending,
    createUser: mutate,
   }
}
