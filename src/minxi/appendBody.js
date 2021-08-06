export const appendBody = {
  mounted () {
    const body = document.querySelector('body')
    if (body.append) {
      body.append(this.$el)
    } else if (body.appendChild) {
      body.appendChild(this.$el)
    }
  }
}
