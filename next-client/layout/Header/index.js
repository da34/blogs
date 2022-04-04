import Logo from '@/components/Logo'
import Navbar from './Navbar';
import useSWR from 'swr'
import request from 'utils/request'
const fetcher = (...args) => request(...args).then((res) => res)
export default function Header() {
  const defaultLinks = [
    {title: '首页', url: '/'},
    {title: '归档', url: '/archive'},
    {title: '友联', url: '/link'},
    {title: '作品', url: '/work'},
    {title: '建站', url: '/log'}
  ]
  // 获取导航
  const { data } = useSWR('/page', fetcher)
  if (data) {
    const { list } = data.data
    list.forEach(item => {
      defaultLinks.push({
        title: item.name,
        url: '/' + item.path,
      })
    })
  }

  return (
    <div className="relative">
      <div
        className="fixed overflow-hidden w-full px-4 py-1 md:px-0 inset-0 md:h-[65px] h-[60px] text-slate-900 bg-white shadow duration-300 z-50 backdrop-blur-md"
      >
        <header className="flex m-auto h-full items-center xl:max-w-screen-xl w-full">
          <Logo className="order-3 ml-3 md:m-0 md:order-1"/>
          <Navbar className="order-2" links={defaultLinks}/>
          {/*<Search class="order-3 ml-auto"/>*/}
        </header>
      </div>
    </div>
  )
}

// import { getMenus } from '../../service/config';
//
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await getMenus()
//   console.log(res)
//   // const posts = await res.json()
//
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       res,
//     },
//   }
// }