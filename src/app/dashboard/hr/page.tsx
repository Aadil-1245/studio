import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardHeader from '@/components/dashboard-header';
import { cn } from "@/lib/utils";

const user = { name: 'HR Manager', role: 'HR', avatar: 'https://placehold.co/100x100', initials: 'HR' };

const applicants = [
  { name: "Liam Johnson", role: "Software Engineer", match: 92, status: "Interviewing" },
  { name: "Emma Williams", role: "UX Designer", match: 85, status: "Pending Review" },
  { name: "Noah Brown", role: "Product Manager", match: 78, status: "Hired" },
  { name: "Olivia Jones", role: "Data Scientist", match: 65, status: "Rejected" },
  { name: "Ava Garcia", role: "Marketing Lead", match: 95, status: "Offer Extended" },
  { name: "William Miller", role: "DevOps Engineer", match: 42, status: "Pending Review" },
  { name: "Sophia Davis", role: "Software Engineer", match: 88, status: "Interviewing" },
];

export default function HrDashboard() {
  return (
    <>
      <DashboardHeader user={user} />
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
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.name} className={cn(applicant.match >= 75 && "bg-primary/10")}>
                  <TableCell>
                    <div className="font-medium">{applicant.name}</div>
                  </TableCell>
                  <TableCell>{applicant.role}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={applicant.match >= 75 ? "default" : "secondary"} className={cn(applicant.match >= 75 && "bg-green-600 text-white hover:bg-green-700", applicant.match < 75 && applicant.match > 50 && "bg-yellow-500 text-white", applicant.match <= 50 && "bg-red-500 text-white")}>
                      {applicant.match}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{applicant.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
