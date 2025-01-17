import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import LinkedIn from "next-auth/providers/linkedin"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/schema/login-schema";
import bcrypt from "bcryptjs"
import { GetUserByEmail } from "./actions/data/user"

export default {
    providers: [
        Google,
        Github,
        Twitter,
        LinkedIn,
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials){
                const {
                    success,
                    data
                } = LoginSchema.safeParse(credentials);
                
                if(!success){
                    return null;
                }

                const user = await GetUserByEmail(data?.email);
                const password_match = await bcrypt.compare(data.password, user?.password ?? "")

                if(user && password_match){
                    return user;
                }

                if(!user){
                    return null;
                }
                return null;
            }
        }),
    ]
} satisfies NextAuthConfig