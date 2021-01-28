# API

### 推荐歌单：必听歌单

说明 : 调用此接口 , 可获取推荐歌单

**可选参数 :** `limit`: 取出数量 , 默认为 30 (不支持 offset)

**接口地址 :** `/personalized`

**调用例子 :** `/personalized?limit=1`



### [推荐新音乐](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=推荐新音乐)

说明 : 调用此接口 , 可获取推荐新音乐

**可选参数 :** `limit`: 取出数量 , 默认为 10 (不支持 offset)

**接口地址 :** `/personalized/newsong`

**调用例子 :** `/personalized/newsong`





### [获取音乐 url](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=获取音乐-url)

说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)

> 注 : 部分用户反馈获取的 url 会 403,[hwaphon](https://github.com/hwaphon)找到的解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放

**必选参数 :** `id` : 音乐 id

**可选参数 :** `br`: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推

**接口地址 :** `/song/url`

**调用例子 :** `/song/url?id=33894312` `/song/url?id=405998841,33894312`