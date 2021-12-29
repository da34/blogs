<template>
  <div class="bg-white p-7 flex space-x-5">
    <div
      v-for="i in 3"
      :key="i"
      class="card basis-1/3 before:bg-[url('https://w.wallhaven.cc/full/g7/wallhaven-g719o3.jpg')] p-5 text-center flex items-end text-white relative h-[350px] overflow-hidden"
    >
      <div class="content relative z-10 space-y-5">
        <h2 class="title text-xl font-bold leading-7">
          金泰页面
        </h2>
        <p class="copy">
          学习完HTML、CSS后写的仿电商静态页面。学习完HTML、CSS后写的仿电商静态页面。
        </p>
        <div class="space-x-3">
          <button class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
            源码
          </button>
          <button class="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
            预览
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  transition: 'slide-in'
}
</script>

<style scoped lang="stylus">
$d = 700ms
$e = cubic-bezier(0.19, 1, 0.22, 1)

.card {
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background-size: cover;
    background-position: 0 0;
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
  transition: transform $d  $e
}

@media (hover: hover) and (min-width: 768px) {
  .card:after {
    transform: translateY(0);
  }

  .content {
    transform translateY(calc(100% - 4.5rem));
    //transform translateY(0);

    > *:not(.title) {
      opacity: 0;
      transform: translateY(1rem);
      transition: transform $d $e, opacity $d $e;
    }
  }

  .card:hover,
  .card:focus-within {
    align-items: center;

    &:before { transform: translateY(-4%); }
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

  .card:focus-within {
    &:before,
    &:after,
    .content,
    .content > *:not(.title) {
      transition-duration: 0s;
    }
  }
}
</style>
