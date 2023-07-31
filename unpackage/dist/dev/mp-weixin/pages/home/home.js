"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const swiperList = common_vendor.ref([]);
    const getSwiperList = async () => {
      const { data: res } = await utils_request.request.get("/api/public/v1/home/swiperdata");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      swiperList.value = res.message;
    };
    const navList = common_vendor.ref([]);
    const getNavList = async () => {
      const { data: res } = await utils_request.request.get("/api/public/v1/home/catitems");
      if (res.meta.status !== 200)
        return common_vendor.index.$showMsg();
      navList.value = res.message;
    };
    const navHandler = (item) => {
      if (item.name === "分类") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    };
    common_vendor.onReady(() => {
      getSwiperList();
      getNavList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (item, k0, i0) => {
          return {
            a: item.image_src,
            b: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`,
            c: item.goods_id
          };
        }),
        b: common_vendor.f(navList.value, (item, k0, i0) => {
          return {
            a: item.image_src,
            b: item.image_src,
            c: common_vendor.o(($event) => navHandler(item), item.image_src)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Web/WeChat/uniapp-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
