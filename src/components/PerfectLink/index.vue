<script>
export default {
  name: 'PerfectLink',
  props: {
    to: {
      require: true
    },
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'a'
    },
    activeClass: {
      type: String
    },
    exact: {
      type: Boolean,
      default: false
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    exactActiveClass: {
      type: String
    }
  },
  render () {
    const { to, replace, append, tag, exact, event } = this.$props
    const { linkActiveClass, linkExactActiveClass } = this.$router.options
    const activeClass = this.$props.activeClass || linkActiveClass
    const exactActiveClass = this.$props.exactActiveClass || linkExactActiveClass
    const IS_EXTERNAL = /^https?:/
    const text = this.$slots.default
    let renderDom = (
      <NuxtLink
        to={to}
        replace={replace}
        append={append}
        tag={tag}
        exact={exact}
        event={event}
        activeClass={activeClass}
        exactActiveClass={exactActiveClass}
      >
        {text}
      </NuxtLink>
    )
    if (typeof to === 'string' && IS_EXTERNAL.test(to)) {
      renderDom = (
        <a href={to}>{text}</a>
      )
    }
    return renderDom
  }
}
</script>
