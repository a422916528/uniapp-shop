import request from '/utils/request.js'
const API = {
	// 商品详情
	GOODSDETAIL_URL: '/api/public/v1/goods/detail'
}
// 获取商品详情
export const reqGoodsDetail = (id) => {
	return request.get(API.GOODSDETAIL_URL, {
		goods_id: id
	})
}