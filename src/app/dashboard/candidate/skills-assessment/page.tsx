import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BrainCircuit } from "lucide-react";
import Link from "next/link";

const skillCategories = [
    { name: 'React', description: 'Test your knowledge of the React library for building user interfaces.' },
    { name: 'Next.js', description: 'Assess your skills in the popular React framework for production.' },
    { name: 'Java', description: 'Challenge your understanding of core Java concepts.' },
    { name: 'Python', description: 'Evaluate your proficiency in Python programming.' },
    { name: 'DSA', description: 'Test your problem-solving skills with data structures and algorithms.' },
    { name: 'HTML', description: 'Check your knowledge of web page structure and semantics.' },
    { name: 'CSS', description: 'Assess your ability to style modern and responsive websites.' },
    { name: 'SQL', description: 'Evaluate your skills in querying and managing relational databases.' },
    { name: 'Web3', description: 'Test your understanding of decentralized applications and blockchain technology.' },
];

export default function SkillsAssessmentPage() {
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

      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><BrainCircuit className="text-primary"/> Skills Assessments</CardTitle>
                <CardDescription>Choose an assessment from the categories below to test your knowledge. All tests are proctored.</CardDescription>
            </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map(skill => (
                <Card key={skill.name}>
                    <CardHeader>
                        <CardTitle className="font-headline">{skill.name}</CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href={`/dashboard/candidate/test?skill=${encodeURIComponent(skill.name)}`}>
                                Start Test
                                <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </>
  );
}
