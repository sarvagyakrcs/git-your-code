import { generateVectorEmbeddings, summarizeCodeByAI } from "@/actions/gemini";
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import prisma from "./prisma";
import { handleError } from "@/utils/error-logs";

export const loadGithubRepository = async (url: string, token?: string) => {
    try {
        const loader = new GithubRepoLoader(url, {
            accessToken: process.env.GITHUB_ACCESS_TOKEN,
            branch: "main",
            ignoreFiles: ["package-lock.json", "node_modules", "bun-lock.json", "yarn.lock", "pnp-lock.yaml"],
            recursive: true,
            unknown: "warn",
            maxConcurrency: 50
        });
        const docs = await loader.load();
        console.log({docs})
        return docs;
    } catch (error) {
        handleError(error);
    }
}


export const indexGithubRepository = async (projectId: string, url: string, token?: string) => {
    const docs = await loadGithubRepository(url, token);
    if(!docs){
        await prisma.project.delete({
            where: {
                id: projectId
            }
        })
        throw new Error("Error loading the repository")
    }
    const allEmbeds = await generateEmbeddings(docs);

    await Promise.allSettled(allEmbeds.map(async (embed, index) => {
        if(!embed){
            return;
        }

        const sourceCodeEmbedding = await prisma.sourceCodeEmbedding.create({
            data: {
                projectId,
                fileName: embed.filename,
                sourceCode: embed.sourceCode,
                summary: embed.summary || "No Embedding Available",
            }
        })

        await prisma.$executeRaw`
            UPDATE "SourceCodeEmbedding"
            SET "summaryEmbedding" = ${embed.embedding}::vector
            WHERE "id" = ${sourceCodeEmbedding.id}
        `
    }))
}

export const generateEmbeddings = async (docs: Document[]) => {
    return await Promise.all(docs.map(async (doc) => {
        const summary = await summarizeCodeByAI(doc);
        const embedding = await generateVectorEmbeddings(summary || doc.pageContent);
        return {
            summary,
            embedding,
            sourceCode : JSON.stringify(doc.pageContent),
            filename: doc.metadata.source,
        }
    }));
}
