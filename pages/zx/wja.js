// pages/zx/wja.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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
  input(e){
    this.setData({
      message:e.detail
    })
  },
  submit(){
    if (!this.data.message) {
      wx.showToast({
        icon:'none',
        title: '请填写总结！',
      })
      return
    }
    let data={
      id:this.data.id,
      zj:this.data.message
    }
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/editCaseBookByAppooint`,
      header: app.getHeaderWithToken(),
      data: data,
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          wx.showToast({
            title: res.data.errmsg,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.errmsg,
          })
        }
      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          title: JSON.stringify(res)
        })
      }
    })
  }
})