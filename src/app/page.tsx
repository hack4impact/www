import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CallToAction } from "@/components/ui/CallToAction";

export default function HomePage() {
  return (
    <>
      <section className="relative pb-32">
        {/* Gradient background */}
        <div className="absolute inset-0 bottom-1/3 bg-gradient-to-b from-blue-100 via-blue-100 via-60% to-green-50" />

        {/* Content */}
        <div className="relative text-center pt-24 px-8">
          <h1 className="flex flex-col">
            <span className="font-serif text-5xl md:text-7xl">
              Code &amp; community
            </span>
            <span className="font-sans text-4xl md:text-6xl">
              for the common good
            </span>
          </h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Committed to supporting nonprofits and social good initiatives, Hack
            for Impact educates and connects student volunteers, in search of
            real-world experience, with nonprofit partners that address crucial
            community needs.
          </p>
          <div className="mt-6">
            <Link href="/nonprofits">
              <Button>Partner with us!</Button>
            </Link>
          </div>
        </div>

        {/* Image hanging below gradient */}
        <div className="relative mt-8 flex justify-center px-8">
          <div className="debug-border">
            <Image
              src="/images/gt.jpg"
              alt="Hack4Impact"
              width={800}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center max-w-lg mx-auto">
          Our process for turning computer science into community science
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
            <Image
              src="/images/group.jpg"
              alt="Hack4Impact team collaborating"
              fill
              className="object-cover"
            />
          </div>

          {/* Process steps */}
          <div className="flex flex-col justify-between h-full divide-y divide-gray-200 border-t border-gray-200">
            <div className="flex-1 flex flex-col justify-center py-4 relative">
              <span className="absolute top-4 right-0 font-mono text-gray-400">01</span>
              <h3 className="text-lg font-sans mb-1">Source</h3>
              <p className="font-serif text-gray-600">We connect with nonprofit organizations facing technical challenges that align with our mission. Partners apply through our network, and we evaluate projects based on community impact and feasibility.</p>
            </div>
            <div className="flex-1 flex flex-col justify-center py-4 relative">
              <span className="absolute top-4 right-0 font-mono text-gray-400">02</span>
              <h3 className="text-lg font-sans mb-1">Define</h3>
              <p className="font-serif text-gray-600">Our team meets with your organization to understand your goals, users, and constraints. Together we scope the project, identify key requirements, and establish success metrics.</p>
            </div>
            <div className="flex-1 flex flex-col justify-center py-4 relative">
              <span className="absolute top-4 right-0 font-mono text-gray-400">03</span>
              <h3 className="text-lg font-sans mb-1">Design</h3>
              <p className="font-serif text-gray-600">We create wireframes and prototypes in close collaboration with your team. User research and iterative feedback ensure the solution truly serves your community&apos;s needs.</p>
            </div>
            <div className="flex-1 flex flex-col justify-center py-4 relative">
              <span className="absolute top-4 right-0 font-mono text-gray-400">04</span>
              <h3 className="text-lg font-sans mb-1">Develop</h3>
              <p className="font-serif text-gray-600">Student developers build your product using modern, maintainable technologies. Regular check-ins keep you informed and involved throughout the development process.</p>
            </div>
            <div className="flex-1 flex flex-col justify-center py-4 relative">
              <span className="absolute top-4 right-0 font-mono text-gray-400">05</span>
              <h3 className="text-lg font-sans mb-1">Maintain</h3>
              <p className="font-serif text-gray-600">We deliver comprehensive documentation and training so your team can manage the product independently. Ongoing support options ensure long-term success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif">Our programs</h2>
          <p className="text-2xl md:text-3xl font-sans">Community in action</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-start px-6 py-8 debug-border">
            <div className="mb-6">
              <Image src="/icons/nonprofits.svg" alt="" width={45} height={45} />
            </div>
            <h3 className="text-xl font-sans mb-2">Non-Profits</h3>
            <p className="text-base font-serif mb-4">We build custom software solutions for nonprofit organizations, helping them better serve their communities and amplify their impact.</p>
            <Link href="/nonprofits" className="mt-auto font-mono text-sm hover:underline">Learn more &rarr;</Link>
          </div>
          <div className="flex flex-col items-start px-6 py-8 debug-border">
            <div className="mb-6">
              <Image src="/icons/students.svg" alt="" width={45} height={45} />
            </div>
            <h3 className="text-xl font-sans mb-2">Students</h3>
            <p className="text-base font-serif mb-4">We provide community, education, and service-learning opportunities for students to develop real-world skills while making a difference.</p>
            <Link href="/students" className="mt-auto font-mono text-sm hover:underline">Learn more &rarr;</Link>
          </div>
          <div className="flex flex-col items-start px-6 py-8 debug-border">
            <div className="mb-6">
              <Image src="/icons/professionals.svg" alt="" width={45} height={45} />
            </div>
            <h3 className="text-xl font-sans mb-2">Professionals</h3>
            <p className="text-base font-serif mb-4">Industry professionals mentor our students, sharing expertise and guiding the next generation of socially-conscious technologists.</p>
            <Link href="/mentors" className="mt-auto font-mono text-sm hover:underline">Learn more &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Quote Callout Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="px-8 lg:px-0 lg:pl-12 py-8 lg:py-12">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/javid.jpg"
              alt="Javid Fathi"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Quote content */}
        <div className="flex flex-col justify-center items-start p-8 lg:px-24 lg:py-12">
          <blockquote className="font-sans text-2xl md:text-3xl">
            &ldquo;...the kind of passion for socially-minded engineering our industry desperately needs.&rdquo;
          </blockquote>
          <div className="mt-6 md:mt-8">
            <p className="font-sans text-lg">Javid Fathi</p>
            <p className="font-serif text-gray-600">Software Engineer Lead at Microsoft</p>
          </div>
        </div>
      </section>

      <CallToAction
        heading="Ready to make an impact?"
        buttonText="Get involved"
        href="/students"
      />
    </>
  );
}
