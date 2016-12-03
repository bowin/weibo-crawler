/**
 * Created by amyli on 16/12/3.
 */
const _ = require('lodash'),
  co = require('co'),
  request = require('request-promise');

co(function *() {
  // const f = yield getPageBlogs(1)
  // console.dir(f, {depth: 5})
  const all = _.range(20).map(i => getPageBlogs(i))
  const data = (yield Promise.all(all))
  const blogs = _.flatten(data);
})

function getPageBlogs(page) {
  return request({
    method: 'GET',
    uri: 'http://m.weibo.cn/container/getIndex?containerid=2304131720500393_-_WEIBO_SECOND_PROFILE_MORE_WEIBO&uid=2114464392',
    qs: {
      containerid: '2304131720500393_-_WEIBO_SECOND_PROFILE_MORE_WEIBO&',
      uid: '2114464392',
      page: page || ''
    },
    json: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36'
    }
  }).then(d => d.cards.filter(i => i.mblog).map(i => i.mblog))

}
