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
        Listar usuários
      </button>

      {isLoading && <p>Carregando...</p>}

      {users && !isLoading && (
        <>
          <h1
            className="text-2xl font-bold mb-5"
          >
            Usuários
          </h1>

          <ul>
            {users.map(user => (
              <li 
              key={user.id}
              className="mb-5 border p-4 border-gray-500 rounded-lg w-min whitespace-nowrap"
              >
                <p>{user.name} - {user.email}</p>
                <Link
                  to="/profile/$userId"
                  params={{ userId: String(user.id) }}
                  preload="intent"
                  onMouseEnter={() => handleMouseEnter(String(user.id))}
                  className="text-blue-500 hover:underline text-base"
                >
                  Ver detalhes
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {!isLoading && isFetching && <p className="mt-5">Atualizando listagem...</p>}
    </div>
  )
}
