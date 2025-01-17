"use server"
import prisma from "@/lib/prisma"
import { RegisterSchema } from "@/lib/schema/register-schema"
import * as z from "zod"
type schema_type = z.infer< typeof RegisterSchema >
import bcrypt from "bcryptjs"
import { generateVerificationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"
import { GetUserByEmail, GetUserByUsername } from "../data/user"
import { generateAvatar } from "@/utils/generate-avatar"
import { $Enums } from "@prisma/client"

const Register = async (credentials : schema_type, type : $Enums.UserRole) => {
    const {
        success,
        data
    } = RegisterSchema.safeParse(credentials)

    if(!success){
        throw new Error('Invalid Data!')
    }

    const user = await GetUserByEmail(data.email);
    if(user){
        throw new Error('Email Already Taken!')
    }

    const user_by_username = await GetUserByUsername(data.username);
    if(user_by_username){
        throw new Error('Username Already Taken!')
    }

    const db = prisma;
    const hashed_password = await bcrypt.hash(data.password, 10);

    await db.user.create({
        data: {
            email: data.email,
            password: hashed_password,
            userName: data.username,
            image: data.image ? data.image : generateAvatar(data.firstname + " " + data.lastname),
            name: data.middlename ? data.firstname + " " + data.middlename + " " + data.lastname : data.firstname + " " + data.lastname,
            role: type,
        }
    })

    const verificationToken = await generateVerificationToken(data.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {
        'success' : 'Confirmation Email Sent!.'
    }
}

export default Register;