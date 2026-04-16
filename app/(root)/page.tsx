import type { ReactElement } from 'react';
import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';

export default async function Home(): Promise<ReactElement> {
  const session = await auth();

  console.log(session)
  return (
    <div className="">
      <h1 className='body-regular'>ABCD</h1>
      <h1 className='body-regular font-space-grotesk'>ABCD</h1>

      <form className='px-10 pt-[100px]' action={async () => {
        "use server";
        await signOut({redirectTo: ROUTES.SIGN_IN})
      }}>
        <Button type='submit'>Log Out</Button>
      </form>
    </div>
  );
}
