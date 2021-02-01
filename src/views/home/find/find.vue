<template>
  <van-pull-refresh v-model="loading" @refresh="refresh">
    <div class="find">
      <hmNavBar title="发现"></hmNavBar>
      <div class="content">
        <div class="part1">
          <findCell title="面试技巧" class="technic cell_title"></findCell>
          <technicItem
            v-for="(item, index) in technicList"
            :key="index"
            :info="item"
            item
          ></technicItem>
        </div>
        <div class="part2">
          <findCell title="市场数据" class="cell_title"> </findCell>
          <van-tag class="tag" color="#eceaea" text-color="#898a9b">{{
            chartData.city
          }}</van-tag>
          <van-tag class="tag" color="#eceaea" text-color="#898a9b">{{
            chartData.position
          }}</van-tag>
          <ul class="city_data" ref="city_data">
            <li
              class="data_li"
              v-for="(item, index) in chartData.yearSalary"
              :key="index"
            >
              <!-- v-show="index < showNum" -->
              <div class="li1">{{ item.year.substring(0, 5) }}</div>
              <div class="li2">
                <div
                  class="num"
                  :style="{
                    width: (item.salary / chartData.topSalary) * 100 + '%'
                  }"
                >
                  ¥{{ item.salary }}
                </div>
              </div>
              <div class="li3">
                <div v-if="item.percent">
                  <i v-if="item.percent > 0" class="iconfont up">&#xe64e;</i>
                  <i v-else class="iconfont down">&#xe651;</i>
                </div>
              </div>
              <div class="li4">
                <span v-if="item.percent">{{ item.percent }}%</span>
              </div>
            </li>
          </ul>
          <div class="show_box">
            <div class="show_more show" @click="showMore" v-if="showNum === 3">
              展开更多<i class="iconfont down">&#xe652;</i>
            </div>
            <div v-else class="show_less show" @click="showLess">
              收起<i class="iconfont up">&#xe652;</i>
            </div>
          </div>
        </div>
        <div class="part3">
          <findCell
            title="面经分享"
            class="cell_title"
            @click.native="$router.push('/home/shareList')"
          ></findCell>
          <div class="share_box">
            <shareItem
              v-for="(item, index) in shareList"
              :key="index"
              :info="item"
            ></shareItem>
          </div>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import findCell from './findCell'
import technicItem from './technicItem'
import shareItem from './shareItem'
import { articlesTechnic, chartDataHot, articlesShare } from '@/api/find'
export default {
  name: 'find',
  components: {
    findCell,
    technicItem,
    shareItem
  },
  data () {
    return {
      technicList: [],
      chartData: '',
      showNum: 3,
      shareList: [],
      loading: false
    }
  },
  methods: {
    showMore () {
      this.showNum = 999
      this.$refs.city_data.style.height =
        this.$refs.city_data.scrollHeight + 'px'
    },
    showLess () {
      this.showNum = 3
      this.$refs.city_data.style.height =
        (this.$refs.city_data.scrollHeight / this.chartData.yearSalary.length) *
          3 +
        'px'
    },
    async refresh () {
      document.body.style.backgroundColor = '#f7f4f5'
      const res = await articlesTechnic()
      this.technicList = res.data.data.list
      const res2 = await chartDataHot()
      // console.log(res2)
      res2.data.data.yearSalary.reverse()
      this.chartData = res2.data.data
      const res3 = await articlesShare({ limit: 3 })
      this.shareList = res3.data.data.list
      // console.log(res3)
      this.$nextTick(() => {
        // console.log(this.$refs.city_data.scrollHeight)
        if (this.$refs.city_data !== undefined) {
          this.$refs.city_data.style.height =
            (this.$refs.city_data.scrollHeight /
              this.chartData.yearSalary.length) *
              3 +
            'px'
        }
      })
      this.loading = false
    }
  },
  async created () {
    this.refresh()
    // document.body.style.backgroundColor = '#f7f4f5'
    // const res = await articlesTechnic()
    // this.technicList = res.data.data.list
    // const res2 = await chartDataHot()
    // // console.log(res2)
    // res2.data.data.yearSalary.reverse()
    // this.chartData = res2.data.data
    // const res3 = await articlesShare({ limit: 3 })
    // this.shareList = res3.data.data.list
    // // console.log(res3)
    // this.$nextTick(() => {
    //   // console.log(this.$refs.city_data.scrollHeight)
    //   if (this.$refs.city_data !== undefined) {
    //     this.$refs.city_data.style.height =
    //       (this.$refs.city_data.scrollHeight /
    //         this.chartData.yearSalary.length) *
    //         3 +
    //       'px'
    //   }
    // })
  },
  // beforeDestroy () {
  //   document.body.style.backgroundColor = ''
  // },
  deactivated () {
    document.body.style.backgroundColor = ''
  }
}
</script>

<style lang="less" scoped>
.find {
  .content {
    // background-color: #fff;

    .part1,
    .part2,
    .part3 {
      padding: 0 @pd15;
      background-color: #fff;
    }
    .cell_title {
      margin-top: 5px;
    }
    .technicItem:last-child {
      margin-bottom: 0px;
      padding-bottom: 30px;
    }
    .technic {
      margin-bottom: 20px;
    }
    .tag {
      padding: 3px 5px;
      margin-top: 10px;
      margin-bottom: 15px;
      margin-right: 10px;
    }
    .city_data {
      transition: all 1s;
      overflow: hidden;
      .data_li {
        display: flex;
        align-items: center;
        margin-bottom: 11px;
        .li1 {
          width: 60px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #545671;
          letter-spacing: 0px;
        }
        .li2 {
          flex: 1;
          height: 12px;
          opacity: 1;
          background-color: #ebdfdf;
          border-radius: 6px;
          .num {
            color: #fff;
            font-size: 12px;
            background: #fe6d67;
            text-align: right;
            border-radius: 6px;
            padding-right: 15px;
          }
        }
        .li3 {
          width: 30px;
          text-align: center;
          font-size: 12px;
          .up {
            color: #00d47a;
          }
          .down {
            color: #fe6d67;
          }
        }
        .li4 {
          width: 35px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: right;
          color: #5b5d75;
          letter-spacing: 0px;
        }
      }
    }
    .show {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #545671;
      line-height: 20px;
      letter-spacing: 0px;
      .down {
        font-size: 13px;
        opacity: 1;
        color: #b4b4bd;
        padding-left: 5px;
      }
      .up {
        font-size: 13px;
        color: #b4b4bd;
        display: inline-block;
        transform: rotate(180deg);
      }
    }
    .share_box {
    }
  }
}
</style>
