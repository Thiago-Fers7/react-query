import { createLazyFileRoute } from '@tanstack/react-router'
import { CreateUserPage } from '../pages/create-user'

export const Route = createLazyFileRoute('/create-user')({
  component: CreateUserPage,
})
