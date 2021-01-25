module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "network": "@/network",
        "components": "@/components",
        "common":"@/components/common",
        "content":"@/components/content",
        "store": "@/store",
        "views": "@/views"
      }
    }
  }
}