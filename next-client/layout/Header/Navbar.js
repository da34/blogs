import Link from 'next/link'

export default function Navbar({links}) {
  return (
    <>
      <div className="ml-1 md:ml-0">
        <ul className="hidden md:flex">
          {links.map(menu => (
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