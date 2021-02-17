import Vue from 'vue'

const splitDate = date => {
  return date.split(' ')[0]
}

Vue.filter('splitDate', splitDate)
