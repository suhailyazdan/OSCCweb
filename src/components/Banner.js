import Image from 'next/image';


export default function Banner() {
  return (
    <section className="text-center py-12 bg-yellow-100">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold ">
          Welcome to 
        </h1>
      
        <Image src="/OSCC_logo.svg" alt="OSCC Logo" width={500} height={130} className='mt-10 mb-5' />
      </div>
      <p className="mt-4 text-gray-600">Your path to learning starts here.</p>
    </section>
  );
}
