'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Briefcase, FileText, UserCheck, Activity } from 'lucide-react';
import DashboardHeader from '@/components/dashboard-header';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const user = { name: 'Admin User', role: 'Admin', avatar: 'https://placehold.co/100x100', initials: 'AU' };

const chartData = [
  { role: 'Candidate', total: Math.floor(Math.random() * 5000) + 1000 },
  { role: 'Referrer', total: Math.floor(Math.random() * 2000) + 500 },
  { role: 'HR', total: Math.floor(Math.random() * 500) + 50 },
  { role: 'Admin', total: Math.floor(Math.random() * 50) + 5 },
];

const chartConfig = {
  total: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
};

export default function AdminDashboard() {
  return (
    <>
      <DashboardHeader user={user} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Taken</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Users by Role</CardTitle>
            <CardDescription>A breakdown of user roles across the platform.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="role"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 9)}
                  />
                  <YAxis />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Referrers</CardTitle>
            <CardDescription>Top referrers this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Olivia Martin', email: 'olivia.martin@email.com', referrals: 12, avatar: 'OM' },
                { name: 'Jackson Lee', email: 'jackson.lee@email.com', referrals: 8, avatar: 'JL' },
                { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', referrals: 5, avatar: 'IN' },
                { name: 'William Kim', email: 'will@email.com', referrals: 3, avatar: 'WK' },
                { name: 'Sofia Davis', email: 'sofia.davis@email.com', referrals: 2, avatar: 'SD' },
              ].map(ref => (
                <div key={ref.name} className="flex items-center">
                  <UserCheck className="h-6 w-6 mr-4 text-muted-foreground" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{ref.name}</p>
                    <p className="text-sm text-muted-foreground">{ref.email}</p>
                  </div>
                  <div className="ml-auto font-medium">+{ref.referrals}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
