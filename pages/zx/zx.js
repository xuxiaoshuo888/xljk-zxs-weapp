// pages/zx/zx.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,//tab激活index
    searchValue:'',//搜索字段
    list_wtx:[],
    list_ytx:[],
    list_wja:[],
    list_yja:[],
    page:null,
    pageSize:null,
    records:null,  
    show_wja:true,
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
    this.getData();
    this.getyjalist();
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
  toZxDetail(e){
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./zxDetail?id=${id}`,
    })
  },
  getData(){
    let _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/getRecordList`,
      header: app.getHeaderWithToken(),
      success(res) {
        wx.hideLoading()
        let list_ytx=[];
        let list_wtx=[];
        if (res.data.errcode === '0') {
          if(res.data.page.rows.length>0){
            res.data.page.rows.forEach((item)=>{
                if(item.status=='1'){//未填写
                  list_wtx.push(item)
                }else if(item.status=='2'){//已填写
                  list_ytx.push(item)
                }
            })
          }
          _this.setData({
            list_ytx:list_ytx,
            list_wtx:list_wtx,
            page:res.data.page.page,
            pageSize:res.data.page.pageSize,
            records:res.data.page.records
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
  jiean(e){
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./wja?id=${id}`,
    })
  },
  toyja(e){
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./yja?id=${id}`,
    })
  },
  getyjalist(){
    let _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/getCaseBookList`,
      header: app.getHeaderWithToken(),
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
         _this.setData({
           list_yja:res.data.page.rows
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