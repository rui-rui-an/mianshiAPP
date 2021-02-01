<template>
  <div class="myInfo">
    <hmNavBar title="我的资料" path="/home/my"></hmNavBar>
    <div class="content">
      <my-cell
        title="头像"
        class="mt20"
        :value="userInfo.avatar"
        type="img"
        @click.native="goEditInfo('avatar')"
      ></my-cell>
      <my-cell
        title="昵称"
        class="mt20"
        :value="userInfo.nickname"
        @click.native="goEditInfo('nickname')"
      ></my-cell>
      <my-cell
        title="性别"
        :value="genderObj[userInfo.gender]"
        @click.native="shoeGender = true"
      ></my-cell>
      <my-cell
        title="地区"
        :value="area.city_list[userInfo.area]"
        @click.native="showArea = true"
      ></my-cell>
      <my-cell
        title="个人简介"
        :value="userInfo.intro"
        @click.native="goEditInfo('intro')"
      ></my-cell>
      <van-button class="mt20" block @click="exit">
        <span class="text">退出登录</span>
      </van-button>
    </div>
    <van-popup v-model="shoeGender" position="bottom">
      <van-picker
        v-if="bol"
        title="性别选择"
        show-toolbar
        :default-index="userInfo.gender"
        :columns="Object.values(genderObj)"
        @confirm="genderConfirm"
        @cancel="shoeGender = false"
      >
      </van-picker>
    </van-popup>
    <!-- 城市选择 -->
    <van-popup v-model="showArea" position="bottom">
      <van-area
        v-if="bol"
        title="城市选择"
        :value="userInfo.area"
        :area-list="area"
        @confirm="areaConfirm"
        @cancel="showArea = false"
      >
      </van-area>
    </van-popup>
  </div>
</template>

<script>
import myCell from './myCell'
import { mapState } from 'vuex'
import areaData from '@/assets/js/area.js'
import { removeLocal } from '@/utils/local.js'
import { auEdit } from '@/api/my.js'
export default {
  data () {
    return {
      genderObj: {
        0: '未知',
        1: '男',
        2: '女'
      },
      area: areaData,
      shoeGender: false,
      showArea: false,
      bol: true
    }
  },
  watch: {
    showArea () {
      if (this.showArea === false) {
        this.bol = false
        this.$nextTick(() => {
          this.bol = true
        })
      }
    },
    shoeGender () {
      if (this.shoeGender === false) {
        this.bol = false
        this.$nextTick(() => {
          this.bol = true
        })
      }
    }
  },
  methods: {
    exit () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认退出登录吗?'
        })
        .then(() => {
          this.$toast.success('退出成功')
          removeLocal()
          this.$store.commit('setIsLogin', false)
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    async genderConfirm (value, index) {
      // console.log(value, index)
      // 关闭弹框
      this.shoeGender = false
      this.EditUserInfo({ gender: index })
      // 调用接口修改数据
      // this.$toast.loading({
      //   duration: 0
      // })
      // await auEdit({ gender: index })
      // // 调用接口刷新数据
      // this.$toast.success('修改成功')
      // this.$store.dispatch('refreshUserInfo')
    },
    areaConfirm (value, index) {
      // console.log(value, index)
      this.shoeArea = false
      this.EditUserInfo({ area: value[1].code })
      // 调用接口修改数据
      // this.$toast.loading({
      //   duration: 0
      // })
      // await auEdit({ area: value[1].code })
      // // 调用接口刷新数据
      // this.$toast.success('修改成功')
      // this.$store.dispatch('refreshUserInfo')
    },
    async EditUserInfo (data) {
      // 调用接口修改数据
      this.$toast.loading({
        duration: 0
      })
      await auEdit(data)
      // 调用接口刷新数据
      this.$toast.success('修改成功')
      this.$store.dispatch('refreshUserInfo')
    },
    goEditInfo (str) {
      this.$router.push('/home/editInfo?type=' + str)
    }
  },
  components: {
    myCell
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    document.body.style.backgroundColor = '#f7f4f5'
  },
  beforeDestroy () {
    document.body.style.backgroundColor = ''
  }
}
</script>

<style lang="less" scoped>
.myInfo {
  .content {
    padding: 0 @pd15;
    .mt20 {
      margin-top: 20px;
    }
    .text {
      color: #e40137;
    }
  }
}
</style>
