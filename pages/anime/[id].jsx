import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AnimeDetail() {
  const router = useRouter()
  const { id } = router.query
  const [anime, setAnime] = useState(null)

  useEffect(() => {
    if (!id) return
    async function fetchAnime() {
      try {
        const res = await axios.get(`https://api.consumet.org/anime/gogoanime/info/${id}`)
        setAnime(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchAnime()
  }, [id])

  if (!anime) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
      <img src={anime.image} alt={anime.title} className="w-60 rounded mb-4" />
      <p className="mb-2">{anime.description}</p>
      <p><strong>Genres:</strong> {anime.genres?.join(', ')}</p>
      <p><strong>Status:</strong> {anime.status}</p>
    </div>
  )
}
