'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ArrowLeft, CheckCircle, Upload, Clock, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { VerifyCertificationOutput } from '@/ai/flows/verify-certification';

const FormSchema = z.object({
  certificationName: z.string().min(5, {
    message: 'Certification name must be at least 5 characters.',
  }),
  certificateFile: z.any().refine(files => files?.length > 0, 'Certificate file is required.'),
  timeframe: z.string().min(1, { message: 'Timeframe is required.' }),
});

interface ICertification {
    name: string;
    isVerified: boolean;
}

export default function CertificationsPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const [currentCertName, setCurrentCertName] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      certificationName: '',
      timeframe: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setQuestions([]);
    setCurrentCertName(data.certificationName);
    try {
      const response = await fetch('/api/genkit/verify-certification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certificationName: data.certificationName }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: VerifyCertificationOutput = await response.json();
      setQuestions(result.questions);
      setIsAnswering(true);
    } catch (error) {
      console.error('Error verifying certification:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFinishVerification = () => {
    setCertifications(prev => [...prev, { name: currentCertName, isVerified: true }]);
    setQuestions([]);
    setIsAnswering(false);
    setCurrentCertName('');
    form.reset();
  }
  
  const handleAddNew = () => {
    setQuestions([]);
    setIsAnswering(false);
    setCurrentCertName('');
    form.reset();
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
            Verify Your Certifications
          </CardTitle>
          <CardDescription>Add your certifications, and our AI will ask a few questions to verify your knowledge.</CardDescription>
        </CardHeader>
        <CardContent>
          {certifications.length > 0 && !isAnswering && (
             <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-lg">Your Added Certifications</h3>
                <div className="space-y-3">
                {certifications.map((cert, index) => (
                    <Card key={index} className="flex justify-between items-center p-4">
                        <p className="font-medium">{cert.name}</p>
                        {cert.isVerified && (
                           <div className="flex items-center gap-2 text-green-500">
                             <BadgeCheck />
                             <span className="font-semibold">Verified</span>
                           </div>
                        )}
                    </Card>
                ))}
                </div>
                <Button onClick={handleAddNew}>
                    Add Another Certification
                </Button>
            </div>
          )}

          { !isAnswering && (certifications.length === 0 || questions.length === 0 && !currentCertName) && (
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
                 <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Clock /> Timeframe to Complete</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certificateFile"
                  render={({ field }) => (
                     <FormItem>
                      <FormLabel className="flex items-center gap-2"><Upload /> Upload Certificate</FormLabel>
                      <FormControl>
                        <Input type="file" {...form.register('certificateFile')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
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

          {isAnswering && questions.length > 0 && (
            <div className="space-y-6 mt-6">
              <h3 className="font-semibold text-lg">Answer these questions for: {currentCertName}</h3>
              <ul className="space-y-4 list-decimal list-inside p-4 bg-muted rounded-md">
                {questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">For this demo, we'll assume you answered correctly.</p>
              <Button onClick={handleFinishVerification} className="w-full">
                  <CheckCircle className="mr-2" />
                  Finish & Verify
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
