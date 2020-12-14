// pages/zx/zxDetail.js
const app = getApp()

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0, //tab激活index
    collapseActiveNames: '1',
    openFlag: false, //false 关闭，true 打开
    id: null,
    dto: {},
    list: [],
    zxlxList: [], //咨询类型list
    show_zxlx: false,
    zxlx:null,
    zxrq:null,
    zxsj:null,
    zxgy:null,
    fzinfo:{},//初谈
    textareaStyle: { maxHeight: 120, minHeight: 80 },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
    this.getzxlx();
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
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/recordInfo`,
      header: app.getHeaderWithToken(),
      data: {
        id: _this.data.id
      },
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            dto: res.data.dto,
            list: res.data.list
          })
          let zxlx=''
          _this.data.zxlxList.forEach(item=>{
            if(item.value == res.data.appointHistory.appoint.zxlx){
              zxlx = item.label
              return
            }
          })
          _this.setData({
            zxgy:res.data.appointHistory.thyd,
            zxsj:res.data.appointHistory.appoint.zxsj,
            zxrq:res.data.appointHistory.appoint.zxrq,
            zxlx_value:res.data.appointHistory.appoint.zxlx,
            zxlx:zxlx
          })
          _this.getctinfo()
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
  toggleCard() {
    let flag = this.data.openFlag
    if (flag === true) {
      flag = false
    } else {
      flag = true
    }
    this.setData({
      openFlag: flag
    })
  },
  getzxlx() {
    let _this = this
    wx.request({
      url: `${app.globalData.serverPath}/selectCommon/codeItems?kindId=yy_zxlx`,
      header: app.getHeaderWithToken(),
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            zxlxList: res.data.data
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
  getctinfo() {//初谈信息
    let _this = this
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/getFzInfo/fz?id=${this.data.dto.app.id}`,
      header: app.getHeaderWithToken(),
      success(res) {
        wx.hideLoading()
        if (res.data.errcode === '0') {
          console.log(res.data)
          _this.setData({
            fzinfo: res.data.fzinfo
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
  choose_zxlx() {
    this.setData({
      show_zxlx: true
    })
  },
  onConfirm_zxlx(e) {
    console.log(e.detail.value.value)
    this.setData({
      zxlx_value: e.detail.value.value,
      zxlx:e.detail.value.label,
      show_zxlx:false
    })
  },
  close_zxlx(){
    this.setData({
      show_zxlx:false
    })
  },
  choose_zxrq(){
    this.setData({
      show_zxrq:true
    })
  },
  confirm_zxrq(e){
    //e.detail  毫秒转 年月日
    let m =  new Date(e.detail).Format("yyyy-MM-dd")
    this.setData({
      show_zxrq:false,
      zxrq:m
    })
  },
  cancel_zxrq(){
    this.setData({
      show_zxrq:false
    })
  },
  input_zxsj(e){
    this.setData({
      zxsj:e.detail
    }) 
  },
  input_zxgy(e){
    this.setData({
      zxgy:e.detail
    }) 
  },
  submit(){
    if (!this.data.zxlx_value) {
      wx.showToast({
        icon:'none',
        title: '请选择咨询类型！',
      })
      return
    }
    if (!this.data.zxrq) {
      wx.showToast({
        icon:'none',
        title: '请选择咨询日期！',
      })
      return
    }
    if (!this.data.zxsj) {
      wx.showToast({
        icon:'none',
        title: '请填写咨询时间！',
      })
      return
    }
    if (!this.data.zxgy) {
      wx.showToast({
        icon:'none',
        title: '请填写咨询概要！',
      })
      return
    }
    let _this = this
    let data={
      id:_this.data.dto.id,
      zxlx:_this.data.zxlx_value,
      zxrq:_this.data.zxrq,
      zxsj:_this.data.zxsj,
      thyd:_this.data.zxgy,
      status:_this.data.dto.status
    }
    // return
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/consultant/editRecordInfo`,
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