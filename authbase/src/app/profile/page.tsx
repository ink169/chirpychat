'use client';

import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/profile-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Suspense } from 'react';
import ProfileLoading from './loading';
import { useUser } from '@/firebase';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <ProfileLoading />;
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container py-10">
      <Suspense fallback={<ProfileLoading />}>
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Welcome, {user.displayName || 'User'}</h1>
            <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                Manage your account settings and personal information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ProfileForm user={user} />
            </CardContent>
            </Card>
        </div>
      </Suspense>
    </div>
  );
}
