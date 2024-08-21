import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFOund() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <Button className=" text-lg ">Go back to Home</Button>
      </Link>
    </div>
  );
}
