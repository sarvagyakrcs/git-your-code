"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { LuLoader } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginSchema, LoginSchemaType } from "@/lib/schema/login-schema"
import { ErrorMessage } from "@/components/global/error-message"
import { Login } from "@/actions/auth/login"
import ProviderSignIn from "./provider-login"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  const loginMutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: Login,
    onMutate: () => {
      toast.loading("Logging in", { id: "login" })
    },
    onError: (error) => {
      toast.error(error.message, { id: "login" })
    },
    onSuccess: () => {
      toast.success("Successfully Logged In", { id: "login" })
    }
  })

  const handleLogin = async (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit(handleLogin)} className="">
        <Card className="w-full my-6 border-none shadow-none min-w-60">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("email", { required: "Email is required" })}
                  id="email"
                  placeholder="abc@example.com"
                  className="pl-10"
                  disabled={loginMutation.isPending}
                />
              </div>
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("password", { required: "Password is required" })}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  disabled={loginMutation.isPending}
                />
              </div>
              {errors.password && <ErrorMessage message={errors.password.message} />}
            </div>
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? <LuLoader className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
            </Button>
            <ProviderSignIn />
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Link href="/password/reset/form" className="text-sm text-primary hover:underline">
              Forgotten your password?
            </Link>
            <p className="text-sm text-muted-foreground">
              Lost? <Link className="text-primary hover:underline" href="/">Go back home</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

