/**
 * Created by amyli on 16/12/4.
 */
const user = {
  id: 1720500393,
  screen_name: '晓晨1786',
  profile_image_url: 'http://tva4.sinaimg.cn/crop.0.0.180.180.180/668cc0a9jw1e8qgp5bmzyj2050050aa8.jpg',
  profile_url: 'http://m.weibo.cn/u/1720500393',
  statuses_count: 9209,
  verified: false,
  verified_type: 220,
  description: '努力不会错 哈尔滨工业大学',
  gender: 'f',
  mbtype: 0,
  urank: 33,
  mbrank: 0,
  follow_me: false,
  following: false,
  followers_count: 874,
  follow_count: 1423,
  cover_image_phone: 'http://ww1.sinaimg.cn/crop.0.0.640.640.640/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg'
}

const  a = [
  {id: 1, n: 2},
  {id: 1, n: 3}
]
const b = a.reduce((a, b) => ({id: a.id  + b.id, n: a.n + b.n}), {id: 0, n: 0});

console.log(b)

