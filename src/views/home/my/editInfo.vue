<template>
  <div class="editInfo">
    <hmNavBar
      :title="titleObj[this.type]"
      :path="path"
      :right="right"
      @rightClick="save"
    ></hmNavBar>
    <div class="content">
      <van-field
        v-if="type !== 'avatar'"
        class="field"
        v-model="inpValue"
      ></van-field>
      <van-uploader
        v-model="imgArr"
        @delete="deleteEvent"
        max-count="1"
        v-else
        :before-read="beforeRead"
        :after-read="afterRead"
      ></van-uploader>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auEdit, upload } from '@/api/my.js'
export default {
  data () {
    return {
      inpValue: '',
      right: '',
      type: this.$route.query.type,
      titleObj: {
        nickname: '修改昵称',
        intro: '修改个人简介',
        position: '修改岗位',
        avatar: '修改头像'
      },
      path: '/home/myInfo',
      imgArr: []
    }
  },
  methods: {
    async save () {
      //   alert('包村')
      this.$toast.loading({
        duration: 0
      })
      await auEdit({
        [this.type]: this.inpValue
      })
      this.$store.dispatch('refreshUserInfo')
      this.$router.push(this.path)
      this.$toast.success('修改成功')
    },
    beforeRead (file) {
      const _type = file.type === 'image/png' || file.type === 'image/jpeg'
      const _size = file.size / 1024 / 1024 < 2
      if (!_type) {
        this.$toast.fail('请上传png/jpeg格式的图片')
      }
      if (!_size) {
        this.$toast.fail('请上传小于2M的图片')
      }
      return _type && _size
    },
    async afterRead (res) {
      this.$toast.loading({
        message: '上传中',
        duration: 0
      })
      const _formData = new FormData()
      _formData.append('files', res.file)
      const res2 = await upload(_formData)
      // console.log(res2)
      this.inpValue = res2.data.data[0].id
      this.$toast.success('上传成功')
    },
    deleteEvent () {
      this.inpValue = ''
    }
  },
  watch: {
    inpValue () {
      if (this.inpValue !== '' && this.inpValue !== this.userInfo[this.type]) {
        this.right = '保存'
      } else {
        this.right = ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.inpValue = this.userInfo[this.type]
    if (this.type === 'position') {
      this.path = '/home/my'
    }
    if (this.type === 'avatar' && this.userInfo.avatar) {
      this.imgArr[0] = { url: this.$baseUrl + this.userInfo.avatar }
    }
  }
}
</script>

<style lang="less" scoped>
.editInfo {
  .content {
    padding: 0 @pd15;
    margin-top: 20px;
    text-align: center;
    .field {
      background: #f7f4f5;
      border-radius: 4px;
    }
  }
}
</style>
