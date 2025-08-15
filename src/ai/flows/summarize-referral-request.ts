'use server';

/**
 * @fileOverview Summarizes referral request messages using AI.
 *
 * - summarizeReferralRequest - A function that summarizes referral request messages.
 * - SummarizeReferralRequestInput - The input type for the summarizeReferralRequest function.
 * - SummarizeReferralRequestOutput - The return type for the summarizeReferralRequest function.
 */

import {ai} from '@/ai/genkit';
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

export async function summarizeReferralRequest(input: SummarizeReferralRequestInput): Promise<SummarizeReferralRequestOutput> {
  return summarizeReferralRequestFlow(input);
}

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
