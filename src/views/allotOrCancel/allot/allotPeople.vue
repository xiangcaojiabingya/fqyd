<template>
  <div class="allot_people">
    <item-nav-bar title="分配客户经理" class="header"></item-nav-bar>
    <div class="main_body">
      <div class="search">
        <input type="text" class="search_input" placeholder="请输入客户名称" v-model="role" />
        <div class="search_text" @click="searchRole">
          <span>搜索</span>
        </div>
      </div>
      <div class="recommend">
        <div class="recommend_manage" v-show="isShowManage">
          <!-- <div> -->
          <div>
            <img src="@/assets/img/icon_khjl_28.png" class="recommend_icon" />
            <span>推荐客户经理：</span>
          </div>
          <div class="recommend_item_b">
            <span>{{ manage }}({{loginAccount}})</span>
            <span>{{reOrganName}}</span>
          </div>
          <!-- </div> -->
        </div>
        <div class="recommend_item_a">
          <div>
            <img src="@/assets/img/icon_jg_28.png" class="recommend_icon" />
            <span>推荐机构：</span>
            <span>{{ organization }}</span>
          </div>
        </div>
      </div>
      <div class="allocation" id="allocation">
        <van-collapse v-model="groupName" accordion>
          <van-collapse-item
            v-for="(item, index) in childGroup"
            :disabled="item.members.length=='0' ? true : false"
            :key="index"
            :id="'collapse'+index"
          >
            <template #title>
              <div>
                <span class="cell_title">{{ item.groupName }}</span>
              </div>
            </template>
            <div
              class="collapse_cell"
              v-for="(itemChild, index_c) in item.members"
              :key="index_c"
              :class="item.members.length - 1 <= index_c ? '' : 'bottom_padding'"
              @click="SelectManager(index_c, index, itemChild,0, item.groupName)"
              :id="'cell' + index + index_c"
            >
              <div class="cell_span">
                <span>{{ itemChild.userName }} ({{ itemChild.loginAccount }})</span>
              </div>
              <img
                src="@/assets/img/icon_xz.png"
                class="select_cell_icon"
                :id="'icon' + index + index_c"
              />
            </div>
            <!-- <van-radio-group v-model="allocatRadio">
              <van-radio
                v-for="(itemChild, index_c) in item.customs"
                :key="index_c"
                :name="itemChild.customId"
                @click="selectManage(item.id, itemChild.customId)"
                :class="
                  item.customs.length - 1 <= index_c
                    ? 'last_padding'
                    : 'bottom_padding'
                "
                >{{ itemChild.customName }} ({{ itemChild.customId }})
                <template #icon="props">
                  <img
                    :src="props.checked ? activeIcon : inactiveIcon"
                    class="radio_img"
                  />
                </template>
              </van-radio>
            </van-radio-group>-->
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>

    <div class="bottom_div">
      <van-button
        round
        type="info"
        plain
        color="#ff6619"
        size="large"
        class="btn1"
        @click="cancelBtn"
      >取消</van-button>
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="next_btn"
        @click="confirmBtn"
      >确定</van-button>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
export default {
  name: "alloptPeople",
  components: {
    ItemNavBar,
  },
  props: {},
  data() {
    return {
      groupMember: [], //推荐机构中所有团队成员
      empNo: this.$route.query.empNo,
      orgId: this.$route.query.orgId,
      applyId: this.$route.query.applyId,
      processId: this.$route.query.processId,
      taskId: this.$route.query.taskId,
      flowId: this.$route.query.flowId,
      orderContent: "",
      orderAttachment: "",
      orderOther: "",
      orderId: "",
      userId: "", //选择的客户经理Id
      roleIds: [], //角色ID
      role: "", // 客户名称
      manage: "", // 推荐客户经理
      reOrganName: "", //推荐客户经理所在机构
      loginAccount: "", //推荐客户经理工号
      childGroup: [],
      organization: "", // 推荐机构
      groupName: "--", // 折叠面板机构
      allocatRadio: "", // 折叠面板可选客户经理
      isShowManage: false, //是否展示推荐客户经理
    };
  },
  watch: {},
  computed: {},
  methods: {
    getOrderContent() {
      var data = {
        flowId: this.flowId,
      };
      ajaxPostPlus(apiUrl.queryOrderContent, data)
        .then((res) => {
          this.orderContent = res.orderContent;
          this.orderOther = res.orderOther;
          // this.orderAttachment=res.orderAttachment;
          this.orderId = res.orderId;
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    getData() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      //查询房权贷团队及成员
      ajaxPostPlus(apiUrl.queryNextTreeNodeUser, {
        applyId: this.applyId,
        processId: this.processId,
        taskId: this.taskId,
      })
        .then((res) => {
          try {
            for (let index = 0; index < res.length; index++) {
              const element = res[index];
              if (element.groupId == this.orgId) {
                this.organization = element.groupName;
              }
              this.childGroup = element.childGroup;
              for (
                let index_group = 0;
                index_group < this.childGroup.length;
                index_group++
              ) {
                if (this.childGroup[index_group].groupId == this.orgId) {
                  this.organization = this.childGroup[index_group].groupName;
                }
                const memGroup = this.childGroup[index_group].members;
                for (
                  let index_memb = 0;
                  index_memb < memGroup.length;
                  index_memb++
                ) {
                  let memb = memGroup[index_memb];
                  memb.groupIndex = index_group;
                  memb.memberIndex = index_memb;
                  this.groupMember.push(memb);
                }
              }
            }
          } catch (error) {
            this.$toast("获取数据失败");
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
      //查询推荐分配的客户经理
      ajaxPostPlus(apiUrl.queryUserInFoByEmpNo, {
        empNo: this.empNo,
        // empNo: '81001864',
      })
        .then((res) => {
          try {
            this.manage = res.name;
            this.reOrganName = res.organName;
            this.loginAccount = res.loginAccount;
            //如果推荐客户经理信息为空，则不展示
            if (
              this.manage == null &&
              this.reOrganName == null &&
              this.loginAccount == null
            ) {
              this.isShowManage = false;
            } else {
              this.isShowManage = true;
            }
          } catch (error) {
            this.$toast("获取数据失败");
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    // 搜索
    searchRole() {
      let manager = [];
      manager = this.groupMember.filter((item) => item.userName === this.role);
      if (manager.length != 0) {
        for (var i = 0; i <= this.childGroup.length; i++) {
          if (manager[0].groupIndex == i) {
            this.groupName = manager[0].groupIndex;
            this.$nextTick(() => {
              this.SelectManager(
                manager[0].memberIndex,
                manager[0].groupIndex,
                manager[0],
                1
              );
            });
          }
        }
      } else {
        this.$toast("推荐机构下无该客户经理");
      }
    },
    // 选择机构和客户经理
    SelectManager(index_c, index, item, flag, name) {
      // index_c是选择的机构下的客户经理的序号
      // index是选择的机构序号
      // item是选择的客户经理的json对象数据
      // name是选择的机构
      this.roleIds = item.roleIds;
      this.userId = item.userId;
      var allocation = document.getElementById("allocation");
      for (var i = 0; i < this.childGroup.length; i++) {
        for (var j = 0; j < this.childGroup[i].members.length; j++) {
          var cell = document.getElementById("cell" + i + j);
          var icon = document.getElementById("icon" + i + j);
          var collapse = document.getElementById("collapse" + i);
          if (i == index && j == index_c) {
            if (flag == 1) {
              var collapseTop = collapse.offsetTop;
              var cellTop = cell.offsetTop;
              allocation.scrollTop = collapseTop + cellTop - cell.clientHeight;
            }
            cell.style.background = "#fef6ef";
            icon.style.opacity = "1";
          } else {
            if (cell != null) {
              cell.style.background = "#ffffff";
              icon.style.opacity = "0";
            }
          }
        }
      }
    },
    // 取消按钮
    cancelBtn() {
      this.$router.go(-1);
    },
    // 确定按钮
    confirmBtn() {
      if (this.userId == "") {
        this.$toast("您尚未选择客户经理");
      } else {
        var data = {
          flowIdList: [this.flowId], //	流程编号List<String>
          orderAttachment: this.orderAttachment, //进件附件
          orderContent: this.orderContent, //进件详情
          reply: "2", //审批结果 通过
          orderId: this.orderId, //工作流编号
          orderOther: this.orderOther,
          taskId: this.taskId, //	任务编号
          roleIdList: this.roleIds, //	角色编号列表
          userIdList: [this.userId], //	用户编号列表
          operator: localStorage.getItem("operatorId"), //	操作人
          fraudPost: "0",
        };
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "加载中...",
          loadingType: "spinner",
        });
        ajaxPostPlus(apiUrl.submit, data)
          .then((res) => {
            this.$toast.clear();
            this.$toast("分配成功");
            setTimeout(() => {
              this.$router.go(-2);
            }, 500);
          })
          .catch((err) => {
            this.$toast.clear();
            this.$toast("分配失败");
          });
      }
    },
  },
  created() { },
  mounted() {
    this.getData();
    this.getOrderContent();
  },
};
</script>

<style scoped>
.allot_people {
  width: 100%;
  position: relative;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.main_body {
  /* padding-top: 46px; */
  position: fixed;
  height: 100%;
  left: 0;
  top: 46px;
  width: 100%;
  z-index: 99;
  display: flex;
  flex-direction: column;
}
/* 搜索框 */
.search {
  padding: 12px 15px;
  background: #ffffff;
  top: 46px;
  display: flex;
  flex-direction: row;
}
.search_input {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  border: none;
  background: #f1f1f1;
  border-radius: 10px;
  padding: 0 10px;
  color: var(--color-black-text);
  font-size: 14px;
  text-align: center;
}
.search_text {
  padding-left: 15px;
  font-size: 14px;
  height: 32px;
  white-space: nowrap;
  line-height: 32px;
  cursor: pointer;
  color: var(--color-orange-text);
}
input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: var(--color-gray-text);
  font-size: 14px;
  text-align: center;
}
/* 推荐 */
.recommend {
  padding: 20px 15px;
  font-size: var(--size-text-small);
  line-height: 2;
  background: #ffffff;
  margin: 12px 0;
}
.recommend_item_a {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.recommend_item_b {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.recommend_icon {
  width: 14px;
  height: 14px;
  margin-right: 5px;
}
.recommend_manage {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
}
/* 选择机构 */
.allocation {
  position: relative;
  overflow-y: scroll;
  width: 100%;
  left: 0;
  margin-bottom: 120px;
}
/* 机构名称 */
.cell_title {
  font-size: 15px;
  line-height: 30px;
}
/* 折叠面板内容 */
.collapse_cell {
  height: 42px;
  font-size: 14px;
  color: var(--color-black-text);
  line-height: 42px;
  display: flex;
  flex-direction: row;
  padding: 0 12px;
  align-items: center;
  background-color: #ffffff;
}
.bottom_padding {
  padding-bottom: 0px;
}
.last_padding {
  padding-bottom: 0px;
}
.cell_span {
  width: 100%;
}
/* 选择后的图表 */
.select_cell_icon {
  width: 16px;
  height: 14px;
  opacity: 0;
}
/* 按钮 */
.bottom_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 20px;
  box-sizing: border-box;
  padding: 0 12px;
  z-index: 99;
}
.btn1 {
  margin-right: 12px;
  height: 40px;
}
.next_btn {
  height: 40px;
}
</style>