import * as z from "zod"

export const patientFormSchema = z.object({
  name: z.string().min(2).max(255),
  age: z.number().min(0).max(150),
  gender: z.enum(['Male', 'Female', 'Other']),
  contactInfo: z.string().max(255),
  medicalCondition: z.string().optional(),
  diagnosisDate: z.string().optional(),
  treatment: z.string().optional(),
  notes: z.string().optional(),
})

export type PatientFormValues = z.infer<typeof patientFormSchema>
