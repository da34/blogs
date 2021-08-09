// const NULL_MENU = 'allowNull' // 不需要跳转的路由地址
// let fromPath = ''
export default function ({ route, redirect }) {
  const { path } = route
  if (process.client) {
    if (path.match(/^[/http]s?/)) {
      location.href = path
    }
    // console.log(path, location)
  }

  // if (path.match(/https?/) !== null) {
  //   redirect(path.replace('/', ''))
  // } else if (path.includes(NULL_MENU)) {
  //   redirect(fromPath)
  // } else {
  //   fromPath = path
  // }
}
