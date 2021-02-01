<template>
  <div class="my">
    <div class="top">
      <div class="top1">
        <div class="top1_left">
          <div class="left_name">{{ userInfo.nickname }}</div>
          <div class="left_txt">{{ userInfo.intro }}</div>
        </div>
        <!-- 渲染头像的处理 -->
        <img
          v-if="userInfo.avarar"
          :src="baseUrl + userInfo.avarar"
          class="top1_right"
          @click="goInfo"
          alt=""
        />
        <img
          v-else
          src="@/assets/logo.png"
          @click="goInfo"
          class="top1_right"
          alt=""
        />
      </div>
      <ul class="top2">
        <li class="top2_li">
          <div class="top2_num">298</div>
          <div class="top2_txt">累计答题</div>
        </li>
        <li class="top2_li">
          <div class="top2_num">298</div>
          <div class="top2_txt">累计答题</div>
        </li>
        <li class="top2_li">
          <div class="top2_num">298</div>
          <div class="top2_txt">累计答题</div>
        </li>
        <li class="top2_li">
          <div class="top2_num">298</div>
          <div class="top2_txt">累计答题</div>
        </li>
      </ul>
      <div class="top3" @click="$router.push('/home/editInfo?type=position')">
        <myCell
          title="我的岗位"
          :value="userInfo.position ? userInfo.position : '未知'"
          icon="&#xe64d;"
        ></myCell>
      </div>
    </div>
    <div class="content">
      <div class="middle">
        <h3 class="title">面经数据</h3>
        <ul class="data">
          <li class="data_item">
            <div class="item1">昨日阅读<span>+300</span></div>
            <div class="item2">17</div>
            <div class="item3">阅读总数</div>
          </li>
          <li class="data_item">
            <div class="item1">昨日阅读<span>+300</span></div>
            <div class="item2">17</div>
            <div class="item3">阅读总数</div>
          </li>
          <li class="data_item">
            <div class="item1">昨日阅读<span>+300</span></div>
            <div class="item2">17</div>
            <div class="item3">阅读总数</div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <myCell title="我的岗位" value="产品经理" icon="&#xe64d;"></myCell>
        <myCell title="我的岗位" value="产品经理" icon="&#xe64d;"></myCell>
        <myCell title="我的岗位" value="产品经理" icon="&#xe64d;"></myCell>
        <myCell title="我的岗位" value="产品经理" icon="&#xe64d;"></myCell>
        <myCell title="我的岗位" value="产品经理" icon="&#xe64d;"></myCell>
        <myCell title="我的岗位" value="产品经理" icon="&#xe64d;"></myCell>
      </div>
    </div>
  </div>
</template>

<script>
import myCell from './myCell'
import { mapState } from 'vuex'
// import { auInfo } from '@/api/my.js'
// import { getLocal } from '@/utils/local.js'
export default {
  components: {
    myCell
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  },
  methods: {
    goInfo () {
      this.$router.push('/home/myInfo')
    }
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  mounted () {
    document.body.style.backgroundColor = '#f7f4f5'
  },
  beforeDestroy () {
    document.body.style.backgroundColor = ''
  },
  created () {
    // 如果登录了，那么就不处理
    //  没登录
    // 如果没有token  那么就跳转登录页(还要做处理)
    // 如果有token  那么就发送请求请求用户数据再存储到vuex中
    // if (!this.isLogin) {
    //   if (getLocal()) {
    //     auInfo()
    //       .then(res => {
    //         // console.log(res)
    //         // 存储用户数据
    //         this.$store.commit('setUserInfo', res.data.data)
    //         // 设置登录状态为已登录
    //         this.$store.commit('setIsLogin', true)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   } else {
    //     // 没有登录也没有token
    //     this.$toast.fail('请重新登录')
    //     this.$router.push('/login')
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.my {
  background: #f7f4f5;
  .top {
    padding: 0 @pd15;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    position: relative;
    .top1 {
      padding: 31px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top1_left {
        .left_name {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 30px;
          letter-spacing: 0px;
        }
        .left_txt {
          padding-top: 6px;
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          line-height: 16px;
          letter-spacing: 0px;
        }
      }
      .top1_right {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.38);
        border-radius: 50%;
      }
    }
    .top2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top2_li {
        text-align: center;
        .top2_num {
          font-size: 21px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
          line-height: 24px;
          letter-spacing: 0px;
        }
        .top2_txt {
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
          line-height: 16px;
          letter-spacing: 0px;
          padding-bottom: 55px;
          padding-top: 6px;
        }
      }
    }
    .top3 {
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 100%;
      padding: 0 @pd15;
    }
  }
  .content {
    padding: 27px @pd15 0;
    .middle {
      padding: 19px 16px 16px;
      background-color: #fff;
      .title {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #181a39;
        line-height: 20px;
        letter-spacing: 0px;
        padding-bottom: 19px;
      }
      .data {
        display: flex;
        justify-content: space-between;
        .data_item {
          text-align: center;
          .item1 {
            font-size: 10px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #b4b4bd;
            line-height: 14px;
            letter-spacing: 0px;
            span {
              color: #00b8d4;
            }
          }
          .item2 {
            font-size: 21px;
            font-family: DINAlternate, DINAlternate-Bold;
            font-weight: 700;
            text-align: center;
            color: #181a39;
            line-height: 24px;
            letter-spacing: 0px;
            padding: 10px 0;
          }
          .item3 {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #545671;
            line-height: 16px;
            letter-spacing: 0px;
          }
        }
      }
    }
    .bottom {
      margin-top: 10px;
    }
  }
}
</style>
