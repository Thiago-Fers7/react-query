import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    }
  }
})

function RootComponent() {
  return (
    <div className="p-10 text-xl">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 [&.active]:text-green-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link to="/users" className="text-blue-500 hover:text-blue-700 [&.active]:text-green-300">Usuários</Link>
        </li>
        <li>
          <Link to="/create-user" className="text-blue-500 hover:text-blue-700 [&.active]:text-green-300">Criar usuário</Link>
        </li>
      </ul>

      <QueryClientProvider client={queryClient}>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />

        <Outlet />
      </QueryClientProvider>
    </div>
  )
}
