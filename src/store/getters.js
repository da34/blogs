const getters = {
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  userID: state => state.user.id,
  archivePage: state => state.article.archivePage,
  page: state => state.article.page,
  article: state => state.article.article,
  articleCount: state => state.article.total,
  articleCollect: state => state.front.articleCollect,
  menu: state => state.front.menu
}

export default getters
