import Link from 'next/link';

export default function Page() {
  return (
    <div className='containter'>
      <h1 className='text-heading1-semibold'>Yo, you seem not to join any room.</h1>
      <Link href={'/room/join'}>Join room now!</Link>
    </div>
  );
}
