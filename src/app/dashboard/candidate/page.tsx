import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from '@/components/dashboard-header';
import { FileCheck2, Hourglass, Mail, XCircle } from "lucide-react";

const user = { name: 'Jane Smith', role: 'Candidate', avatar: 'https://placehold.co/100x100', initials: 'JS' };

const timeline = [
  { status: "Application Submitted", date: "2023-10-01", icon: FileCheck2, complete: true },
  { status: "HR Review", date: "2023-10-03", icon: Hourglass, complete: true },
  { status: "Technical Interview", date: "2023-10-10", icon: Mail, complete: true },
  { status: "Final Interview", date: "2023-10-15", icon: Mail, complete: false },
  { status: "Offer", date: "Pending", icon: XCircle, complete: false },
];

export default function CandidateDashboard() {
  return (
    <>
      <DashboardHeader user={user} />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Application Status</CardTitle>
          <CardDescription>Tracking your progress for the Software Engineer role at Refro Inc.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-6 pb-8 last:pb-0">
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-full ${item.complete ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                   <div className="absolute top-1/2 left-[-24px] w-6 h-0.5 bg-border -translate-y-1/2"></div>
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{item.status}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
