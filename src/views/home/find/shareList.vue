<template>
  <div class="shareList">
    <hmNavBar title="面经分享" path="/home/find"></hmNavBar>
    <div class="content">
      <van-search
        v-model="inpValue"
        show-action
        placeholder="请输入搜索内容"
        class="search"
        @search="search"
        @cancel="cancelEvent"
      ></van-search>
      <div class="shareItem" v-if="showList">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="load"
          v-if="bol"
        >
          <shareItem
            v-for="(item, index) in list"
            :key="index"
            :info="item"
          ></shareItem>
        </van-list>
      </div>
      <div v-else class="history_search">
        <h4 class="title mb20">大家都在搜</h4>
        <van-tag
          color="#f7f4f5"
          text-color="#a4a3b2"
          class="tag"
          v-for="(item, index) in hotList"
          :key="index"
          @click="tagClick(item)"
          >{{ item }}</van-tag
        >
        <van-cell>
          <template #title>
            <div class="title">
              历史搜索
            </div>
          </template>
          <template #default>
            <div class="value" @click="clear">
              清空
            </div>
          </template>
        </van-cell>
        <van-tag
          color="#f7f4f5"
          text-color="#a4a3b2"
          class="tag"
          v-for="(item, index) in historyList"
          :key="index"
          @click="tagClick(item)"
          >{{ item }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
import shareItem from './shareItem'
import { articlesShare, articlesShareTopSearch } from '@/api/find'
import { setLocal, getLocal, removeLocal } from '@/utils/local'
export default {
  components: {
    shareItem
  },
  data () {
    return {
      inpValue: this.$route.query.q ? this.$route.query.q : '',
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      pagesize: 2,
      bol: true,
      showList: true,
      hotList: [],
      historyList: JSON.parse(getLocal('historyList')) || []
    }
  },
  methods: {
    search () {
      //   console.log('search')
      this.list = []
      this.loading = false
      this.finished = false
      this.currentPage = 1
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
      this.showList = true
      if (this.inpValue !== '') {
        this.historyList.unshift(this.inpValue)
        this.historyList = [...new Set(this.historyList)]
        this.historyList.splice(5)
        setLocal(JSON.stringify(this.historyList), 'historyList')
      }
      // 修改记录当前的地址，让该地址可以回调
      this.$router.push('/home/shareList?q=' + this.inpValue)
    },
    async cancelEvent () {
      //   console.log('cancelEvent')
      this.showList = false
      if (!this.hotList.length) {
        const res = await articlesShareTopSearch()
        this.hotList = res.data.data
      }
    },
    async load () {
      const res = await articlesShare({
        start: (this.currentPage - 1) * this.pagesize,
        limit: this.pagesize,
        q: this.inpValue
      })
      //   console.log(res)
      this.currentPage++
      // console.log(res.data.data.list)
      if (this.inpValue !== '') {
        res.data.data.list.forEach(val => {
          val.title = val.title
            .split(this.inpValue)
            .join(`<span style="color:red">${this.inpValue}</span>`)
        })
      }

      this.list.push(...res.data.data.list)
      this.loading = false
      if (this.list.length >= res.data.data.total) {
        this.finished = true
      }
    },
    tagClick (str) {
      this.inpValue = str
      this.search()
    },
    clear () {
      this.historyList = []
      removeLocal('historyList')
    }
  },
  async created () {
    // const res = await articlesShare()
    // this.list = res.data.data.list
  }
}
</script>

<style lang="less" scoped>
.shareList {
  .content {
    padding: 0 @pd15;
    .search {
      padding-left: 0;
      padding-right: 0;
    }
    .history_search {
      padding-top: 15px;
      .title {
        opacity: 1;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;
      }
      .mb20 {
        margin-bottom: 13px;
      }
      .van-cell {
        padding-left: 0;
        padding-right: 0;
      }
      .tag {
        padding: 5px 8px;
        margin-right: 15px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
