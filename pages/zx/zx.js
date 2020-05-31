// pages/zx/zx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0,//tab激活index
    searchValue:'',//搜索字段
    zxList:[
      {
        title:'个体咨询',
        zx:[
          {name:'上官侯成',when:'2020-05-12  09:00-10:00'},
          {name:'张三丰',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
        ]
      },
      {
        title:'分诊',
        zx:[
          {name:'上官侯成',when:'2020-05-12  09:00-10:00'},
          {name:'张三丰',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
        ]
      },
      {
        title:'团体咨询',
        zx:[
          {name:'上官侯成',when:'2020-05-12  09:00-10:00'},
          {name:'张三丰',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
          {name:'张三',when:'2020-05-12  09:00-10:00'},
        ]
      },
    ]
    
      
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
  toZxDetail(){
    wx.navigateTo({
      url: './zxDetail',
    })
  }
})