import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import AnimeCard from '@/components/AnimeCard'
import MangaCard from '@/components/MangaCard'
import axios from 'axios'

export default function Home() {
  const [animeList, setAnimeList] = useState([])
  const [mangaList, setMangaList] = useState([])
  const [heroAnime, setHeroAnime] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const animeRes = await axios.get('https://api.consumet.org/anime/gogoanime/top-airing')
        const mangaRes = await axios.get('https://api.mangadex.org/manga?limit=10&includes[]=cover_art')

        const topAnime = animeRes.data.results
        const mangas = mangaRes.data.data.map(m => ({
          id: m.id,
          title: m.attributes.title.en || Object.values(m.attributes.title)[0],
          coverImage: `https://uploads.mangadex.org/covers/${m.id}/${m.relationships.find(r => r.type === 'cover_art')?.attributes?.fileName}.256.jpg`
        }))

        setAnimeList(topAnime)
        setHeroAnime(topAnime[0])
        setMangaList(mangas)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      {heroAnime && <Hero anime={heroAnime} />}

      <section>
        <h2 className="text-xl font-bold mb-4">🔥 Trending Anime</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {animeList.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">📚 Trending Manga</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {mangaList.map(manga => <MangaCard key={manga.id} manga={manga} />)}
        </div>
      </section>
    </div>
  )
}
