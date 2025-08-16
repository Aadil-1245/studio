
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Download, FolderGit2 } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import dynamic from 'next/dynamic';

const DynamicRadarChart = dynamic(() => import('recharts').then(mod => mod.RadarChart), {
  ssr: false,
  loading: () => <div className="w-full h-80 flex items-center justify-center"><p>Loading chart...</p></div>
});


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

const projectData = [
    { name: 'E-commerce Platform', description: 'A full-stack e-commerce site using Next.js, Stripe, and PostgreSQL.', link: '#' },
    { name: 'Real-time Chat App', description: 'A websocket-based chat application with Firebase for authentication.', link: '#' },
    { name: 'Data Visualization Dashboard', description: 'A dashboard for visualizing sales data using D3.js and React.', link: '#' },
];

export default function CandidateAnalyticsPage() {
  return (
    <>
      <div className="mb-4">
        <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/referrer">
                <ArrowLeft className="mr-2" />
                Back to Referrals
            </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">
                    Analytics for Jane Smith
                    </CardTitle>
                    <CardDescription>
                    An overview of the candidate's skills, projects, and resume.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
       
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <TrendingUp className="text-primary" />
              Performance Overview
            </CardTitle>
            <CardDescription>Candidate's assessment scores.</CardDescription>
          </CardHeader>
          <CardContent className="grid place-items-center">
            <ChartContainer config={chartConfig} className="w-full max-w-lg aspect-square h-80">
              <ResponsiveContainer width="100%" height="100%">
                <DynamicRadarChart data={performanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Jane Smith" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                </DynamicRadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Resume</CardTitle>
                    <CardDescription>Download the candidate's resume.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">
                        <Download className="mr-2"/>
                        Download PDF
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">This is a simulated download.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Projects</CardTitle>
                    <CardDescription>Links to the candidate's work.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {projectData.map(proj => (
                        <div key={proj.name} className="flex items-start gap-4">
                            <FolderGit2 className="text-primary mt-1"/>
                            <div>
                                <h4 className="font-semibold">{proj.name}</h4>
                                <p className="text-sm text-muted-foreground">{proj.description}</p>
                                <Link href={proj.link} className="text-sm text-primary hover:underline">View Project</Link>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
