<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="message" :style="positionStyle">
      <div :class="['message-icon', iconClass]">
        <BaseSvgIcon :icon-class="iconType" />
      </div>
      <div class="message-content">
        {{ text }}
      </div>
    </div>
  </transition>
</template>

<script>
const iconMap = {
  success: 'CheckCircleFilled',
  info: 'info',
  error: 'close',
  warning: 'ExclamationCircleFilled'
}
export default {
  data () {
    return {
      visible: false,
      duration: 3000,
      type: 'success',
      text: '',
      verticalOffset: 20,
      onClose: null
    }
  },
  computed: {
    iconClass () {
      return `message-icon-${this.type}`
    },
    iconType () {
      return iconMap[this.type]
    },
    positionStyle () {
      return {
        top: `${this.verticalOffset}px`
      }
    }
  },
  watch: {},
  mounted () {
    this.startTime()
  },
  methods: {
    handleAfterLeave () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    startTime () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.close()
      }, this.duration)
    },
    close () {
      clearTimeout(this.timer)
      this.visible = false
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.message {
  position fixed
  top: 20px
  left 50%
  transform: translateX(-50%);
  display: flex
  align-items: center
  transition: color .3s, box-shadow .3s, background-color .3s, opacity .3s, transform .3s, top .3s
  padding 10px 15px
  border-radius 0.25rem
  color rgb(51, 54, 57)
  background #fff
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  .message-icon {
    margin-right 10px
    font-size 20px
  }

  .message-icon-success {
    color #18a058
  }
  .message-icon-info {
    color #2080f0
  }
  .message-icon-warning {
    color #f0a020
  }
  .message-icon-error {
    color #d03050
  }

  .message-content {
    font-size 14px
  }

  &.message-fade-enter,
  &.message-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
}

</style>
