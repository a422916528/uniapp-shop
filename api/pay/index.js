// 支付接口
import request from '../../utils/request.js'

const API = {
	// 创建订单
	CREATEPAY_URL: '/api/public/v1/my/orders/create',
	// 订单预支付
	READYPAY_URL: '/api/public/v1/my/orders/req_unifiedorder',
	// 支付完成
	PAY_URL: '/api/public/v1/my/orders/chkOrder'
}

// 创建订单
export const reqCreatePay = (data) => {
	return request.post(API.CREATEPAY_URL, data)
}
// 订单预支付
export const reqReadyPay = (order_num) => {
	return request.post(API.READYPAY_URL, order_num)
}
// 完成支付
export const reqPay = (order_num) => {
	return request.pos(API.PAY_URL, order_num)
}