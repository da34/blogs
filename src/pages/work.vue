<template>
  <div class="bg-white p-7">
    <h1 class="text-3xl font-bold mb-2">
      小作品
    </h1>
    <div class="flex flex-wrap justify-between">
      <div
        v-for="work in works"
        :key="work.id"
        class="card w-[26rem] h-[13rem] rounded-lg p-5 mt-7 text-center flex items-end text-white relative overflow-hidden"
      >
        <div class="card-before" :style="{ backgroundImage: `url(${work.imgUrl})` }" />
        <div class="content relative z-10 space-y-5  w-full">
          <h2 class="title text-xl font-bold leading-7">
            {{ work.name }}
          </h2>
          <p class="copy">
            {{ work.desc }}
          </p>
          <div class="space-x-3">
            <a v-if="work.sourceUrl" :href="work.sourceUrl" target="_blank" class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
              源码
            </a>
            <a v-if="work.linkUrl" :href="work.linkUrl" target="_blank" class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
              预览
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  transition: 'slide-in',
  data () {
    return {
      works: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('works?order[priority]=DESC')
    this.works = data.data
  },
  head () {
    return {
      title: '小作品-玉捷 Code',
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: '玉捷 Code'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
$d = 700ms
$e = cubic-bezier(0.19, 1, 0.22, 1)
.card {
  .card-before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background-size: cover;
    background-position: center;
    transition: transform $d * 1.5 $e;
    pointer-events: none;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0.009) 11.7%,
      hsla(0, 0%, 0%, 0.034) 22.1%,
      hsla(0, 0%, 0%, 0.072) 31.2%,
      hsla(0, 0%, 0%, 0.123) 39.4%,
      hsla(0, 0%, 0%, 0.182) 46.6%,
      hsla(0, 0%, 0%, 0.249) 53.1%,
      hsla(0, 0%, 0%, 0.320) 58.9%,
      hsla(0, 0%, 0%, 0.394) 64.3%,
      hsla(0, 0%, 0%, 0.468) 69.3%,
      hsla(0, 0%, 0%, 0.540) 74.1%,
      hsla(0, 0%, 0%, 0.607) 78.8%,
      hsla(0, 0%, 0%, 0.668) 83.6%,
      hsla(0, 0%, 0%, 0.721) 88.7%,
      hsla(0, 0%, 0%, 0.762) 94.1%,
      hsla(0, 0%, 0%, 0.790) 100%
    );
    transform: translateY(-50%);
    transition: transform $d * 2 $e;
  }
}
.content {
  transition: transform $d $e
}

@media (hover: hover) and (min-width: 768px) {
  .card:after {
    transform: translateY(0);
  }

  .content {
    transform translateY(calc(100% - 4rem));

    > *:not(.title) {
      opacity: 0;
      transform: translateY(1rem);
      transition: transform $d $e, opacity $d $e;
    }
  }

  .card:hover{
    align-items: center;

    .card-before { transform: translateY(-4%); }
    &:after { transform: translateY(-50%); }

    .content {
      transform: translateY(0);

      > *:not(.title) {
        opacity: 1;
        transform: translateY(0);
        transition-delay: ($d / 8);
      }
    }
  }

  //.card:focus-within {
  //  .card-before,
  //  &:after,
  //  .content,
  //  .content > *:not(.title) {
  //    transition-duration: 0s;
  //  }
  //}
}
</style>
