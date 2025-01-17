import { z } from "zod";

export const CreateProjectSchema = z.object({
    projectName: z.string(),
    repoURL: z.string(),
    githubToken: z.string().optional()
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>