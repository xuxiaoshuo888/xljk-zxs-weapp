// pages/zx/zxDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,//tab激活index
    collapseActiveNames:'1',
    openFlag:false,//false 关闭，true 打开
    id:null,
    dto:{},
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id
      })
    }
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
    this.getData()
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
  getData(){
    let _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/recordInfo`,
      header: app.getHeaderWithToken(),
      data:{id:_this.data.id},
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            dto:res.data.dto,
            list:res.data.list
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
  },
  toggleCard(){
    let flag = this.data.openFlag
    if(flag === true){
      flag = false
    }else{
      flag = true
    }
    this.setData({
      openFlag:flag
    })
  }
})