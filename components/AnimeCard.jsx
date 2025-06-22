import Link from 'next/link'

export default function AnimeCard({ anime }) {
  return (
    <Link href={`/anime/${anime.id}`} className="bg-gray-800 rounded-xl overflow-hidden shadow hover:scale-105 transition">
      <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover" />
      <div className="p-2">
        <h2 className="text-sm font-semibold">{anime.title}</h2>
      </div>
    </Link>
  )
}
