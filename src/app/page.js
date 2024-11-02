"use client";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto p-4 flex justify-between">
          <div className="text-xl font-bold">
            <Image src="/OSCC_logo.svg" alt="OSCC Logo" width={130} height={130} />
          </div>         

          <div>
            <a href="/contact" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Contact</a>
            
            <a href="/auth/signin">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Sign In
              </button>
            </a>
          </div>
        </nav>
      </header>

      <Banner />

      {/* Cards Section */}
      <section className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-bold">Card {item}</h2>
            <p className="mt-2 text-gray-600">Dummy text for card {item}.</p>
          </div>
        ))}
      </section>

      {/* Enquiry Form Section */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Enquiry Form</h2>
          <form className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Submit
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
