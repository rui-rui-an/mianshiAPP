import hmNavBar from '@/components/hmNavBar.vue'

// 这个是对象写法
// export default {
//   install (Vue) {
//     Vue.component('hmNavBar', hmNavBar)
//   }
// }
import moment from 'moment'
export default function (Vue) {
  Vue.component('hmNavBar', hmNavBar)
  Vue.prototype.$baseUrl = process.env.VUE_APP_URL
  Vue.filter('formatTime', function (time) {
    const _time = moment(time)
    const _local = moment()
    const _diff = _local.diff(_time, 'H')
    if (_diff < 1) {
      return '刚刚'
    } else if (_diff < 24) {
      return _diff
    } else {
      return _time.format('YYYY/MM/DD HH:mm:ss')
    }
  })
}
