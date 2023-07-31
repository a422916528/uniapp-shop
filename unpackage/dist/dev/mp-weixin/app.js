"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/cart/cart.js";
  "./pages/cate/cate.js";
  "./pages/my/my.js";
  "./subpkg/goods_detail/goods_detail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Web/WeChat/uniapp-shop/App.vue"]]);
require("./vue-devtools/hook.js");
require("./vue-devtools/backend.js");
common_vendor.index.$showMsg = (title = "数据请求失败", duration = 1500) => {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
