import { useEffect, useState } from 'react'
import AnimeCard from './AnimeCard'
import axios from 'axios'

export default function ViralSection() {
  const [viral, setViral] = useState([])

  useEffect(() => {
    async function fetchViral() {
      try {
        const res = await axios.get('https://api.consumet.org/anime/gogoanime/popular')
        setViral(res.data.results.slice(0, 10))
      } catch (err) {
        console.error(err)
      }
    }
    fetchViral()
  }, [])

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">🎉 Viral Bulan Ini</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {viral.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  )
}
