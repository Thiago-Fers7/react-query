import { createLazyFileRoute } from '@tanstack/react-router'
import { UserProfile } from '../../pages/user-profile'

export const Route = createLazyFileRoute('/profile/$userId')({
  component: UserProfileComponent,
})

function UserProfileComponent() {
  const { userId } = Route.useParams()

  return <UserProfile userId={userId} />
}