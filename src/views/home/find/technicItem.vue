<template>
  <div class="technicItem">
    <div class="left">
      <div class="top van-multi-ellipsis--l2">
        {{ info.title }}
      </div>
      <div class="bottom" :class="{ pt18: !info.cover }">
        <div class="time">{{ info.updated_at | formatTime }}</div>
        <div class="iconfont pl21">&#xe644;</div>
        <div>{{ info.read }}</div>
        <div class="iconfont pl21">&#xe650;</div>
        <div>{{ info.star }}</div>
      </div>
    </div>
    <img v-if="info.cover" class="right" :src="$baseUrl + info.cover" alt="" />
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  props: ['info']
  //   filters: {
  //     formatTime (time) {
  //       const _time = moment(time)
  //       const _local = moment()
  //       const _diff = _local.diff(_time, 'H')
  //       if (_diff < 1) {
  //         return '刚刚'
  //       } else if (_diff < 24) {
  //         return _diff
  //       } else {
  //         return _time.format('YYYY/MM/DD HH:mm:ss')
  //       }
  //     }
  //   }
}
</script>

<style lang="less" scoped>
.technicItem {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #181a39;
      line-height: 22.5px;
      letter-spacing: 0px;
    }
    .pt18 {
      padding-top: 18px;
    }
    .bottom {
      display: flex;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 16.5px;
      letter-spacing: 0px;
      .time {
        flex: 1;
      }
      .pl21 {
        padding-left: 21px;
        padding-right: 8px;
      }
    }
  }
  .right {
    padding-left: 10px;
    width: 113px;
    height: 75px;
    opacity: 1;
    object-fit: cover;
  }
}
</style>
