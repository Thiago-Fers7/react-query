import { useQuery } from "@tanstack/react-query";
import { sleep } from "../utils/sleep";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

export function useUser(userId: string) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users", userId],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch(`http://localhost:3333/users?id=${userId}`)
      await sleep()
      return response.json()
    },
  });

  return {
    user: data ? data[0] : undefined,
    isLoading,
    isFetching
  }
}
