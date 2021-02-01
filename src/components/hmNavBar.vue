<template>
  <van-nav-bar
    class="hmNavBar"
    @click-left="$router.push(path)"
    @click-right="$emit('rightClick')"
  >
    <template #left>
      <i v-if="path" class="iconfont f44">&#xe637;</i>
    </template>
    <template #title>
      <div class="title">
        {{ title }}
      </div>
    </template>
    <template #right>
      <div class="right" v-if="right">
        {{ right }}
      </div>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: ['title', 'path', 'right']
}
</script>

<style lang="less" scoped>
.hmNavBar {
  .f44 {
    font-size: 44px;
  }
  ::v-deep .van-nav-bar__left,
  ::v-deep .van-nav-bar__right {
    padding: 0;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
  .right {
    margin-right: @pd15;
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
