import axios from 'axios'
var Base64 = require("js-base64").Base64;
import {
  Toast
} from "vant";
import rsaUtil from '@/assets/js/RSAJSEncrypt.js'

import config from '@/config.js';

import {
  login,
  isjson
} from '@/api.js'
import {
  Decrypt
} from '@/assets/js/AESCryptoJS.js'
import {
  ajaxGetToken
} from "@/utils/index.js"

//RSA加密私钥---测试
const rsePrivateKey = `${config[config.env].rsePrivateKey}`

const baseUrls = `${config[config.env].baseUrl}`
const chnlCode = `${config[config.env].chnlCode}`
const client_secret = `${config[config.env].client_secret}`

const instance = axios.create({
  baseURL: baseUrls,
  timeout: 40000,

});


instance.interceptors.response.use(
  async function (response) {
      // console.log("数据返回：" + JSON.stringify(response));
      var result = response.data.responseData
      if (isjson(result) && 'sysHead' in result) { //无加密
        //此处判断中台token失效后重新请求
        if (result.sysHead.retCode === 'G0403') {
          //token失效
          let res = await ajaxGetToken(baseUrls + "/auth/oauth/token", {
            grant_type: "client_credentials",
            client_id: chnlCode,
            client_secret: client_secret,
          })
          console.log("获取到中台的token:" + JSON.stringify(res));
          localStorage.setItem("token", res.data.access_token);
          console.log("中台token失效" + JSON.stringify(res));
          let repostConfig = JSON.parse(response.config.data)
          repostConfig.access_token = localStorage.getItem('token')
          response.config.data = JSON.stringify(repostConfig)
          return instance(response.config)
        } else if (result.sysHead.retCode === 'G0000') {

        } else {
          Toast('网络请求发生错误')
        }
      } else { //加密
        var result = response.data.responseData
        if (result == undefined || isResult(result)) {
          return response

        } else {
          var aesKey = rsaUtil.Decrypt(response.data.encodeKey, rsePrivateKey)
          // console.log("aesKey =" + aesKey);
          result = Decrypt(response.data.responseData, aesKey)
          // console.log("result = " + JSON.stringify(result));
          if ("sysHead" in result) {
            if (result.sysHead.retCode === 'G0403') {
              //token失效
              let res = await ajaxGetToken(baseUrls + "/auth/oauth/token", {
                grant_type: "client_credentials",
                client_id: chnlCode,
                client_secret: client_secret,
              })
              console.log("获取到中台的token:" + JSON.stringify(res));
              localStorage.setItem("token", res.data.access_token);
              console.log("中台token失效" + JSON.stringify(res));
              let repostConfig = JSON.parse(response.config.data)
              repostConfig.access_token = localStorage.getItem('token')
              response.config.data = JSON.stringify(repostConfig)
              // Toast.clear()
              return instance(response.config)
            } else if (result.sysHead.retCode === 'G0000') {

            } else {
              Toast('网络请求发生错误')
            }
          } else {
            return response
          }
        }
      }
    },
    async function (error) {
      console.log('axois---error=' + JSON.stringify(error))
      console.log('axois---error--response=' + JSON.stringify(error.response)) // for debug

      if (error.response == undefined || error.response == null) {
        Toast("网络错误，请检查网络设置")
      } else {
        var errresult = error.response.data
        if (errresult == undefined || errresult == null) {
          Toast("网络请求发生错误")

        } else {
          if (isjson(errresult)) {
            if ("responseType" in errresult) {
              //文件上传不走加密，所以失效时没有加密处理
              if (errresult.responseType == 'FLOW_ERR' && errresult.errorCode == '000021' && error.response.config.url != "/api/credit/audit/projectUserlogin/login") { // 防止登陆就失效导致的重复登陆
                const result = await login()
                //等待登录以后保存更新token
                localStorage.setItem("wdToken", result.token);
                localStorage.setItem("organId", result.organId);
                localStorage.setItem("organName", result.organName);
                localStorage.setItem("name", result.name);
                localStorage.setItem("operatorId", result.operatorId);
                error.response.config.headers['Encode-Rpc-Hsjry-User-Request'] = Base64.encode(`authId=${localStorage.getItem('operatorId')}&token=${localStorage.getItem('wdToken')}&organId=${localStorage.getItem('organId')}&organName=${localStorage.getItem('organName')}&operatorId=${localStorage.getItem('operatorId')}&operatorName=${localStorage.getItem('name')}`)
                return instance(error.response.config)
              } else if ("errorMessage" in errresult) {
                Toast(errresult.errorMessage)
              } else {
                Toast("网络错误，请检查网络设置")
              }
            } else {
              //此处是加密接口失效时返回
              var aesKey = rsaUtil.Decrypt(error.response.data.encodeKey, rsePrivateKey)
              console.log("解密后-err - aesKey = " + aesKey);
              errresult = Decrypt(error.response.data.responseData, aesKey)
              console.log("解密后-error-result = " + JSON.stringify(errresult));
              if (isjson(errresult)) {
                if (errresult.responseType == 'FLOW_ERR' && errresult.errorCode == '000021' && error.response.config.url != "/api/credit/audit/projectUserlogin/login") {
                  const result = await login()
                  //等待登录以后保存更新token
                  localStorage.setItem("wdToken", result.token);
                  localStorage.setItem("organId", result.organId);
                  localStorage.setItem("organName", result.organName);
                  localStorage.setItem("name", result.name);
                  localStorage.setItem("operatorId", result.operatorId);
                  error.response.config.headers['Encode-Rpc-Hsjry-User-Request'] = Base64.encode(`authId=${localStorage.getItem('operatorId')}&token=${localStorage.getItem('wdToken')}&organId=${localStorage.getItem('organId')}&organName=${localStorage.getItem('organName')}&operatorId=${localStorage.getItem('operatorId')}&operatorName=${localStorage.getItem('name')}`)
                  return instance(error.response.config)
                } else if ("errorMessage" in errresult) {
                  Toast(errresult.errorMessage)
                } else {
                  Toast("网络错误，请检查网络设置")
                }
              } else {
                Toast("网络错误，请检查网络设置")
              }
            }
          } else {
            Toast("网络请求发生错误")
          }
        }
      }

      return Promise.reject(error)
    }
)


export default instance

//有用，勿删
function isResult(data) {
  let isTrue = false
  if (isjson(data)) {
    if ("sysHead" in data) {
      isTrue = false
    } else {
      isTrue = true
    }
  }

  return isTrue
}
