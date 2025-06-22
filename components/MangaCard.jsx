import Link from 'next/link'

export default function MangaCard({ manga }) {
  return (
    <Link href={`/manga/${manga.id}`} className="bg-gray-800 rounded-xl overflow-hidden shadow hover:scale-105 transition">
      <img src={manga.coverImage} alt={manga.title} className="w-full h-48 object-cover" />
      <div className="p-2">
        <h2 className="text-sm font-semibold">{manga.title}</h2>
      </div>
    </Link>
  )
}
