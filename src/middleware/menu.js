const NULL_MENU = 'allowNull' // 不需要跳转的路由地址
let fromPath = ''
export default function ({ route, redirect }) {
  const { path } = route
  if (path.match(/https?/) !== null) {
    redirect(path.replace('/', ''))
  } else if (path === NULL_MENU) {
    redirect(fromPath)
  } else {
    fromPath = path
  }
}
