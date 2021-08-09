const arr = ['❤富强❤', '❤民主❤', '❤文明❤', '❤和谐❤', '❤自由❤', '❤平等❤', '❤公正❤', '❤法治❤', '❤爱国❤', '❤敬业❤', '❤诚信❤', '❤友善❤']

document.documentElement.addEventListener('click', function (e) {
  const index = ~~(Math.random() * 12)
  const spanDom = document.createElement('span')
  const x = e.pageX
  const y = e.pageY
  spanDom.textContent = arr[index]
  spanDom.className = 'text-popup'
  spanDom.style = `
    top: ${y - 20}px;
    left: ${x}px;
    color: rgb(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())})
  `
  this.appendChild(spanDom)

  // 动画结束后删除自己
  spanDom.addEventListener('animationend', function () {
    spanDom.parentNode.removeChild(spanDom)
  })
})
