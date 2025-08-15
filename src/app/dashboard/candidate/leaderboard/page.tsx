'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const leaderboardData = [
  { rank: 1, name: 'Ethan Hayes', score: 1250, avatarInitial: 'EH' },
  { rank: 2, name: 'Olivia Chen', score: 1210, avatarInitial: 'OC' },
  { rank: 3, name: 'Jane Smith', score: 1200, avatarInitial: 'JS', isCurrentUser: true },
  { rank: 4, name: 'Benjamin Carter', score: 1150, avatarInitial: 'BC' },
  { rank: 5, name: 'Sophia Rodriguez', score: 1100, avatarInitial: 'SR' },
  { rank: 6, name: 'Liam Goldberg', score: 1080, avatarInitial: 'LG' },
  { rank: 7, name: 'Ava Nguyen', score: 1050, avatarInitial: 'AN' },
  { rank: 8, name: 'Noah Patel', score: 1020, avatarInitial: 'NP' },
  { rank: 9, 'name': 'Isabella Kim', score: 990, avatarInitial: 'IK' },
  { rank: 10, 'name': 'Mason Williams', score: 950, avatarInitial: 'MW' },
];

export default function LeaderboardPage() {
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
            <Trophy className="text-yellow-500" />
            Candidate Leaderboard
          </CardTitle>
          <CardDescription>See the top-ranking candidates on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center">Rank</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((candidate) => (
                <TableRow key={candidate.rank} className={cn(candidate.isCurrentUser && "bg-primary/10")}>
                  <TableCell className="text-center font-bold text-lg">
                    {candidate.rank === 1 && <Trophy className="w-6 h-6 text-yellow-500 inline-block" />}
                    {candidate.rank === 2 && <Trophy className="w-6 h-6 text-gray-400 inline-block" />}
                    {candidate.rank === 3 && <Trophy className="w-6 h-6 text-yellow-700 inline-block" />}
                    {candidate.rank > 3 && candidate.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={`https://placehold.co/100x100.png?text=${candidate.avatarInitial}`} data-ai-hint="person portrait" />
                            <AvatarFallback>{candidate.avatarInitial}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{candidate.name}</div>
                        {candidate.isCurrentUser && <Badge>You</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{candidate.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
