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
import * as Pinia from 'pinia'
import App from './App.vue'
import {
	createUnistorage
} from './uni_modules/pinia-plugin-unistorage'

export function createApp() {
	const app = createSSRApp(App)
	const store = Pinia.createPinia()
	// pinia 数据持久化注册
	store.use(createUnistorage())
	app.use(store)

	return {
		app,
		Pinia
	}
}
// #endif