const getters = {
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  userID: state => state.user.id,
  archivePage: state => state.article.archivePage,
  page: state => state.article.page,
  article: state => state.article.article,
  tagCount: state => state.tag.count,
  articleCount: state => state.article.total,
  commentCount: state => state.comment.count
}

export default getters
