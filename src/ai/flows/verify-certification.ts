'use server';

/**
 * @fileOverview Verifies a user's certification by generating relevant questions.
 *
 * - verifyCertification - A function that generates verification questions for a given certification.
 * - VerifyCertificationInput - The input type for the verifyCertification function.
 * - VerifyCertificationOutput - The return type for the verifyCertification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyCertificationInputSchema = z.object({
  certificationName: z.string().describe('The name of the certification to verify.'),
});
export type VerifyCertificationInput = z.infer<typeof VerifyCertificationInputSchema>;

const VerifyCertificationOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of questions to ask the user to verify their knowledge of the certification.'),
});
export type VerifyCertificationOutput = z.infer<typeof VerifyCertificationOutputSchema>;

export async function verifyCertification(input: VerifyCertificationInput): Promise<VerifyCertificationOutput> {
  return verifyCertificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyCertificationPrompt',
  input: {schema: VerifyCertificationInputSchema},
  output: {schema: VerifyCertificationOutputSchema},
  prompt: `You are an expert in professional and technical certifications. A user claims to have the '{{{certificationName}}}' certification. 

Generate a list of 3-4 insightful, open-ended questions that would help verify their genuine understanding and experience related to this certification. The questions should go beyond simple definitions and probe into practical application or deeper concepts.`,
});

const verifyCertificationFlow = ai.defineFlow(
  {
    name: 'verifyCertificationFlow',
    inputSchema: VerifyCertificationInputSchema,
    outputSchema: VerifyCertificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
