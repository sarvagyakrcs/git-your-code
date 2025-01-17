import UserButtonClient from "./user-button-client"
import { auth } from "@/auth"

export default async function UserButton() {
  const session = await auth();

  if (!session) {
    return null
  }

  return (
    <UserButtonClient session={session} />
  )
}

