// /src/components/Navigation.js
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image';


export default function Navigation() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto p-4 flex justify-between">
        <div className="text-xl font-bold">
          <Image src="/OSCC_logo.svg" alt="OSCC Logo" width={130} height={130} />
        </div>

        <div>
          <a href="/contact" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Contact</a>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </div> 
      </nav>
    </header>
  );
}
