/**
 * 将时间秒，处理成 0:00 格式
 */

let timeFormat = val => {
   // 取整
   let time = Math.floor(val)
   let minute, second;
   if(val <= 0) {
    return '0:00'
   }

   if( val > 60 ) {
    minute = Math.floor(val/60);
    second = Math.floor(val%60)
   }
   if(second<10) {
     second = `0${second}`
   }
   return `${minute}:${second}`
 }

 export default {
   timeFormat
 }