import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-2xl font-bold text-primary">Aichinime</Link>
      <ul className="flex space-x-6 text-sm">
        <li><Link href="/trending">Trending</Link></li>
        <li><Link href="/genre">Genres</Link></li>
        <li><Link href="/search">Search</Link></li>
      </ul>
    </nav>
  )
}
