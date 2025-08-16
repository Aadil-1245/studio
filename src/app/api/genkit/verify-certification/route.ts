
import {verifyCertification} from '@/ai/flows/verify-certification';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {certificationName} = await req.json();
    if (!certificationName) {
      return NextResponse.json(
        {error: 'certificationName is required'},
        {status: 400}
      );
    }
    const result = await verifyCertification({certificationName});
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {error: err.message || 'An unexpected error occurred'},
      {status: 500}
    );
  }
}
