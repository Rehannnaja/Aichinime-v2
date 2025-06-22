import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MangaDetail() {
  const router = useRouter()
  const { id } = router.query
  const [manga, setManga] = useState(null)

  useEffect(() => {
    if (!id) return
    async function fetchManga() {
      try {
        const res = await axios.get(`https://api.mangadex.org/manga/${id}?includes[]=cover_art`)
        const data = res.data.data
        const title = data.attributes.title.en || Object.values(data.attributes.title)[0]
        const coverRel = data.relationships.find(r => r.type === 'cover_art')
        const coverImage = `https://uploads.mangadex.org/covers/${data.id}/${coverRel.attributes.fileName}.256.jpg`
        setManga({
          title,
          description: data.attributes.description?.en,
          status: data.attributes.status,
          tags: data.attributes.tags,
          coverImage,
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchManga()
  }, [id])

  if (!manga) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{manga.title}</h1>
      <img src={manga.coverImage} alt={manga.title} className="w-60 rounded mb-4" />
      <p className="mb-2">{manga.description}</p>
      <p><strong>Status:</strong> {manga.status}</p>
    </div>
  )
}
