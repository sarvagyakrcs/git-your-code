import { gemini, genAI } from "@/lib/gemini"
import { GetCodeSummarizePrompt, GetDiffSummarizePrompt } from "@/lib/get-prompts";
import { handleError } from "@/utils/error-logs";
import { Document } from "@langchain/core/documents";

export const generateVectorEmbeddings = async (text: string) => {
    console.log("Generating embeddings for text: ", text);
    const model = genAI.getGenerativeModel({
        model: "text-embedding-004"
    })
    const result = await model.embedContent(text);
    const embedding = result.embedding;

    return embedding.values;
}

export const summarizeCommitByAI = async (diff: string) => {
    try {
        const prompt = GetDiffSummarizePrompt(diff);
        const res = await gemini.generateContent(prompt);
        return res.response.text();
    } catch (error) {
        handleError(error);
    }
} 

export const summarizeCodeByAI = async(doc: Document) => {
    console.log("Summarizing code by AI for file ", doc.metadata.source);
    const prompt = GetCodeSummarizePrompt(doc)
    try {
        const summary = await gemini.generateContent(prompt);
        return summary.response.text() || "";
    } catch (error) {
        handleError(error);
    }
}