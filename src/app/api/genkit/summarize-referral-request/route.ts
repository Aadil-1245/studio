'use server';

import {ai} from '@/ai/genkit';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'genkit';

const SummarizeReferralRequestInputSchema = z.object({
  requestMessage: z.string().describe('The referral request message to summarize.'),
});
export type SummarizeReferralRequestInput = z.infer<typeof SummarizeReferralRequestInputSchema>;

const SummarizeReferralRequestOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the referral request message.'),
  urgent: z.boolean().describe('Whether the referral request is urgent or not.'),
});
export type SummarizeReferralRequestOutput = z.infer<typeof SummarizeReferralRequestOutputSchema>;

const prompt = ai.definePrompt({
  name: 'summarizeReferralRequestPrompt',
  input: {schema: SummarizeReferralRequestInputSchema},
  output: {schema: SummarizeReferralRequestOutputSchema},
  prompt: `You are an AI assistant helping referrers quickly understand referral requests.\n\nGiven the following referral request message, provide a concise summary and indicate if the request is urgent.\n\nReferral Request Message: {{{requestMessage}}}`,
});

const summarizeReferralRequestFlow = ai.defineFlow(
  {
    name: 'summarizeReferralRequestFlow',
    inputSchema: SummarizeReferralRequestInputSchema,
    outputSchema: SummarizeReferralRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


export async function POST(req: NextRequest) {
  try {
    const {requestMessage} = await req.json();
    if (!requestMessage) {
      return NextResponse.json(
        {error: 'requestMessage is required'},
        {status: 400}
      );
    }
    const result = await summarizeReferralRequestFlow({requestMessage});
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {error: err.message || 'An unexpected error occurred'},
      {status: 500}
    );
  }
}
