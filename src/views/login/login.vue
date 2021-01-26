<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <i class="iconfont f44">&#xe637;</i>
      </template>
    </van-nav-bar>
    <div class="content">
      <h3 class="title">您好，请登录</h3>
      <!-- 用户输入表单区 -->
      <van-form ref="form">
        <van-field
          placeholder="请输入手机号"
          v-model="form.mobile"
          name="mobile"
          :rules="rules.mobile"
        >
          <template #left-icon>
            <i class="iconfont pr20">&#xe60b;</i>
          </template>
        </van-field>
        <van-field
          placeholder="请输入验证码"
          v-model="form.code"
          name="code"
          :rules="rules.code"
        >
          <template #left-icon>
            <i class="iconfont pr20">&#xe60c;</i>
          </template>
          <template #button>
            <div class="button" v-if="totalTime === 6" @click="getCode">
              获取验证码
            </div>
            <div class="button" v-else>{{ totalTime }}秒后重新发送</div>
          </template>
        </van-field>
      </van-form>
      <div class="tip">
        登录即同意 <span>《用户使用协议》</span> 和 <span>《隐私协议》</span>
      </div>
      <!-- 按钮 -->
      <van-button @click="submit" type="danger" round block>
        确定
      </van-button>
    </div>
  </div>
</template>

<script>
import { auCode, auLogin } from '@/api/login.js'
import { setLocal } from '@/utils/local.js'
export default {
  data () {
    return {
      totalTime: 6,
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'onChange'
          },
          {
            validator: value => {
              const mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              return mobileReg.test(value)
            },
            message: '请输入正确的手机号',
            trigger: 'onChange'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    getCode () {
      // 表单局部验证
      this.$refs.form
        .validate('mobile')
        .then(() => {
          // 表单验证完之后出现加载中..
          this.$toast.loading({
            message: '加载中'
          })
          // 表单验证成功的时候去发送请求获取验证码
          // 使用api里封装的方法
          this.totalTime--
          const _time = setInterval(() => {
            this.totalTime--
            if (this.totalTime <= 0) {
              clearInterval(_time)
              this.totalTime = 6
            }
          }, 1000)
          auCode({ mobile: this.form.mobile })
            .then(res => {
              // console.log(res)
              this.$toast.success(res.data.data)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit () {
      this.$refs.form
        .validate()
        .then(() => {
          // console.log(111)
          // 表单验证完之后出现加载中..
          this.$toast.loading({
            message: '加载中'
          })
          // 表单验证成功的时候去发送请求获取验证码
          // 使用api里封装的方法
          auLogin(this.form)
            .then(res => {
              // console.log(res)
              // localStorage.setItem('token', res.data.data.jwt)
              setLocal(res.data.data.jwt)
              this.$toast.success('登录成功')
              // 保存用户信息
              this.$store.commit('setUserInfo', res.data.data.user)
              // 设置登录状态为已登录
              this.$store.commit('setIsLogin', true)
              this.$router.push('/home')
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    if (this.$store.state.isLogin) {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .f44 {
    font-size: 44px;
  }
  ::v-deep .van-nav-bar__left,
  ::v-deep .van-nav-bar__right {
    padding: 0;
  }
  .content {
    padding: 0 @pd15;
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
      padding-top: 50px;
      padding-bottom: 63px;
    }
    .pr20 {
      padding-right: 20px;
    }
    .button {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #00b8d4;
      line-height: 22px;
      letter-spacing: 0px;
    }
    .tip {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;
      line-height: 16px;
      letter-spacing: 0px;
      padding-top: 15px;
      padding-bottom: 44px;
      span {
        color: #00b8d4;
      }
    }
  }
}
</style>
