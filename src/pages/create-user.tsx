import { useCreateUser } from "../hooks/useCreateUser";

export function CreateUserPage() {
  const { createUser, isLoading } = useCreateUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const elements = e.currentTarget.elements as typeof e.currentTarget.elements & {
      name: HTMLInputElement,
      email: HTMLInputElement,
    }

    const name = elements.name.value
    const email = elements.email.value

    createUser({
      name,
      email,
      createdAt: new Date()
    })
  }

  return (
    <div className="py-10">
      <div>
        <h1 className="mb-4">Criar usuário</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john@email.com"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Criando...' : 'Criar'}
          </button>
        </form>
      </div>
    </div>
  )
}
