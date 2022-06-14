// 汇法信息列表数据处理
export const huiFaConstData = [
  "执行公开信息",
  "失信老赖名单",
  "限制高消费名单",
  "限制出入境名单",
  "民商事裁判文书",
  "民商事审判流程",
  "罪犯及嫌疑人名单",
  "行政违法记录",
  "欠税名单",
  "纳税非正常户",
  "催收信息",
]
export const gongShangConstData = ["企业基本信息", '企业历史变更信息', '严重违法', '行政处罚基本信息', '企业对外投资信息', '企业异常名录', '分支机构',
  '终本案件信息', '企业法定代表人对外投资信息', '法定代表人其他公司任职', '抽查检查', '清算信息', '上市公司基本信息', '上市公司高管信息', '上市公司十大股东',
  '主要管理人员', '失信被执行人信息', '股东及出资信息', '年报-修改信息', '年报-股权变更信息', '年报-企业年报基本信息', '年报-企业对外提供保证担保信息',
  '年报-企业对外投资信息', '年报-企业实缴出资信息', '年报-社会保障信息', '年报-认缴出资信息', '年报-网站信息'
]

export let huiFaListData = (key, info) => {
  let list = []

  switch (key) {
    case huiFaConstData[0]: //执法公开信息
      list.push({
        title: "标题",
        state: "立案时间",
        title1: "被执行人名称：",
        value1: "-",
        title2: "执行法院：",
        value2: "-",
        title3: "执行内容：",
        value3: "-",
      })
      break;
    case huiFaConstData[1]: //失信老赖名单
      list.push({
        title: "标题",
        state: "立案时间",
        title1: "被执行人名称：",
        value1: "-",
        title2: "执行法院：",
        value2: "-",
        title3: "执行内容：",
        value3: "-",
      })
      break;
    case huiFaConstData[2]: //限制高消费名单
      list.push({
        title: "标题",
        state: "立案时间",
        title1: "被执行人名称：",
        value1: "-",
        title2: "执行法院：",
        value2: "-",
        title3: "执行内容：",
        value3: "-",
      })
      break;
    case huiFaConstData[3]: //限制出入境名单
      list.push({
        title: "标题",
        state: "立案时间",
        title1: "被执行人名称：",
        value1: "-",
        title2: "执行法院：",
        value2: "-",
        title3: "执行内容：",
        value3: "-",
      })
      break;
    case huiFaConstData[4]: //民商事裁判文书
      list.push({
        title: "标题",
        state: "审结日期",
        title1: "输入的名称：",
        value1: "-",
        title2: "审理法院：",
        value2: "-",
        title3: "审理结果：",
        value3: "-",
      })
      break;
    case huiFaConstData[5]: //民商事审判流程
      list.push({
        title: "标题",
        state: "时间",
        title1: "当事人名称：",
        value1: "-",
        title2: "法院：",
        value2: "-",
        title3: "诉讼地位：",
        value3: "-",
      })
      break;
    case huiFaConstData[6]: //罪犯及嫌疑人名单
      list.push({
        title: "标题",
        state: "审结日期",
        title1: "当事人名称：",
        value1: "-",
        title2: "审理机关：",
        value2: "-",
        title3: "判决结果：",
        value3: "-",
      })
      break;
    case huiFaConstData[7]: //行政违法记录
      list.push({
        title: "标题",
        state: "时间",
        title1: "当事人名称：",
        value1: "-",
        title2: "执法/复议/审判机关：",
        value2: "-",
        title3: "行政执法结果：",
        value3: "-",
      })
      break;
    case huiFaConstData[8]: //欠税名单
      list.push({
        title: "标题",
        state: "经营状欠税时间态",
        title1: "纳税人名称：",
        value1: "-",
        title2: "主管税务机关：",
        value2: "-",
        title3: "欠税金额（元）：",
        value3: "-",
      })
      break;
    case huiFaConstData[9]: //纳税非正常户
      list.push({
        title: "标题",
        state: "认证日期",
        title1: "纳税人名称：",
        value1: "-",
        title2: "主管税务机关：",
        value2: "-",
        title3: "纳税人证件号：",
        value3: "-",
      })
      break;
    case huiFaConstData[10]: //催收信息
      list.push({
        title: "标题",
        state: "欠款时间",
        title1: "欠款人名称：",
        value1: "-",
        title2: "欠款人身份：",
        value2: "-",
        title3: "欠款金额（元）：",
        value3: "-",
      })
      break;
  }

  return list
}
export let getDetailList = (key, info) => {
  let list = []
  switch (key) {
    case gongShangConstData[0]: //企业基本信息
      list = [{
        name: '企业名称',
        value: ''
      },
      {
        name: '企业英文名称',
        value: ''
      },
      {
        name: '曾用名',
        value: ''
      },
      {
        name: '组织机构代码',
        value: ''
      },
      {
        name: '统一社会信用代码',
        value: ''
      },
      {
        name: '注册号',
        value: ''
      },
      {
        name: '所在城市',
        value: ''
      },
      {
        name: '校准日期',
        value: ''
      },
      {
        name: '原注册号',
        value: ''
      },
      {
        name: '法定代表人/负责人/执行事务合伙人',
        value: ''
      },
      {
        name: '注册资本(万元)',
        value: ''
      },
      {
        name: '注册资本币种',
        value: ''
      },
      {
        name: '成立日期',
        value: ''
      },
      {
        name: '经营期限自',
        value: ''
      },
      {
        name: '经营期限至',
        value: ''
      },
      {
        name: '企业(机构)类型',
        value: ''
      },
      {
        name: '经营状态',
        value: ''
      },
      {
        name: '许可经营项目',
        value: ''
      },
      {
        name: '经营业务范围',
        value: ''
      },
      {
        name: '登记机关',
        value: ''
      },
      {
        name: '注册地址行政区',
        value: ''
      },
      {
        name: '注册地址行政区编号',
        value: ''
      },
      {
        name: '最后年检年度',
        value: ''
      },
      {
        name: '注销日期',
        value: ''
      },
      {
        name: '吊销日期',
        value: ''
      },
      {
        name: '实收资本（万元）',
        value: ''
      },
      {
        name: '员工人数',
        value: ''
      },
      {
        name: '核准日期',
        value: ''
      },
      {
        name: '企业(机构)类型编码',
        value: ''
      },
      {
        name: '国民经济行业代码',
        value: ''
      },
      {
        name: '国民经济行业名称',
        value: ''
      },
      {
        name: '联系人电话',
        value: ''
      },
      {
        name: '住址',
        value: ''
      },
      {
        name: '住所所在行政区划',
        value: ''
      }
      ]
      break;
    case gongShangConstData[3]: //行政处罚基本信息
      list = [{
        name: '违法行为类型',
        value: ''
      },
      {
        name: '决定机关名称',
        value: ''
      },
      {
        name: '行政处罚内容',
        value: ''
      },
      {
        name: '处罚决定日期',
        value: ''
      },
      {
        name: '决定书文号',
        value: ''
      },
      {
        name: '处罚种类',
        value: ''
      },
      {
        name: '公示日期',
        value: ''
      },
      ]
      break
    case gongShangConstData[4]: //企业对外投资信息
      list = [{
        name: '企业(机构)名称',
        value: ''
      },
      {
        name: '注册号',
        value: ''
      },
      {
        name: '企业(机构)类型',
        value: ''
      },
      {
        name: '注册资本(万元)',
        value: ''
      },
      {
        name: '注册资本币种',
        value: ''
      },
      {
        name: '企业状态',
        value: ''
      },
      {
        name: '登记机关',
        value: ''
      },
      {
        name: '认缴出资额(万元)',
        value: ''
      },
      {
        name: '认缴出资币种',
        value: ''
      },
      {
        name: '出资比例',
        value: ''
      },
      {
        name: '开业日期',
        value: ''
      },
      {
        name: '法定代表人姓名',
        value: ''
      },
      {
        name: '企业总数量',
        value: ''
      },
      {
        name: '注销日期',
        value: ''
      },
      {
        name: '吊销日期',
        value: ''
      },
      {
        name: '出资方式',
        value: ''
      },
      {
        name: '注册地址行政区编号',
        value: ''
      },
      {
        name: '统一社会信用代码',
        value: ''
      }
      ]
      break
    case gongShangConstData[5]: //企业异常名录
      list = [{
        name: '企业名称',
        value: ''
      },
      {
        name: '注册号',
        value: ''
      },
      {
        name: '统一社会信用代码',
        value: ''
      },
      {
        name: '列入时间',
        value: ''
      },
      {
        name: '移出时间',
        value: ''
      },
      {
        name: '列入机关名称',
        value: ''
      },
      {
        name: '移出机关名称',
        value: ''
      },
      {
        name: '列入原因',
        value: ''
      },
      {
        name: '移出原因',
        value: ''
      }
      ]
      break
    case gongShangConstData[7]: //终本案件信息
      list = [{
        name: '身份证号码/组织机构代码',
        value: info.CARDNUM
      }, {
        name: '案号',
        value: info.CASECODE
      }, {
        name: '执行法院',
        value: info.COURTNAME
      }, {
        name: '执行标的',
        value: info.EXECMONEY
      }, {
        name: '终本日期',
        value: info.FINALDATE
      }, {
        name: '被执行人姓名/名称',
        value: info.INAME
      }, {
        name: '立案时间',
        value: info.REGDATE
      }, {
        name: '未履行金额',
        value: info.UNPERFMONEY
      }]
      break
    case gongShangConstData[8]: //企业法定代表人对外投资信息
      list = [{
        name: '企业(机构)名称',
        value: info.ENTJGNAME
      }, {
        name: '注册号',
        value: info.REGNO
      }, {
        name: '企业(机构)类型',
        value: info.ENTTYPE
      }, {
        name: '注册资本(万元)',
        value: info.REGCAP
      }, {
        name: '注册资本币种',
        value: info.REGCAPCUR
      }, {
        name: '企业状态',
        value: info.ENTSTATUS
      }, {
        name: '登记机关',
        value: info.REGORG
      }, {
        name: '认缴出资额(万元)',
        value: info.SUBCONAM
      }, {
        name: '认缴出资币种',
        value: info.CONGROCUR
      }, {
        name: '出资比例',
        value: info.FUNDEDRATIO
      }, {
        name: '开业日期',
        value: info.ESDATE
      }, {
        name: '法定代表人姓名',
        value: info.NAME
      }, {
        name: '企业总数量',
        value: info.BINVVAMOUNT
      }, {
        name: '注销日期',
        value: info.CANDATE
      }, {
        name: '吊销日期',
        value: info.REVDATE
      }, {
        name: '出资方式',
        value: info.CONFORM
      }, {
        name: '注册地址行政区编号',
        value: info.REGORGCODE
      }, {
        name: '统一社会信用代码',
        value: info.CREDITCODE
      }]
      break
    case gongShangConstData[9]: //法定代表人其他公司任职
      list = [{
        name: '企业(机构)名称',
        value: info.ENTNAME
      }, {
        name: '注册号',
        value: info.REGNO
      }, {
        name: '企业(机构)类型',
        value: info.ENTTYPE
      }, {
        name: '注册资本(万元)',
        value: info.REGCAP
      }, {
        name: '注册资本币种',
        value: info.REGCAPCUR
      }, {
        name: '企业状态',
        value: info.ENTSTATUS
      }, {
        name: '登记机关',
        value: info.REGORG
      }, {
        name: '职务',
        value: info.POSITION
      }, {
        name: '是否法定代表人',
        value: info.LEREPSIGN
      }, {
        name: '开业日期',
        value: info.ESDATE
      }, {
        name: '法定代表人姓名',
        value: info.NAME
      }, {
        name: '企业总数量',
        value: info.PPVAMOUNT
      }, {
        name: '注销日期',
        value: info.CANDATE
      }, {
        name: '吊销日期',
        value: info.REVDATE
      }, {
        name: '注册地址行政区编号',
        value: info.REGORGCODE
      }]
      break
    case gongShangConstData[10]: //抽查检查
      list = [{
        name: '抽检日期',
        value: info.ISP_DATE
      }, {
        name: '公告名称',
        value: info.ISP_NOTICE
      }, {
        name: '公告日期',
        value: info.ISP_NOTICEDATE
      }, {
        name: '检查核实机关名称',
        value: info.ISP_REGORG
      }, {
        name: '检查核实机关代码',
        value: info.ISP_REGORGCODE
      }, {
        name: '检查结果',
        value: info.ISP_RESULT
      }, {
        name: '数据类型',
        value: info.ISP_TYPE
      }]
      break
    case gongShangConstData[12]: //上市公司基本信息
      list = [{
        name: '经营范围',
        value: info.BIZSCOPE
      }, {
        name: '公司简称',
        value: info.COMPSNAME
      },
      {
        name: '机构存续状态',
        value: info.COMPSTATUS
      },
      {
        name: '所在国家',
        value: info.COUNTRY
      },
      {
        name: '统一社会信用代码',
        value: info.CREDITCODE
      },
      {
        name: '币种代码',
        value: info.CUR
      },
      {
        name: '币种',
        value: info.CURNAME
      },
      {
        name: '英文名称',
        value: info.ENGNAME
      },
      {
        name: '英文简称',
        value: info.ENGSNAME
      },
      {
        name: '公司全称',
        value: info.ENTNAME
      },
      {
        name: '存续起始日',
        value: info.EXISTBEGDATE
      },
      {
        name: '存续截止日',
        value: info.EXISTENDDATE
      },
      {
        name: '成立日期',
        value: info.FOUNDDATE
      }, {
        name: '法定代表人',
        value: info.FRNAME
      },
      {
        name: '主营业务',
        value: info.MAJORBIZ
      },
      {
        name: '办公地址',
        value: info.OFFICEADDR
      },
      {
        name: '办公地址邮编',
        value: info.OFFICEZIPCODE
      },
      {
        name: '机构组织代码',
        value: info.ORGCODE
      },
      {
        name: '注册地址',
        value: info.REGADDR
      },
      {
        name: '注册资本',
        value: info.REGCAPITAL
      },
      {
        name: '所在地区',
        value: info.REGION
      },
      {
        name: '注册地址邮编',
        value: info.REGPTCODE
      },
      {
        name: '员工人数',
        value: info.WORKFORCE
      }
      ]
      break
    case gongShangConstData[13]: //上市公司高管信息
      list = [{
        name: '职位',
        value: info.ACTDUTYNAME
      },
      {
        name: '年龄',
        value: info.AGE
      },
      {
        name: '在职起始日期',
        value: info.BEGINDATE
      },
      {
        name: '姓名',
        value: info.CNAME
      },
      {
        name: '离职原因',
        value: info.DIMREASON
      },
      {
        name: '最高学历',
        value: info.EDUCATIONLEVEL
      },
      {
        name: '离职日期/当前届次截止日',
        value: info.ENDDATE
      },
      {
        name: '性别',
        value: info.GENDER
      },
      {
        name: '最新持股数量',
        value: info.HOLDAFAMT
      },
      {
        name: '变动起始日期',
        value: info.HOLDBEGINDATE
      },
      {
        name: '变动截止日期',
        value: info.HOLDBEGINDATE
      },
      {
        name: '持股人',
        value: info.HOLDNAME
      },
      {
        name: '当前状态',
        value: info.NOWSTATUS
      },
      {
        name: '与高管关系',
        value: info.REALTETYPE
      },
      {
        name: '简历',
        value: info.REMARK
      },
      ]
      break
    case gongShangConstData[14]: //上市公司十大股东
      list = [{
        name: '统一社会信用代码',
        value: info.CREDITCODE
      },
      {
        name: '更新日期',
        value: info.ENTRYDATE
      },
      {
        name: '持股数量',
        value: info.HOLDERAMT
      },
      {
        name: '持股比例',
        value: info.HOLDERRTO
      },
      {
        name: '有限售股份数量',
        value: info.LIMITHOLDERAMT
      },
      {
        name: '注册号',
        value: info.REGNO
      },
      {
        name: '股份类型',
        value: info.SHARESTYPE
      },
      {
        name: '股东统一社会信用代码',
        value: info.SHHOLDERCREDITCODE
      },
      {
        name: '股东名称',
        value: info.SHHOLDERNAME
      },
      {
        name: '股东股权性质',
        value: info.SHHOLDERNATURE
      },
      {
        name: '股东股权性质编码',
        value: info.SHHOLDERNATURECODE
      },
      {
        name: '股东注册号',
        value: info.SHHOLDERREGNO
      },
      {
        name: '股东机构类型',
        value: info.SHHOLDERTYPE
      },
      {
        name: '股东机构类型编码',
        value: info.SHHOLDERTYPECODE
      },
      {
        name: '无限售股份数量',
        value: info.SHHOLDERTYPECODE
      },
      ]
      break
    case gongShangConstData[15]: //主要管理人员
      list = [{
        name: '企业名称',
        value: info.ENTNAME
      },
      {
        name: '高管姓名',
        value: info.PERNAME
      },
      {
        name: '高管总数量',
        value: info.PERSONAMOUNT
      },
      {
        name: '职位',
        value: info.POSITION
      },
      {
        name: '职位代码',
        value: info.POSITIONCODE
      },
      ]
      break
    case gongShangConstData[16]: //失信被执行人信息
      list = [{
        name: '被执行人姓名/名称',
        value: info.INAMECLEAN
      },
      {
        name: '被执行人履行情况',
        value: info.PERFORMANCE
      },
      {
        name: '已履行（元）',
        value: info.PERFORMANCE
      },
      {
        name: '发布时间',
        value: info.PUBLISHDATECLEAN
      },
      {
        name: '立案时间',
        value: info.REGDATECLEAN
      },
      {
        name: '性别',
        value: info.SEXYCLEAN
      },
      {
        name: '失信人类型：自然人，法人或其他组织',
        value: info.TYPE
      },
      {
        name: '未履行（元）',
        value: info.UNPERFORMPART
      },
      {
        name: '身份证原始发证地',
        value: info.YSFZD
      },
      {
        name: '法定代表人或者负责人姓名',
        value: info.BUSINESSENTITY
      },
      {
        name: '年龄',
        value: info.AGECLEAN
      },
      {
        name: '省份',
        value: info.AREANAMECLEAN
      },
      {
        name: '身份证号码/工商注册号',
        value: info.CARDNUM
      },
      {
        name: '案号',
        value: info.CASECODE
      },
      {
        name: '执行法院',
        value: info.COURTNAME
      },
      {
        name: '失信被执行人行为具体情形',
        value: info.DISRUPTTYPENAME
      },
      {
        name: '生效法律文书确定的义务',
        value: info.DUTY
      },
      {
        name: '执行依据文号',
        value: info.GISTID
      },
      {
        name: '做出执行依据单位',
        value: info.GISTUNIT
      },
      ]
      break
    case gongShangConstData[17]: //股东及出资信息
      list = [{
        name: '实缴出资额（万元）',
        value: info.ACCONAM
      },
      {
        name: '出资日期',
        value: info.CONDATE
      },
      {
        name: '出资方式',
        value: info.CONFORM
      },
      {
        name: '出资方式代码',
        value: info.CONFORMCODE
      },
      {
        name: '股东统一社会信用代码',
        value: info.CREDITCODE
      },
      {
        name: '认缴出资币种代码',
        value: info.CURRENCYCODE
      },
      {
        name: '出资比例',
        value: info.FUNDEDRATIO
      },
      {
        name: '股东类型',
        value: info.INVTYPE
      },
      {
        name: '股东类型代码',
        value: info.INVTYPECODE
      },
      {
        name: '认缴出资币种',
        value: info.REGCAPCUR
      },
      {
        name: '股东注册号',
        value: info.REGNO
      },
      {
        name: '股东名称',
        value: info.REGNO
      },
      {
        name: '认缴出资额（万元)',
        value: info.SUBCONAM
      },
      ]
      break
    case gongShangConstData[20]: //年报-企业年报基本信息
      list = [{
        name: '地址',
        value: ''
      }, {
        name: '年报日期',
        value: ''
      }, {
        name: '年报ID',
        value: ''
      }, {
        name: '年报年份',
        value: ''
      }, {
        name: '经营状态',
        value: ''
      }, {
        name: '统一信用代码',
        value: ''
      }, {
        name: '电子邮箱',
        value: ''
      }, {
        name: '企业名称',
        value: ''
      }, {
        name: '企业控股情况',
        value: ''
      }, {
        name: '企业主营业务活动',
        value: ''
      }, {
        name: '邮政编码',
        value: ''
      }, {
        name: '注册号',
        value: ''
      }, {
        name: '电话',
        value: ''
      }, {
        name: '女性从业人数',
        value: ''
      }]
      break
    case gongShangConstData[21]: //年报-企业对外提供保证担保信息
      list = [{
        name: '债权人',
        value: ''
      }, {
        name: '年报ID',
        value: ''
      }, {
        name: '主债权种类',
        value: ''
      }, {
        name: '主债权数额',
        value: ''
      }, {
        name: '履行债务的期限自',
        value: ''
      }, {
        name: '履行债务的期限至',
        value: ''
      }, {
        name: '保证的期间',
        value: ''
      }, {
        name: '保证的方式',
        value: ''
      }]
      break
    case gongShangConstData[24]: //年报-社会保险信息
      list = [{
        name: '年报ID',
        value: ''
      }, {
        name: '城镇职工基本养老保险参保人数',
        value: ''
      }, {
        name: '失业保险参保人数 ',
        value: ''
      }, {
        name: '职工基本医疗保险参保人数 ',
        value: ''
      }, {
        name: '工伤保险参保人数 ',
        value: ''
      }, {
        name: '生育保险参保人数 ',
        value: ''
      }, {
        name: '参加城镇职工基本养老保险本期实际缴费金额 ',
        value: ''
      }, {
        name: '参加失业保险本期实际缴费金额 ',
        value: ''
      }, {
        name: '参加职工基本医疗保险本期实际缴费金额 ',
        value: ''
      }, {
        name: '参加工伤保险本期实际缴费金额',
        value: ''
      }, {
        name: '参加生育保险本期实际缴费金额',
        value: ''
      }, {
        name: '单位参加城镇职工基本养老保险缴费基数',
        value: ''
      }, {
        name: '单位参加失业保险缴费基数',
        value: ''
      }, {
        name: '单位参加职工基本医疗保险缴费基数',
        value: ''
      }, {
        name: '单位参加工伤保险缴费基数',
        value: ''
      }, {
        name: '单位参加生育保险缴费基数',
        value: ''
      }, {
        name: '单位参加城镇职工基本养老保险累计欠缴金额',
        value: ''
      }, {
        name: '单位参加失业保险累计欠缴金额',
        value: ''
      }, {
        name: '单位参加职工基本医疗保险累计欠缴金额',
        value: ''
      }, {
        name: '参加工伤保险累计欠缴金额',
        value: ''
      }, {
        name: '单位参加生育保险累计欠缴金额',
        value: ''
      }]
      break
    //汇法信息
    case huiFaConstData[0]: //执法公开信息
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '立案时间',
        value: ''
      }, {
        name: '被执行人名称',
        value: ''
      }, {
        name: '证件号码',
        value: ''
      }, {
        name: '执行案号',
        value: ''
      }, {
        name: '执行法院',
        value: ''
      }, {
        name: '执行标的（元）',
        value: ''
      }, {
        name: '执行内容',
        value: ''
      }, {
        name: '收录时案件状态',
        value: ''
      }, {
        name: '备注',
        value: ''
      }, {
        name: '执行依据文号',
        value: ''
      }, {
        name: '终本日期',
        value: ''
      }, {
        name: '未履行金额（元）',
        value: ''
      }, {
        name: '申请执行人',
        value: ''
      },]
      break;
    case huiFaConstData[1]: //失信老赖名单
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '立案时间',
        value: ''
      }, {
        name: '输入的被执行人名称',
        value: ''
      }, {
        name: '输入的被执行人证件号',
        value: ''
      }, {
        name: '案号',
        value: ''
      }, {
        name: '执行法院',
        value: ''
      }, {
        name: '涉案金额（元）',
        value: ''
      }, {
        name: '执行内容',
        value: ''
      }, {
        name: '收录时案件状态',
        value: ''
      }, {
        name: '备注',
        value: ''
      }, {
        name: '省份',
        value: ''
      }, {
        name: '履行情况',
        value: ''
      }, {
        name: '具体情形',
        value: ''
      }, {
        name: '发布时间',
        value: ''
      }, {
        name: '执行依据文号',
        value: ''
      }, {
        name: '执行依据单位',
        value: ''
      }, {
        name: '终本日期',
        value: ''
      }, {
        name: '未履行金额（元）',
        value: ''
      }, {
        name: '申请执行人',
        value: ''
      },]
      break;
    case huiFaConstData[2]: //限制高消费名单
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '立案时间',
        value: ''
      }, {
        name: '被执行人名称',
        value: ''
      }, {
        name: '证件号码',
        value: ''
      }, {
        name: '执行案号',
        value: ''
      }, {
        name: '执行法院',
        value: ''
      }, {
        name: '执行金额（元）',
        value: ''
      }, {
        name: '执行内容',
        value: ''
      }, {
        name: '收录时案件状态',
        value: ''
      }, {
        name: '备注',
        value: ''
      },]
      break;
    case huiFaConstData[3]: //限制出入境名单
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '立案时间',
        value: ''
      }, {
        name: '被执行人名称',
        value: ''
      }, {
        name: '证件号码',
        value: ''
      }, {
        name: '执行案号',
        value: ''
      }, {
        name: '执行法院',
        value: ''
      }, {
        name: '执行金额（元）',
        value: ''
      }, {
        name: '执行内容',
        value: ''
      }, {
        name: '收录时案件状态',
        value: ''
      }, {
        name: '备注',
        value: ''
      },]
      break;
    case huiFaConstData[4]: //民商事裁判文书
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '审结日期',
        value: ''
      }, {
        name: '输入的名称',
        value: ''
      }, {
        name: '输入的证件号',
        value: ''
      }, {
        name: '文书字号',
        value: ''
      }, {
        name: '诉讼地位',
        value: ''
      }, {
        name: '审理法院',
        value: ''
      }, {
        name: '正负面',
        value: ''
      }, {
        name: '文书类型',
        value: ''
      }, {
        name: '案由',
        value: ''
      }, {
        name: '涉案金额（元）',
        value: ''
      }, {
        name: '审理结果',
        value: ''
      }, {
        name: '审理程序',
        value: ''
      }, {
        name: '案件类型',
        value: ''
      }, {
        name: '审理人员',
        value: ''
      }, {
        name: '备注',
        value: ''
      }, {
        name: '完整内容查看地址',
        value: ''
      }, {
        name: '原告当事人',
        value: ''
      }, {
        name: '被告当事人',
        value: ''
      }, {
        name: '其他当事人',
        value: ''
      }, {
        name: '律师姓名',
        value: ''
      }, {
        name: '律所名称',
        value: ''
      },]
      break;
    case huiFaConstData[5]: //民商事审判流程
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '时间',
        value: ''
      }, {
        name: '当事人名称',
        value: ''
      }, {
        name: '当事人证件号',
        value: ''
      }, {
        name: '案号',
        value: ''
      }, {
        name: '诉讼地位',
        value: ''
      }, {
        name: '法院',
        value: ''
      }, {
        name: '公告类型',
        value: ''
      }, {
        name: '案由',
        value: ''
      }, {
        name: '公告内容',
        value: ''
      }, {
        name: '时间类别',
        value: ''
      }, {
        name: '备注',
        value: ''
      }, {
        name: '其他当事人',
        value: ''
      },]
      break;
    case huiFaConstData[6]: //罪犯及嫌疑人名单
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '审结日期',
        value: ''
      }, {
        name: '输入的当事人名称',
        value: ''
      }, {
        name: '输入的证件号码',
        value: ''
      }, {
        name: '文书字号',
        value: ''
      }, {
        name: '审理机关',
        value: ''
      }, {
        name: '违法事由',
        value: ''
      }, {
        name: '涉案金额（元）',
        value: ''
      }, {
        name: '判决结果',
        value: ''
      }, {
        name: '备注',
        value: ''
      },]
      break;
    case huiFaConstData[7]: //行政违法记录
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '时间',
        value: ''
      }, {
        name: '当事人名称',
        value: ''
      }, {
        name: '证件号码',
        value: ''
      }, {
        name: '案号',
        value: ''
      }, {
        name: '执法/复议/审判机关',
        value: ''
      }, {
        name: '违法事由',
        value: ''
      }, {
        name: '金额（元）',
        value: ''
      }, {
        name: '行政执法结果',
        value: ''
      }, {
        name: '时间类别',
        value: ''
      }, {
        name: '备注',
        value: ''
      },]
      break;
    case huiFaConstData[8]: //欠税名单
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '欠税时间',
        value: ''
      }, {
        name: '纳税人名称',
        value: ''
      }, {
        name: '纳税人证件号码',
        value: ''
      }, {
        name: '主管税务机关',
        value: ''
      }, {
        name: '欠税金额（元）',
        value: ''
      }, {
        name: '所欠税种',
        value: ''
      }, {
        name: '欠税属期',
        value: ''
      }, {
        name: '备注',
        value: ''
      }, {
        name: '时间类别',
        value: ''
      }, {
        name: '备注',
        value: ''
      },]
      break;
    case huiFaConstData[9]: //纳税非正常户
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '认定日期',
        value: ''
      }, {
        name: '纳税人名称',
        value: ''
      }, {
        name: '纳税人证件号',
        value: ''
      }, {
        name: '主管税务机关',
        value: ''
      }, {
        name: '备注',
        value: ''
      },]
      break;
    case huiFaConstData[10]: //催收信息
      list = [{
        name: '标题',
        value: ''
      }, {
        name: '欠款时间',
        value: ''
      }, {
        name: '欠款人名称',
        value: ''
      }, {
        name: '欠款人证件号',
        value: ''
      }, {
        name: '欠款人身份',
        value: ''
      }, {
        name: '欠款原因',
        value: ''
      }, {
        name: '欠款金额（元）',
        value: ''
      }, {
        name: '备注',
        value: ''
      },]
      break
  }
  return list
}
//税务
export const taxConstData = ["基本信息", "变更信息", "违法违章信息", "欠税信息", "申报信息", "征收信息",
  "财务报表汇总信息（资产负债表、利润表）年报前两年/CWBB", "企业一个月内其他银行相关查询"]
export let getTaxDetailList = (key, info) => {
  let list = []
  switch (key) {
    case taxConstData[2]://违法违章信息
      list = [
        { name: '违约标志', value: '' },
        { name: '登记日期', value: '' },
        { name: '违法违章事实', value: '' },
        { name: '违法违章（稽查）手段代码', value: '' },
        { name: '违法违章（稽查）手段名称', value: '' },
        { name: '违法违章（稽查）类型代码', value: '' },
        { name: '违法违章（稽查）类型名称', value: '' },
        { name: '处理处罚时间', value: '' },
        { name: '所属时期起', value: '' },
        { name: '所属时期止', value: '' },
      ]
      break;
    case taxConstData[4]://申报信息
      list = [
        { name: '征收项目代码', value: '' },
        { name: '应税项', value: '' },
        { name: '应纳税额', value: '' },
        { name: '应补(退)税额', value: '' },
        { name: '申报日期', value: '' },
        { name: '申报期限', value: '' },
        { name: '应征凭证种类代码', value: '' },
        { name: '所属日期起', value: '' },
        { name: '所属日期止', value: '' },]
      break;
    case taxConstData[5]://征收信息
      list = [
        { name: '征收项目代码', value: '' },
        { name: '征收项目名称', value: '' },
        { name: '税款种类代码', value: '' },
        { name: '税款种类名称', value: '' },
        { name: '税款所属时期起', value: '' },
        { name: '税款所属时期止', value: '' },
        { name: '缴款期限', value: '' },
        { name: '计税依据', value: '' },
        { name: '预缴税额/已缴税额', value: '' },
        { name: '应补(退)税额', value: '' },
        { name: '减免税额', value: '' },
        { name: '实缴税额', value: '' },
        { name: '入库日期', value: '' }]
      break;
    case taxConstData[6]://财务报表汇总信息（资产负债表、利润表）年报前两年/CWBB
      list = [
        { name: '所属期起', value: '' },
        { name: '所属期止', value: '' },
        { name: '项目', value: '' },
        { name: '行次 ', value: '' },
        { name: '本期金额', value: '' },
        { name: '上期金额', value: '' },
        { name: '财务报表种类代码', value: '' },
        { name: '财务报表种类名称', value: '' },
      ]
      break;
      case taxConstData[0]://违法违章信息
      list = [
        { name: '纳税人识别号', value: '' },
        { name: '纳税人名称', value: '' },
        { name: '组织机构代码', value: '' },
        { name: '社会信用代码', value: '' },
        { name: '注册地址', value: '' },
        { name: '注册地址行政区划数字代码', value: '' },
        { name: '营业地址', value: '' },
        { name: '注册地址电话号码', value: '' },
        { name: '登记注册类型代码', value: '' },
        { name: '行业代码', value: '' },
        { name: '行业名称', value: '' },
        { name: '隶属关系代码', value: '' },
        { name: '隶属关系名称', value: '' },
        { name: '纳税人状态代码', value: '' },
        { name: '纳税人状态名称', value: '' },
        { name: '纳税人类型代码', value: '' },
        { name: '纳税人类型名称', value: '' },
        { name: '纳税信用等级', value: '' },
        { name: '评级时间', value: '' },
        { name: '纳税信用等级', value: '' },
        { name: '评级时间', value: '' },
        { name: '主管税务机关代码', value: '' },
        { name: '主管税务机关名称', value: '' },
        { name: '注册资本', value: '' },
        { name: '经营范围', value: '' },
        { name: '开业设立日期', value: '' },
        { name: '法定代表人姓名', value: '' },
        { name: '法定代表人身份证件类型', value: '' },
        { name: '法定代表人证件号码', value: '' },
        { name: '法定代表人电话号码', value: '' },
        { name: '法定代表人移动电话号码', value: '' },
        { name: '投资方名称', value: '' },
        { name: '投资比例', value: '' },
        { name: '有效期起', value: '' },
        { name: '有效期止', value: '' },
        { name: '总机构税号', value: '' },
        { name: '总机构名称', value: '' },
        { name: '总机构注册地址', value: '' },
        { name: '总机构经营地址', value: '' },
        { name: '总机构联系电话', value: '' },
        { name: '总机构经营范围', value: '' },
        { name: '总机构法定代表人名称', value: '' },
        { name: '增值税经营类别', value: '' },
        { name: '增值税企业类型代码', value: '' },
        { name: '委托征收方式', value: '' },
      ]
      break;
    default:
      break;
  }
  return list
}

