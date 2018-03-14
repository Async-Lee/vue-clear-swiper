<template>
  <div id="app">
    <ab :clearOption="clearOption" @onChangeIndex="test">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </ab>
  </div>
</template>

<script>
import ab from './components/VueClearSwiper'
export default {
  name: 'App',
  data () {
    return {
      clearOption: {
        direction: 'vertical', // 'horizontal' or 'vertical', defult 'horizontal'
        pagination: true,
        loop: true,
        auto: false
        // autoTime: 6000
      }
    }
  },
  components: {ab},
  methods: {
    test (a) {
      console.log(a)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
*{
  padding: 0;
  margin: 0;
}
html, body{
  width: 100%;
  height: 100%;
}
</style>
