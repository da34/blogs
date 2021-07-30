<script>
import Markdown from '@/components/Markdown'
export default {
  name: 'CommentList',
  props: {
    avatar: {
      type: String,
      default: null
    },
    author: {
      type: Object,
      default () {
        return null
      }
    },
    content: {
      type: String,
      default: null
    }
  },
  render (h) {
    // 判断是不是一个VNode
    // const isVNode = node => {
    //   const VNode = h('span', '').constructor
    //   return node instanceof VNode
    // }

    const avatar = `https://gravatar.loli.net/avatar/${this.$props.avatar}?s=50&d=retro`
    const author = this.$props.author
    const content = this.$props.content ?? this.$slots.content
    const actions = this.$slots.actions
    const nested = this.$slots.default // 子级嵌套

    const avatarDom = (
      <img v-lazy={avatar} class="avatar" />
    )
    const authorDom = (
      <div class="comment-info">
        <span class="author-name">{ author.nickName }</span>
        <span class="author-other" style="margin-left: 30px">{ author.browser }</span>
        <span class="author-other">{ author.os }</span>
      </div>
    )

    const contentDom = (typeof content !== 'string' ? content : <Markdown value={ content } class="mark-text" />)
    const actionsDom = (
      <div class="comment-action">
        { actions }
      </div>
    )
    const comment = (
      <div class="comment">
        <div class="comment-inner">
          { avatarDom }
          <div class="content">
            { authorDom }
            { contentDom }
            { actionsDom }
          </div>
        </div>
        <div class="comment-nest">
          {nested}
        </div>
      </div>
    )

    return (
      <div class="comment-item">{ comment }</div>
    )
  }
}
</script>

<style scoped lang="stylus">
.comment-item
  position: relative;
  border-bottom 1px solid #F7F9FB
  width 100%
  font-weight 500
  &:last-child
    border none
  .comment-inner
    display flex
    padding 15px 0
  .comment-nest
    margin-left 70px
    .comment-item
      &:last-child
        border none
.avatar
  width 50px
  height 50px
  border-radius 50%

.content
  position relative
  padding-left 20px
  flex 1
  font-size $font-size-small
  display flex
  flex-direction column

  .mark-text
    color $color-content
    flex 1
    display flex
    align-items center
    padding-top 5px
    padding-right 50px
    font-weight 500
  .comment-action
    color $color-subsidiary
    font-size $font-size-mini
    margin-top 10px
  .reply
    color rgba(0,0,0,.5)
    font-size $font-size-mini
    cursor pointer
    margin-left 30px
    &:hover
      color $color-focus
  .comment-info
    color $color-content
    display flex
    align-items center
    .author-name
      display inline-block
      max-width 300px
      text-omit(1)
      //max-height 18px
    .author-other
      color $color-subsidiary
      margin-right 20px
      font-size $font-size-mini
</style>
