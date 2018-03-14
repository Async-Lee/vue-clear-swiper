<template>
  <div class="wrapper" :style="{height: direction === 'vertical' ? '100%' : 'auto'}">
    <div :class="[pageDirection.includes('Y') ? 'vertical' : 'horizontal']" ref="wrapper" :style="moveStyle" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)">
      <slot></slot>
    </div>
    <div class="pagination" v-if="pagination">
      <span class="swiper-pagination" v-for="(items, index) in pagesNum" :key="index" :class="index == pagesIndex ? 'active' : ''"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueClearSwiper',
  data () {
    return {
      MoveStartPosition: 0,
      distance: 0,
      ifAnimation: false,
      screen: 0,
      swiperIndex: 0,
      pagesIndex: 0,
      startPosition: 0,
      endPosition: 0,
      timerStart: 0,
      timerEnd: 0,
      wrapperWidth: '0',
      boxNum: 0,
      pagesNum: 0,
      pageDirection: ''
    }
  },
  props: [ 'clearOption' ],
  computed: {
    moveStyle () {
      let distance = this.distance
      let pageDirection = this.pageDirection.includes('Y') ? 1 : 0
      return { transform: 'translate3d' + '(' + (pageDirection ? 0 : distance) + 'px, ' + (pageDirection ? distance : 0) + 'px, 0px)', transition: this.ifAnimation ? '.5s' : '0s', width: this.wrapperWidth }
    }
  },
  created () {
    this.initData()
    if (this.auto) this.loop = true //  自动播放与循环需同时开启
    this.pageDirection = this.direction === 'vertical' ? 'pageY' : 'pageX'
    this.screen = this.pageDirection.includes('Y') ? document.documentElement.clientHeight : document.documentElement.clientWidth
  },
  mounted () {
    this.autoPaly()
    this.cloneDom()
    this.setElWidth()
    this.boxNum = [].map.call(this.$refs.wrapper.children, el => el).length
    this.pagesNum = this.loop ? this.boxNum - 2 : this.boxNum
    this.wrapperWidth = this.pageDirection.includes('Y') ? '100%' : this.boxNum + '00%'
  },
  methods: {
    initData () {
      this.direction = this.clearOption.direction || 'horizontal'
      this.pagination = this.clearOption.pagination
      this.loop = this.clearOption.loop || false
      this.auto = this.clearOption.auto || false
      this.autoTime = this.clearOption.autoTime || 2000
    },
    start (e, index) {
      this.ifAnimation = false
      if (this.loop) this.loopAction()
      this.MoveStartPosition = e.targetTouches[0][this.pageDirection] - this.distance
      this.startPosition = e.targetTouches[0][this.pageDirection]
      this.timerStart = new Date().getTime()
      clearInterval(this.autoS)
    },
    move (e, index) {
      this.distance = (e.targetTouches[0][this.pageDirection] - this.MoveStartPosition)
      this.endPosition = e.targetTouches[0][this.pageDirection]
    },
    end (e, index) {
      this.timerEnd = new Date().getTime()
      let timeDifference = this.timerEnd - this.timerStart
      let positionDifference = this.startPosition - this.endPosition
      this.ifAnimation = true
      if (timeDifference < 240 && positionDifference > 0) {
        this.swiperIndex++
      } else if (timeDifference < 240 && positionDifference < 0) {
        this.swiperIndex--
      } else {
        this.swiperIndex = parseInt((this.distance - this.screen / 2) / this.screen) * -1
      }
      if (!this.loop) this.loopAction()
      this.distance = -this.swiperIndex * this.screen
      this.autoPaly()
      this.onChange()
    },
    autoPaly () {
      if (!this.auto) return
      this.autoS = setInterval(() => {
        this.swiperIndex++
        if (this.swiperIndex > this.boxNum - 1) {
          this.ifAnimation = false
          this.swiperIndex = 2
          this.distance = this.pageDirection.includes('Y') ? -document.documentElement.clientHeight : -document.documentElement.clientWidth
        }
        setTimeout(() => {
          this.ifAnimation = true
          this.distance = -this.swiperIndex * this.screen
        }, 10)
      }, this.autoTime)
    },
    loopAction () {
      if (this.swiperIndex > this.boxNum - 2 && this.loop) { // 控制循环切换
        this.swiperIndex = 1
        this.distance = -this.swiperIndex * this.screen
      } else if (this.swiperIndex === 0 && this.loop) {
        this.swiperIndex = this.boxNum - 2
        this.distance = -this.swiperIndex * this.screen
      }
      if (this.swiperIndex < 0 && !this.loop) {
        this.swiperIndex = 0
      } else if (this.swiperIndex > this.boxNum - 1 && !this.loop) {
        this.swiperIndex = this.boxNum - 1
      }
    },
    setElWidth () {
      [].map.call(this.$refs.wrapper.children, el => el).map(el => { el.style.width = document.documentElement.clientWidth + 'px' })
    },
    cloneDom () {
      if (!this.loop) return
      let swiperWrapEl = this.$refs.wrapper
      let duplicateFirstChild = swiperWrapEl.firstElementChild.cloneNode(true)
      let duplicateLastChild = swiperWrapEl.lastElementChild.cloneNode(true)
      swiperWrapEl.insertBefore(duplicateLastChild, swiperWrapEl.firstElementChild)
      swiperWrapEl.appendChild(duplicateFirstChild)
      this.swiperIndex = 1
      this.distance = this.pageDirection.includes('Y') ? -document.documentElement.clientHeight : -document.documentElement.clientWidth
    },
    onChange () {
      this.pagesIndex = this.swiperIndex
      if (this.loop) {
        this.pagesIndex = this.swiperIndex - 1
        if (this.swiperIndex === 0) this.pagesIndex = this.boxNum - 3
        if (this.swiperIndex === this.boxNum - 1) this.pagesIndex = 0
      }
      this.$emit('onChangeIndex', this.pagesIndex)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  overflow: hidden;
  position: relative;
}
.horizontal, .vertical{
  position: relative;
}
.vertical>div, .vertical{
  height: 100%;
}
.horizontal{
  width: 100%;
  overflow: hidden;
}
.horizontal>div{
  float: left;
}
.vertical>div>img, .horizontal>div>img{
  width: 100%;
  margin: 0 auto;
}
.pagination{
  position: absolute;
  /* background: red; */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.pagination span{
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  float: left;
  margin: 0 5px;
  background: #eee;
}
.pagination span.active{
  background: #ff0066;
}
</style>
