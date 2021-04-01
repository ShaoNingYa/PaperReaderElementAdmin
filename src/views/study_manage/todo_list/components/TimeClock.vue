<template>
  <div id="clock">
    <span class="time">{{ clock_date }} {{ clock_time }}</span>
  </div>
</template>

<script>
export default {
  name: 'TimeClock',
  data: function() {
    return {
      clock_date: '现在时间',
      clock_time: '是什么呢'
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 1000)
  },
  methods: {
    updateTime() {
      const cd = new Date()
      // const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      this.clock_time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      this.clock_date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()]
    },
    zeroPadding(num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>

<style scoped>
#clock {
  font-family: 'Share Tech Mono', monospace;
  /*font-family: 'Special Elite', monospace;*/
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  color: #daf6ff;
  text-align: center;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0.1);
  letter-spacing: 5px;
  padding: 10px 0 10px 0;
  animation: changeBackground 20s infinite linear alternate;
}
@keyframes changeBackground {
	0% {background-position: 0 50%;}
	50% {background-position: 100% 50%;}
	100% {background-position: 0 50%;}
}
@font-face {
    font-family: 'Special Elite';
    font-style: normal;
    font-weight: 400;
    src: local("Special Elite Regular"),local("SpecialElite-Regular"),url('font_files/SpecialElite-webfont.woff.ttf') format("woff2");
    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD
}
@font-face {
    font-family: 'Share Tech Mono';
    font-style: normal;
    font-weight: 400;
    src: local("Special Elite Regular"),local("SpecialElite-Regular"),url('font_files/Share-Tech-Mono.ttf') format("woff2");
    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD
}
#clock .time {
  font-size: 4vw;
  font-weight: 900;
  padding: 5px 0;
}
</style>
