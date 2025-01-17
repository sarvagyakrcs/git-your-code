import { z } from 'zod';

export const EditFreelancerSchema = z.object({
  name: z.string().optional(),
  // company: z.string().optional(),
  // companyWebsite: z.string().url().optional().or(z.literal("")),
  // numberOfEmployees: z.string().optional(),
  imageKey: z.string().optional(),
})

export type EditFreelancerSchemaType = z.infer<typeof EditFreelancerSchema>