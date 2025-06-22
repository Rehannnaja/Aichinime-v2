import { useEffect, useState } from 'react'
import AnimeCard from '@/components/AnimeCard'
import MangaCard from '@/components/MangaCard'
import axios from 'axios'

export default function Trending() {
  const [animeList, setAnimeList] = useState([])
  const [mangaList, setMangaList] = useState([])

  useEffect(() => {
    async function fetchTrending() {
      try {
        const animeRes = await axios.get('https://api.consumet.org/anime/gogoanime/top-airing')
        const mangaRes = await axios.get('https://api.mangadex.org/manga?order[followedCount]=desc&limit=10&includes[]=cover_art')

        const mangas = mangaRes.data.data.map(m => ({
          id: m.id,
          title: m.attributes.title.en || Object.values(m.attributes.title)[0],
          coverImage: `https://uploads.mangadex.org/covers/${m.id}/${m.relationships.find(r => r.type === 'cover_art')?.attributes?.fileName}.256.jpg`
        }))

        setAnimeList(animeRes.data.results)
        setMangaList(mangas)
      } catch (e) {
        console.error(e)
      }
    }

    fetchTrending()
  }, [])

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">🔥 Trending Anime</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {animeList.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4">📚 Trending Manga</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {mangaList.map(manga => <MangaCard key={manga.id} manga={manga} />)}
        </div>
      </section>
    </div>
  )
}
