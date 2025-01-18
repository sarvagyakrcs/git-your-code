"use server"
import prisma from "@/lib/prisma";

export const handleError = async (error: any) => {
    if(!(error instanceof Error)){
        throw new Error("Invalid error")
    }
    console.error({error});
    // update db fire and forget
    prisma.error.create({
        data: {
            message: error.message,
            stack: error.stack || "No stack trace",
        }
    }).catch(e => {
        handleError(e);
    });
}