'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

const questions = [
  {
    question: "What is the main advantage of using server components in Next.js?",
    options: [
      "Faster client-side rendering",
      "Reduced client-side JavaScript bundle size",
      "Easier to write CSS",
      "They have access to browser APIs"
    ],
    answer: "Reduced client-side JavaScript bundle size"
  },
  {
    question: "Which hook is used to handle side effects in a React functional component?",
    options: [
      "useState",
      "useContext",
      "useEffect",
      "useReducer"
    ],
    answer: "useEffect"
  },
  {
    question: "How do you apply conditional classes in Tailwind CSS?",
    options: [
      "Using style attributes",
      "Using JavaScript template literals and a library like clsx",
      "With a special <style> tag",
      "You cannot apply conditional classes"
    ],
    answer: "Using JavaScript template literals and a library like clsx"
  },
];

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setIsFinished(true);
    }
  };

  const handleSelectAnswer = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = value;
    setSelectedAnswers(newAnswers);
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((q, i) => {
        if(selectedAnswers[i] === q.answer) {
            correctAnswers++;
        }
    });
    setScore(Math.round((correctAnswers / questions.length) * 100));
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

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

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">Skills Assessment</CardTitle>
          <CardDescription>Answer the following questions to the best of your ability.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isFinished ? (
            <div>
              <p className="font-semibold mb-1">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
              <h3 className="text-lg mb-4">{currentQuestion.question}</h3>
              <RadioGroup onValueChange={handleSelectAnswer} value={selectedAnswer}>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                    <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                    <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="flex-1 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button onClick={handleNext} disabled={!selectedAnswer} className="mt-6 w-full">
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Test"}
              </Button>
            </div>
          ) : (
            <div className="text-center">
                {score >= 80 ? <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" /> : <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />}
                <h2 className="text-2xl font-bold mb-2">Test Complete!</h2>
                <p className="text-lg text-muted-foreground mb-4">You scored</p>
                <p className="text-5xl font-bold text-primary mb-6">{score}%</p>
                <p className="text-sm text-muted-foreground">{score >= 80 ? "Great job! You've passed the assessment." : "You did not pass this time. Feel free to try again later."}</p>
                 <Button asChild className="mt-6" variant="default">
                    <Link href="/dashboard/candidate">Return to Dashboard</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
