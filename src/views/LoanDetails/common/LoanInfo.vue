<template>
  <!-- 借据详情-》借据信息ycm -->
  <div class="loan_info">
    <div class="card_div">
      <div class="card_head">
        <div class="vertical_bar"></div>
        <div class="card_title">借据信息</div>
      </div>
      <div class="card_content">
        <single-line-item label="借款金额" :value="getLoanAmount" />
        <single-line-item label="借款期限" :value="getInstallmentNum" />
        <single-line-item label="执行利率" :value="getRate" />
        <single-line-item label="罚息日利率" :value="getOverdueDailyInterestRate" />
        <single-line-item label="还款方式" :value="getDictStrs(resData.repayMethod, '1')" />
        <single-line-item label="借款途径" :value="getDictStrs(resData.loanPurpose, '2')" />
        <single-line-item label="借款状态" :value="getDictStrs(resData.status, '3')" />
        <single-line-item label="产品信息" :value="resData.productName" />
        <single-line-item label="业务品种" :value="getDictStrs(resData.productCatalog, '6')"
          :isShowLine="false" />
      </div>
    </div>
    <div class="card_div">
      <div class="card_head">
        <div class="vertical_bar" />
        <div class="card_title">客户信息</div>
      </div>
      <div class="card_content">
        <single-line-item label="客户名称" :value="resData.userName" />
        <single-line-item label="手机号码" :value="resData.userTel" />
        <single-line-item label="证件类型" :value="getDictStrs(resData.certificateType, '7')" />
        <single-line-item label="证件号码" :value="resData.certificateNo" :isShowLine="false" />
      </div>
    </div>
    <div class="card_div">
      <div class="card_head">
        <div class="vertical_bar"></div>
        <div class="card_title">营销信息</div>
      </div>
      <div class="card_content">
        <single-line-item label="客户经理姓名" :value="resData.custMgrName" />
        <single-line-item label="客户经理所在机构" :value="resData.organName" />
      </div>
    </div>
    <div class="card_div">
      <div class="card_head">
        <div class="vertical_bar"></div>
        <div class="card_title">合同信息</div>
      </div>
      <div class="contract_list" v-for="(item, index) in contractList">
        <div class="contract_item">
          <span>合同编号</span>
          <span>{{ item.contractId }}</span>
        </div>
        <div class="contract_item">
          <span>合同类型</span>
          <span>{{ getDictStrs(item.contractType, "4") }}</span>
        </div>
        <div class="contract_item">
          <span>合同名称</span>
          <span>{{ item.contractName }}</span>
        </div>
        <div class="contract_item">
          <span>合同状态</span>
          <span>{{ getDictStrs(item.contractStatus, "5") }}</span>
        </div>
        <div class="contract_item">
          <span>操作</span>
          <span v-if="item.contractFileUrl != null" @click="seeContract(item)">查看</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import { apiUrl, ajaxPostPlus, FilePreview, baseImgUrl } from "@/api.js";
import {
  codeToValue,
  isHasData,
  isAssetTypeAnImage,
  moneyFormat,
} from "@/utils/index.js";
export default {
  name: "LoanInfo", //借据详情-》借据信息
  components: { SingleLineItem },
  props: { loanInvoiceId: String, overdueDailyInterestRate: String },
  data() {
    return {
      dictKeys: [
        //数据字典还款方式、借款用途、借款状态
        "repay_method",
        "loan_purpose",
        "loan_invoice_status",
        "contract_type",
        "contract_status",
        "product_catalog", //业务品种
        "certificate_type", //证件类型
      ],
      repay_method: [], //还款方式数据字典
      loan_purpose: [], //借款用途数据字典
      loan_invoice_status: [], //借款状态数据字典
      contract_type: [], //合同类型数据字典
      contract_status: [], //合同状态数据字典
      product_catalog: [], //业务品种数据字典
      certificate_type: [], //证件类型数据字典
      resData: {}, //网络请求结果
      contractList: [], //合同列表
      show: false, //图片弹窗
      imgSrc: "", //图片路径
    };
  },
  computed: {
    getLoanAmount() {
      if (this.resData.loanAmount != undefined) {
        return moneyFormat(this.resData.loanAmount) + "元";
      }
    },
    getInstallmentNum() {
      if (this.resData.installmentNum != undefined) {
        return this.resData.installmentNum + "期";
      }
    },
    getRate() {
      if (this.resData.rate != undefined) {
        return this.resData.rate + "%";
      }
    },
    getOverdueDailyInterestRate() {
      if (this.overdueDailyInterestRate != undefined) {
        return this.overdueDailyInterestRate + "‱";
      }
    },
  },
  created() {},
  mounted() {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });
    this.getDictKeys();
  },
  methods: {
    // 查看合同（合同文件是后台系统生成，不会有图片）
    seeContract(item) {
      console.log("查看合同" + item.contractFileUrl);
      if (
        item.contractFileUrl != undefined ||
        item.contractFileUrl != null ||
        item.contractFileUrl != ""
      ) {
        let filePath = item.contractFileUrl;
        let ext = filePath.substr(filePath.lastIndexOf(".") + 1); //获取后缀
        let temp = filePath.substr(filePath.lastIndexOf(":") + 1);
        let pathUrl = temp.substr(temp.indexOf("/") + 1); //
        let reqData = {
          resourceUrl: pathUrl, //文件地址
          fileType: ext,
          resourceType: "HT",
        };
        FilePreview(reqData);
      } else {
        this.$toast("暂无数据");
      }
    },
    // 查询数据字典
    getDictKeys() {
      console.log("查询数据字典");
      let reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          console.log(" -数据字典列表-" + JSON.stringify(res));
          let distMap = res.dictItemMap;
          this.repay_method = distMap.repay_method; //还款方式
          this.loan_purpose = distMap.loan_purpose; //借款用途
          this.loan_invoice_status = distMap.loan_invoice_status; //借款状态
          this.contract_type = distMap.contract_type; //合同类型
          this.contract_status = distMap.contract_status; //合同状态
          this.product_catalog = distMap.product_catalog; //业务品种
          this.certificate_type = distMap.certificate_type; //证件类型
          this.getData();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(" -数据字典请求错误" + JSON.stringify(err));
        });
    },
    getDictStrs(code, flag) {
      let list = [];
      if (flag == "1") {
        list = this.repay_method;
      } else if (flag == "2") {
        list = this.loan_purpose;
      } else if (flag == "3") {
        list = this.loan_invoice_status;
      } else if (flag == "4") {
        list = this.contract_type;
      } else if (flag == "5") {
        list = this.contract_status;
      } else if (flag == "6") {
        list = this.product_catalog;
      } else if (flag == "7") {
        list = this.certificate_type;
      }
      return codeToValue(list, code);
    },
    // 请求数据
    getData() {
      ajaxPostPlus(apiUrl.queryCreditLoanInvoiceDetail, {
        loanInvoiceId: this.loanInvoiceId,
      })
        .then((res) => {
          this.resData = res;
          console.log(" -resData-" + JSON.stringify(this.resData));
          if (isHasData(res.contractInfoList)) {
            this.contractList = res.contractInfoList;
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
};
</script>

<style  scoped>
.loan_info {
  padding-bottom: 12px;
}
.card_div {
  margin: 12px 0 0;
  background: #ffffff;
}
/*头部*/
.card_head {
  padding: 15px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
/**/
/*竖杠*/
.vertical_bar {
  width: 3px;
  height: 20px;
  background: #ff6619;
}
/*标题*/
.card_title {
  color: #ff6619;
  font-size: 14px;
  margin-left: 12px;
}
/*内容*/
/* .card_content {
  margin: 0 15px;
} */
/*合同列表*/
.contract_list {
  padding: 0 15px 15px;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
/**/
.contract_item {
  margin: 15px 0 0;
}
.contract_item span {
  font-size: 14px;
}
.contract_item span:nth-child(2) {
  margin-left: 15px;
}
.contract_item:last-child span:nth-child(2) {
  color: #ff6619;
}
</style>
