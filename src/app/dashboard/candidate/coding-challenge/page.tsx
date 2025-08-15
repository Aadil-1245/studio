'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Code } from 'lucide-react';
import Link from 'next/link';

export default function CodingChallengePage() {
  const [code, setCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <div className="mb-4">
        <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/candidate">
                <ArrowLeft className="mr-2" />
                Back to Dashboard
            </Link>
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Code /> Coding Challenge</CardTitle>
          <CardDescription>Implement the function described below.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <div>
              <div className="mb-4 p-4 bg-muted rounded-lg">
                <h3 className="font-bold text-lg mb-2">Problem: FizzBuzz</h3>
                <p className="text-sm">
                  Write a function that takes an integer `n` and returns an array of strings.
                  For multiples of three, use "Fizz" instead of the number.
                  For multiples of five, use "Buzz".
                  For numbers which are multiples of both three and five, use "FizzBuzz".
                  Otherwise, just use the number as a string.
                </p>
                <pre className="bg-background p-2 rounded-md mt-2 text-sm"><code>{`function fizzBuzz(n) { \n  // Your code here \n}`}</code></pre>
              </div>

              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
                className="min-h-[300px] font-mono"
              />
              <Button onClick={handleSubmit} disabled={!code} className="mt-6 w-full">
                Submit Code
              </Button>
            </div>
          ) : (
            <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Challenge Submitted!</h2>
                <p className="text-muted-foreground mb-6">Your solution has been submitted for review.</p>
                 <Button asChild className="mt-6" variant="default">
                    <Link href="/dashboard/candidate">Return to Dashboard</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
