import { createLazyFileRoute } from '@tanstack/react-router';
import { Users } from '../pages/users';

export const Route = createLazyFileRoute('/users')({
  component: Users,
  pendingComponent: () => <div>Carregando...</div>,
  errorComponent: () => <div>Erro não tratado</div>,
})