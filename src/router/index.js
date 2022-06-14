import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Toast
} from "vant";

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {


  return originalPush.call(this, location).catch(err => err)

}

var router = new VueRouter({

  routes: [{ //默认
    path: '/',
    redirect: 'index'
  },
  { //首页
    path: '/index',
    name: 'index',
    component: () => import('@/views/Index'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  { //详情之企业客户信息ycm
    path: '/EntCustomers',
    name: 'EntCustomers',
    component: () => import('@/views/details/EntCustomers.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  { //详情之企业客户信息ycm
    path: '/LoanCustomer',
    name: 'LoanCustomer',
    component: () => import('@/views/details/LoanCustomer.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  { // 详情之影像资料展示ycm
    path: '/ImageData',
    name: 'ImageData',
    component: () => import('@/views/details/ImageData.vue')
  },
  // 关联人信息详情
  {
    path: '/relationMessageShow',
    name: 'RelationMessageShow',
    component: () => import('@/views/details/RelationMessageShow'),
  },

  {
    //历史支用授信列表
    path: '/HistorySxList',
    name: 'HistorySxList',
    component: () => import('@/views/details/HistorySxList'),
  },
  { //房产信息可以编辑
    path: '/RealEstate',
    name: 'RealEstate',
    component: () => import('@/views/details/RealEstate.vue'),

  },
  { //房产信息不可以编辑
    path: '/RealEstateSpan',
    name: 'RealEstateSpan',
    component: () => import('@/views/details/RealEstateSpan.vue'),

  },
  {
    // 授信未办申请详情
    path: '/Application',
    name: 'Application',
    component: () => import('@/views/details/Application'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    // 支用未办申请详情
    path: '/Application2',
    name: 'Application2',
    component: () => import('@/views/details/Application2'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    //尽调 - 风险提示
    path: '/RiskWarning',
    name: 'RiskWarning',
    component: () => import('@/views/details/RiskWarning'),
  },
  {
    // 客户信息列表
    path: '/ClientsList',
    name: 'ClientsList',
    component: () => import('@/views/Clients/ClientsList'),
  },
  { //客户信息-》社保征信
    path: '/Memorabilia',
    name: 'Memorabilia',
    component: () => import('@/views/Clients/Memorabilia')
  },
  {
    //查询详情-授信、支用详情
    path: '/QueryDetail',
    name: 'QueryDetail',
    component: () => import('@/views/details/QueryDetail'),
  },
  {
    // 用于 授信 & 支用 查询
    path: '/doubleSearch',
    name: 'doubleSearch',
    component: () => import('@/views/Query/doubleSearch'),
    // meta: {
    //   keepAlive: true // 需要被缓存
    // }
  },

  { // 用于 借据 查询ycm
    path: '/QueryIOUList',
    name: 'QueryIOUList',
    component: () => import('@/views/Query/QueryIOUList'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  { // 用于 客户 查询ycm
    path: '/QueryClientList',
    name: 'QueryClientList',
    component: () => import('@/views/Query/QueryClientList'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  { // 借据详情主页ycm
    path: '/LoanDetail',
    name: 'LoanDetail',
    component: () => import('@/views/LoanDetails/index')
  },
  { // 借据详情-》借据监控ycm
    path: '/LoanMonitor',
    name: 'LoanMonitor',
    component: () => import('@/views/LoanDetails/common/LoanMonitor')
  },
  { // 借据详情-》还款计划ycm
    path: '/LoanPlay',
    name: 'LoanPlay',
    component: () => import('@/views/LoanDetails/common/LoanPlay')
  },
  { // 借据详情-》借据信息ycm
    path: '/LoanInfo',
    name: 'LoanInfo',
    component: () => import('@/views/LoanDetails/common/LoanInfo')
  },
  { // 借据详情-》退货更多记录
    path: '/LoanReturn',
    name: 'LoanReturn',
    component: () => import('@/views/LoanDetails/common/LoanReturn')
  },

  { //尽调上传影像资料ycm
    path: '/JinDiaoImageUp',
    name: 'JinDiaoImageUp',
    component: () => import('@/views/details/JinDiaoImageUp')
  },
  {
    // 用于 授信审批 & 支用审批
    path: '/shenpi',
    name: 'shenpi',
    component: () => import('@/views/shenpi/shenpi'),
  },
  { //审批-同意提交的简单的页面，用于支用审批，尽调支用 ycm
    path: '/ApprovalSubmitEasy',
    name: 'ApprovalSubmitEasy',
    component: () => import('@/views/Result/ApprovalSubmitEasy')
  },
  { //审批-同意提交的复杂的页面，用于支授信审批，尽调授信 ycm
    path: '/ApprovalSubmitComplex',
    name: 'ApprovalSubmitComplex',
    component: () => import('@/views/Result/ApprovalSubmitComplex')
  },
  {
    // 尽调-审批结果-同意-支用审批/支用调查
    path: '/ResultsOf',
    name: 'ResultsOf',
    component: () => import('@/views/Result/ResultsOf'),
  },
  {
    // 尽调-审批结果-拒绝 - TuneRefuse
    path: '/TuneRefuse',
    name: 'TuneRefuse',
    component: () => import('@/views/Result/TuneRefuse'),
  },
  {
    // 审批-审批结果-驳回 - shenpiRefuse
    path: '/shenpiRefuse',
    name: 'shenpiRefuse',
    component: () => import('@/views/Result/shenpiRefuse'),
  }, {
    // 审批结果 - 拒绝 - ApproveResultReject
    path: '/ApproveResultReject',
    name: 'ApproveResultReject',
    component: () => import('@/views/Result/ApproveResultReject'),
  },

  // 个人客户信息
  {
    path: '/singleCustom',
    name: 'SingleCustom',
    component: () => import('@/views/details/SingleCustom'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  // 关联人信息
  {
    path: '/relationMessage',
    name: 'RelationMessage',
    component: () => import('@/views/details/RelationMessage'),
  },
  {
    // 业务分配与取消
    path: '/allotOrCancel',
    name: 'allotOrCancel',
    component: () => import('@/views/allotOrCancel'),
  },
  {
    // 业务分配详情
    path: '/allotDetail',
    name: 'allotDetail',
    component: () => import('@/views/allotOrCancel/allot/allotDetail'),
  },
  {
    // 分配客户经理
    path: '/allotPeople',
    name: 'allotPeople',
    component: () => import('@/views/allotOrCancel/allot/allotPeople'),
  },
  {
    // 客户基本信息
    path: '/khInformation',
    name: 'khInformation',
    component: () => import('@/views/Clients/khInformation'),
  },
  {
    // 客户资产信息
    path: '/Contact',
    name: 'Contact',
    component: () => import('@/views/Clients/Contact'),
  },
  {
    // 客户账户信息
    path: '/Run',
    name: 'Run',
    component: () => import('@/views/Clients/Run'),
  },
  {
    // 客户经营信息
    path: '/Extend',
    name: 'Extend',
    component: () => import('@/views/Clients/Extend'),
  },
  {
    // 客户征信信息
    path: '/zhengxin',
    name: 'zhengxin',
    component: () => import('@/views/Clients/zhengxin'),
  },
  {
    //客户-公积金信息
    path: '/CorrelationInfo',
    name: 'CorrelationInfo',
    component: () => import('@/views/Clients/CorrelationInfo')
  }, {
    // 客户-关联信息 - FinancialInformation
    path: '/FinancialInformation',
    name: 'FinancialInformation',
    component: () => import('@/views/Clients/FinancialInformation'),
  }, {
    // 客户-历史信贷 - AccountInformation
    path: '/AccountInformation',
    name: 'AccountInformation',
    component: () => import('@/views/Clients/AccountInformation'),
  }, {
    // 客户-司法诉讼信息 - CreditInformation
    path: '/CreditInformation',
    name: 'CreditInformation',
    component: () => import('@/views/Clients/CreditInformation'),
  },
  { //客户-其他征信
    path: '/LegalRepresentative',
    name: 'LegalRepresentative',
    component: () => import('@/views/Clients/LegalRepresentative')
  },
  { //上传合同
    path: '/DataUpload',
    name: 'DataUpload',
    component: () => import('@/views/details/DataUpload'),
    meta: {
      keepAlive: true // 需要被缓存(跳转影像资料展示返回时需要缓存)
    }
  },
  { //上传合同-分类展示版本（20220420版本）
    path: '/DataUploadNew',
    name: 'DataUploadNew',
    component: () => import('@/views/details/DataUploadNew'),
    meta: {
      keepAlive: true // 需要被缓存(跳转影像资料展示返回时需要缓存)
    }
  },
  {//上传影像资料(可上传文件20220420版本)
    path: '/AttachmentUpload',
    name: 'AttachmentUpload',
    component: () => import('@/views/details/AttachmentUpload'),
    meta: {
      keepAlive: true // 需要被缓存(跳转影像资料展示返回时需要缓存)
    }
  },
  {
    // 第三方信息列表
    path: '/ThiredPartyList',
    name: 'ThiredPartyList',
    component: () => import('@/views/ThirdParty/ThirdPartyList'),
  },
  {
    // 三方-行内证信信息
    path: '/BankInternalCredit',
    name: 'BankInternalCredit',
    component: () => import('@/views/ThirdParty/BankInternalCredit'),
  },
  {
    path: '/CCredit',
    name: 'CCredit',
    component: () => import('@/views/ThirdParty/CCredit'),
  },
  {
    path: '/PCredit',
    name: 'PCredit',
    component: () => import('@/views/ThirdParty/PCredit'),
  }, {
    //年报-企业年报基本信息
    path: '/YearReportBasic',
    name: 'YearReportBasic',
    component: () => import('@/views/ThirdParty/ty/YearReportBasic'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  { //三方信息-工商信息列表
    path: '/Business',
    name: 'Business',
    component: () => import('@/views/ThirdParty/Business'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },

  { //三方-工商-上市公司高管信息ycm
    path: '/ListedManager',
    name: 'ListedManager',
    component: () => import('@/views/ThirdParty/BusinessInfo/ListedManager'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  { //三方-工商-上市公司十大股东ycm
    path: '/ListedShareholder',
    name: 'ListedShareholder',
    component: () => import('@/views/ThirdParty/BusinessInfo/ListedShareholder')
  },
  { //三方-工商-主要管理人员ycm
    path: '/MainPerson',
    name: 'MainPerson',
    component: () => import('@/views/ThirdParty/BusinessInfo/MainPerson')
  },
  { //三方-工商-失信被执行人信息ycm
    path: '/PunishBreak',
    name: 'PunishBreak',
    component: () => import('@/views/ThirdParty/BusinessInfo/PunishBreak')
  },
  { //三方-工商-股东及出资信息ycm
    path: '/Shareholder',
    name: 'Shareholder',
    component: () => import('@/views/ThirdParty/BusinessInfo/Shareholder')
  },
  { //三方-工商-年报-修改信息ycm
    path: '/YearReportAlter',
    name: 'YearReportAlter',
    component: () => import('@/views/ThirdParty/BusinessInfo/YearReportAlter')
  },
  { //三方-工商-年报-股权变更信息ycm
    path: '/YearReportAlterStock',
    name: 'YearReportAlterStock',
    component: () => import('@/views/ThirdParty/BusinessInfo/YearReportAlterStock')
  }, {
    //年报-企业对外提供保证担保信息
    path: '/YearReportForguarante',
    name: 'YearReportForguarante',
    component: () => import('@/views/ThirdParty/ty/YearReportForguarante'),
    meta: {
      keepAlive: false // 需要被缓存
    },
  },
  {
    //年报-企业对外投资信息
    path: '/YearReportForinv',
    name: 'YearReportForinv',
    component: () => import('@/views/ThirdParty/ty/YearReportForinv'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    //年报-企业实缴出资信息
    path: '/YearReportPaidupcapital',
    name: 'YearReportPaidupcapital',
    component: () => import('@/views/ThirdParty/ty/YearReportPaidupcapital'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    //年报-社会保障信息
    path: '/YearReportSocsec',
    name: 'YearReportSocsec',
    component: () => import('@/views/ThirdParty/ty/YearReportSocsec'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  }, {
    //年报-认缴出资信息
    path: '/YearReportSubcapital',
    name: 'YearReportSubcapital',
    component: () => import('@/views/ThirdParty/ty/YearReportSubcapital'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  }, {
    //年报-网站信息
    path: '/YearReportWebsiteInfo',
    name: 'YearReportWebsiteInfo',
    component: () => import('@/views/ThirdParty/ty/YearReportWebsiteInfo'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  }, {
    //汇法信息列表
    path: '/HuiFaList',
    name: 'HuiFaList',
    component: () => import('@/views/ThirdParty/ty/HuiFaList'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  }, {
    //汇法信息
    path: '/HuiFa',
    name: 'HuiFa',
    component: () => import('@/views/ThirdParty/ty/HuiFa'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  }, {
    //采购信息
    path: '/PurchaseInfo',
    name: 'PurchaseInfo',
    component: () => import('@/views/ThirdParty/ty/PurchaseInfo'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    //历史支用授信列表
    path: '/HistorySxList',
    name: 'HistorySxList',
    component: () => import('@/views/ThirdParty/ty/HistorySxList'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    // 三方-工商/汇法-基本信息
    path: '/BusInformation',
    name: 'BusInformation',
    component: () => import('@/views/ThirdParty/BusinessInfo/BusInformation'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    // 三方-工商-企业历史变更信息
    path: '/ChangeHistory',
    name: 'ChangeHistory',
    component: () => import('@/views/ThirdParty/BusinessInfo/ChangeHistory'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    // 三方-工商-严重违法
    path: '/Illegality',
    name: 'Illegality',
    component: () => import('@/views/ThirdParty/BusinessInfo/Illegality'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    // 三方-工商-行政处罚列表
    path: '/Adp',
    name: 'Adp',
    component: () => import('@/views/ThirdParty/BusinessInfo/Adp'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    // 三方-工商-企业对外投资列表
    path: '/Oioe',
    name: 'Oioe',
    component: () => import('@/views/ThirdParty/BusinessInfo/Oioe'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    // 三方-工商-企业异常列表
    path: '/Qyyc',
    name: 'Qyyc',
    component: () => import('@/views/ThirdParty/BusinessInfo/Qyyc'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  }, {
    //三方 - 分支机构
    path: '/BranchOffices',
    name: 'BranchOffices',
    component: () => import('@/views/ThirdParty/BranchOffices'),
  },
  {
    //三方 - 清算信息
    path: '/ClearingInformation',
    name: 'ClearingInformation',
    component: () => import('@/views/ThirdParty/ClearingInformation'),
  },
  {
    //三方 - 抽查检查
    path: '/SpotTest',
    name: 'SpotTest',
    component: () => import('@/views/ThirdParty/SpotTest'),
  },
  {
    //三方 - 法定代表人其他公司任职
    path: '/LegalPersonsOtherOffices',
    name: 'LegalPersonsOtherOffices',
    component: () => import('@/views/ThirdParty/LegalPersonsOtherOffices'),
  },
  {
    //三方 - 企业法定代表人对外投资信息
    path: '/LegalPersonsInvest',
    name: 'LegalPersonsInvest',
    component: () => import('@/views/ThirdParty/LegalPersonsInvest'),
  },
  {
    //三方 - 终本案件信息
    path: '/EndCaseInfo',
    name: 'EndCaseInfo',
    component: () => import('@/views/ThirdParty/EndCaseInfo'),
  }, {
    // 三方-行内证信信息
    path: '/BankInternalCredit',
    name: 'BankInternalCredit',
    component: () => import('@/views/ThirdParty/BankInternalCredit'),
  }, {
    //三方-税务列表首页
    path: '/TaxList',
    name: 'TaxList',
    component: () => import('@/views/ThirdParty/Taxation/TaxList')
  },
  { //三方-税务-企业一个月内其他银行相关查询
    path: '/OtherInfo',
    name: 'OtherInfo',
    component: () => import('@/views/ThirdParty/Taxation/OtherInfo')
  },
  { //三方-税务-变更信息
    path: '/ChangeInfo',
    name: 'ChangeInfo',
    component: () => import('@/views/ThirdParty/Taxation/ChangeInfo')
  },
  { //三方-税务-财务报表汇总信息（资产负债表、利润、利润表）年报前两年/CWBB
    path: '/FinancialInfo',
    name: 'FinancialInfo',
    component: () => import('@/views/ThirdParty/Taxation/FinancialInfo')
  },
  { //三方-税务-欠税信息
    path: '/OweTaxInfo',
    name: 'OweTaxInfo',
    component: () => import('@/views/ThirdParty/Taxation/OweTaxInfo')
  },
  { //三方-税务-申报信息
    path: '/ReportInfo',
    name: 'ReportInfo',
    component: () => import('@/views/ThirdParty/Taxation/ReportInfo')
  },
  { //三方-税务-违法违章信息
    path: '/illegal',
    name: 'illegal',
    component: () => import('@/views/ThirdParty/Taxation/illegal')
  },
  { //三方-税务-征收信息
    path: '/CollectionInfo',
    name: 'CollectionInfo',
    component: () => import('@/views/ThirdParty/Taxation/CollectionInfo')
  },
  { //三方-税务-xx-详情
    path: '/TaxDetail',
    name: 'TaxDetail',
    component: () => import('@/views/ThirdParty/Taxation/TaxDetail')
  },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }


    // 后退不刷新（详情返回查询列表），前进刷新（首页进入查询列表）
    // 从第二页返回首页时savedPosition为undefined
    // if (savedPosition || typeof savedPosition === 'undefined') {
    //   // 只处理设置了路由元信息的组件
    //   from.meta.keepAlive = typeof from.meta.keepAlive === 'undefined' ? undefined : false
    //   to.meta.keepAlive = typeof to.meta.keepAlive === 'undefined' ? undefined : true
    //   if (savedPosition) {
    //     return savedPosition
    //   }
    // } else {
    //   from.meta.keepAlive = typeof from.meta.keepAlive === 'undefined' ? undefined : true
    //   to.meta.keepAlive = typeof to.meta.keepAlive === 'undefined' ? undefined : false
    //   return {
    //     x: 0,
    //     y: 0
    //   }
    // }
  }
})


router.beforeEach((to, from, next) => {
  console.log("from : " + from.path + ".vue  to : " + to.path + ".vue");
  // console.log("to.fullPath=" + to.fullPath);
  // // 让页面回到顶部
  // document.documentElement.scrollTop = 0
  // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
  Toast.clear()
  next()
})

export default router
