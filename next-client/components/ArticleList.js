import Link from 'next/link'
import Image from 'next/image'

export default function ArticleList({list}) {
  return (
    <ul className={'relative'}>
      {list.map(article => (
        <li key={article.id}
            className="md:duration-300 md:hover:scale-[1.02] md:flex mx-3 md:mx-0 min-h-[140px] shadow-3xl rounded-lg bg-white mb-5 cursor-pointer overflow-hidden"
        >
          <Link
            href={`/content/${article.id}`}
          >
            <a>
              <Image src={article.firstPicture} width={200} height={150} objectFit="cover"
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}