
import {summarizeReferralRequest} from '@/ai/flows/summarize-referral-request';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {requestMessage} = await req.json();
    if (!requestMessage) {
      return NextResponse.json(
        {error: 'requestMessage is required'},
        {status: 400}
      );
    }
    const result = await summarizeReferralRequest({requestMessage});
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {error: err.message || 'An unexpected error occurred'},
      {status: 500}
    );
  }
}
