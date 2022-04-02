import Logo from '@/components/Logo'
import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="relative">
      <div
        className="fixed overflow-hidden w-full px-4 py-1 md:px-0 inset-0 md:h-[65px] h-[60px] text-slate-900 bg-white shadow duration-300 z-50 backdrop-blur-md"
      >
        <header className="flex m-auto h-full items-center xl:max-w-screen-xl w-full">
          <Logo className="order-3 ml-3 md:m-0 md:order-1"/>
          <Navbar className="order-2"/>
          {/*<Search class="order-3 ml-auto"/>*/}
        </header>
      </div>
    </div>
  )
}
// <template>
//
// </template>
//
// <script>
// import Navbar from './Navbar'
// import Search from './Search'
// import { scrollMixin } from '@/minxi/handleScroll'
// import Logo from '@/components/Logo'
//
// export default {
//   name: 'VHeader',
//   components: {
//     Search,
//     Logo,
//     Navbar
//   },
//   mixins: [scrollMixin]
// }
// </script>
//
// <style scoped lang="stylus">
// .fade-enter-active, &.fade-leave-active
//     transition all .3s
//
// .fade-enter, &.fade-leave-to
//     height 0
// </style>
