import _fetch from './request'
import { getLocal } from '@/utils/local'
function auInfo () {
  return _fetch({
    url: '/au/info',
    headers: {
      authorization: `Bearer ${getLocal()}`
    }
  })
}
export { auInfo }
