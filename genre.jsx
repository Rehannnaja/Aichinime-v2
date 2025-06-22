import { useEffect, useState } from 'react'
import AnimeCard from '@/components/AnimeCard'
import axios from 'axios'

export default function GenrePage() {
  const [genre, setGenre] = useState('action')
  const [results, setResults] = useState([])

  useEffect(() => {
    async function fetchGenre() {
      const res = await axios.get(`https://api.consumet.org/anime/gogoanime/${genre}`)
      setResults(res.data.results || [])
    }
    fetchGenre()
  }, [genre])

  const genres = ['action', 'comedy', 'drama', 'fantasy', 'horror', 'romance', 'sci-fi']

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">🎨 Filter by Genre</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {genres.map(g => (
          <button key={g} className={`px-3 py-1 rounded ${g === genre ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {results.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
      </div>
    </div>
  )
}
