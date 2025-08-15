'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Home, User, UserCheck, UserCog, UsersRound, ClipboardCheck, Award, Code, Users, Handshake, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const allNavItems = [
  { href: '/dashboard/admin', label: 'Admin', icon: UserCog, role: 'admin' },
  { href: '/dashboard/hr', label: 'HR', icon: Briefcase, role: 'hr' },
  { href: '/dashboard/referrer', label: 'Referrer', icon: UserCheck, role: 'referrer' },
  { href: '/dashboard/candidate', label: 'Dashboard', icon: User, role: 'candidate' },
  { href: '/dashboard/candidate/skills-assessment', label: 'Skills Assessments', icon: BrainCircuit, role: 'candidate' },
  { href: '/dashboard/candidate/certifications', label: 'Certifications', icon: Award, role: 'candidate' },
  { href: '/dashboard/candidate/coding-challenge', label: 'Coding Challenge', icon: Code, role: 'candidate' },
  { href: '/dashboard/candidate/leaderboard', label: 'Leaderboard', icon: Users, role: 'candidate' },
  { href: '/dashboard/candidate/find-referrer', label: 'Find Referrer', icon: Handshake, role: 'candidate' },
];

export function DashboardNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const role = pathname.split('/')[2];

  const navItems = allNavItems.filter(item => {
    const itemRole = item.href.split('/')[2];
    
    // Hide the base test page from the nav
    if(item.href.includes('/test')){
        return false;
    }
    
    if (role === 'admin') {
      // Show all nav items for admin for simplicity.
      return true;
    }
    return itemRole === role;
  });
  
  // A special case for admin to see all dashboards for demo purposes.
  if (role === 'admin') {
     // Admin already sees everything from filter logic above
  }


  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold font-headline">
          <UsersRound className="h-6 w-6 text-primary" />
          <span>Refro</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-2 px-2 lg:px-4">
        <div className="grid items-start font-medium">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            const linkContent = (
              <Link
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive && 'bg-muted text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );

            if (isMobile) {
              return linkContent;
            }

            return (
              <Tooltip key={href}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </nav>
      <div className="mt-auto p-4 border-t">
         <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
