import { useState } from 'react'
import AnimeCard from '@/components/AnimeCard'
import axios from 'axios'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query) return

    const res = await axios.get(`https://api.consumet.org/anime/gogoanime/${query}`)
    setResults(res.data.results || [])
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">🔍 Search Anime</h1>
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anime title..."
          className="border px-4 py-2 rounded w-full"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Search</button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {results.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
      </div>
    </div>
  )
}
