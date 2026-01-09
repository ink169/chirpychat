'use client';
import Link from 'next/link';
import { UserNav } from '@/components/user-nav';
import { Database } from 'lucide-react';
import { useUser } from '@/firebase';

export function SiteHeader() {
  const { user, isUserLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">AuthBase</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            {!isUserLoading && <UserNav user={user} />}
          </nav>
        </div>
      </div>
    </header>
  );
}
