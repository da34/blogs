const arr = ['❤富强❤', '❤民主❤', '❤文明❤', '❤和谐❤', '❤自由❤', '❤平等❤', '❤公正❤', '❤法治❤', '❤爱国❤', '❤敬业❤', '❤诚信❤', '❤友善❤']
const clientWidth = document.body.clientWidth
const spanWidthHalf = 55 / 2
const spanWidth = 55

document.documentElement.addEventListener('click', function (e) {
  const index = ~~(Math.random() * 12)
  const spanDom = document.createElement('span')
  let { pageX, pageY } = e

  // 边界值left判断
  if (pageX + spanWidthHalf > clientWidth) {
    pageX = clientWidth - spanWidthHalf
  } else if (pageX < spanWidthHalf) {
    pageX = spanWidthHalf
  }

  // 显示更合理
  pageX -= spanWidthHalf
  pageY -= 20

  spanDom.textContent = arr[index]
  spanDom.className = 'text-popup overflow-hidden'
  spanDom.style = `
    top: ${pageY}px;
    left: ${pageX}px;
    width: ${spanWidth}px;
    color: rgb(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())})
  `
  document.body.appendChild(spanDom)

  // 动画结束后删除自己
  spanDom.addEventListener('animationend', function () {
    spanDom.parentNode.removeChild(spanDom)
  })
})
