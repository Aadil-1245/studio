
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, User, GraduationCap, School, Percent, FileText, FolderGit, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required."),
  description: z.string().min(1, "Project description is required."),
  link: z.string().url("Must be a valid URL."),
});

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  university: z.string().min(5, "University name is required."),
  cgpa: z.string().min(1, "CGPA is required."),
  grade10: z.string().min(1, "10th grade percentage is required."),
  grade12: z.string().min(1, "12th grade percentage is required."),
  resume: z.any().refine(files => files?.length > 0, 'Resume file is required.'),
  projects: z.array(projectSchema),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CandidateProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      university: '',
      cgpa: '',
      grade10: '',
      grade12: '',
      projects: [{ name: '', description: '', link: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects"
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    console.log(data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Profile Updated!',
      description: 'Your information has been saved successfully.',
    });
    setIsLoading(false);
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
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <User className="text-primary" />
            Your Profile
          </CardTitle>
          <CardDescription>Keep your professional and academic details up to date.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2"><User /> Personal Information</h3>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Jane Smith" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                 <h3 className="text-lg font-medium flex items-center gap-2"><GraduationCap /> Academic Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="university" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><School /> University</FormLabel><FormControl><Input placeholder="e.g., University of Example" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="cgpa" render={({ field }) => (
                        <FormItem><FormLabel>CGPA</FormLabel><FormControl><Input placeholder="e.g., 8.5" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="grade12" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Percent /> 12th Grade %</FormLabel><FormControl><Input placeholder="e.g., 95" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="grade10" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Percent /> 10th Grade %</FormLabel><FormControl><Input placeholder="e.g., 98" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                 </div>
              </div>

               <Separator />
              
              <div className="space-y-4">
                 <h3 className="text-lg font-medium flex items-center gap-2"><FileText /> Resume</h3>
                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Resume</FormLabel>
                        <FormControl>
                          <Input type="file" {...form.register('resume')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              <Separator />
              
              <div className="space-y-4">
                 <h3 className="text-lg font-medium flex items-center gap-2"><FolderGit /> Projects</h3>
                 {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                        <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => (
                            <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="e.g., E-commerce Website" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => (
                            <FormItem><FormLabel>Description</FormLabel><FormControl><Input placeholder="A short description of your project." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name={`projects.${index}.link`} render={({ field }) => (
                             <FormItem><FormLabel>Project Link</FormLabel><FormControl><Input placeholder="https://github.com/user/repo" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                        {index > 0 && (
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => remove(index)}>
                                <Trash2 />
                            </Button>
                        )}
                    </div>
                 ))}
                 <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', description: '', link: '' })}>
                    <PlusCircle className="mr-2" /> Add Project
                </Button>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
