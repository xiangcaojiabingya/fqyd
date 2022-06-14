<template>
    <div class="ChangeHistory">
        <item-nav-bar :title="title"></item-nav-bar>
        <div class="content">
            <Top />
            <company-infoitem v-for="(item,index) in arrs" :itemInfo="item"></company-infoitem>
        </div>
    </div>
</template>

<script>
import CompanyInfoItem from "../components/CompanyInfoitem";
import ItemNavBar from "../components/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";

export default {
    name: "ChangeHistory",
    components: {
        "company-infoitem": CompanyInfoItem,
        "item-nav-bar": ItemNavBar,
        Top
    },
    data() {
        return {
            title: "企业历史变更信息",
            arrs: [
                {
                    title: "标题",
                    title1: "变更时间：",
                    title2: "变更前内容：",
                    title3: "变更后内容：",
                    value1: "-",
                    value2: "-",
                    value3: "-"
                },
                {
                    title: "标题",
                    title1: "变更时间：",
                    title2: "变更前内容：",
                    title3: "变更后内容：",
                    value1: "-",
                    value2: "-",
                    value3: "-"
                }
            ]
        };
    },
    methods: {},
    computed: {}
};
</script>

<style scoped>
.ChangeHistory {
    width: 100%;
    height: 100%;
    background-color: var(--color-Lightgray-bg);
    display: flex;
    flex-direction: column;
}
.content {
    padding-top: 46px;
}
</style>