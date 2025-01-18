import prisma from "@/lib/prisma";
import { handleError } from "@/utils/error-logs";

export const getVerificationTokenByEmail = async (email : string) => {
    const db = prisma;
    try {
        const verificationToken = db.verificationToken.findFirst({
            where: {
                email: email
            }
        })
        return verificationToken
    } catch (error ) {
        handleError(error);
        return null;
    }
}

export const getVerificationTokenByToken = async (token : string) => {
    const db = prisma;
    try {
        const verificationToken = db.verificationToken.findUnique({
            where: {
                token: token
            }
        })
        return verificationToken
    } catch (error) {
        handleError(error);
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (token : string) => {
    const db = prisma;
    try {
        const verificationToken = db.passwordResetToken.findUnique({
            where: {
                token: token
            }
        })
        return verificationToken
    } catch (error) {
        handleError(error);
        return null;
    }
}