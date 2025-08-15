'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from '@/components/dashboard-header';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Award, Lightbulb, ClipboardCheck, ArrowRight, Code } from "lucide-react";

const user = { name: 'Jane Smith', role: 'Candidate', avatar: 'https://placehold.co/100x100', initials: 'JS' };

const skills = ["React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js"];

export default function CandidateDashboard() {
  return (
    <>
      <DashboardHeader user={user} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <ClipboardCheck className="text-primary" />
              Your Application Status
            </CardTitle>
            <CardDescription>Tracking your progress for the Software Engineer role at Refro Inc.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">You are on track! Complete the assessments below to proceed.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <ClipboardCheck className="text-accent" />
                Skills Assessment
            </CardTitle>
            <CardDescription>A multiple-choice quiz to test your foundational knowledge.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Test your knowledge with our quick quiz.</p>
             <Button asChild>
                <Link href="/dashboard/candidate/test">
                    Take Skills Assessment <ArrowRight className="ml-2" />
                </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Code className="text-accent" />
                Coding Challenge
            </CardTitle>
            <CardDescription>A practical coding exercise to showcase your abilities.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground mb-4">Solve a real-world problem in our coding environment.</p>
             <Button asChild>
                <Link href="/dashboard/candidate/coding-challenge">
                    Start Coding Challenge <ArrowRight className="ml-2" />
                </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Award className="text-primary" />
                    Certifications
                </CardTitle>
                <CardDescription>Manage and verify your professional certifications.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">You have no certifications yet.</p>
                <Button asChild>
                    <Link href="/dashboard/candidate/certifications">
                        Add & Verify Certification
                    </Link>
                </Button>
            </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Lightbulb className="text-accent" />
                Your Skills
            </CardTitle>
            <CardDescription>Your registered skills.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4">Add Skills</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}