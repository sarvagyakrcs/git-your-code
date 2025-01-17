import { z } from "zod";

export const CreateProjectSchema = z.object({
    projectName: z.string(),
    repoURL: z.string()
        .url() // Validate URL format
        .refine((url) => url.includes("github.com"), {
            message: "The repo URL must be a GitHub URL",
        })
        .transform((url) => {
            // Remove '.git' if present
            return url.endsWith(".git") ? url.slice(0, -4) : url;
        }),
    githubToken: z.string().optional(),
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;
