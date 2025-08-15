'use client';

import { Suspense } from 'react';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsersRound } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'candidate';

  const prefilledCredentials: { [key: string]: { email: string } } = {
    admin: { email: 'admin@refro.com' },
    hr: { email: 'hr@refro.com' },
    referrer: { email: 'referrer@refro.com' },
    candidate: { email: 'candidate@refro.com' },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/dashboard/${role}`);
  };
  
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <Link href="/" className="flex items-center gap-2 font-semibold font-headline text-primary mb-4">
          <UsersRound className="h-8 w-8" />
          <span className="text-2xl">Refro</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Login as {capitalizedRole}
        </h1>
        <p className="mt-2 max-w-sm text-md text-muted-foreground">
          Enter your credentials to access your dashboard.
        </p>
      </div>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Enter Credentials</CardTitle>
          <CardDescription>Use the pre-filled demo credentials to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue={prefilledCredentials[role]?.email || ''}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/" className="underline">
              Back to role selection
            </Link>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>This is a demo application. No real data is processed or stored.</p>
      </footer>
    </main>
  );
}


export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
