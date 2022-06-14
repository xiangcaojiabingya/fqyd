<template>
  <div class="Index">
    <div class="top">
      <Nav title="房权e贷">
        <template #right>
          <img
            class="tupian"
            src="../assets/img/close_app_icon_white.png"
            alt
          />
        </template>
      </Nav>
    </div>
    <div class="two">
      <div class="middle">
        <!-- <van-image width="95%" height="200" :src="require('../assets/img/middle.png')" /> -->
        <div class="content">
          <div class="tp">
            <img :src="arrs.img" width="60" height="60" alt class="image" />
            <!-- <van-image
              round
              class="image"
              width="60"
              height="60"
              :src="arrs.img"
            />-->
          </div>
          <div>
            <p class="content1">{{ arrs.name }}</p>
            <p class="content2">{{ arrs.work }}</p>
          </div>
          <div class="content3">
            <div class="left">
              <img src="../assets/img/sy_khjg_icon.png" alt />
              <span class="kh">{{ arrs.organization }}</span>
            </div>
            <div class="right" @click="confirm()">
              <img src="../assets/img/sy_khgw_icon.png" alt />
              <span class="kh">{{ arrs.post }}</span>
              <img
                src="../assets/img/jdxx_jr_icon.png"
                alt
                id="positionDetails"
              />
              <!-- <van-image
                class="positionDetails"
                width="7px"
                height="12px"
                fit="contain"
                :src="require('@/assets/img/lb_jr_icon.png')"
              /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-top">
          <ul>
            <li v-for="(item, index) in list" @click="btn(item)" :key="index">
              <img :src="item.img" />
              <p>{{ item.title }}</p>
            </li>
            <li v-for="(item, index) in list2" @click="btn2(item)" :key="index">
              <img :src="item.img" />
              <p>{{ item.title }}</p>
            </li>
            <li @click="btn4(fp)">
              <img :src="this.fp.img" />
              <p>{{ this.fp.title }}</p>
            </li>
            <li v-for="(item, index) in list3" @click="btn3(item)" :key="index">
              <img :src="item.img" />
              <p>{{ item.title }}</p>
            </li>
            <li @click="btn4(qx)">
              <img :src="this.qx.img" />
              <p>{{ this.qx.title }}</p>
            </li>
          </ul>
        </div>
        <div class="footer-bottom">
          <img src="../assets/img/rzbank_pic.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/module/Nav.vue";
import { hideWebViewTitle } from "@/utils/index.js";
import {
  ajaxGet,
  apiUrl,
  chnlCode,
  client_secret,
  app_id,
  baseHeaderImgUrl,
  clientId,
  bearerToken,
  ajaxPostJsonNormal,
  ajaxPostPlus,
  ajaxPostPlusOprate,
} from "@/api.js";
import { getSSOToken, getUrlQuery } from "@/utils/index.js";
import { GetKey } from "@/assets/js/AESCryptoJS.js";
var param = "";
export default {
  name: "Index",
  components: {
    Nav,
  },
  data() {
    return {
      list: [
        {
          title: "授信查询",
          img: require("../assets/img/sy_sxcx_icon.png"),
          type: "sxcx",
        }, // 跳转传参type
        {
          title: "支用查询",
          img: require("../assets/img/sy_zycx_icon.png"),
          type: "zycx",
        },
      ],
      list2: [
        {
          title: "借据查询",
          img: require("../assets/img/sy_jjcx_icon.png"),
          href: "QueryIOUList",
        },
        {
          title: "客户查询",
          img: require("../assets/img/sy_khcx_icon.png"),
          href: "QueryClientList",
        },
      ],
      list3: [
        {
          title: "授信申请",
          img: require("../assets/img/sy_sxjd_icon.png"),
          href: "shenpi",
          type: "sxcx",
        },
        {
          title: "支用申请",
          img: require("../assets/img/sy_sxsp_icon.png"),
          href: "shenpi",
          type: "zycx",
        },
      ],
      fp: {
        title: "业务分配",
        img: require("../assets/img/sy_ywfp_icon.png"),
        href: "allotOrCancel",
        type: "ywfp",
      },
      qx: {
        title: "授信结束",
        img: require("../assets/img/sy_sxqx_icon.png"),
        href: "allotOrCancel",
        type: "sxjs",
      },

      // list4: [
      //     {title: "授信审批" , img : require('../assets/img/sy_sxsp_icon.png'), type: 'sxcx'},
      // ],
      arrs: {
        img: require("@/assets/img/heard_icon.png"),
        name: "--",
        work: "--",
        organization: "机构",
        post: "岗位",
      },
      chnlCode: chnlCode, //平台常量
      client_secret: client_secret, //平台常量
      app_id: app_id, //应用id
      grant_type: "client_credentials",
    };
  },
  methods: {
    //支用查询  授信查询
    btn(item) {
      localStorage.removeItem("SEARCH");
      this.$store.commit("deleteDsSave");
      this.$router.push({
        path: "/doubleSearch",
        query: {
          type: item.type,
          // randomID: "id" + new Date(),
        },
      });
    },
    confirm() {
      this.show = false;
      {
        {
          this.$dialog
            .alert({
              message: this.arrs.post,
            })
            .then(() => {
              // on close
            });
        }
      }
      this.show = false;
    },
    //借据查询  客户查询
    btn2(item) {
      this.$router.push({
        path: item.href,
        query: { randomID: "id" + new Date() },
      });
    },
    //授信尽调  授信审批
    btn3(item) {
      this.$router.push({
        path: "/shenpi",
        query: {
          type: item.type,
        },
      });
    },
    //业务分配 授信取消
    btn4(item) {
      this.$router.push({
        path: "/allotOrCancel",
        query: {
          type: item.type,
        },
      });
    },
    queryUser() {
      //获取个人信息
      ajaxPostPlus(apiUrl, { userId: localStorage.getItem("userId") })
        .then((res) => {
          console.log(JSON.stringify(res));
          var imgurl =
            baseHeaderImgUrl +
            res.operatorId +
            "?r=" +
            parseInt(Math.random() * 100000);
          // if(){}
          //`authId=${localStorage.getItem('empNo')}&
          //token=${localStorage.getItem('wdToken')}&
          //organId=${localStorage.getItem('organId')}&
          //organName=${localStorage.getItem('organName')}&
          //operatorId=${localStorage.getItem('empNo')}&
          //operatorName=${localStorage.getItem('name')}`,
          // 缓存是请注意上面保存的字段
          this.arrs = {
            img: imgurl,
            name: res.name,
            work: res.operatorId,
            organization: res.organName,
            post: res.list[0].roleName,
          };
        })
        .catch((error) => {});
    },

    //单点登录
    ssoLogin(res) {
      ajaxPostJsonNormal(apiUrl.ssoLogin, {
        appId: clientId,
        bearerToken: bearerToken,
        token: res,
      })
        .then((res) => {
          console.log("单点登录接口返回数据：" + JSON.stringify(res));
          localStorage.setItem("empNo", res.data.empCode); //保存当前登录用户的工号
          localStorage.setItem("name", res.data.name); //保存当前登录用户的姓名
          this.arrs.name = res.data.name;
          if (res.data.empCode == "" || res.data.empCode == null) {
            this.arrs.img = require("@/assets/img/heard_icon.png");
          } else {
            this.arrs.img =
              baseHeaderImgUrl +
              res.data.empCode +
              "?r=" +
              Math.round(Math.random() * 100000);
          }
          this.arrs.work = res.data.empCode;
          this.login();
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },
    //获取敏行平台的token
    getMXToken() {
      getSSOToken(this.app_id).then((res) => {
        console.log("单点登录的Token:" + res);
        //PAIAAHhtj3iK5no49kiSdmXGczgI1O3RtzYkYbGZ9izmXCIX
        this.ssoLogin(res);
      });
    },
    login() {
      //TODO 登录部分账号没有数据
      // localStorage.setItem("empNo", "81010527"); //测试0
      // localStorage.setItem("empNo", "81001863"); //分配
      // localStorage.setItem("empNo", "81012528"); //测试1
      // localStorage.setItem("empNo", "81012529"); //测试2
      localStorage.setItem("empNo", "81001877"); //豆金峰
      // localStorage.setItem("empNo", "81012530"); //测试3
      // localStorage.setItem("empNo", "81012533"); //测试6支用
      // localStorage.setItem("empNo", "81001877"); // 豆金峰      // localStorage.setItem("empNo", "81001864"); // 李立鹏
      // localStorage.setItem("empNo", "81001801"); //李立鹏
      // localStorage.setItem("empNo", "81001876"); // 左登峰
      // localStorage.setItem("empNo", "81001800"); //李立鹏
      // localStorage.setItem("empNo", "81001867"); // 徐杨
      // localStorage.setItem("empNo", "81012650"); // 马玄玄
      // localStorage.setItem("empNo", "81001863"); // 张广玲
      // localStorage.setItem("empNo", "81012529"); //
      // localStorage.setItem("empNo", "81012531"); // 测试4
      // localStorage.setItem("empNo", "81012532"); // 测试5
      // localStorage.setItem("empNo", "81012533"); // 测试6
      // localStorage.setItem("empNo", "81012530"); //测试3
      // localStorage.setItem("empNo", "81001887"); //徐三

      var data = {
        loginAccount: localStorage.getItem("empNo"),
        uniCode: "mtcredit",
      };
      localStorage.removeItem("wdToken");
      localStorage.removeItem("organId");
      localStorage.removeItem("organName");
      localStorage.removeItem("operatorName");
      localStorage.removeItem("operatorId");
      console.log("login-data = " + JSON.stringify(data));
      ajaxPostPlusOprate(apiUrl.login, data, "11", "962")
        .then((res) => {
          console.log("login = " + JSON.stringify(res));
          if (res) {
            localStorage.setItem("wdToken", res.token);
            localStorage.setItem("organId", res.organId);
            localStorage.setItem("organName", res.organName);
            localStorage.setItem("operatorName", res.name);
            localStorage.setItem("operatorId", res.operatorId);
            this.getData(res.operatorId);
          } else {
            this.$toast("获取登录信息失败，请联系相关人员");
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    getData(userId) {
      var data = { userId: userId };
      console.log("data = " + JSON.stringify(data));
      ajaxPostPlus(apiUrl.queryUser, data)
        .then((res) => {
          console.log("queryUser = " + JSON.stringify(res));
          this.arrs.organization = res.list[0].organName;
          // this.arrs.post = res.list[0].list[0].roleName;
          let gangwei = "";
          res.list[0].list.forEach((element) => {
            gangwei = gangwei + "/" + element.roleName;
          });
          this.arrs.post = gangwei.slice(1);
          //此处是推送跳转
          if (param == "fqd_fp") {
            //分配
            this.$router.push({
              path: "/allotOrCancel",
              query: {
                type: "ywfp",
              },
            });
          } else if (param == "fqd_sx") {
            //授信审批
            this.$router.push({
              path: "/shenpi",
              query: {
                type: "sxcx",
              },
            });
          } else if (param == "fqd_zy") {
            this.$router.push({
              path: "/shenpi",
              query: {
                type: "zycx",
              },
            });
          } else if (param == "fqd_sx_qx") {
            this.$router.push({
              path: "/allotOrCancel",
              query: {
                type: "sxjs",
              },
            });
          }
          this.$toast.clear();
        })
        .catch((err) => {
          console.log("error = " + JSON.stringify(err));
          this.$toast.clear();
        });
    },
  },
  computed: {},

  mounted() {
    console.log("本地地址Home - " + window.location.href);
    // var temp = window.location.search;
    // console.log("传入地址Home - " + temp);
    //禁止截屏（只在Android手机有用）

    let url = window.location.href;
    let temp = url.slice(url.indexOf("?"));
    console.log("传入参数截取：" + temp);
    param = getUrlQuery(temp, "param");

    // 获取AES加密key
    localStorage.setItem("aesKey", GetKey());
    this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    //获取接口管理平台Token
    ajaxGet(apiUrl.getToken.url, {
      grant_type: this.grant_type,
      client_id: this.chnlCode,
      client_secret: this.client_secret,
    })
      .then((res) => {
        console.log("获取token:" + JSON.stringify(res));
        localStorage.setItem("token", res.data.access_token);
        this.getMXToken();
      })
      .catch((error) => {
        this.$toast.clear();
      });

    hideWebViewTitle();
  },
};
</script>

<style scoped>
.Index {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
  position: relative;
}
.top {
  width: 100%;
  height: 40%;
  background-image: url("../assets/img/sy_banner_pic.png");
  background-size: 100% 100%;
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
  text-align: center;
}
.tupian {
  height: 22px;
}
.van-nav-bar {
  background-color: transparent;
}
.van-nav-bar__title {
  color: #ffffff;
}
.middle {
  width: 100%;
  top: 30%;
  /* position: absolute; */
  text-align: center;
  background-size: contain;
}
.image {
  border: 2px solid #ffa375;
  border-radius: 50%;
  object-fit: fill;
}
.content {
  /* position: absolute; */
  width: 100%;
  background-image: url("../assets/img/middle.png");
  background-size: 100% 100%;
  padding: 1px 0;
}
.tp {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
p.content1 {
  margin: 0;
  padding: 0;
  margin: 12px 0;
  color: #333333;
  font-size: 17px;
  font-weight: bold;
}
p.content2 {
  margin: 0;
  padding: 0;
  color: #999999;
  font-size: 14px;
}
div.content3 {
  /* padding-top: 10px; */
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}
.left,
.right {
  width: 50%;
  padding: 0 6px;
  line-height: var(--size-text-small);
  display: flex;
  justify-content: center;
  align-items: center;
}
.left img,
.right img {
  width: 14px;
  margin-right: 5px;
}
span.kh {
  color: #999999;
  font-size: var(--size-text-small);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.footer {
  text-align: center;
  /* position: absolute;
    top: 62%; */
  width: 90%;
  margin-left: 5%;
  margin-top: 4%;
}
.footer-bottom img {
  width: 30%;
}
.footer-top ul {
  line-height: 10px;
  display: flex;
  flex-wrap: wrap;
}
.footer-top ul li {
  width: 25%;
  text-align: center;
  margin-bottom: 35px;
}
.footer-top ul li img {
  width: 30px;
  height: 30px;
  /* margin-bottom: 6px; */
}
.footer-top ul li p {
  color: #333333;
  font-size: 12px;
}
.two {
  position: absolute;
  top: 30%;
  width: 100%;
}
#positionDetails {
  margin-left: 2px;
  width: 5px;
  height: 10px;
}
</style>