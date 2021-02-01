<template>
  <div class="home">
    <keep-alive include="find">
      <router-view></router-view>
    </keep-alive>
    <!-- 下面的导航 -->
    <!-- 下面的导航使用动画进入 -->
    <transition name="xxx">
      <van-tabbar
        class="tabbar"
        route
        active-color="#E40137"
        inactive-color="#B4B4BD"
        placeholder
        v-if="$route.meta.needTab"
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
    </transition>
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
  .xxx-enter-active {
    transition: all 1s;
  }
  .xxx-leave-active {
    transition: all 1s;
  }
  .xxx-enter {
    opacity: 0;
  }
  .xxx-leave-to {
    opacity: 0;
  }
}
</style>
