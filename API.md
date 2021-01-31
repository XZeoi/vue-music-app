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



### [获取歌词](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=获取歌词)

说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )

**必选参数 :** `id`: 音乐 id

**接口地址 :** `/lyric`

**调用例子 :** `/lyric?id=33894312`



### [获取歌曲详情](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=获取歌曲详情)

说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 `,` 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)

**必选参数 :** `ids`: 音乐 id, 如 `ids=347230`

**接口地址 :** `/song/detail`

**调用例子 :** `/song/detail?ids=347230`,`/song/detail?ids=347230,347231`



### [获取专辑内容](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=获取专辑内容)

说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容

**必选参数 :** `id`: 专辑 id

**接口地址 :** `/album`

**调用例子 :** `/album?id=32311`



### [专辑动态信息](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=专辑动态信息)

说明 : 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数

**必选参数 :** `id`: 专辑 id

**接口地址 :** `/album/detail/dynamic`

**调用例子 :** `/album/detail/dynamic?id=32311`



### [获取相似音乐](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=获取相似音乐)

说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌曲

**必选参数 :** `id`: 歌曲 id

**接口地址 :** `/simi/song`

**调用例子 :** `/simi/song?id=347230` ( 对应 ' 光辉岁月 ' 相似歌曲 )