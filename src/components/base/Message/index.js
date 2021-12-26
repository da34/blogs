import Vue from 'vue'
import Main from './index.vue'

const MessageConstructor = Vue.extend(Main)
let instance // 当前实例
const instances = [] // 全部实例
let seed = 1

const Message = function (options) {
  const id = 'Message_' + seed++

  options.onClose = function () {
    Message.close(id)
  }

  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)

  let verticalOffset = options.offset || 20
  instances.forEach(item => { // 循环遍历所有实例
    verticalOffset += item.$el.offsetHeight + 16 // 每个实例的高度 + 间隔
  })
  instance.verticalOffset = verticalOffset
  instance.visible = true
  instance.$el.style.zIndex = 9999 + seed
  instances.push(instance)
  return instance
}

Message.close = function (id) {
  const len = instances.length
  let removedHeight
  // let index = -1
  // 循环遍历，删除以关闭的实例
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      // index = i
      removedHeight = instances[i].$el.clientHeight
      instances.splice(i, 1)
      break
    }
  }

  // 优化，一个实例的时候不循环
  if (len <= 1) { return false }
  // 循环遍历，保持正确的top
  for (let i = 0; i < len - 1; i++) {
    const dom = instances[i].$el
    const topHeight = parseInt(dom.style.top)
    dom.style.top = topHeight - removedHeight - 16 + 'px'
  }
}

export default Message
