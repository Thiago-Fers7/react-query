import { useUser } from "../hooks/useUser";

type Params = {
  userId: string;
}

export function UserProfile({ userId }: Params) {
  const { user, isLoading, isFetching } = useUser(userId as string);

  return (
    <div className="py-10">
      {user && !isLoading && (
        <div>
          <h1 className="mb-4">Perfil de {user.name}</h1>

          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Salvar
            </button>
          </form>
        </div>
      )}

      {isLoading && <p>Carregando...</p>}
      {isFetching && !isLoading && <p className="mt-4">Atualizando...</p>}
    </div>
  )
}
