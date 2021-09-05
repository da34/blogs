const getters = {
  site: state => {
    const configs = state.modules.front.configs
    const data = configs.filter(item => {
      return item.key === 'site'
    })
    return data[0].value
  }
}

export default getters
