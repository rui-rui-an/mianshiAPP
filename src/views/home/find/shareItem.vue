<template>
  <div class="shareItem van-multi-ellipsis--l2">
    <h4 class="title" v-html="info.title" @click="goInfo">{{ info.title }}</h4>
    <div class="txt van-multi-ellipsis--l2" @click="goInfo">
      {{ info.content }}
    </div>
    <div class="bottom">
      <img class="b1" :src="$baseUrl + info.cover" alt="" />
      <div class="b2">{{ info.author.nickname }}</div>
      <div class="b3">{{ info.updated_at | formatTime }}</div>
      <div class="b4 iconfont pl20">&#xe65b;</div>
      <div class="b5">{{ info.read }}</div>
      <div class="b6 iconfont pl20">&#xe638;</div>
      <div class="b7">{{ info.star }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  methods: {
    goInfo () {
      this.$router.push(
        '/home/shareInfo/' + this.info.id + '?repath=' + this.$route.fullPath
      )
    }
  }
}
</script>

<style lang="less" scoped>
.shareItem {
  margin-top: 30px;
  .title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #181a39;
    line-height: 22.5px;
    letter-spacing: 0px;
  }
  .txt {
    font-size: 13px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #545671;
    line-height: 18px;
    letter-spacing: 0px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .bottom {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #b4b4bd;
    line-height: 16px;
    letter-spacing: 0px;
    .b1 {
      width: 22px;
      height: 22px;
      opacity: 1;
      border-radius: 50%;
    }
    .b2 {
      flex: 1;
      font-size: 12px;
      padding-left: 8px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #545671;
      line-height: 16px;
      letter-spacing: 0px;
    }
    .pl20 {
      padding-left: 20px;
      padding-right: 6px;
    }
  }
}
</style>
