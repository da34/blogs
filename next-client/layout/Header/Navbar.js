import Link from 'next/link'

export default function Navbar() {
  const defaultMenus = [
    {title: '首页', url: '/'},
    {title: '归档', url: '/archive'},
    {title: '友联', url: '/link'},
    {title: '作品', url: '/work'},
    {title: '建站', url: '/log'}
  ]
  return (
    <>
      <div className="ml-1 md:ml-0">
        <ul className="hidden md:flex">
          {defaultMenus.map(menu => (
            <li key={menu.url} className="break-all lg:ml-12 ml-8 font-semibold h-full text-lg">
              <Link href={menu.url}>
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden block">
          {/*  <BaseSvgIcon v-show="!isMobileNav" icon-class="menu" @click="isMobileNav = true" />*/}
          {/*  <BaseSvgIcon v-show="isMobileNav" icon-class="close-2" @click="isMobileNav = false" />*/}
          {/*</div>*/}
          {/*<MobileNav :menus="defaultMenus" :visible="isMobileNav" @close="onClose" />*/}
        </div>
      </div>
    </>
  )
}