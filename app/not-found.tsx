import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Not Found</h2>
        <p className="text-gray-600 mb-6">Could not find requested resource</p>
        <Link href="/" className="px-4 py-2 bg-primary text-white rounded-lg">
          Return Home
        </Link>
      </div>
    </div>
  );
}
