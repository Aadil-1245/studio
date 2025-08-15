import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, User, UserCheck, UserCog, UsersRound } from "lucide-react";

const roles = [
  { name: "Admin", href: "/login?role=admin", icon: UserCog, description: "Oversee the entire platform" },
  { name: "HR", href: "/login?role=hr", icon: Briefcase, description: "Manage applicants and roles" },
  { name: "Referrer", href: "/login?role=referrer", icon: UserCheck, description: "Refer candidates and track progress" },
  { name: "Candidate", href: "/login?role=candidate", icon: User, description: "View your application status" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="p-2 bg-primary rounded-full mb-4">
            <UsersRound className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
          Welcome to Refro
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Your streamlined referral system. Select a role to enter your dashboard and manage your referral activities.
        </p>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Simulate Login</CardTitle>
            <CardDescription>Choose a role to explore the corresponding dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <Button key={role.name} asChild variant="outline" size="lg" className="h-auto justify-start p-4 text-left">
                  <Link href={role.href}>
                    <role.icon className="mr-4 size-8 text-primary" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">{role.name}</span>
                      <span className="text-sm text-muted-foreground">{role.description}</span>
                    </div>
                    <ArrowRight className="ml-auto size-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>This is a demo application. No real data is processed or stored.</p>
      </footer>
    </main>
  );
}
