
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Building, MapPin, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const jobs = [
  {
    title: 'Frontend Developer',
    company: 'Innovate Inc.',
    location: 'Remote',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    logo: 'II'
  },
  {
    title: 'Backend Engineer',
    company: 'DataCorp',
    location: 'New York, NY',
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
    logo: 'DC'
  },
  {
    title: 'Full Stack Engineer',
    company: 'Solutions LLC',
    location: 'San Francisco, CA',
    skills: ['Node.js', 'React', 'AWS', 'Docker'],
    logo: 'SL'
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudNet',
    location: 'Austin, TX',
    skills: ['Kubernetes', 'Terraform', 'CI/CD'],
    logo: 'CN'
  },
  {
    title: 'Product Designer',
    company: 'Creative Minds',
    location: 'Remote',
    skills: ['Figma', 'UI/UX', 'User Research'],
    logo: 'CM'
  },
  {
    title: 'Data Scientist',
    company: 'Alpha Analytics',
    location: 'Chicago, IL',
    skills: ['Python', 'TensorFlow', 'Scikit-learn'],
    logo: 'AA'
  },
];

export default function AvailableJobsPage() {
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const { toast } = useToast();

  // In a real app, this would be persisted. We'll simulate it here.
  // This function would be called upon returning from a successful test.
  const handleApply = (jobTitle: string) => {
    setAppliedJobs([...appliedJobs, jobTitle]);
    toast({
        title: "Application Sent!",
        description: `Your application for ${jobTitle} has been successfully submitted.`
    })
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
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Briefcase className="text-primary" />
            Available Jobs
          </CardTitle>
          <CardDescription>Browse open positions. You'll need to pass a short skills test before applying.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => {
            const isApplied = appliedJobs.includes(job.title);
            const testSkill = job.skills[0]; // Take the first skill for the test

            return (
                <Card key={job.title + job.company} className="flex flex-col">
                <CardHeader className="flex-row items-start gap-4">
                    <Avatar>
                        <AvatarImage src={`https://placehold.co/100x100.png?text=${job.logo}`} data-ai-hint="company logo" />
                        <AvatarFallback>{job.logo}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><Building size={14} /> {job.company}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin size={14} /> {job.location}</p>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full" disabled={isApplied}>
                        {isApplied ? (
                             <span className="flex items-center"><CheckCircle className="mr-2" /> Applied</span>
                        ) : (
                            <Link href={`/dashboard/candidate/test?skill=${encodeURIComponent(testSkill)}&source=job-apply&job=${encodeURIComponent(job.title)}`}>
                                <Sparkles className="mr-2" />
                                Take Test & Apply
                            </Link>
                        )}
                    </Button>
                </CardFooter>
                </Card>
            )
          })}
        </CardContent>
      </Card>
    </>
  );
}
