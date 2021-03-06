module.exports = {
  devServer: {
    port: 8085,
    proxy: {
      '^/api': {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ""
        }
      }
    }
  },
}