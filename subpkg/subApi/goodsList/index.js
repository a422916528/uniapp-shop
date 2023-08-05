import request from '/utils/request.js'
const API = {
	// 商品列表
	GOODSLIST: '/api/public/v1/goods/search'
}
// 获取商品列表
export const reqGoodsList = (params) => {
	return request.get(API.GOODSLIST, params)
}