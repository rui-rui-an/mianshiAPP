<template>
  <div class="shareInfo">
    <hmNavBar :path="path"></hmNavBar>
    <div class="content" v-if="info">
      <h4 class="title">
        {{ info.title }}
      </h4>
      <div class="userinfo">
        <img
          v-if="info.author.avatar"
          class="left"
          :src="$baseUrl + info.author.avatar"
          alt=""
        />
        <img v-else class="left" src="@/assets/logo.png" alt="" />
        <div class="right">
          <div class="top">{{ info.author.nickname }}</div>
          <div class="bottom">{{ info.updated_at | formatTime }}</div>
        </div>
      </div>
      <div class="txt" v-html="info.content">
        {{ info.content }}
      </div>
    </div>
    <div class="line"></div>
    <div class="comment">
      <h3 class="comment_title">评论<span>87</span></h3>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="load"
      >
        <div class="comment_item" v-for="(item, index) in list" :key="index">
          <div class="top">
            <img
              v-if="item.author.avatar"
              class="top_1"
              :src="$baseUrl + item.author.avatar"
              alt=""
              @click="goComment(item)"
            />
            <img
              v-else
              class="top_1"
              @click="goComment(item)"
              src="@/assets/logo.png"
              alt=""
            />
            <div class="top_2" @click="goComment(item)">
              <div class="nickname">
                {{ item.author.nickname }}
              </div>
              <div class="time">{{ item.created_at | formatTime }}</div>
            </div>
            <div class="top_3">{{ item.star }}</div>
            <div class="top_4 iconfont">&#xe638;</div>
          </div>
          <div class="middle">
            {{ item.content }}
          </div>
          <div class="bottom" v-if="item.children_comments.length">
            <div
              class="bottom_comment"
              v-for="(item2, index2) in item.children_comments"
              :key="index2"
            >
              <span class="username">{{ item2.author }}：</span>
              <span class="comment_content">{{ item2.content }}</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="shareMood">
      <div class="say_two" @click="send_comment">
        我来补充两句
      </div>
      <div class="right">
        <div class="icon iconfont">&#xe63c;</div>
        <div class="num">826</div>
      </div>
      <div class="right">
        <div class="icon iconfont">&#xe650;</div>
        <div class="num">826</div>
      </div>
      <div class="right">
        <div class="icon iconfont">&#xe63e;</div>
        <div class="num">826</div>
      </div>
    </div>
    <van-popup v-model="showpop" position="bottom">
      <div class="comment_box">
        <van-field
          class="van_field"
          type="textarea"
          placeholder="我来补充两句"
          row="7"
          v-model="inpValue"
        ></van-field>
        <div class="send">
          <span v-if="inpValue" @click="send" :style="{ color: 'red' }"
            >发送</span
          >
          <span v-else>发送</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  articlesShareId,
  articlesCommentsId,
  articlesComments
} from '@/api/find'
export default {
  data () {
    return {
      id: this.$route.params.id,
      info: '',
      path: this.$route.query.repath,
      loading: false,
      finished: false,
      currentPage: 1,
      pagesize: 2,
      list: [],
      showpop: false,
      inpValue: '',
      parent: '',
      commentItem: ''
    }
  },
  watch: {
    showpop () {
      if (this.showpop === false) {
        this.inpValue = ''
      }
    }
  },
  methods: {
    async load () {
      const res = await articlesCommentsId(
        {
          start: (this.currentPage - 1) * this.pagesize,
          limit: this.pagesize
        },
        this.id
      )
      //   console.log(res)
      this.currentPage++
      this.list.push(...res.data.data.list)
      this.loading = false
      if (this.list.length >= res.data.data.total) {
        this.finished = true
      }
    },
    send_comment () {
      this.showpop = true
      //   点击打开的时候就清空值，还原成新增评论的状态
      this.parent = ''
    },
    async send () {
      //   console.log(this.parent)
      const res = await articlesComments({
        content: this.inpValue,
        article: this.id,
        parent: this.parent
      })
      //   console.log(res)
      if (this.parent === '') {
        res.data.data.star = 0
        this.list.unshift(res.data.data)
      } else {
        this.commentItem.children_comments.push(res.data.data)
      }
      this.showpop = false
    },
    goComment (item) {
      this.showpop = true
      this.parent = item.id
      this.commentItem = item
      //   console.log(item)
      //   console.log(this.parent)
    }
  },
  async created () {
    const res = await articlesShareId(this.id)
    // console.log(res)
    this.info = res.data.data
  }
}
</script>

<style lang="less" scoped>
.shareInfo {
  .content {
    padding: 0 @pd15 15px;
    .title {
      margin-top: 15px;
      opacity: 1;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #181a39;
      line-height: 25px;
    }
    .userinfo {
      padding: 10px 0 20px;
      display: flex;
      align-items: center;
      .left {
        width: 35px;
        height: 35px;
        opacity: 1;
        border-radius: 50%;
      }
      .right {
        padding-left: 8px;
        .top {
          opacity: 1;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #545671;
          line-height: 16px;
          letter-spacing: 0px;
        }
        .bottom {
          opacity: 1;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #b4b4bd;
          line-height: 16px;
          letter-spacing: 0px;
        }
      }
    }
    .txt {
      opacity: 1;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
      ::v-deep img {
        width: 100%;
      }
    }
  }
  .line {
    height: 10px;
    background-color: #f7f4f5;
  }
  .comment {
    padding: 0 @pd15 60px;
    .comment_title {
      padding: 18px 0;
      opacity: 1;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
      position: relative;
      span {
        opacity: 1;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #b4b4bd;
        line-height: 16px;
        letter-spacing: 0px;
        position: absolute;
        top: 12px;
      }
    }
    .comment_item {
      padding-bottom: 20px;
      .top {
        display: flex;
        align-items: center;
        .top_1 {
          width: 35px;
          height: 35px;
          opacity: 1;
          border-radius: 50%;
        }
        .top_2 {
          flex: 1;
          margin-left: 6px;
          .nickname {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            text-align: left;
            color: #545671;
            line-height: 16px;
            letter-spacing: 0px;
          }
          .time {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #b4b4bd;
            line-height: 16px;
            letter-spacing: 0px;
          }
        }
        .top_3 {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #b4b4bd;
          line-height: 16px;
          letter-spacing: 0px;
          margin-right: 6px;
        }
        .top_4 {
          font-size: 24;
        }
      }
      .middle {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 500;
        text-align: justify;
        color: #181a39;
        line-height: 27px;
        letter-spacing: 0px;
        padding: 15px 0;
        margin-left: 35px;
      }
      .bottom {
        margin-left: 35px;
        padding: 13px;
        background-color: #f7f4f5;
        .bottom_comment {
          .username {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            text-align: left;
            color: #545671;
            line-height: 20px;
            letter-spacing: 0px;
          }
          .comment_content {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            text-align: left;
            color: #545671;
            line-height: 20px;
            letter-spacing: 0px;
          }
        }
      }
    }
  }
  .shareMood {
    background-color: #fff;
    position: fixed;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 @pd15;
    left: 0;
    bottom: 0;
    .say_two {
      flex: 1;
      height: 34px;
      line-height: 34px;
      padding-left: 10px;
      opacity: 1;
      background: #f7f4f5;
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      letter-spacing: 0px;
    }
    .right {
      margin-left: 15px;
      color: #b4b4bd;
      text-align: center;
      .icon {
        font-size: 28px;
      }
      .num {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #b4b4bd;
        line-height: 16px;
        letter-spacing: 0px;
        text-align: center;
      }
    }
  }
  .comment_box {
    padding: 20px 15px;
    .van_field {
      background-color: #f7f4f5;
    }
    .send {
      text-align: right;
      opacity: 1;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #b4b4bd;
      line-height: 22.5px;
      letter-spacing: 0px;
      span {
        padding-top: 8px;
      }
    }
  }
}
</style>
