'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from '@/components/dashboard-header';
import { UserCircle, Briefcase, FileText, Building, Mail, Phone, BadgeCheck, Send, Pencil, CheckCircle, Calendar, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from 'next/link';

const user = { name: 'HR Manager', role: 'HR', avatar: 'https://placehold.co/100x100', initials: 'HR' };

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email(),
  phone: z.string().min(10, "Enter a valid phone number"),
  companyId: z.string().min(1, "Company ID is required"),
});

const jobSchema = z.object({
  jobTitle: z.string().min(5, "Job title is required."),
  jobDescription: z.string().min(20, "Job description must be at least 20 characters."),
  eligibilityCriteria: z.string().min(10, "Eligibility criteria is required."),
});

const initialApplicants = [
  { name: "Liam Johnson", role: "Software Engineer", match: 92, status: "Interviewing", testScore: 88, meetingLink: '' },
  { name: "Emma Williams", role: "UX Designer", match: 85, status: "Interviewing", testScore: 91, meetingLink: '' },
  { name: "Noah Brown", role: "Product Manager", match: 78, status: "Hired", testScore: null, meetingLink: '' },
  { name: "Olivia Jones", role: "Data Scientist", match: 65, status: "Rejected", testScore: null, meetingLink: '' },
  { name: "Ava Garcia", role: "Marketing Lead", match: 95, status: "Offer Extended", testScore: 94, meetingLink: 'https://meet.google.com/lookup/fake-meeting-code' },
  { name: "William Miller", role: "DevOps Engineer", match: 42, status: "Pending Review", testScore: null, meetingLink: '' },
  { name: "Sophia Davis", role: "Software Engineer", match: 88, status: "Interviewing", testScore: 79, meetingLink: '' },
];

export default function HrDashboard() {
  const { toast } = useToast();
  const [profileSaved, setProfileSaved] = useState(false);
  const [applicants, setApplicants] = useState(initialApplicants);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: 'HR Manager', company: 'Refro Inc.', email: 'hr@refro.com', phone: '', companyId: '' },
  });

  const jobForm = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: { jobTitle: '', jobDescription: '', eligibilityCriteria: '' },
  });

  const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log(data);
    setProfileSaved(true);
    toast({ title: "Profile Saved!", description: "Your information has been updated successfully." });
  };
  
  const onPostJob = (data: z.infer<typeof jobSchema>) => {
    console.log(data);
    jobForm.reset();
    toast({ title: "Job Posted!", description: "Your job listing is now live for candidates." });
  };
  
  const onSendTest = (applicantName: string) => {
    setApplicants(applicants.map(app => app.name === applicantName ? { ...app, status: 'Interviewing' } : app));
    toast({
        title: "Assessment Sent!",
        description: `The company test has been sent to ${applicantName}. Their status is now "Interviewing".`,
    })
  }

  const handleHire = (applicantName: string) => {
    setApplicants(applicants.map(app => app.name === applicantName ? { ...app, status: 'Hired' } : app));
    toast({ title: "Candidate Hired!", description: `${applicantName} has been marked as Hired.` });
  }

  const handleScheduleMeeting = (applicantName: string) => {
     setApplicants(applicants.map(app => app.name === applicantName ? { ...app, meetingLink: 'https://meet.google.com/lookup/fake-meeting-code' } : app));
    toast({ title: "Meeting Link Generated", description: `A simulated meeting link has been created for ${applicantName}.` });
  }

  const interviewingApplicants = applicants.filter(a => a.status === 'Interviewing');

  return (
    <>
      <DashboardHeader user={user} />
      <Tabs defaultValue="applicants" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">
            <UserCircle className="mr-2"/> Profile
          </TabsTrigger>
          <TabsTrigger value="post-job">
            <Briefcase className="mr-2"/> Post a Job
          </TabsTrigger>
          <TabsTrigger value="applicants">
            <FileText className="mr-2"/> Applicants
          </TabsTrigger>
          <TabsTrigger value="assessments">
            <CheckCircle className="mr-2"/> Assessments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
           <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><UserCircle /> HR Profile</CardTitle>
                <CardDescription>Manage your professional details.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4 max-w-lg mx-auto">
                    <FormField control={profileForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><UserCircle/> Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={profileForm.control} name="company" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Building/> Company</FormLabel><FormControl><Input placeholder="e.g., Refro Inc." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Mail/> Email</FormLabel><FormControl><Input type="email" placeholder="your.email@company.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Phone/> Phone</FormLabel><FormControl><Input type="tel" placeholder="123-456-7890" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="companyId" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><BadgeCheck/> Company ID Card</FormLabel><FormControl><Input placeholder="Your Employee ID" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={profileSaved}>{profileSaved ? "Profile Saved" : "Save Profile"}</Button>
                </form>
                </Form>
            </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="post-job" className="mt-6">
          <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Briefcase /> Post a New Job</CardTitle>
                <CardDescription>Share a job opening with the candidates on the Refro platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...jobForm}>
                <form onSubmit={jobForm.handleSubmit(onPostJob)} className="space-y-4 max-w-lg mx-auto">
                     <FormField control={jobForm.control} name="jobTitle" render={({ field }) => (
                        <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="e.g., Senior Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={jobForm.control} name="jobDescription" render={({ field }) => (
                        <FormItem><FormLabel>Job Description</FormLabel><FormControl><Textarea placeholder="Describe the role, responsibilities, and requirements..." {...field} className="min-h-32" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={jobForm.control} name="eligibilityCriteria" render={({ field }) => (
                        <FormItem><FormLabel>Eligibility Criteria</FormLabel><FormControl><Textarea placeholder="e.g., 5+ years of experience with React, Bachelor's degree in CS..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <Button type="submit"><Send className="mr-2"/> Post Job</Button>
                </form>
                </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applicants" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Applicants Overview</CardTitle>
                    <CardDescription>Manage and track all candidates in the pipeline.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Role Applied For</TableHead>
                        <TableHead className="text-center">Match %</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {applicants.map((applicant) => (
                        <TableRow key={applicant.name}>
                        <TableCell>
                            <div className="font-medium">{applicant.name}</div>
                        </TableCell>
                        <TableCell>{applicant.role}</TableCell>
                        <TableCell className="text-center">
                            <Badge variant={applicant.match >= 75 ? "default" : "secondary"} className={cn(applicant.match >= 90 && "bg-green-600 text-white hover:bg-green-700", applicant.match < 90 && applicant.match >= 75 && "bg-blue-500 text-white", applicant.match < 75 && applicant.match > 50 && "bg-yellow-500 text-white", applicant.match <= 50 && "bg-red-500 text-white")}>
                            {applicant.match}%
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                            <Badge variant="outline">{applicant.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {applicant.status === 'Pending Review' && applicant.match >= 75 ? (
                                <Button variant="outline" size="sm" onClick={() => onSendTest(applicant.name)}>
                                    <Pencil className="mr-2" />
                                    Send Test
                                </Button>
                            ) : '-'}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="assessments" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Candidate Assessments</CardTitle>
                    <CardDescription>Track candidates who have been sent the company test.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {interviewingApplicants.length > 0 ? (
                        interviewingApplicants.map(applicant => (
                             <Card key={applicant.name} className="p-4">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    <div className="flex-1">
                                        <p className="font-bold">{applicant.name}</p>
                                        <p className="text-sm text-muted-foreground">{applicant.role}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Test Score: <span className="font-semibold text-primary">{applicant.testScore}%</span>
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-start gap-2">
                                        {applicant.meetingLink ? (
                                             <div className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold">Meeting Link:</span>
                                                <Link href={applicant.meetingLink} target="_blank" className="text-primary underline hover:text-primary/80">
                                                    {applicant.meetingLink}
                                                </Link>
                                            </div>
                                        ) : (
                                            <Button size="sm" variant="outline" onClick={() => handleScheduleMeeting(applicant.name)}>
                                                <Calendar className="mr-2" /> Schedule Meeting
                                            </Button>
                                        )}
                                        <Button size="sm" onClick={() => handleHire(applicant.name)}>
                                            <UserCheck className="mr-2" /> Hire
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">No candidates are currently in the assessment stage.</p>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
