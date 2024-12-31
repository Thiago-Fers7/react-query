import { useQuery } from "@tanstack/react-query";
import { sleep } from "../utils/sleep";
import { User } from "./useUser";

export function useUsers() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    enabled: false,
    queryKey: ["users"],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch('http://localhost:3333/users')
      await sleep()
      return response.json()
    },
  });

  return {
    users: data,
    isLoading,
    isFetching,
    refetch
  }
}