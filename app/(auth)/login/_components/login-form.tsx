"use client"

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
import { useForm } from "react-hook-form"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { LoginSchema } from "@/lib/schema/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorMessage } from "@/components/global/error-message"
import { useState } from "react"
import { LuLoader } from "react-icons/lu"
import { Login } from "@/actions/auth/login"
import SuccessToast from "@/components/global/success-message"
import Link from "next/link"
import { LoginSchemaType } from "@/lib/schema/login-schema"
import ProviderSignIn from "./provider-login"
import { handleError } from "@/utils/error-logs"

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
    });

    const handleLogin = async (data: LoginSchemaType) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response: { success: string; success_status: boolean; error?: string } = await Login(data);
            if (response && response.success_status) {
                setSuccess(response.success);
            } else if (response && !response.success_status && response.error) {
                setError(response.error);
            } else {
                setError("An unexpected error occurred");
            }
        } catch (error) {
            setError("An error occurred while logging in");
            handleError(error); // Log the error for debugging purposes
        } finally {
            setIsLoading(false);
            if (!error) {
                reset()
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAyNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAyLjc5IDQgNCA0IDQtMS43OSA0LTR6bTI0IDhDNDggMjkuNzkgNDYuMjEgMjggNDQgMjhzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')]">
            <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-md px-4">
                <Card className="w-full my-6 bg-white shadow-lg border border-gray-200">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
                        <CardDescription className="text-center text-gray-500">
                            Enter your email below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    disabled={isLoading}
                                    {...register("email", { required: "Email is required" })}
                                    id="email"
                                    placeholder="abc@example.com"
                                    className="pl-10 font-mono"
                                />
                            </div>
                            {errors.email && <ErrorMessage message={errors.email.message} />}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    disabled={isLoading}
                                    {...register("password", { required: "Password is required" })}
                                    id="password"
                                    type="password"
                                    placeholder="⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺"
                                    className="pl-10"
                                />
                            </div>
                            {errors.password && <ErrorMessage message={errors.password.message}/>}
                            {error && <ErrorMessage message={error} />}
                            {success && <SuccessToast message={success} />}
                        </div>
                        <ProviderSignIn />
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-dark transition-colors duration-200">
                            {isLoading ? <LuLoader className="animate-spin mr-2" /> : "Login"}
                        </Button>
                        <Link href="/password/reset/form" className="text-primary hover:underline mt-4 text-sm self-center">
                            Forgotten Your Password?
                        </Link>
                        <p className="text-sm mt-2 text-center text-gray-600">
                            Lost? <Link className="text-primary hover:underline" href="/">Go Back Home</Link>
                        </p>
                        {errors.root && <ErrorMessage message={errors.root.message} />}
                    </CardFooter>
                </Card>
                <Card className="mt-4 p-4 text-sm w-full flex items-center justify-center bg-white shadow-md border border-gray-200">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Create New Account
                        </Link>
                    </p>
                </Card>
            </form>
        </div>
    )
}

