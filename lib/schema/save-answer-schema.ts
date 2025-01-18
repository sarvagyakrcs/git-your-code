import { z } from 'zod';

export const QuestionSchema = z.object({
    question: z.string(),        // The question field as a string
    answer: z.string(),        // The answer field as a string
    projectId: z.string(),
    filesReference: z.any(), // Assuming 'filesReference' is a Json object. Can be adjusted based on actual shape.
});

export type QuestionSchemaType = z.infer<typeof QuestionSchema>;
