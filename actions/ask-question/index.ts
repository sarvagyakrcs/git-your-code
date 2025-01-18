"use server"
import { streamText } from "ai"
import { createStreamableValue } from "ai/rsc"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateVectorEmbeddings } from "../gemini"
import prisma from "@/lib/prisma"
import { GetAskAQuestionPrompt } from "@/lib/get-prompts"

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY
})

export const askQuestion = async (question: string, projectId: string) => {
    const stream = createStreamableValue()
    const queryVector = await generateVectorEmbeddings(question)
    const vectorQuery = `[${queryVector.join(",")}]`

    const result = await prisma.$queryRaw`
        SELECT "fileName", "sourceCode", "summary",
        1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS CosineSimilarity
        FROM "SourceCodeEmbedding"
        WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > .5
        ORDER BY CosineSimilarity DESC
        LIMIT 10
    ` as { fileName: string, sourceCode: string, summary: string}[]
    // 0.5 threshold score

    // creating context for the LLM
    let context = ""

    for(const doc of result){
        context += `
            source: ${doc.fileName}\n
            codeContent: ${doc.sourceCode}\n
            summary of file: ${doc.summary}\n
        `
    }

    (async () => {
        const { textStream } = await streamText({
            model: google("gemini-1.5-flash"),
            prompt: GetAskAQuestionPrompt({ context, question }),
        })
        for await (const data of textStream) {
            stream.update(data)
        }

        stream.done();
    })();

    return {
        stream: stream.value,
        filesReferences: result
    }
}