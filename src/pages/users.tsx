import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { User } from "../hooks/useUser";
import { useUsers } from "../hooks/useUsers";
import { sleep } from "../utils/sleep";

export function Users() {
  const { users, isLoading, isFetching, refetch } = useUsers();

  const queryClient = useQueryClient()

  function handleMouseEnter(userId: string) {
    queryClient.prefetchQuery({
      queryKey: ["users", userId],
      queryFn: async (): Promise<User> => {
        const response = await fetch(`http://localhost:3333/users?id=${userId}`)
        await sleep()
        return response.json()
      },
    })
  }

  return (
    <div className="py-10">
      <button
        onClick={() => refetch()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10"
        disabled={isFetching}
      >
        {!isLoading && isFetching ? 'Carregando...' : 'Atualizar listagem'}
      </button>

      {isLoading && <p>Carregando...</p>}

      {users && !isLoading && (
        <>
          <h1
            className="text-2xl font-bold mb-5"
          >
            Usuários
          </h1>

          <ul className="grid gap-6 md:grid-cols-2">
            {users.map(user => (
              <li
                key={user.id}
                className="border p-4 border-gray-500 rounded-lg flex justify-between items-center"
              >
                <div className="overflow-hidden  w-1/2">
                  <p className="overflow-hidden text-ellipsis">{user.name}</p>
                  <small className="italic block">{user.email}</small>
                  <Link
                    to="/profile/$userId"
                    params={{ userId: String(user.id) }}
                    preload="intent"
                    onMouseEnter={() => handleMouseEnter(String(user.id))}
                    className="text-blue-500 hover:underline text-base"
                  >
                    Ver detalhes
                  </Link>
                </div>

                <div>
                  <small className="block whitespace-nowrap">{new Date(user.createdAt).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
