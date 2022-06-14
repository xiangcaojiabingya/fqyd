import request from '@/utils/request'
import rsaUtil from '@/assets/js/RSAJSEncrypt.js'
import { Decrypt } from '@/assets/js/AESCryptoJS.js'
import config from '@/config.js';
const rsePrivateKey = `${config[config.env].rsePrivateKey}`
import { getOnlyUuid, getFormatDate, } from '@/utils/index.js'
let Base64 = require('js-base64').Base64
import { Toast } from "vant";
/**
 * POST 方法 与 GET方法  区别
 *
 * post==> data: obj
 * get==>params: obj
 *
 */
// 例如(post)：
export function uploadFile(obj) {
    return request({
        url: '/api/credit/audit/project/flowFile/upload',      // url = base url + request url
        method: 'post',
        data: obj,    //----------------->>>区别
        headers: {
            "Accept": "application/json",
            'Content-Type': "multipart/form-data;",
            'Encode-Rpc-Hsjry-Request': Base64.encode(`ask=962&answer=934&serialNo=${getOnlyUuid()}&idemSerialNo=${getOnlyUuid()}&serviceScene=11&transDateTime=${getFormatDate("yyyy-MM-dd hh:mm:ss")}&tenantId=000&channelNo=06&sign=1`),
            'Encode-Rpc-Hsjry-User-Request': Base64.encode(`authId=${localStorage.getItem('operatorId')}&token=${localStorage.getItem('wdToken')}&organId=${localStorage.getItem('organId')}&organName=${localStorage.getItem('organName')}&operatorId=${localStorage.getItem('operatorId')}&operatorName=${localStorage.getItem('name')}`),
            // 'Encode-Rpc-Hsjry-User-Request': 'YXV0aElkPTAwMEdVUzAwMDAwMDAwMzAmdG9rZW49OTE3RDk5NTZBREEwNEQyRDhBMzBEMjAwOTdGMzc1ODMmb3BlcmF0b3JJZD0wMDBHVVMwMDAwMDAwMDMwJm9wZXJhdG9yTmFtZT3nrqHlqJwmb3JnYW5JZD0xMDAwMDAtMDAwMS0wLTAwMDMmb3JnYW5OYW1lPea9jeWdiuWIhuihjOivuOWfjuaUr+ihjOS8geS4muWboumYnw==',
            'sysId': 'YDBG'
        }
    })
}

export function uploadFile2(obj) {
    return request({
        url: '/credit/fed/flowFile/uploadBatch',      // url = base url + request url
        method: 'post',
        data: obj,    //----------------->>>区别
        headers: {
            "Accept": "application/json",
            'Content-Type': "multipart/form-data;",
            'Encode-Rpc-Hsjry-Request': Base64.encode(`ask=962&answer=934&serialNo=${getOnlyUuid()}&idemSerialNo=${getOnlyUuid()}&serviceScene=11&transDateTime=${getFormatDate("yyyy-MM-dd hh:mm:ss")}&tenantId=000&channelNo=06&sign=1`),
            'Encode-Rpc-Hsjry-User-Request': Base64.encode(`authId=${localStorage.getItem('operatorId')}&token=${localStorage.getItem('wdToken')}&organId=${localStorage.getItem('organId')}&organName=${localStorage.getItem('organName')}&operatorId=${localStorage.getItem('operatorId')}&operatorName=${localStorage.getItem('name')}`),
            // 'Encode-Rpc-Hsjry-User-Request': 'YXV0aElkPTAwMEdVUzAwMDAwMDAwMzAmdG9rZW49OTE3RDk5NTZBREEwNEQyRDhBMzBEMjAwOTdGMzc1ODMmb3BlcmF0b3JJZD0wMDBHVVMwMDAwMDAwMDMwJm9wZXJhdG9yTmFtZT3nrqHlqJwmb3JnYW5JZD0xMDAwMDAtMDAwMS0wLTAwMDMmb3JnYW5OYW1lPea9jeWdiuWIhuihjOivuOWfjuaUr+ihjOS8geS4muWboumYnw==',
            'sysId': 'YDBG'
        }
    })
}

export function axoisPost(url, obj, header) {
    return new Promise((resolve, reject) => {
        request({
            url: url,      // url = base url + request url
            method: 'post',
            data: obj,    //----------------->>>区别
            headers: header
        }).then((res) => {
            var result = res.data.responseData
            var aesKey = rsaUtil.Decrypt(res.data.encodeKey, rsePrivateKey) //解密key
            // console.log("aesKey =" + aesKey);
            result = Decrypt(res.data.responseData, aesKey) // 解密数据
            console.log(" post-success-result = " + url + "=" + JSON.stringify(result));
            if (result.responseType.indexOf('SUCCESS') != -1) {
                resolve(result.data)
            } else if (result.responseType.indexOf('ERR') != -1) {
                //此处后台token失效重新调取登录接口
                Toast(result.errorMessage)
            } else {
                Toast("其他错误信息 " + result.errorMessage)
            }
        }).catch((err) => {
            console.log("post-errresult = " + url + "=" + JSON.stringify(err));
            // if (err.message.indexOf('timeout of') != -1) {
            setTimeout(() => {
                reject(err)
            }, 1000);
            // }
            // reject(err)
        })
    })
}
export function axoisPostNormal(url, obj, header) {
    return new Promise((resolve, reject) => {
        request({
            url: url,      // url = base url + request url
            method: 'post',
            data: obj,    //----------------->>>区别
            headers: header
        }).then(result => {
            // console.log("不加密数据返回：" + JSON.stringify(result));
            resolve(result.data.responseData)
        }).catch((err) => {
            console.log("不加密-post-errresult = " + JSON.stringify(err));
            // reject(err)
        })
    })
}
export function axoisGet(url, obj, header) {
    return new Promise((resolve, reject) => {
        request({
            url: url,      // url = base url + request url
            method: 'get',
            params: obj,
            headers: header
        }).then(res => {
            // console.log("===========" + JSON.stringify(res));
            resolve({
                data: res.data
            })
        }).catch(error => {
            console.log(JSON.stringify(JSON.stringify(error)));
            console.log(JSON.stringify(error));
        })
    })
}
