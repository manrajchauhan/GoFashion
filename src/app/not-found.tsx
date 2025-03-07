import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="py-24 md:py-32 xl:py-52 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <Image className="block w-full max-w-sm md:max-w-lg lg:max-w-2xl mb-5 mx-auto" src="/404.svg" alt="404"
        width={500} height={500}
        />
        <p className="max-w-md mx-auto mb-12 text-lg text-gray-700">
          The page you are looking for was moved, removed, renamed, or might have never existed!
        </p>
        <Link href="/" className="inline-flex py-4 px-6 items-center justify-center text-lg font-medium text-white hover:text-neutral-900 border border-neutral-900 hover:border-neutral-500 bg-neutral-900 hover:bg-neutral-100 rounded-full transition duration-200">
          Back to home
        </Link>
      </div>
    </div>
  </section>
  )
}
