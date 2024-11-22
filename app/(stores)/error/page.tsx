// pages/404.js

import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500 mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="text-blue-500 mt-4">Go back to Home</Link>
    </div>
  );
};

export default Custom404;
