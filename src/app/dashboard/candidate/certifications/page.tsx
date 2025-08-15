'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { verifyCertification } from '@/ai/flows/verify-certification';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const FormSchema = z.object({
  certificationName: z.string().min(5, {
    message: 'Certification name must be at least 5 characters.',
  }),
});

export default function CertificationsPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      certificationName: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setQuestions([]);
    try {
      const result = await verifyCertification(data);
      setQuestions(result.questions);
    } catch (error) {
      console.error('Error verifying certification:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFinishVerification = () => {
    setIsVerified(true);
    setQuestions([]);
  }

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
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-accent" />
            Verify Your Certification
          </CardTitle>
          <CardDescription>Enter your certification name, and our AI will ask a few questions to verify your knowledge.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isVerified && questions.length === 0 && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="certificationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Certified Kubernetes Application Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Verification Questions
                </Button>
              </form>
            </Form>
          )}

          {isLoading && (
            <div className="flex items-center justify-center text-sm text-muted-foreground mt-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating questions...
            </div>
          )}

          {!isVerified && questions.length > 0 && (
            <div className="space-y-6 mt-6">
              <h3 className="font-semibold text-lg">Answer these questions:</h3>
              <ul className="space-y-4 list-decimal list-inside">
                {questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">For this demo, we'll assume you answered correctly.</p>
              <Button onClick={handleFinishVerification}>
                  Finish Verification
              </Button>
            </div>
          )}

          {isVerified && (
             <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Certification Verified!</h2>
                <p className="text-muted-foreground mb-6">The certification has been added to your profile.</p>
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
