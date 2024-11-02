"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from 'next/image';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // Redirect to the login page if not logged in
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirects to home page after logging out
  };

  return (
    <>
      <header className="bg-white shadow">
        <nav className="container mx-auto p-4 flex justify-between">
          <div className="text-xl font-bold">
            <Image src="/OSCC_logo.svg" alt="OSCC Logo" width={130} height={130} />
          </div>

          <div>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
              Logout
            </button>
          </div>
        </nav>
      </header>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <div className="text-2xl font-bold p-4">OSCC</div>
          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600">Home</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-600">Profile</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-600">Courses</button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
          <h3 className="text-2xl mb-5">
            To become a part of the OSCC platform, you must first complete the following mandatory courses.
          </h3>

          <div className="grid grid-cols-2 gap-6 mt-6">
            {[1, 2, 3, 4].map((course) => (
              <div key={course} className="bg-white p-6 shadow-lg">
                <h2 className="text-xl font-bold">Course {course}</h2>
                <p>Details about Course {course}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Apply</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
