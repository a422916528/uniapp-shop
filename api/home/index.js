import request from '../../utils/request.js'
// 首页接口
const API = {
	// 轮播图
	SWIPER_URL: '/api/public/v1/home/swiperdata',
	// 导航分类
	CATE_URL: '/api/public/v1/home/catitems',
	// 楼层数据
	FLOOR_URL: '/api/public/v1/home/floordata'
}
// 获取轮播图
export const getSwiper = () => {
	return request.get(API.SWIPER_URL)
}
// 获取导航分类
export const getCate = () => {
	return request.get(API.CATE_URL)
}
// 获取楼层数据
export const getFloor = () => {
	return request.get(API.FLOOR_URL)
}