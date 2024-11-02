"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);

  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn("google", {
      redirect: false,
    });

    if (result?.error) {
      setError("Failed to sign in. Please try again.");
    } else {
      router.push("/dashboard"); // This will trigger redirect after successful login
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <a href="/" className="mb-10">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Back to Home page
        </button>
      </a>

      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignIn}>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
