import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardHeader from '@/components/dashboard-header';
import ReferralSummary from '@/components/referral-summary';

const user = { name: 'Alex Doe', role: 'Referrer', avatar: 'https://placehold.co/100x100', initials: 'AD' };

const candidates = [
  { name: "Sam Wilson", skills: ["React", "Node.js", "GraphQL"], match: 89 },
  { name: "Maria Hill", skills: ["Python", "TensorFlow", "Pandas"], match: 82 },
  { name: "Bucky Barnes", skills: ["Go", "Kubernetes", "Docker"], match: 76 },
  { name: "Wanda Maximoff", skills: ["UX Research", "Figma", "Prototyping"], match: 71 },
];

export default function ReferrerDashboard() {
  return (
    <>
      <DashboardHeader user={user} />
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Matching Candidates</CardTitle>
              <CardDescription>Potential candidates from your network that match open roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Top Skills</TableHead>
                    <TableHead className="text-right">Match</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow key={candidate.name}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={candidate.match > 80 ? "default" : "outline"}>{candidate.match}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <ReferralSummary />
        </div>
      </div>
    </>
  );
}
