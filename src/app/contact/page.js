"use client";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form>
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
    </div>
  );
}
