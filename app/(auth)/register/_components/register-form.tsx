/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { FaGoogle, FaLinkedin } from "react-icons/fa"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorMessage } from "@/components/global/error-message"
import { useCallback, useEffect, useState } from "react"
import { RegisterSchema, RegisterSchemaType } from "@/lib/schema/register-schema"
import { LuLoader } from "react-icons/lu"
// import Register from "@/actions/auth/register"
import SuccessToast from "@/components/global/success-message"
import Link from "next/link"
import { Toaster } from "react-hot-toast"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { PROFILE_PIC_ALLOWED_FILE_TYPES, PROFILE_PIC_MAX_FILE_SIZE } from "../../../../metadata"
import { GetUserByEmail, GetUserByUsername } from "@/actions/data/user"
import ImageCropper from "./image-cropper"


export function RegisterForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [profilePic, setProfilePic] = useState<File | null>(null)
    const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [showCropper, setShowCropper] = useState(false)
    const [croppedImage, setCroppedImage] = useState<string | null>(null)

    const useDebouncedEffect = (callback: () => void, delay: number, dependencies: unknown[]) => {
        useEffect(() => {
            const handler = setTimeout(() => {
                callback();
            }, delay);
    
            return () => {
                clearTimeout(handler);
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [...dependencies, delay]);
    };

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
    });

    // const handleSignUp = async (data: RegisterSchemaType) => {
    //     setLoading(true);
    //     setError("");
    //     setSuccess("");

    //     try {
    //         if (croppedImage) {
    //             try {
    //                 setIsUploading(true);
    //                 const response = await fetch(croppedImage);
    //                 const blob = await response.blob();
    //                 const file = new File([blob], "profile_picture.jpg", { type: "image/jpeg" });
    //                 // const checkSum = await computeSha256(file);
    //                 // const signedUrlResult = await getSignedUrlUnauthenticated(checkSum);
    //                 if (signedUrlResult.error) {
    //                     console.error({error})
    //                     setError(signedUrlResult.error)
    //                 }
    //                 const url = signedUrlResult.success?.url;

    //                 if (url) {
    //                     try {
    //                         const uploadResponse = await fetch(url, {
    //                             method: "PUT",
    //                             body: file,
    //                             headers: {
    //                                 "Content-Type": file.type,
    //                             }
    //                         })
    //                         data["image"] = url.split("?")[0];
    //                     } catch (error) {
    //                         console.error(error);
    //                     }
    //                 } else {
    //                     setError("Failed to get the signed URL.");
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //             } finally {
    //                 setIsUploading(false);
    //             }
    //         }
    //         console.log({data})
    //         const res = await Register(data);
    //         if (res.error) {
    //             setError(res.error);
    //         } else if (res.success) {
    //             setSuccess(res.success);
    //             reset();
    //             setProfilePic(null);
    //             setProfilePicPreview(null);
    //             setCroppedImage(null);
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         setError("An unexpected error occurred. Please try again.");
    //     } finally {
    //         setLoading(false);
    //         setUploadProgress(0);
    //     }
    // };

    const handleProfilePicChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.size > PROFILE_PIC_MAX_FILE_SIZE) {
                setError("File size should be less than 500KB");
                return;
            }

            if (!PROFILE_PIC_ALLOWED_FILE_TYPES.includes(file.type)) {
                setError("File type should be JPEG, PNG, or GIF");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicPreview(e.target?.result as string);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
            setError("");
        }
    }, []);

    const handleCropComplete = (croppedImageUrl: string) => {
        setCroppedImage(croppedImageUrl);
        setShowCropper(false);
    }

    const handleCropCancel = () => {
        setShowCropper(false);
        setProfilePicPreview(null);
        setCroppedImage(null);
    }

    const checkUsername = async () => {
        if (username.length < 6) {
            return;
        }
        try {
            const result = await GetUserByUsername(username);
            setError(result ? "Username Already Taken." : "");
        } catch (err) {
            console.error("Error checking username:", err);
            setError("An error occurred while checking the username.");
        }
    };

    const checkEmail = async () => {
        if (email.length < 6) {
            setError("");
            return;
        }
        try {
            const result = await GetUserByEmail(email);
            setError(result ? "Email Already Taken." : "");
        } catch (err) {
            console.error("Error checking email:", err);
            setError("An error occurred while checking the email.");
        }
    };

    // Debounce username check
    useDebouncedEffect(() => {
        checkUsername();
    }, 500, [username]);

    // Debounce email check
    useDebouncedEffect(() => {
        checkEmail();
    }, 500, [email]);

    return (
        <>
        <form onSubmit={handleSubmit(() => console.log("SAd"))} >
            <Card className="w-full max-w-sm my-6 bg-dark-bg text-primary border-none ">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your credentials below to create an account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            disabled={isLoading}
                            {...register("email")}
                            id="email"
                            placeholder="abc@example.com"
                            className="font-mono"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <ErrorMessage message={errors.email.message} />}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            disabled={isLoading}
                            {...register("username")}
                            id="username"
                            type="text"
                            placeholder="john_doe"
                            className="font-mono"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <ErrorMessage message={errors.username.message} />}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            disabled={isLoading}
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺"
                        />
                        {errors.password && <ErrorMessage message={errors.password.message} />}
                        <ErrorMessage message={error} />
                        <SuccessToast variant="hot-toast" message={success} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="profile-pic" className="block text-sm font-medium text-muted-foreground">
                            Profile Picture
                        </label>
                        <div className="relative">
                            <Input
                                id="profile-pic"
                                type="file"
                                accept="image/jpeg,image/png,image/gif"
                                onChange={handleProfilePicChange}
                                disabled={isLoading}
                            />
                            <AnimatePresence>
                                {isUploading && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        exit={{ width: 0 }}
                                        className="absolute bottom-0 left-0 h-1 bg-primary"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                        {croppedImage && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="mt-2"
                            >
                                <Image
                                    src={croppedImage}
                                    alt="Profile picture preview"
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover"
                                />
                            </motion.div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button
                        type="submit"
                        disabled={isLoading || error !== ""}
                        className="w-full hover:bg-white hover:text-black transition"
                    >
                        {isLoading ? <LuLoader className="animate-spin" /> : "Register"}
                    </Button>

                    <div className="grid grid-cols-2 gap-2 m-2 w-full">
                        <Button disabled={isLoading} variant="outline" className="w-full hover:bg-white hover:text-black transition"><FaGoogle className="ml-2 size-5" /></Button>
                        <Button disabled={isLoading} variant="outline" className="w-full hover:bg-white hover:text-black transition"><FaLinkedin className="ml-2 size-5" /></Button>
                    </div>
                    <span className="p-4 text-sm">Already Have an Account? <a className="text-blue-500 underline" href="/login">Login</a></span>
                    <span className="text-sm">Lost, Want to Go Back? <Link className="text-blue-500 underline" href="/">Home</Link></span>
                    {errors.root && <ErrorMessage message={errors.root.message} />}
                </CardFooter>
            </Card>
            <Card className="p-2 text-sm w-full max-w-sm flex items-center justify-center bg-dark-bg text-gray-300 border-none ">
                <a href="/login" className="text-blue-500 text-center hover:underline brightness-95" >Login to Existing Account</a>
            </Card>
            <Toaster />
            
        </form>
        {showCropper && profilePicPreview && (
            <ImageCropper
                imageSrc={profilePicPreview}
                onCropComplete={handleCropComplete}
                onCancel={handleCropCancel}
            />
        )}
        </>
    )
}