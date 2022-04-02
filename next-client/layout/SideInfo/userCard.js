import Image from 'next/image';

export default function UserCard() {
  const avatar = 'https://resource.lsyboy.cn/blog/avatar.png'
  return (
    <section className="box-card py-7">
      <div className="flex flex-col items-center justify-center">
        <Image src={avatar} alt="玉捷" width={60} height={60} className="rounded-full object-cover"/>
        <span className="text-xl font-bold mt-3">玉捷</span>
      </div>
    </section>
  )
}