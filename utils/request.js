import {
	$http
} from '@escook/request-miniprogram'

const request = $http

// 请求的根路径
request.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
request.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})
}

// 响应拦截器
request.afterRequest = function() {
	uni.hideLoading()
}

export default request