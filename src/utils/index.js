// import queryString from 'query-string';

import {
  Toast
} from "vant";

function MXApi(callbacks) {
  var deviceReady = false;
  var taskQueue = [];
  document.addEventListener('deviceready', function deviceReadyHandler() {
    deviceReady = true;
    taskQueue.forEach(function (task) {
      applyApi(...task);
    })
    callbacks.ready && callbacks.ready();
    document.removeEventListener('deviceready', deviceReadyHandler, false);
  }, false)

  function applyApi(namespace, api, args) {
    if (window[namespace] && window[namespace][api]) {
      callbacks.beforeApply && callbacks.beforeApply(namespace, api, args);
      window[namespace][api](...args);
    } else if (!deviceReady) {
      taskQueue.push([namespace, api, args]);
    } else {
      callbacks.error && callbacks.error(['该终端没有', namespace, '.', api, '方法!'].join(''), namespace, api);
      throw new Error(['该终端没有', namespace, '.', api, '方法!'].join(''));
    }
  }
  return applyApi;
}

const applyApi = MXApi({
  ready: function () {
    console.log('device ready!!');
  },
  error: function (err) {
    console.log(err);
  },
  beforeApply: function (namespace, api, args) {}
});


const makeApi = namespace => (api, ...args) => applyApi(namespace, api, args);
const MXCommon = makeApi('MXCommon');
const MXWebui = makeApi('MXWebui');
const MXContacts = makeApi('MXContacts');
const MXShare = makeApi('MXShare');


export const showOptionMenu = () => {
  return MXWebui('showOptionMenu');
}
export const hideOptionMenu = () => {
  return MXWebui('hideOptionMenu');
}
export const setCustomHeaderMenu = (...args) => {
  return MXWebui('setCustomHeaderMenu', ...args);
}

export const hideWebViewTitle = () => {
  return MXWebui('hideWebViewTitle');
}

export const showWebViewTitle = () => {
  return MXWebui('showWebViewTitle');
}
export const setWebViewTitle = (name) => {
  return MXWebui('setWebViewTitle', name);
}
export const getCurrentUser = callback => {
  return new Promise((resolve, reject) => {
    MXCommon('getCurrentUser', resolve);
  })
}

export const getServerUrl = callback => {
  return new Promise((resolve, reject) => {
    MXCommon('getServerUrl', resolve);
  })
}

export const viewPersonInfo = login_name => {
  return new Promise((resolve, reject) => {
    MXCommon('viewPersonInfo', login_name, resolve);
  })
}
// 禁止截屏
export const disableWebViewScreenShot = () => {
  return new Promise((resolve, reject) => {
    MXCommon('disableWebViewScreenShot', {
      'onSuccess': function (res) {
        // console.log("禁止截屏成功");
      }, //成功的回调
      'onFail': (err) => {
        // console.log("禁止截屏失败");
      } //失败的回调
    })
  })
}
// 取消禁止截屏
export const cancelNoScreenShot = () => {
  return new Promise((resolve, reject) => {
    MXCommon('enableWebViewScreenShot', {
      'onSuccess': function (res) {
        // console.log("禁止截屏成功");
      }, //成功的回调
      'onFail': (err) => {
        // console.log("禁止截屏失败");
      } //失败的回调
    })
  })
}
export const MXSelectUsers = userIds => {
  return new Promise((resolve, reject) => {
    MXContacts('selectUsers', function (result) {
      resolve(result);
    }, {
      customUserIDS: userIds,
      enableSelectDept: false,
      canSelectSelf: true
    })
  })
}


export const getSSOToken = (appid) => {
  return new Promise((resolve, reject) => {
    MXCommon('getSSOToken', appid, function (sso_token) {
      resolve(sso_token)
    });
  })
}

//关闭当前页面
export const closeApp = () => {
  return MXWebui('closeWindow');
}
//选择图片
export const chooseImg = (count) => {
  return new Promise((resolve, reject) => {
    MXCommon('chooseFile', count, ['album', 'camera', "file"], function (result) {
      resolve(result);
    })
  })
}
//上传图片
export const updateImg = (imgUrl) => {
  return new Promise((resolve, reject) => {
    MXCommon('uploadFile', imgUrl, true, function (result) {
      resolve(result);
    })
  })
}
// 分享朋友圈
export const shareToChat = (data) => {
  return new Promise((resolve, reject) => {
    MXShare('shareToCircle', data, function (result) {
      resolve(result);
    })
  })
}

// 分享base64图片到工作圈
/*'base64': String, // base64格式的数据，去掉base64相关前缀
  'onSuccess': Function, //成功的回调
  'onFail': Function //失败的回调
  */
export const base64SendToCircle = (data) => {
  return new Promise((resolve, reject) => {
    MXCommon('base64SendToCircle', {
      'base64': data,
      'onSuccess': function (res) {
        console.log("chengg");
        resolve(res)
      }, //成功的回调
      'onFail': (err) => {
        reject(err);
        console.log("shiabi ");
      } //失败的回调
    })
    // MXCommon('base64SendToCircle', data,
    //   function (res) { console.log("chengg"); resolve(res) }, //成功的回调
    //   (err) => { reject(err); console.log("shiabi ") } //失败的回调
    // )
  })
}

//分享图片到微信朋友圈
export const shareToWxCircle = (data) => {
  return new Promise((resolve, reject) => {
    MXShare('share', {
      'platform': '2',
      'type': '2',
      'image_url': data,
      'onSuccess': function (res) {
        console.log("chengg");
        resolve(res)
      }, //成功的回调
      'onFail': (err) => {
        reject(err);
        console.log("shiabi ");
      } //失败的回调
    })
    // MXCommon('base64SendToCircle', data,
    //   function (res) { console.log("chengg"); resolve(res) }, //成功的回调
    //   (err) => { reject(err); console.log("shiabi ") } //失败的回调
    // )
  })
}


export const ajax = (params, header) => {

  // Toast.loading({
  //   duration: 0, // 持续展示 toast
  //   forbidClick: true,
  //   message: '加载中...',
  //   loadingType: 'spinner',
  // });

  return new Promise((resolve, reject) => {
    params = Object.assign({}, params, {
      headers: header,
      async: true,
      success: function (data, status, xhr) {
        //Toast.clear();
        console.log("-------" + params.url + "-------");
        // console.log("网络数据：" + data);
        resolve({
          data: JSON.parse(data),
          status
        });
      },
      error: function (data, status, xhr) {
        //Toast.clear();
        Toast("网络错误，请检查网络设置");
        console.log("网络错误返回：" + data + status + JSON.stringify(xhr));
        console.log("-------" + params.url + "-------");
        reject({
          data,
          status
        });
      }
    })
    MXCommon('ajax', params);
  })
}

const queryString = function (query) {
  let str = [];
  for (let key in query) {
    str.push(key + '=' + query[key])
  }
  return str.join('&')
}

export const ajaxGetToken = (url, query) => {
  url = query ? `${url}?${queryString(query)}` : url;
  console.log('geturl =>', url);
  const params = {
    type: 'GET',
    url,
  }
  return ajax(params);
}

export const ajaxPost = (url, data) => {
  return ajax({
    type: 'POST',
    url,
    data
  })
}

export const ajaxPut = (url, data) => {
  return ajax({
    type: 'PUT',
    url,
    data
  })
}

export const ajaxDelete = (url, id) => {
  return ajax({
    type: 'DELETE',
    url: `${url}/${id}`
  })
}
export const shareToWechat = (url) => {
  console.log(JSON.stringify({
    type: 4,
    imageUrl: url,
    platform: 1,
  }));
  return MXShare('share', {
    type: 4,
    imageUrl: url,
    platform: 1,
  })
}
// export const shareToCircle = (data) => {
//   return new Promise((resolve, reject) => {
//     MXShare('shareToCircle', data, function (result) {
//       resolve(result);
//     })
//   });
// }


/* 时间格式化 */
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
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
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export const getFormatDate = (str) => {
  if (str) {
    return (new Date()).Format(str)
  }
  return (new Date()).Format("yyyy-MM-dd hh:mm:ss.S");
}
export const getuuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export const getOnlyUuid = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  uuid = uuid.replace(new RegExp('-', "gm"), '')
  return uuid;
}

//根据 orderType 获取时间 queryDate
export const getDateString = (str) => {
  var date = new Date();
  var result = date.Format("yyyy-MM-dd");
  switch (str) {
    case "Y":
      date.setMonth(0, 1);
      result = date.Format("yyyy-MM-dd");
      break;
    case "M":
      date.setDate(1);
      result = date.Format("yyyy-MM-dd");
      break;
  }
  return result;
}

//获取url 携带的参数
export const getUrlParam = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  } else {
    return null;
  }
}
//选择文件
export const MXChooseFile = (type) => new Promise((resolve, reject) => {
  MXCommon('chooseFile', 9, ['file'], (res) => {
    console.log(`文件选择成功:${res}`)
    resolve(JSON.parse(res))
  }, (result) => {
    console.log('文件选择失败' + result);
    let res = JSON.parse(result)
    reject(res)
  })
})

//选择图片
export const MXChooseImg = (type) => new Promise((resolve, reject) => {
  MXCommon('chooseImage', 9, ['album'], (res) => {
    console.log(`图片选择 成功:${res}`)
    // resolve(res)
    resolve(JSON.parse(res))

  }, (result) => {
    console.log('图片选择失败' + result);
    let res = JSON.parse(result)
    reject(res)
  })
})

/**
 * 拍照、压缩、并添加水印
 * @param {*} content 定位地址
 * @param {*} id 工号
 */
export const MXCamera = (content) => new Promise((resolve, reject) => {
  let date = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
  MXCommon('chooseFile', {
    types: [{
      type: "camera", //类型：camera代表拍照
      maxSize: "1024000", //返回照片文件最大值，由于受压缩算法限制不能保证可返回固定大小，只能保证压缩后获取到小于此参数的值，单位b,1024000b=1M
      watermark: [{
        content: `${localStorage.getItem("name")}\n${date}\n${content}`,
        fontColor: "#ffffff", //水印文字颜色，不设置使用默认值#000000
        fontSize: 12, //水印字体大小，单位pixel，不设置使用默认值30
        borderColor: "#000000", //描边颜色,不设置使用默认值#000000
        row: 3, //水印对应图片九宫格行数，取值范围1-3，不设置使用默认值1
        col: 3, //水印对应图片九宫格列数，取值范围1-3，不设置使用默认值1
        alignMargin: 150, //边距，如果水印在第一列为左边距，如果水印在第三列为右边距
        textAlign: "right", //水印文字对齐方式（当水印文字有/n换行时文字左对齐或右对齐），取值：left或right
        width: 150, //水印宽度
        height: 100, //水印高度
        rotate: 0, //文字斜率，代表度数，取值范围为0-360的整数，不设置使用默认值0
        tile: "false" //水印文字是否平铺，不设置使用默认值false
      }]
    }]
  }, (err) => {
    console.log(`take photo err:${err}`)
    reject(err)
  }, (result) => {
    let res = JSON.parse(result)
    console.log('拍照回显成功'+result);
    resolve(res)
  })
})


/**
 * 获取定位信息并反编码
 */
export const getLocation = () => new Promise((resolve, reject) => {
  Toast.loading({
    message: '定位请求中',
    forbidClick: true
  })
  MXLocation.getLocation(res => {
    console.log(" =定位信息=" + res);
    let location = JSON.parse(res)
    MXLocation.regeocode({
      latitude: location.latitude,
      longitude: location.longitude,
      radius: 100,
      onSuccess: function (res) {
        let regeoCodeRes = JSON.parse(res)
        resolve(regeoCodeRes.address)
      },
      onFail: function (res) {
        Toast.fail(res)
        Toast.clear()
        reject(res)
      }
    });

  }, res => {
    Toast.fail(res)
    Toast.clear()
  }, false)
})

// 判断是否是11位有效手机号码
export const isPoneAvailable = (poneInput) => {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(poneInput)) {
    return false;
  } else {
    return true;
  }
}

export const codeToValue = (list, code) => {
  var result = "";
  if (code == "" || code == undefined || code == null) {
    return result;
  } else {
    result = code
  }
  list.forEach((element) => {
    if (element.itemKey == code) {
      result = element.itemName;
      return result;
    }
  });
  return result;
}

export const codeToValue2 = (list, code) => {
  var result = "--";

  if (code == "请选择" || code == "" || code == undefined || code == null) {
    return "请选择";
  } else {
    result = code;
  }
  if (list == null || list.length == 0) {
    return result;
  }
  list.forEach((element) => {
    if (element.itemKey == code) {
      result = element.itemName;
      return result;
    }
  });
  return result;
}
//获取固定时间 一月 半年 一年
// M 一月 
// HY 半年
// Y 一年
export const getDateFor = (str) => {
  var date = new Date();
  var thisTime = date.Format("yyyy-MM-dd hh:mm:ss");
  var tempResult = {
    startTime: thisTime,
    endTime: thisTime
  }
  switch (str) {
    case "M":
      date.setMonth(date.getMonth() - 1, date.getDate());
      tempResult.startTime = date.Format("yyyy-MM-dd hh:mm:ss");
      break;
    case "HY":
      var dateHY = new Date(date.getTime() - 365 / 2 * 24 * 3600 * 1000);
      tempResult.startTime = dateHY.Format("yyyy-MM-dd hh:mm:ss");
      break;
    case "Y":
      date.setFullYear(date.getFullYear() - 1, date.getMonth(), date.getDate());
      tempResult.startTime = date.Format("yyyy-MM-dd hh:mm:ss");
      break;
  }
  return tempResult;
}

// 格式化金额10,000.00
export const moneyFormat = (nStr) => {
  if (nStr == undefined || nStr == null) {
    return '--'
  }
  if (nStr == '0') {
    return '0'
  }
  var str = (nStr / 1).toFixed(2) + '';
  var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
  var dot = str.substring(str.length, str.indexOf(".")) //取到小数部分搜索
  var ret = intSum + dot;
  return ret;
}

// 判断数组是否为空
export const isHasData = (array) => {
  console.log(array);
  let flag
  if (array == undefined || array == [] || array == null || array == "" || array == "[]") {
    flag = false
  } else {
    flag = true
  }
  return flag
}
//判断是否是图片
export const isAssetTypeAnImage = (ext) => {
  return [
    'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'
  ].
  indexOf(ext.toLowerCase()) !== -1;
}

export const getUrlQuery = (url, name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = url.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  } else {
    return null;
  }
}


/* 
判断对象数组array的是否有对象的属性attr是val值
有此对象则返回该对象的索引值，没有此对象则返回-1
*/
export const findElem = (array, attr, val) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i][attr] == val) {
      return i; //返回当前索引值
    }
  }
  return -1;
};
