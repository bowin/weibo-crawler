/**
 * Created by amyli on 16/12/3.
 */
const _ = require('lodash'),
  co = require('co'),
  request = require('request-promise');


function getUserInfo(user) {
}
co(function *() {
  const first = yield getPageBlogs(1);
  const user = first[0].user;
  console.log('firsts', first.slice(5))
  let totalWeibos = user.statuses_count;
  const {screen_name, statuses_count, description, gender, followers_count, follow_count} = user;
  const pages = (totalWeibos / 10 + 1);
  let totalFound = 0, totalRetweets = 0, totalComments = 0, totalThumbs = 0, totalTopics = 0;
  for (let i = 1; i < pages; i++) {
    const parts = yield getPageBlogs(i);
    totalFound += parts.length;
    for (let j = 0; j < parts.length; j++) {
      if (parts[j].retweeted_status) totalRetweets++;
      if (parts[j].text.match(/<a.*>#.+#<\/a>/)) totalTopics++
      totalComments += parts[j].comments_count;
      totalThumbs += parts[j].attitudes_count;
    }

  }
  const info = [screen_name, user.id, follow_count, followers_count, totalFound - totalRetweets, totalRetweets, totalComments, totalThumbs,
    //                      //birthday, school, company
    gender, '', description, '', ''].join(',')
  console.log('info: ', info);
  require('fs').writeFileSync(__dirname + '/info.csv', info);
}).then(d => {
  // process.exit(0)

}).catch(e => {
  console.error(e)
  console.error(e.stack)
  process.exit(-1)
})

function getPageBlogs(page) {
  console.log('get page: ', page)
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
  }).then(d => d.cards ? d.cards.filter(i => i.mblog).map(i => i.mblog) : [])
    .catch(e => {
      console.error(e)
      console.error(e.stack)
      return []
    })

}

function getUserInfo() {

}
