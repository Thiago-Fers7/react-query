import { useUser } from "../hooks/useUser";

type Params = {
  userId: string;
}

export function UserProfile({ userId }: Params) {
  const { user, isLoading, isFetching } = useUser(userId as string);
  console.log("user:", user)

  return (
    <div className="py-10">
      {user && !isLoading && (
        <div>
          <h1>Perfil de {user.name}</h1>
          <small
            className="italic"
          >{user.email}</small>
        </div>
      )}
      
      {isLoading && <p>Carregando...</p>}
      {isFetching && !isLoading && <p>Atualizando...</p>}
    </div>
  )
}