import { z } from 'zod';

export const FreelancerRegistrationSchema = z.object({
    skills: z.array(z.string()),
    hourlyRate: z.string(),
    portfolioWebsite: z.string()
});

export type FreelancerRegistrationSchemaType = z.infer<typeof FreelancerRegistrationSchema>