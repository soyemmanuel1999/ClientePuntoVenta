module.exports = {
  transpileDependencies: [
    'vuetify','axios'
  ],
  devServer:{
    proxy:"http://localhost:8080"
  }
}
