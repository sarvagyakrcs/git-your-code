"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import OnboardingForm from "./signup-form"

export function SignUpForm() {
  const [role, setRole] = useState<"client" | "freelancer" | null>(null)

  return (
    <div className="space-y-6 py-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-center">Choose your account type</h2>
        <p className="text-sm text-muted-foreground text-center">
          Select how you want to use our platform
        </p>
      </div>
      <div className="grid gap-4">
        <Button
          variant="outline"
          className="h-24 justify-start p-4"
          onClick={() => setRole("client")}
        >
          <div className="text-left">
            <h3 className="font-semibold mb-1">Join as a Admin</h3>
            <p className="text-sm text-muted-foreground">
              Become an admin and manage your team
            </p>
          </div>
        </Button>
        <Button
          variant="outline"
          className="h-24 justify-start p-4"
          onClick={() => setRole("freelancer")}
        >
          <div className="text-left">
            <h3 className="font-semibold mb-1">Join as a User</h3>
            <p className="text-sm text-muted-foreground">
              Create an account as a normal user
            </p>
          </div>
        </Button>
      </div>

      <Sheet open={role === "client"} onOpenChange={() => setRole(null)}>
        <SheetContent side="right" className="sm:max-w-[480px] overflow-scroll">
          <SheetHeader className="pb-6">
            <SheetTitle className="text-2xl font-semibold">Sign up as a admin</SheetTitle>
            <SheetDescription>
              Create an account as admin
            </SheetDescription>
          </SheetHeader>
          <OnboardingForm Role="ADMIN" />
        </SheetContent>
      </Sheet>

      <Sheet open={role === "freelancer"} onOpenChange={() => setRole(null)}>
        <SheetContent side="right" className="sm:max-w-[480px]">
          <SheetHeader className="pb-6">
            <SheetTitle className="text-2xl font-semibold">Sign up as a normal user</SheetTitle>
            <SheetDescription>
              Create an account as a normal user
            </SheetDescription>
          </SheetHeader>
          <OnboardingForm Role="USER" />
        </SheetContent>
      </Sheet>
    </div>
  )
}

