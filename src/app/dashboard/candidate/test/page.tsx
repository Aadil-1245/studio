
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, XCircle, Video, VideoOff } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const allQuestions = {
  React: [
    {
      question: "Which hook is used to handle side effects in a React functional component?",
      options: ["useState", "useContext", "useEffect", "useReducer"],
      answer: "useEffect"
    },
    {
      question: "What is the purpose of a key prop in React lists?",
      options: [
        "It is used for styling",
        "It helps React identify which items have changed, are added, or are removed",
        "It is a required attribute for all HTML elements",
        "It defines the data type of the list item"
      ],
      answer: "It helps React identify which items have changed, are added, or are removed"
    },
    {
        question: "What is JSX?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript",
          "A CSS preprocessor",
          "A database query language"
        ],
        answer: "A syntax extension for JavaScript"
    }
  ],
  "Next.js": [
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
      question: "Which file is used to define dynamic routes in Next.js App Router?",
      options: [
        "pages/api/[id].ts",
        "app/[id]/page.tsx",
        "app/route/[id].ts",
        "app/dynamic-routes.js"
      ],
      answer: "app/[id]/page.tsx"
    },
  ],
   Java: [
    {
        question: "What is the main principle of Object-Oriented Programming (OOP) that Java follows?",
        options: ["Procedural Programming", "Functional Programming", "Encapsulation, Inheritance, Polymorphism", "Scripting"],
        answer: "Encapsulation, Inheritance, Polymorphism"
    },
   ],
   Python: [
    {
        question: "Which data structure is mutable in Python?",
        options: ["Tuple", "String", "List", "Integer"],
        answer: "List"
    },
   ],
    DSA: [
    {
        question: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        answer: "Stack"
    },
   ],
    HTML: [
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "High-Level Text Machine Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        answer: "HyperText Markup Language"
    },
    ],
    CSS: [
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    ],
    SQL: [
    {
        question: "Which SQL clause is used to filter results?",
        options: ["FILTER", "SELECT", "WHERE", "SORT"],
        answer: "WHERE"
    },
    ],
    "Web3": [
    {
        question: "What is a 'smart contract' in the context of Web3?",
        options: ["A legally binding digital document", "A self-executing contract with the terms of the agreement directly written into code", "A new type of cryptocurrency", "A decentralized web browser"],
        answer: "A self-executing contract with the terms of the agreement directly written into code"
    },
    ],
    "Figma": [{ question: "What is Figma primarily used for?", options: ["Vector graphics editing", "Video editing", "UI/UX design", "Writing code"], answer: "UI/UX design" }],
    "Kubernetes": [{ question: "What is a 'Pod' in Kubernetes?", options: ["A storage unit", "The smallest deployable unit of computing", "A networking rule", "A type of service"], answer: "The smallest deployable unit of computing" }],
    "Node.js": [{ question: "What is Node.js?", options: ["A frontend framework", "A JavaScript runtime environment", "A database", "A programming language"], answer: "A JavaScript runtime environment" }],
};

function TestComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const skill = searchParams.get('skill') || "Next.js";
  const source = searchParams.get('source');
  const jobTitle = searchParams.get('job');
  
  const questions = allQuestions[skill as keyof typeof allQuestions] || allQuestions['Next.js'];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to continue.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if(videoRef.current && videoRef.current.srcObject){
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }

  }, [toast]);


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
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);

    if (finalScore >= 80 && source === 'job-apply' && jobTitle) {
         toast({
            title: "Test Passed! Application Submitted.",
            description: `Your application for ${jobTitle} has been submitted.`
        })
    }
  }

  const getBackButton = () => {
    const href = source === 'job-apply' ? '/dashboard/candidate/available-jobs' : '/dashboard/candidate/skills-assessment';
    const text = source === 'job-apply' ? 'Back to Jobs' : 'Back to Assessments';
    return (
        <Button asChild variant="outline" size="sm">
            <Link href={href}>
                <ArrowLeft className="mr-2" />
                {text}
            </Link>
        </Button>
    )
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <>
      <div className="mb-4">
        {getBackButton()}
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">{skill} Assessment</CardTitle>
          <CardDescription>Answer the following questions to the best of your ability. Your session is being proctored.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative mb-4">
                <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted />
                 <div className="absolute top-2 right-2">
                    {hasCameraPermission === true && <Badge variant="default" className="bg-green-500 hover:bg-green-600 gap-1.5"><Video /> Proctoring Enabled</Badge>}
                    {hasCameraPermission === false && <Badge variant="destructive" className="gap-1.5"><VideoOff /> Proctoring Disabled</Badge>}
                 </div>
            </div>

            {hasCameraPermission === false && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera and microphone access to start the test.
                  </AlertDescription>
                </Alert>
            )}

          {!isFinished ? (
            <div className={hasCameraPermission === false ? 'opacity-50 pointer-events-none' : ''}>
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
              <Button onClick={handleNext} disabled={!selectedAnswer || hasCameraPermission === false} className="mt-6 w-full">
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
                    <Link href={source === 'job-apply' ? '/dashboard/candidate/available-jobs' : '/dashboard/candidate'}>
                        {source === 'job-apply' ? 'Return to Jobs' : 'Return to Dashboard'}
                    </Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default function TestPage() {
    return (
        <Suspense>
            <TestComponent />
        </Suspense>
    )
}
