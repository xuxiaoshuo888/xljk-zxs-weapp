// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null,
    student:{},
    myList:[
      {text: '我的信息', url: 'toMe', img: 'my-xx.png'},
      {text: '我的咨询', url: 'toTtzxApp', img: 'my-zx.png'},
      {text: '我的测评', url: 'toCepingIndex', img: 'my-cp.png'},
      {text: '我的课程', url: '', img: 'my-kc.png'},
      {text: '我关注的问题', url: '', img: 'my-wt.png'},
      {text: '我的收藏', url: '', img: 'my-sc.png'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid:app.globalData.openId,
      student:app.globalData.student
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toPb(){
    wx.switchTab({
      url: '/pages/pb/pb',
    })
  },
  toZx(){
    wx.switchTab({
      url: '/pages/zx/zx',
    })
  },
  unbind(){
    let openid = this.data.openid
    wx.showModal({
      confirmColor: 'confirmColor',
      content: '您确认解绑?',
      showCancel: true,
      title: '提示',
      success: (res) => {
        if(res.confirm){
          wx.request({
            url: `${app.globalData.serverPath}/api/consultant/unbind`,
            data: {
              openid: openid
            },
            header: app.getHeaderWithToken(),
            success(res) {
             if (res.data.errcode === '0') {//解绑成功，清除本地身份信息，跳转倒登录页
                app.globalData.token = null
                app.globalData.student = null
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              } else {
                wx.showToast({//解绑失败，提示信息
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
      }
    })
  }
})