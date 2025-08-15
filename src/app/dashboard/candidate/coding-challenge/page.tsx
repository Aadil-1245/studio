'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, CheckCircle, Code, Flame } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const dsaQuestions = [
  { id: 1, title: "Two Sum", difficulty: "Easy", points: 10, description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", template: "function twoSum(nums, target) {\n  // Your code here\n}" },
  { id: 2, title: "Reverse a String", difficulty: "Easy", points: 10, description: "Write a function that reverses a string.", template: "function reverseString(s) {\n  // Your code here\n}" },
  { id: 3, title: "Palindrome Check", difficulty: "Easy", points: 10, description: "Check if a given string is a palindrome.", template: "function isPalindrome(s) {\n  // Your code here\n}" },
  { id: 4, title: "FizzBuzz", difficulty: "Easy", points: 10, description: "Return an array of strings from 1 to n. For multiples of three, use 'Fizz', for five 'Buzz', and for both 'FizzBuzz'.", template: "function fizzBuzz(n) {\n  // Your code here\n}" },
  { id: 5, title: "Maximum Subarray", difficulty: "Medium", points: 20, description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.", template: "function maxSubArray(nums) {\n  // Your code here\n}" },
  { id: 6, title: "Valid Parentheses", difficulty: "Medium", points: 20, description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.", template: "function isValid(s) {\n  // Your code here\n}" },
  { id: 7, title: "Binary Search", difficulty: "Easy", points: 10, description: "Given a sorted array of distinct integers and a target value, return the index if the target is found.", template: "function search(nums, target) {\n  // Your code here\n}" },
  { id: 8, title: "Merge Two Sorted Lists", difficulty: "Easy", points: 10, description: "Merge two sorted linked lists and return it as a sorted list.", template: "function mergeTwoLists(l1, l2) {\n  // Your code here\n}" },
  { id: 9, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", points: 20, description: "Given a string s, find the length of the longest substring without repeating characters.", template: "function lengthOfLongestSubstring(s) {\n  // Your code here\n}" },
  { id: 10, title: "Container With Most Water", difficulty: "Medium", points: 20, description: "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.", template: "function maxArea(height) {\n  // Your code here\n}" },
  { id: 11, title: "Rotate Array", difficulty: "Medium", points: 20, description: "Rotate array to the right by k steps.", template: "function rotate(nums, k) {\n  // Your code here\n}" },
  { id: 12, title: "Find First and Last Position", difficulty: "Medium", points: 20, description: "Find First and Last Position of Element in Sorted Array.", template: "function searchRange(nums, target) {\n  // Your code here\n}"},
  { id: 13, title: "Search in Rotated Sorted Array", difficulty: "Medium", points: 20, description: "Search in Rotated Sorted Array.", template: "function search(nums, target) {\n  // Your code here\n}"},
  { id: 14, title: "Combination Sum", difficulty: "Medium", points: 20, description: "Find all unique combinations in candidates where the candidate numbers sum to target.", template: "function combinationSum(candidates, target) {\n  // Your code here\n}"},
  { id: 15, title: "Permutations", difficulty: "Medium", points: 20, description: "Given an array nums of distinct integers, return all the possible permutations.", template: "function permute(nums) {\n  // Your code here\n}"},
  { id: 16, title: "Climbing Stairs", difficulty: "Easy", points: 10, description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?", template: "function climbStairs(n) {\n  // Your code here\n}"},
  { id: 17, title: "Invert Binary Tree", difficulty: "Easy", points: 10, description: "Given the root of a binary tree, invert the tree, and return its root.", template: "function invertTree(root) {\n  // Your code here\n}"},
  { id: 18, title: "Validate Binary Search Tree", difficulty: "Medium", points: 20, description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).", template: "function isValidBST(root) {\n  // Your code here\n}"},
  { id: 19, title: "Number of Islands", difficulty: "Medium", points: 20, description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.", template: "function numIslands(grid) {\n  // Your code here\n}"},
  { id: 20, title: "LRU Cache", difficulty: "Hard", points: 30, description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.", template: "class LRUCache {\n  // Your code here\n}"},
  { id: 21, title: "Longest Palindromic Substring", difficulty: "Medium", points: 20, description: "Given a string s, return the longest palindromic substring in s.", template: "function longestPalindrome(s) {\n  // Your code here\n}"},
  { id: 22, title: "Product of Array Except Self", difficulty: "Medium", points: 20, description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].", template: "function productExceptSelf(nums) {\n  // Your code here\n}"},
  { id: 23, title: "Minimum Window Substring", difficulty: "Hard", points: 30, description: "Given two strings s and t, return the minimum window in s which will contain all the characters in t.", template: "function minWindow(s, t) {\n  // Your code here\n}"},
  { id: 24, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", points: 30, description: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.", template: "function serialize(root) {\n  // Your code here\n}\n\nfunction deserialize(data) {\n  // Your code here\n}"},
  { id: 25, title: "Trapping Rain Water", difficulty: "Hard", points: 30, description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.", template: "function trap(height) {\n  // Your code here\n}"},
  { id: 26, title: "Word Break", difficulty: "Medium", points: 20, description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.", template: "function wordBreak(s, wordDict) {\n  // Your code here\n}"},
  { id: 27, title: "Coin Change", difficulty: "Medium", points: 20, description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.", template: "function coinChange(coins, amount) {\n  // Your code here\n}"},
  { id: 28, title: "Find Median from Data Stream", difficulty: "Hard", points: 30, description: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.", template: "class MedianFinder {\n  // Your code here\n}"},
  { id: 29, title: "Kth Smallest Element in a BST", difficulty: "Medium", points: 20, description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.", template: "function kthSmallest(root, k) {\n  // Your code here\n}"},
  { id: 30, title: "Implement Trie (Prefix Tree)", difficulty: "Medium", points: 20, description: "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.", template: "class Trie {\n  // Your code here\n}"},
];


export default function CodingChallengePage() {
  const [code, setCode] = useState(dsaQuestions[0].template);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);

  const currentQuestion = dsaQuestions[currentQuestionIndex];

  const handleSubmit = () => {
    if (solvedQuestions.includes(currentQuestion.id)) return;
    
    setStreak(prev => prev + currentQuestion.points);
    setSolvedQuestions(prev => [...prev, currentQuestion.id]);
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setCode(dsaQuestions[index].template);
  }

  const handleNext = () => {
    const nextIndex = (currentQuestionIndex + 1) % dsaQuestions.length;
    handleQuestionSelect(nextIndex);
  }

  const handlePrev = () => {
    const prevIndex = (currentQuestionIndex - 1 + dsaQuestions.length) % dsaQuestions.length;
    handleQuestionSelect(prevIndex);
  }
  
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
        case 'Easy': return "bg-green-500/20 text-green-500 border-green-500/50";
        case 'Medium': return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
        case 'Hard': return "bg-red-500/20 text-red-500 border-red-500/50";
        default: return "bg-gray-500/20 text-gray-500 border-gray-500/50";
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex-shrink-0 flex justify-between items-center p-4 border-b">
            <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/candidate">
                    <ArrowLeft className="mr-2" />
                    Back to Dashboard
                </Link>
            </Button>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-lg">
                <Flame />
                <span>Refro Streak: {streak}</span>
            </div>
        </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 overflow-hidden">
        <div className="md:col-span-1 overflow-y-auto p-2 border-r">
            <h2 className="font-bold p-2">Problems</h2>
            <ul className="space-y-1">
                {dsaQuestions.map((q, index) => (
                    <li key={q.id}>
                        <button 
                         onClick={() => handleQuestionSelect(index)}
                         className={cn(
                            "w-full text-left p-2 rounded-md hover:bg-muted flex items-center gap-2 text-sm",
                            currentQuestionIndex === index && 'bg-primary/10 text-primary font-semibold'
                         )}
                        >
                           {solvedQuestions.includes(q.id) ? <CheckCircle className="text-green-500 flex-shrink-0" /> : <Code className="flex-shrink-0" />}
                           <span className="flex-grow truncate">{q.id}. {q.title}</span>
                           <Badge variant="outline" className={getDifficultyBadge(q.difficulty)}>{q.difficulty}</Badge>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        <div className="md:col-span-3 flex flex-col overflow-y-auto p-4">
            <Card className="flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center justify-between gap-2">
                        <span>{currentQuestion.title}</span>
                        <Badge variant="outline" className={cn("text-sm", getDifficultyBadge(currentQuestion.difficulty))}>{currentQuestion.difficulty}</Badge>
                    </CardTitle>
                    <CardDescription>{currentQuestion.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                    <div className="p-4 bg-muted rounded-lg flex-shrink-0">
                        <pre className="bg-background p-2 rounded-md text-sm"><code>{currentQuestion.template}</code></pre>
                    </div>
                    <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your code here..."
                        className="flex-1 font-mono w-full"
                    />
                </CardContent>
                <CardFooter className="flex-col sm:flex-row gap-2 justify-between">
                     <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrev}><ArrowLeft className="mr-2"/> Prev</Button>
                        <Button variant="outline" onClick={handleNext}>Next <ArrowRight className="ml-2"/></Button>
                     </div>
                     <Button 
                        onClick={handleSubmit} 
                        disabled={!code || solvedQuestions.includes(currentQuestion.id)} 
                        className={cn(solvedQuestions.includes(currentQuestion.id) && "bg-green-600 hover:bg-green-700")}
                    >
                        {solvedQuestions.includes(currentQuestion.id) ? <><CheckCircle className="mr-2"/> Solved</> : "Submit Solution"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
