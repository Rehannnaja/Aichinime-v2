import Image from 'next/image'

export default function Hero({ anime }) {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-96 object-cover opacity-30"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
        <p className="max-w-2xl">{anime.description?.slice(0, 200)}...</p>
      </div>
    </div>
  )
}
