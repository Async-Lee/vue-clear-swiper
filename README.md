# vue-clear-swiper

> a niubilisity plugin !

## Build Setup

``` bash
Oh My God!
This is an excellent component!
The vue family is another tyrant component, the 2018-3-14 net starter, may be the lightest vue carousel component of the whole network.

If you think OK, you can order a little star,think you!

Business cooperation please consult:
  WX: Lee19951208
  QQ: 1156553634

npm install --save vue-clear-swiper

<template>
  <div id="app">
    <vue-clear-swiper :clearOption="clearOption">
      <div>swiper-1</div>
      <div>swiper-2</div>
      <div>swiper-3</div>
    </vue-clear-swiper>
  </div>
</template>

<script>
import vueClearSwiper from 'vue-clear-swiper'
export default {
  name: 'App',
  data () {
    return {
      clearOption: {
        direction: 'horizontal', // 'horizontal' or 'vertical', default: 'horizontal'
        pagination: true, // 'true' or 'false', default: 'false'
        loop: false, // 'true' or 'false', default: 'false'
        auto: false, // 'true' or 'false', default: 'false'
        autoTime: 2000 // 'true' or 'false', default: 2000
      }
    }
  },
  components: { vueClearSwiper }
}
</script>

```
