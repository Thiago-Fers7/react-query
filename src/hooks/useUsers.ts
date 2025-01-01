import { useQuery } from "@tanstack/react-query";
import { sleep } from "../utils/sleep";
import { User } from "./useUser";

export function useUsers() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('http://localhost:3333/users')
      await sleep()
      return response.json()
    },
  });

  const orderedUsers = data?.sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1
  })

  return {
    users: orderedUsers,
    isLoading,
    isFetching,
    refetch
  }
}
