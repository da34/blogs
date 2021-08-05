export const appendBody = {
  mounted () {
    const body = document.querySelector('body')
    console.log(this.$el)
    if (body.append) {
      body.append(this.$el)
    } else if (body.appendChild) {
      body.appendChild(this.$el)
    }
  }
}
