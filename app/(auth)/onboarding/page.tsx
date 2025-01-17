import { PROJECT_NAME } from "@/metadata";
import { AuthDialog } from "./_components/auth-dialog";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to {PROJECT_NAME}</h1>
        <p className="text-xl text-muted-foreground"></p>
        <AuthDialog />
      </div>
    </main>
  )
}

