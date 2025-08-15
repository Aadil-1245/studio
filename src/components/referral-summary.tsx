'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { summarizeReferralRequest, SummarizeReferralRequestOutput } from '@/ai/flows/summarize-referral-request';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Separator } from './ui/separator';

const FormSchema = z.object({
  requestMessage: z.string().min(20, {
    message: 'Referral message must be at least 20 characters.',
  }),
});

export default function ReferralSummary() {
  const [summary, setSummary] = useState<SummarizeReferralRequestOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      requestMessage: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeReferralRequest(data);
      setSummary(result);
    } catch (error) {
      console.error('Error summarizing referral request:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to summarize the referral request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="text-accent" />
          AI Referral Insights
        </CardTitle>
        <CardDescription>Paste a referral request message to get an instant summary and key information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="requestMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referral Request Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Hi, I saw you work at Acme Inc. and was hoping you could refer me for the open Product Manager role...'"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Summarize Request
            </Button>
          </form>
        </Form>
        {(isLoading || summary) && <Separator className="my-6" />}
        {isLoading && (
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating summary...
          </div>
        )}
        {summary && (
          <div className="space-y-4">
            <h3 className="font-semibold">Summary:</h3>
            <p className="text-sm text-foreground/80 p-4 bg-muted rounded-md">{summary.summary}</p>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Urgency:</h3>
              {summary.urgent ? (
                <Badge variant="destructive" className="gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Urgent
                </Badge>
              ) : (
                <Badge variant="secondary">Normal</Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
