'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Handshake, Search, CheckCircle, Clock, XCircle, Briefcase, Star, IndianRupee, CreditCard, Landmark, Wallet } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const referrers = [
  {
    name: 'Alex Doe',
    title: 'Senior Software Engineer @ Refro Inc.',
    avatar: 'AD',
    criteria: ['React', 'Node.js', '5+ years experience', 'Based in EU'],
    match: true,
  },
  {
    name: 'Sarah Lee',
    title: 'Product Manager @ Refro Inc.',
    avatar: 'SL',
    criteria: ['Product Management', 'Agile', 'JIRA', 'Market Research'],
    match: false,
  },
  {
    name: 'Michael Chen',
    title: 'Engineering Manager @ Refro Inc.',
    avatar: 'MC',
    criteria: ['TypeScript', 'Next.js', 'Team Leadership', 'System Design'],
    match: true,
  },
];

const sentRequests = [
    { name: 'Alex Doe', status: 'Accepted' },
    { name: 'Michael Chen', status: 'Pending' },
];

const paymentMethods = [
  { name: 'GPay', icon: Wallet },
  { name: 'Paytm', icon: Wallet },
  { name: 'Card', icon: CreditCard },
  { name: 'PayPal', icon: Landmark },
]

export default function FindReferrerPage() {
    const { toast } = useToast();
    const [requests, setRequests] = useState(sentRequests);
    const [paymentMade, setPaymentMade] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');

    const handleSendRequest = (name: string) => {
        toast({
            title: "Referral Request Sent!",
            description: `Your request to ${name} has been sent successfully.`,
        });
        if (!requests.find(r => r.name === name)) {
            setRequests(prev => [...prev, { name, status: 'Pending' }])
        }
    }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Accepted': return <CheckCircle className="text-green-500" />;
        case 'Pending': return <Clock className="text-yellow-500" />;
        case 'Rejected': return <XCircle className="text-red-500" />;
        default: return null;
    }
  }

  const handlePayment = (method: string) => {
    setSelectedPayment(method);
    setTimeout(() => {
        setPaymentMade(true);
        toast({
            title: "Payment Successful!",
            description: `Payment of ₹1500 made via ${method}.`,
        })
    }, 1000)
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Search />
                    Available Referrers
                </CardTitle>
                <CardDescription>Browse employees who are open to referring candidates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {referrers.map(referrer => (
                        <Card key={referrer.name}>
                            <CardHeader className="flex flex-row items-start gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={`https://placehold.co/100x100.png?text=${referrer.avatar}`} data-ai-hint="person portrait" />
                                    <AvatarFallback>{referrer.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-lg">{referrer.name}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Briefcase /> {referrer.title}</p>
                                </div>
                                {referrer.match && <Badge className="ml-auto bg-green-500 hover:bg-green-600 gap-1"><Star className="h-3 w-3" /> Good Match</Badge>}
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold text-sm mb-2">Referral Criteria:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {referrer.criteria.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button disabled={!referrer.match || !!requests.find(r => r.name === referrer.name)} onClick={() => handleSendRequest(referrer.name)}>
                                    <Handshake className="mr-2" />
                                    {requests.find(r => r.name === referrer.name) ? 'Request Sent' : 'Request Referral'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Requests</CardTitle>
                    <CardDescription>Track the status of your referral requests.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {requests.length > 0 ? requests.map(req => (
                        <div key={req.name} className="flex items-center">
                            <div className="flex-1">
                                <p className="font-medium">{req.name}</p>
                                <p className="text-sm text-muted-foreground">{req.status}</p>
                            </div>
                            {getStatusIcon(req.status)}
                        </div>
                    )) : <p className="text-sm text-muted-foreground">No requests sent yet.</p>}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Referral Payments</CardTitle>
                    <CardDescription>Payment details for successful referrals.</CardDescription>
                </CardHeader>
                 <CardContent>
                    {requests.filter(r => r.status === 'Accepted').length > 0 ? (
                        requests.filter(r => r.status === 'Accepted').map(req => (
                        <div key={req.name} className="space-y-4">
                           {paymentMade ? (
                               <div className="text-center p-4 bg-green-500/10 rounded-lg">
                                 <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                                 <h3 className="font-bold text-lg">Payment Complete!</h3>
                                 <p className="text-sm text-muted-foreground">The referral fee has been processed.</p>
                               </div>
                           ) : (
                            <>
                                <p className="font-semibold text-green-600">Referral by {req.name} was successful!</p>
                                <div className="border rounded-lg p-4 space-y-3">
                                    <h4 className="font-bold text-center">Payment Breakdown</h4>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Total Referral Fee:</span>
                                        <span className="font-bold flex items-center gap-1"><IndianRupee size={16}/> 1500.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">To Referrer ({req.name}):</span>
                                        <span className="font-medium flex items-center gap-1"><IndianRupee size={14}/> 1000.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">To Company (Refro Inc.):</span>
                                        <span className="font-medium flex items-center gap-1"><IndianRupee size={14}/> 500.00</span>
                                    </div>
                                </div>
                                <div className="pt-2">
                                     <h4 className="font-semibold text-center mb-3">Choose Payment Method</h4>
                                     <div className="grid grid-cols-2 gap-2">
                                        {paymentMethods.map(method => {
                                            const Icon = method.icon;
                                            return (
                                                <Button key={method.name} variant="outline" onClick={() => handlePayment(method.name)} disabled={!!selectedPayment}>
                                                    {selectedPayment === method.name ? 'Processing...' : <><Icon className="mr-2" /> {method.name}</>}
                                                </Button>
                                            )
                                        })}
                                     </div>
                                </div>
                                <p className="text-xs text-muted-foreground text-center pt-2">This is a simulation. No real payments are processed.</p>
                            </>
                           )}
                        </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No accepted referrals yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>

      </div>
    </>
  );
}
