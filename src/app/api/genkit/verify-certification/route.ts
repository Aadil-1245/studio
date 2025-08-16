'use server';

import {ai} from '@/ai/genkit';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'genkit';

const VerifyCertificationInputSchema = z.object({
  certificationName: z.string().describe('The name of the certification to verify.'),
});
export type VerifyCertificationInput = z.infer<typeof VerifyCertificationInputSchema>;

const VerifyCertificationOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of questions to ask the user to verify their knowledge of the certification.'),
});
export type VerifyCertificationOutput = z.infer<typeof VerifyCertificationOutputSchema>;

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

export async function POST(req: NextRequest) {
  try {
    const {certificationName} = await req.json();
    if (!certificationName) {
      return NextResponse.json(
        {error: 'certificationName is required'},
        {status: 400}
      );
    }
    const result = await verifyCertificationFlow({certificationName});
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {error: err.message || 'An unexpected error occurred'},
      {status: 500}
    );
  }
}
