import {
  ajax,
  getFormatDate,
  getuuid,
  getOnlyUuid,
  ajaxGetToken
} from '@/utils/index.js'
import {
  Toast,
  Dialog
} from "vant";
import {
  Encrypt,
  Decrypt
} from '@/assets/js/AESCryptoJS.js'
import {
  axoisPost,
  axoisGet,
  axoisPostNormal
} from "@/utils/common.js"
import rsaUtil from '@/assets/js/RSAJSEncrypt.js'
import config from '@/config.js';


let Base64 = require('js-base64').Base64
//RSA加密公钥---测试
const rsaPublicKey = `${config[config.env].rsaPublicKey}`
//RSA加密私钥---测试
const rsePrivateKey = `${config[config.env].rsePrivateKey}`

//应用常量
export const baseUrl = `${config[config.env].baseUrl}`
export const baseHeaderImgUrl = `${config[config.env].baseHeaderImgUrl}`
export const baseImgUrl = `${config[config.env].baseImgUrl}`
export const wpsBaseUrl = `${config[config.env].wpsBaseUrl}`

//接口管理平台的常量
const txBrNo = `${config[config.env].txBrNo}`
export const chnlCode = `${config[config.env].chnlCode}`
export const client_secret = `${config[config.env].client_secret}`

//敏行平台应用id
export const app_id = `${config[config.env].app_id}`
//敏行平台管理常量
export const clientId = `${config[config.env].clientId}`
export const bearerToken = `${config[config.env].bearerToken}`

const queryString = function (query) {
  let str = [];
  for (let key in query) {
    str.push(key + '=' + query[key])
  }
  return str.join('&')
}

export const ajaxPost = (url, query, serviceCode, answer, serviceScene, ask) => {
  //将数据进行AES加密
  var requestDatas = Encrypt(JSON.stringify(query), localStorage.getItem('aesKey'))
  // console.log("requestDatas=" + requestDatas);
  //将AES加密key进行RSA加密
  var encodeKeys = rsaUtil.Encrypt(localStorage.getItem('aesKey'), rsaPublicKey)
  // console.log("encodeKeys=" + encodeKeys);
  let data = {
    timeStamp: getFormatDate(),
    requestId: getuuid(),
    txBrNo: txBrNo,
    chnlCode: chnlCode,
    serviceCode: serviceCode,
    svcSubCode: "",
    access_token: localStorage.getItem('token'),
    sign: null,
    encryptAlgo: "AES",
    encodeKey: encodeKeys, //AES的加密key
    requestData: requestDatas, //AES加密后的数据
  }
  // url = query ? `${url}?${queryString(query)}`: url;
  // url = baseUrl + url
  console.log('geturl =>', url);
  // console.log("requestData==" + JSON.stringify(data));
  var headers = {
    'Accept': "application/json",
    // 'Connection': 'keep-alive',
    'Content-Type': 'application/json; charset=utf-8',
    'Encode-Rpc-Hsjry-Request': Base64.encode(`ask=${ask}&answer=${answer}&serialNo=${getOnlyUuid()}&idemSerialNo=${getOnlyUuid()}&serviceScene=${serviceScene}&transDateTime=${getFormatDate("yyyy-MM-dd hh:mm:ss")}&tenantId=000&channelNo=06&sign=1`),
    // 'Encode-Rpc-Hsjry-Request': 'YXNrPTk2MiZhbnN3ZXI9OTEyJnNlcmlhbE5vPUZDNTZEMUZFODU2OTE0NDdEOUM4NkQxMTA4RUYwNjU4JmlkZW1TZXJpYWxObz0yOTVENTI4MDFFNjA5NDRGMUMzODlDNkEyNkY0MDQyQyZzZXJ2aWNlU2NlbmU9MTEmdHJhbnNEYXRlVGltZT0yMDIxLTA1LTIwIDE0OjM1OjQzJnRlbmFudElkPTAwMCZjaGFubmVsTm89MDYmc2lnbj0x',
    'Encode-Rpc-Hsjry-User-Request': Base64.encode(`authId=${localStorage.getItem('operatorId')}&token=${localStorage.getItem('wdToken')}&organId=${localStorage.getItem('organId')}&organName=${localStorage.getItem('organName')}&operatorId=${localStorage.getItem('operatorId')}&operatorName=${localStorage.getItem('operatorName')}`),
    // 'Encode-Rpc-Hsjry-User-Request': 'YXV0aElkPTAwMEdVUzAwMDAwMDAwMzAmdG9rZW49OTE3RDk5NTZBREEwNEQyRDhBMzBEMjAwOTdGMzc1ODMmb3BlcmF0b3JJZD0wMDBHVVMwMDAwMDAwMDMwJm9wZXJhdG9yTmFtZT3nrqHlqJwmb3JnYW5JZD0xMDAwMDAtMDAwMS0wLTAwMDMmb3JnYW5OYW1lPea9jeWdiuWIhuihjOivuOWfjuaUr+ihjOS8geS4muWboumYnw==',
    // 'Host': config[config.env].host,
    'sysId': 'YDBG'
  }
  return axoisPost(url, data, headers)
}


export function login() {

  var data = {
    loginAccount: localStorage.getItem("empNo"),
    uniCode: "mtcredit",
  };
  console.log("api-js-login-data = " + JSON.stringify(data));

  return new Promise((resolve, reject) => {
    ajaxPostPlusOprate(apiUrl.login, data, "11", "962")
      .then((res) => {
        console.log("login = " + JSON.stringify(res));
        if (res) {
          localStorage.setItem("wdToken", res.token);
          localStorage.setItem("organId", res.organId);
          localStorage.setItem("organName", res.organName);
          localStorage.setItem("name", res.name);
          localStorage.setItem("operatorId", res.operatorId);
          resolve(res)
        }
      })
      .catch((err) => {
        Toast("获取token失败")
        reject(err)
      });
  })

}


// 减少参数---查询
export const ajaxPostPlus = (apiCode, query) => {
  return ajaxPost(apiCode.url, query, apiCode.api, apiCode.answer, "11", "962");
}
//减少参数---非查询
export const ajaxPostPlusOprate = (apiCode, query, serviceScene, ask) => {
  return ajaxPost(apiCode.url, query, apiCode.api, apiCode.answer, serviceScene, ask ? ask : '967');
}


export function isjson(obj) {
  var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
}



//单点登录接口调取  不加密，    文件预览不加密
export const ajaxPostJsonNormal = (apiUrls, query) => {
  var url = apiUrls.url;
  let data = {
    timeStamp: getFormatDate(),
    requestId: getuuid(),
    txBrNo: txBrNo,
    chnlCode: chnlCode,
    serviceCode: apiUrls.api,
    svcSubCode: "",
    access_token: localStorage.getItem('token'),
    sign: null,
    encryptAlgo: "",
    encodeKey: "",
    requestData: query,
  }
  // url = baseUrl + url
  console.log('geturl =>', url);
  // console.log("requestData==" + JSON.stringify(data));
  return axoisPostNormal(url, data, {
    'Content-Type': 'application/json; charset=utf-8'
  })
}


export const ajaxGet = (url, query) => {
  // url = query ? `${url}?${queryString(query)}` : url;
  url = baseUrl + url
  console.log('geturl =>', url);
  return new Promise((resolve, reject) => {
    ajaxGetToken(url, query).then(res => {
      resolve(res)
    }).catch(error => {
      console.log("中台token错误返回：" + JSON.stringify(error));
      reject(error)
    })
  })
  // return axoisGet(url, query, {
  //   'Content-type': 'application/x-www-form-urlencoded'
  // })
}
// 文件预览
export const FilePreview = (reqData) => {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: "加载中...",
    loadingType: "spinner",
  });
  let requestData = {
    "resourceUrl": reqData.resourceUrl, //去掉ip和端口的文件url
    "channelNo": "14",
    "chnlCode": chnlCode, //接口管理平台的变量
    "fileType": reqData.fileType, //文件类型
    "resourceType": reqData.resourceType, //文件的种类，例如影像为"YX",合同为"HT"
  }
  console.log(" -文件预览请求报文- " + JSON.stringify(requestData));
  ajaxPostJsonNormal(apiUrl.creditFilePreview, requestData)
    .then((res) => {
      console.log(" -文件预览返回" + JSON.stringify(res));
      Toast.clear();
      if (res.status == 0) {
        let documentID = res.data;
        var readUrl = wpsBaseUrl + encodeURIComponent(documentID) +
          "&cdvinject=false&mxLayout=1";
        console.log("预览文件地址----" + readUrl);
        MXCommon.openUrlPage(readUrl, function () {});
      } else {
        console.log("文件预览出错1" + JSON.stringify(res));
        Toast(res.data)
      }
    })
    .catch((err) => {
      Toast.clear();
      console.log("文件预览出错" + JSON.stringify(err));
    });
}


// Url & Api Code
export const apiUrl = {
  ssoLogin: { //单点登录
    url: "/mx/ssoLoginWithInfos",
    api: "A0544",
    answer: ''
  },
  getToken: { //获取token
    url: "/auth/oauth/token",
    api: 'A0465',
    answer: ''
  },
  getMxId: { //获取敏行账户信息
    url: "/step-service/getAccount",
    api: "A0471",
    answer: ''
  },
  ssoLoginWithInfos: { //单点登录
    url: "/mx/ssoLoginWithInfos",
    api: "A0544",
    answer: ''
  },
  login: { //信贷-登录接口
    url: "/api/credit/audit/projectUserlogin/login",
    api: "A0629",
    answer: '918'
  },
  queryResource: { //资产信息
    url: "/api/credit/user/resourceView/queryResourceByDimensionId",
    api: "A0547",
    answer: '921'
  },
  getClientInformation: { //信贷-个人客户基本信息
    url: "/api/credit/user/userView/queryUserCustomerInfoByUserId",
    api: "A0546",
    answer: '921'
  },
  customerList: { //个人客户列表
    url: "/api/credit/user/customer/queryPage",
    api: 'A0545',
    answer: '968'
  },
  queryUserManageInfo: { //个人客户-经营信息Extend.vue
    url: "/api/credit/user/userView/queryUserManageInfo",
    api: 'A0595',
    answer: '921'
  },
  queryCreditQueryRecordPage: { //个人客户-征信信息zhengxin.vue
    url: "/api/credit/user/creditQueryRecord/queryCreditQueryRecordPage",
    api: 'A0596',
    answer: '968'
  },
  queryCustomerRelation: { //个人客户-关联信息
    url: "/api/credit/user/customerRelationView/queryCustomerRelation",
    api: 'A0588',
    answer: '921'
  },
  QueryDictKeys: { //查询数据字典
    url: "/api/credit/deploy/dict/batchQueryDictItem",
    api: 'A0598',
    answer: '912'
  },
  LoanList: { //借据列表
    url: "/api/credit/audit/loanInvoiceQuery/queryByPage",
    api: 'A0610',
    answer: '968'
  },
  LoanMonitor: { //借据监控
    url: "/api/credit/audit/loanInvoiceQuery/queryLoanInvoiceStatistic",
    api: 'A0611',
    answer: '923'
  },
  queryRepayPlanByLoanInvoiceId: { //还款计划
    url: "/api/credit/audit/repayPlanQuery/queryRepayPlanByLoanInvoiceId",
    api: 'A0614',
    answer: '923'
  },
  queryCreditLoanInvoiceDetail: { //借据信息
    url: "/api/credit/audit/creditLoanInvoiceQuery/queryCreditLoanInvoiceDetail",
    api: 'A0615',
    answer: '952'
  },
  zhCreditTune: { //支用审批
    url: "/api/credit/audit/applyOrderQuery/queryApprovalResult",
    api: 'A0601',
    answer: '968'
  },
  CreditTune: { //授信审批 / 业务分配 / 授信結束 
    url: "/api/credit/audit/applyOrderQuery/queryTodoList",
    api: 'A0618',
    answer: '968'
  },
  queryFlowTaskApprove: { //审批记录
    url: "/api/credit/audit/commonApproval/queryFlowTaskApprove",
    api: 'A0603',
    answer: '968'
  },
  queryPageWithoutDataPermitZy: { //历史支用
    url: "/api/credit/audit/creditApplyLoan/queryPageWithoutDataPermit",
    api: 'A0607',
    answer: '968'
  },
  queryPageWithoutDataPermitSx: { //历史授信
    url: "/api/credit/audit/creditApply/queryPageWithoutDataPermit",
    api: 'A0606',
    answer: '968'
  },
  queryRiskManageInfo: { //借据监控-五级分类
    url: "/api/credit/audit/riskManageQuery/queryRiskManageInfo",
    api: 'A0612',
    answer: '923'
  },
  queryCapitalListByLoanInvoiceId: { //借据监控-借据动态
    url: "/api/credit/audit/creditLoanInvoiceLogQuery/queryCapitalListByLoanInvoiceId",
    api: 'A0613',
    answer: '952'
  },

  CreditApplicationDetails: { //授信申请  申请详情 个人客户信息 
    url: "/api/credit/audit/creditApplyQuery/queryCreditApplyDetail",
    api: 'A0604',
    answer: '952'
  },
  upload: { //附件上传
    url: "/api/credit/audit/project/flowFile/upload",
    api: 'A0617',
    answer: '934'
  },
  queryUser: { //信贷-用户信息查询
    url: "/api/credit/guard/user/queryUser",
    api: 'A0597',
    answer: '921'
  },
  queryRiskDecisionResult: { //信贷-审批详情风险提示查询
    url: "/api/credit/audit/riskDecisionQuery/queryRiskDecisionResult",
    api: "A0605",
    answer: '952'
  },
  creditApplyResult: { //授信查询列表
    url: "/api/credit/zqed/creditApply/queryPage",
    api: 'A0658',
    answer: '952'
  },
  queryPage: { //信贷-税云贷支用申请列表查询
    url: "/api/credit/audit/creditApplyLoan/queryPage",
    api: "A0602",
    answer: '968'
  },
  queryOrderContent: { //信贷-审批详情尽调信息查询、影像资料
    url: "/api/credit/audit/flowOrderContentQuery/queryOrderContent",
    api: "A0616",
    answer: '934'
  },
  queryUserOrganInfoByUserId: { //信贷-企业客户基本信息查询
    url: "/api/credit/user/managementDeskView/queryUserOrganInfoByUserId",
    api: "A0599",
    answer: '921'
  },
  ApplicationDetails: { // 支用申请
    url: "/api/credit/audit/creditLoanApplyQuery/queryCreditLoanApplyDetail",
    api: "A0635",
    answer: '952'
  },

  creditFilePreview: { //文件预览
    url: "/api/creditFilePreview",
    api: 'A0631',
    answer: ''
  },
  submit: { //信贷-审批提交
    url: "/api/credit/audit/flowapplyorder/submit",
    api: 'A0619',
    answer: '934'
  },
  queryNextNodeUser: { //信贷-查询下一节点审批人
    url: "/api/credit/audit/project/flowProjectApplyOrder/queryNextNodeUser",
    api: 'A0620',
    answer: '934'
  },
  save: { //保存尽调信息
    url: "/api/credit/audit/flowapplyorder/save",
    api: 'A0628',
    answer: '934'
  },
  queryAssetRepay: { //还款记录 
    url: "/api/credit/zqed/serialQuery/queryAssetRepaySerialByLoanInvoiceId",
    api: 'A0686',
    answer: '923'
  },
  queryUserRepay: { //退款记录 
    url: "/api/credit/zqed/tradeRecordQuery/queryUserRepayRecordByLoanIvcoiceId",
    api: 'A0687',
    answer: '968'
  },
  queryAjustInfoListPage: { //利率调整记录 
    url: "/api/credit/zqed/postLoanAdjustQuery/queryAjustInfoListPage",
    api: 'A0688',
    answer: '952'
  },
  selectPage: { //息费调整记录 
    url: "/api/credit/zqed/creditPostLoanAdjustRecordQuery/selectPage",
    api: 'A0689',
    answer: '952'
  },
  queryRiskManagement: { //五级认定记录 
    url: "/api/credit/zqed/riskManagementAdjustSerialQuery/queryRiskManagementAdjustSerialByLoaninvoiceId",
    api: 'A0690',
    answer: '923'
  },
  queryCreditEstateInfoDetail: { //房产信息详情查询
    url: '/credit/fed/creditEstateInfoQuery/queryCreditEstateInfoDetail',
    api: 'A1181',
    answer: '968'
  },
  queryJiNanEstateInfoByLoanApplyId: { //房屋状态查询（济南不动产）
    url: '/credit/fed/creditEstateInfoQuery/queryJiNanEstateInfoByLoanApplyId',
    api: 'A1180',
    answer: '968'
  },
  updateEstateStatusByEstateId: { //更新房屋状态接口（非济南地区）
    url: '/credit/fed/creditEstateInfoQuery/updateEstateStatusByEstateId',
    api: 'A1185',
    answer: '968'
  },
  queryEstateInfoByCreditApplyId: { //通过授信id查询客户抵押房产信息
    url: '/credit/fed/creditEstateInfoQuery/queryEstateInfoByCreditApplyId',
    api: 'A1183',
    answer: '968'
  },

  collateralBuildFlow: { //推送
    url: '/credit/fed/creditRiskMitigation/collateralBuildFlow',
    api: 'A1191',
    answer: '952'
  },
  modifyCreditEstateAndContactInfo: { //更新房产信息与关联人信息
    url: '/credit/fed/creditEstateInfoQuery/modifyCreditEstateAndContactInfo',
    api: 'A1190',
    answer: '968'
  },
  saveUpdate: { //保存相关信息房产
    url: '/credit/fed/flowapplyorder/save',
    api: 'A1189',
    answer: '934'
  },
  createContract: { //生成合同接口
    url: '/credit/fed/creditContract/createContract',
    api: 'A1188',
    answer: '968'
  },
  queryContractFileInfo1: { //合同信息查询(没有使用)
    url: '/credit/fed/contract/queryContractFileInfo',
    api: 'A1187',
    answer: '952'
  },
  productInformation: { //押品信息建立
    url: '/credit/fed/creditRiskMitigation/collateralBuildFlow',
    api: 'A1186',
    answer: '968'
  },
  queryEstateInfoByLoanApplyId: { //通过支用申请id查询房产信息
    url: '/credit/fed/creditEstateInfoQuery/queryEstateInfoByLoanApplyId',
    api: 'A1184',
    answer: '968'
  },
  estateSelectPage: { //房产信息分页查询
    url: '/credit/fed/creditEstateInfoQuery/selectPage',
    api: 'A1182',
    answer: '968'
  },
  productInformationSelectPage: { //抵质押品分页查询
    url: '/credit/fed/creditCollateralManageInfoQuery/selectPage',
    api: 'A1179',
    answer: '968'
  },
  queryApprovalResultWithoutPermission: { //进件申请信息查询
    url: '/credit/fed/applyOrderQuery/queryApprovalResultWithoutPermission',
    api: 'A1192',
    answer: '968'
  },
  queryNextTreeNodeUser: { //查询房权贷团队包含成员
    url: '/credit/fed/flowProjectApplyOrder/queryNextTreeNodeUser',
    api: 'A1196',
    answer: '934'
  },
  queryUserInFoByEmpNo: { //查询房权贷推荐分配的客户经理
    url: '/credit/fed/guardUser/queryUserInFoByEmpNo',
    api: 'A1195',
    answer: '952'
  },
  uploadBatch: { //上传合同接口（上传影像）
    url: '/credit/fed/flowFile/uploadBatch',
    api: 'A1194',
    answer: '934'
  },
  queryCreditApplyInfoContent: { //授信申请  申请详情 个人客户信息 
    url: "/api/credit/zqed/queryCreditApply/queryCreditApplyInfoContent",
    api: 'A0656',
    answer: '952'
  },
  warrantQuery: { // 押品入库判断
    url: "/credit/fed/creditRiskMitigation/warrantQuery",
    api: 'A1219',
    answer: '952'
  },
  queryContractFileInfo: { //查询合同列表
    url: "/credit/fed/contract/queryContractFileInfo",
    api: 'A1221',
    answer: '952'
  },
  contractAndGuarantyEstablish: { //合同复核前验证
    url: "/credit/fed/creditRiskMitigation/contractAndGuarantyEstablish",
    api: 'A1224',
    answer: '952'
  },
  valueinfoQuery: { //查询风险缓释价值
    url: "/credit/fed/creditRiskMitigation/valueinfoQuery",
    api: 'A1297',
    answer: '952'
  },
}
