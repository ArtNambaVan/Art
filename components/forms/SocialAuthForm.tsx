'use client';
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import ROUTES from '@/constants/routes';
import { Spinner } from '@/components/ui/spinner';

function SocialAuthForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);

  const buttonClass =
    'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5';

  const handleSignIn = async (provider: 'github' | 'google'): Promise<void> => {
    try {
      setIsLoading(true);
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
      toast.success(`Welcome`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className={buttonClass}
        disabled={isLoading}
        onClick={() => {
          void handleSignIn('github');
        }}
      >
        {isLoading ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <Image
            src="/icons/github.svg"
            width={20}
            height={20}
            alt="Github Logo"
            className="invert-colors mr-2.5 object-contain"
          />
        )}

        <span>Log in with GitHub</span>
      </Button>
      <Button
        className={buttonClass}
        disabled={isLoading}
        onClick={() => {
          void handleSignIn('google');
        }}
      >
        {isLoading ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <Image
            src="/icons/google.svg"
            width={20}
            height={20}
            alt="Github Logo"
            className="mr-2.5 object-contain"
          />
        )}

        <span>Log in with GitHub</span>
      </Button>
    </div>
  );
}

export default SocialAuthForm;
