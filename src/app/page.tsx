import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <h1>App</h1>
      <a href='/picture' className='bg-red-500 text-white font-bold p-2'>
        Take Pic
      </a>
    </div>
  )
}
