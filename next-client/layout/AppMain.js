import SideInfo from './SideInfo/index'
import layoutStyles from '@/styles/layout.module.css'

export default function AppMain({children}) {
  return (
    <div className={'xl:max-w-screen-xl relative m-auto mt-20 ' + layoutStyles.container}>
      <div className="w-[950px] max-w-full relative">
        {children}
      </div>
      <div className="absolute top-0 right-0 w-[19rem] hidden xl:block">
        <SideInfo/>
      </div>
    </div>
  )
}
// <template>
//
// </template>
//
// <script>
// import SideInfo from './SideInfo'
//
// export default {
//   name: 'AppMain',
//   components: { SideInfo }
// }
// </script>
