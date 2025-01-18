"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma";
import { QuestionSchema, QuestionSchemaType } from "@/lib/schema/save-answer-schema"
import { handleError } from "@/utils/error-logs";

export const SaveQuestion = async (formData: QuestionSchemaType) => {
    try {
        const session = await auth();
        if(!session) throw new Error('You must be logged in to save a question');
        if (!session.user.id) throw new Error('User ID is missing');

        const {
            success,
            data
        } = QuestionSchema.safeParse(formData);
        if(!success) throw new Error('Invalid form data');
        
        return await prisma.question.create({
            data: {
                question: data.question,
                projectId: data.projectId,
                filesReference: data.filesReference,
                userId: session.user.id as string,
                answer: data.answer
            }
        })
    } catch (error) {
        handleError(error);
    }
}

export const GetSavedQuestions = async () => {
    try {
        const session = await auth();
        if(!session) throw new Error('You must be logged in to save a question');
        if (!session.user.id) throw new Error('User ID is missing');
        
        return await prisma.question.findMany({
            where: {
                userId: session.user.id as string
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (error) {
        handleError(error);
    }
}