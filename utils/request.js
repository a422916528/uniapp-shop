import {
	$http
} from '@escook/request-miniprogram'
import {
	useUserStore
} from '../store/useUser.js'

const request = $http

// 请求的根路径
request.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
request.beforeRequest = function(options) {
	const userStore = useUserStore()
	// 判断是否为权限接口
	if (options.url.includes('/my/')) {
		options.header.Authorization = userStore.token
	}
	uni.showLoading({
		title: '数据加载中...'
	})
}

// 响应拦截器
request.afterRequest = function() {
	uni.hideLoading()
}

export default request