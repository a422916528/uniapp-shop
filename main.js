// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif
// 封装弹窗方法
uni.$showMsg = (title = '数据请求失败', duration = 1500) => {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif