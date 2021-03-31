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
  /*background: #686868;*/
  background: radial-gradient(black, transparent);
  color: #daf6ff;
  text-align: center;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0.1);
  /*border: 0.5vw solid rgba(255, 255, 255, 0.3);*/
}

#clock .time {
  /*letter-spacing: 0.05em;*/
  /*font-size: 80px;*/
  font-size: 4vw;
  padding: 5px 0;
}
</style>
