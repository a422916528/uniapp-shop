"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const swiperList = common_vendor.ref([]);
    const getSwiperList = async () => {
      const { data: res } = await utils_request.request.get("/api/public/v1/home/swiperdata");
      console.log(res);
      if (res.meta.status !== 200) {
        return common_vendor.index.showToast({
          title: "数据请求失败",
          icon: "none",
          duration: 1500
        });
      }
      swiperList.value = res.message;
    };
    common_vendor.onReady(() => {
      getSwiperList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (item, k0, i0) => {
          return {
            a: item.image_src,
            b: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`,
            c: item.goods_id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Web/WeChat/uniapp-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
