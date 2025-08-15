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
import { UserCircle, Briefcase, FileText, Check, X, Building, Mail, Phone, Library, BadgeCheck, Send, Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const user = { name: 'Alex Doe', role: 'Referrer', avatar: 'https://placehold.co/100x100', initials: 'AD' };

const profileSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Role is required"),
  email: z.string().email(),
  phone: z.string().min(10, "Enter a valid phone number"),
  aadhar: z.string().length(12, "Aadhar must be 12 digits"),
  drivingLicense: z.string().min(5, "Driving license is required"),
  companyId: z.string().min(1, "Company ID is required"),
});

const jobSchema = z.object({
  jobDescription: z.string().min(20, "Job description must be at least 20 characters."),
  eligibilityCriteria: z.string().min(10, "Eligibility criteria is required."),
});

const initialRequests = [
  { id: 1, name: 'Jane Smith', role: 'Software Engineer', status: 'Pending' },
  { id: 2, name: 'John Doe', role: 'Product Designer', status: 'Pending' },
  { id: 3, name: 'Peter Jones', role: 'Data Analyst', status: 'Pending' },
];

export default function ReferrerDashboard() {
  const { toast } = useToast();
  const [requests, setRequests] = useState(initialRequests);
  const [profileSaved, setProfileSaved] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { company: '', role: '', email: '', phone: '', aadhar: '', drivingLicense: '', companyId: '' },
  });

  const jobForm = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: { jobDescription: '', eligibilityCriteria: '' },
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

  const handleRequest = (id: number, newStatus: 'Approved' | 'Rejected') => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    const request = requests.find(req => req.id === id);
    toast({
      title: `Request ${newStatus}`,
      description: `The request from ${request?.name} has been ${newStatus.toLowerCase()}.`
    });
  }

  const pendingRequestsCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <>
      <DashboardHeader user={user} />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">
            <UserCircle className="mr-2"/> Profile
          </TabsTrigger>
          <TabsTrigger value="post-job">
            <FileText className="mr-2"/> Post a Job
          </TabsTrigger>
          <TabsTrigger value="requests">
            <Bell className="mr-2"/> Requests {pendingRequestsCount > 0 && <Badge className="ml-2">{pendingRequestsCount}</Badge>}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
           <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><UserCircle /> Referrer Profile</CardTitle>
                <CardDescription>Keep your professional details up-to-date.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4 max-w-lg mx-auto">
                    <FormField control={profileForm.control} name="company" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Building/> Company</FormLabel><FormControl><Input placeholder="e.g., Refro Inc." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={profileForm.control} name="role" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Briefcase/> Your Role</FormLabel><FormControl><Input placeholder="e.g., Senior Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Mail/> Email</FormLabel><FormControl><Input type="email" placeholder="your.email@company.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Phone/> Phone</FormLabel><FormControl><Input type="tel" placeholder="123-456-7890" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={profileForm.control} name="aadhar" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Library/> Aadhar Number</FormLabel><FormControl><Input placeholder="12-digit number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="drivingLicense" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><BadgeCheck/> Driving License</FormLabel><FormControl><Input placeholder="License number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={profileForm.control} name="companyId" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><BadgeCheck/> Company ID</FormLabel><FormControl><Input placeholder="Your Employee ID" {...field} /></FormControl><FormMessage /></FormItem>
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
                <CardTitle className="font-headline flex items-center gap-2"><FileText /> Post a New Job</CardTitle>
                <CardDescription>Share a job opening with the candidates on the Refro platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...jobForm}>
                <form onSubmit={jobForm.handleSubmit(onPostJob)} className="space-y-4 max-w-lg mx-auto">
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

        <TabsContent value="requests" className="mt-6">
           <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Incoming Referral Requests</CardTitle>
                    <CardDescription>Review and respond to referral requests from candidates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {requests.length > 0 ? requests.map(req => (
                        <Card key={req.id} className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <div className="flex-1 mb-4 sm:mb-0">
                                    <p className="font-bold">{req.name}</p>
                                    <p className="text-sm text-muted-foreground">{req.role}</p>
                                </div>
                                {req.status === 'Pending' ? (
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10 hover:text-red-600" onClick={() => handleRequest(req.id, 'Rejected')}>
                                            <X className="mr-2" /> Reject
                                        </Button>
                                        <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleRequest(req.id, 'Approved')}>
                                            <Check className="mr-2" /> Approve
                                        </Button>
                                    </div>
                                ) : (
                                    <Badge variant={req.status === 'Approved' ? 'default' : 'destructive'} className={req.status === 'Approved' ? 'bg-green-600' : ''}>{req.status}</Badge>
                                )}
                            </div>
                        </Card>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center">No new referral requests.</p>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
