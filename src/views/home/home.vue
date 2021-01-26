<template>
  <div class="home">
    <router-view></router-view>
    <!-- 下面的导航 -->
    <van-tabbar
      class="tabbar"
      route
      active-color="#E40137"
      inactive-color="#B4B4BD"
      placeholder
    >
      <van-tabbar-item to="/home/company">
        <span>公司</span>
        <template #icon>
          <i class="iconfont f28">&#xe63b;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/question">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont f28">&#xe63f;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/find">
        <span>发现</span>
        <template #icon>
          <i class="iconfont f28">&#xe646;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/my">
        <span>我的</span>
        <template #icon>
          <i class="iconfont f28">&#xe64b;</i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home {
  .tabbar {
    height: 60px;
    .f28 {
      font-size: 28px;
    }
  }
}
</style>
