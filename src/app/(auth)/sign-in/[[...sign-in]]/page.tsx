import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className='main-container'>
      <SignIn />
    </main>
  );
}
