
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from '@/components/dashboard-header';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Award, Lightbulb, ClipboardCheck, ArrowRight, Code, Trophy, Handshake, TrendingUp, Users, Star, Briefcase, User } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

const user = { name: 'Jane Smith', role: 'Candidate', avatar: 'https://placehold.co/100x100', initials: 'JS' };

const skills = ["React", "Java", "Python", "DSA", "HTML", "SQL", "CSS", "Next.js", "Web3"];

const performanceData = [
  { subject: 'React', score: 80, fullMark: 100 },
  { subject: 'Next.js', score: 92, fullMark: 100 },
  { subject: 'DSA', score: 75, fullMark: 100 },
  { subject: 'SQL', score: 85, fullMark: 100 },
  { subject: 'System Design', score: 68, fullMark: 100 },
  { subject: 'Java', score: 78, fullMark: 100 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
};

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
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <TrendingUp className="text-primary" />
              Performance Overview
            </CardTitle>
            <CardDescription>Your assessment scores and referral statistics.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <ChartContainer config={chartConfig} className="w-full aspect-square h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Jane Smith" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
             <div className="flex flex-col gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center gap-2"><Users className="text-accent"/> Referrals Sent</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">requests sent</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center gap-2"><Star className="text-accent"/> Referrals Accepted</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                   <p className="text-3xl font-bold">2</p>
                   <p className="text-xs text-muted-foreground">accepted by referrers</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <User className="text-accent" />
                Your Profile
            </CardTitle>
            <CardDescription>Complete your profile to attract referrers and companies.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Add your academic details and projects.</p>
             <Button asChild>
                <Link href="/dashboard/candidate/profile">
                    Manage Profile <ArrowRight className="ml-2" />
                </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <ClipboardCheck className="text-accent" />
                Skills Assessments
            </CardTitle>
            <CardDescription>A multiple-choice quiz to test your foundational knowledge.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Test your knowledge with our quick quizzes.</p>
             <Button asChild>
                <Link href="/dashboard/candidate/skills-assessment">
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

         <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Trophy className="text-primary" />
                    Leaderboard
                </CardTitle>
                <CardDescription>See how you rank against other candidates.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Check out the current standings.</p>
                <Button asChild>
                    <Link href="/dashboard/candidate/leaderboard">
                        View Leaderboard
                    </Link>
                </Button>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Handshake className="text-accent" />
                    Find a Referrer
                </CardTitle>
                <CardDescription>Browse referrers and request a referral.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Connect with employees who can refer you.</p>
                <Button asChild>
                    <Link href="/dashboard/candidate/find-referrer">
                        Browse Referrers
                    </Link>
                </Button>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Briefcase className="text-primary" />
                    Available Jobs
                </CardTitle>
                <CardDescription>Browse open positions from various companies.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Find your next role and get referred.</p>
                <Button asChild>
                    <Link href="/dashboard/candidate/available-jobs">
                        Browse Jobs
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
