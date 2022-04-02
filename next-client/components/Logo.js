import Link from 'next/link'
import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <Link href="/">
        <a>
          <Image src="/images/logo.png" alt="玉捷 Code" width={200} height={60} className={'object-cover hidden md:block'}/>
        </a>
      </Link>
      {/*<Link href="/">*/}
      {/*  <img src="/images/m_logo.png" alt="玉捷 Code" className="w-full h-[40px] object-cover block md:hidden"/>*/}
      {/*</Link>*/}
    </>
  )
}
