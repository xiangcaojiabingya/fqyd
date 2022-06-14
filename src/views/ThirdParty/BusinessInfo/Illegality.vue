<template>
    <div class="Illegality">
        <item-nav-bar :title="title"></item-nav-bar>
        <div class="content">
            <top />
            <company-infoitem v-for="(item,index) in arrs" :itemInfo="item"></company-infoitem>
        </div>
    </div>
</template>

<script>
import CompanyInfoItem from "../components/CompanyInfoitem";
import ItemNavBar from "../components/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";

export default {
    name: "Illegality",
    components: {
        "company-infoitem": CompanyInfoItem,
        "item-nav-bar": ItemNavBar,
        Top
    },
    data() {
        return {
            title: "严重违法",
            arrs: [
                {
                    title: "标题",
                    title1: "列入原因：",
                    title2: "列入日期：",
                    value1: "-",
                    value2: "-"
                },
                {
                    title: "标题",
                    title1: "移出原因：",
                    title2: "移出日期：",
                    value1: "-",
                    value2: "-"
                }
            ]
        };
    },
    methods: {},
    computed: {}
};
</script>

<style scoped>
.Illegality {
    width: 100%;
    height: 100%;
    background-color: var(--color-Lightgray-bg);
    display: flex;
    flex-direction: column;
}
.content {
    margin-top: 46px;
}
</style>