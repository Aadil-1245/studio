'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Home, User, UserCheck, UserCog, UsersRound, ClipboardCheck, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const allNavItems = [
  { href: '/dashboard/admin', label: 'Admin', icon: UserCog, role: 'admin' },
  { href: '/dashboard/hr', label: 'HR', icon: Briefcase, role: 'hr' },
  { href: '/dashboard/referrer', label: 'Referrer', icon: UserCheck, role: 'referrer' },
  { href: '/dashboard/candidate', label: 'Dashboard', icon: User, role: 'candidate' },
  { href: '/dashboard/candidate/test', label: 'Skills Test', icon: ClipboardCheck, role: 'candidate' },
  { href: '/dashboard/candidate/certifications', label: 'Certifications', icon: Award, role: 'candidate' },
];

export function DashboardNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const role = pathname.split('/')[2];

  const navItems = allNavItems.filter(item => {
    if (role === 'admin') {
      // Show all nav items for admin for simplicity, or define admin-specific views.
      // For now, let's stick to just the admin role link.
      return item.role === 'admin';
    }
    return item.role === role;
  });
  
  // A special case for admin to see all dashboards for demo purposes.
  if (role === 'admin') {
    navItems.push(
        ...allNavItems.filter(item => item.role !== 'admin' && item.href.split('/').length < 4)
    )
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
            const isActive = pathname === href;
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
