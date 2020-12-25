// pages/pb/pb.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: [],
    list: [],
    pbList: [],
    local_week: ['一', '二', '三', '四', '五', '六', '日'],
    currentItem: {}, //
    show: false,
    style: "height: 70%;width:70%;",
    yy: '',
    autosize:'{minHeight: 150}'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getData() {
    let _this = this
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/getZxsPbqk`,
      header: app.getHeaderWithToken(),
      success(res) {
        if (res.data.errcode === '0') {
          const {
            days,
            list,
            pbList
          } = res.data
          let days_format = []
          days.forEach(item => {
            let tempObj = {
              week: item.substr(2, 1),
              date: item.substr(4, 13),
              date_day: item.substr(12),
              pbList: []
            }
            pbList.forEach(pbItem => {
              if (tempObj.date == pbItem.rq) {
                tempObj.pbList.push(pbItem)
              }
            })
            days_format.push(tempObj)
          });
          days_format.slice(0, 7)
          _this.setData({
            days: [days_format.slice(0, 7), days_format.slice(7)],
            list: list,
            pbList: pbList
          })
          console.log(_this.data.days)
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
  },
  clickDay(e) {
    let o = e.currentTarget.dataset.item
    if (this.data.currentItem && this.data.currentItem.id == o.id) {
      this.setData({
        currentItem: null
      })
    } else {
      this.setData({
        currentItem: o
      })
    }
  },
  qingjia(e) {
    console.log(e);
    let id = e.currentTarget.dataset.item.id
    //打开模态框填写请假原因
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  ipt(e){
    this.setData({
      yy:e.detail
    })
  },
  tijiao() {
    let _this = this
    let data = {
      id: this.data.currentItem.id,
      yy: this.data.yy
    };
    if(!this.data.yy){
      wx.showToast({
        icon: 'none',
        title: '请填写请假原因！',
      })
      return;
    }
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/qingjiaRota`,
      header: app.getHeaderWithToken(),
      data: data,
      success(res) {
        if (res.data.errcode === '0') {
          wx.showToast({
            icon: 'none',
            title: res.data.errmsg,
          })
          _this.getData();
          _this.setData({
            show: false
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
  },
  cancel(){
    this.setData({
      show: false
    })
  }
})