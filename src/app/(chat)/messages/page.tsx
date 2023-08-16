import Link from 'next/link';

export default function Page() {
  return (
    <main className='main-container'>
      <Link href='./audio'>Audio call</Link>
      <Link href='./video'>Video call</Link>
    </main>
  );
}
