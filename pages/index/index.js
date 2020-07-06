//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

  },
  onLoad: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 1、 已绑定， 拿后台返回的token， 存， 忽略登录页， 跳转到主页
        // 2、 未绑定， 拿后台返回的openId， 去登录页做绑定
        console.log(`code is ${res.code}`)
        wx.request({
          url: `${app.globalData.serverPath}/api/consultant/wxLogin`,
          data: {
            code: res.code
          },
          header: app.getHeader(),
          success(res) {
            if (res.data.errcode === '1') { //未绑定，跳转到登录页
              app.globalData.openId = res.data.openid
              wx.setStorage({
                key: "openId",
                data: res.data.openid
              })
              wx.redirectTo({
                url: '/pages/login/login',
              })
            } else if (res.data.errcode === '0') {//已绑定，直接进入主界面
              app.globalData.token = res.data.appUserInfo.token
              app.globalData.openId = res.data.openid
              app.globalData.student = res.data.appUserInfo.user
              app.globalData.token = res.data.appUserInfo.token
              wx.setStorage({
                key: "openId",
                data: res.data.openid
              })
              wx.switchTab({
                url: '/pages/pb/pb',
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.errmsg,
              })
            }
          },
          fail(res) {
            wx.showToast({
              title: JSON.stringify(res)
            })
          }
        })
      }
    })
  }
})
