import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Lock, UserPlus, Fingerprint, PenSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-auth');

  const features = [
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: 'Secure Authentication',
      description: 'Industry-standard encryption and security protocols to keep user data safe.',
    },
    {
      icon: <UserPlus className="h-8 w-8 text-primary" />,
      title: 'Profile Management',
      description: 'Users can easily create, update, and manage their profiles and personal information.',
    },
    {
      icon: <Fingerprint className="h-8 w-8 text-primary" />,
      title: 'Session Handling',
      description: 'Robust and secure session management to maintain user sessions across devices.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gray-100 dark:bg-gray-800/20">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover z-0 opacity-10"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 dark:text-gray-50 font-headline">
              AuthBase: Secure, Scalable Authentication
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Your foundation for building secure applications with robust user management.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/signup">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto">
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    <PenSquare className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">Register Your Interest</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Interested in our platform? Fill out the form below to let us know.
                </p>
                <Button asChild size="lg">
                    <Link href="/register-interest">
                        Register Interest <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      <footer className="py-6 bg-gray-100 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 md:px-6 text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} AuthBase. All Rights Reserved.
          </div>
      </footer>
    </div>
  );
}
