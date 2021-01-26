<template>
  <van-cell is-link center class="mycell">
    <template #default>
      <div class="value">{{ value }}</div>
    </template>
    <template #title>
      <div class="title">{{ title }}</div>
    </template>
    <template #icon>
      <i class="iconfont pr12" v-html="icon">&#xe64d;</i>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: ['title', 'icon', 'value']
}
</script>

<style lang="less" scoped>
.mycell {
  .pr12 {
    padding-right: 12px;
  }
  .value {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #5b5d75;
    line-height: 20px;
    letter-spacing: 0px;
  }
  .title {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #181a39;
    line-height: 20px;
    letter-spacing: 0px;
  }
}
</style>
