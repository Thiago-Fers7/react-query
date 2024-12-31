import { createLazyFileRoute } from '@tanstack/react-router'

function RouteComponent() {
  return <div>Hello "/"!</div>
}

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})