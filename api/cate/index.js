import request from '../../utils/request.js'
// 分类页面接口
const API = {
	// 分类列表数据
	CATELIST_URL: '/api/public/v1/categories'
}

// 获取分类列表数据
export const getCateList = () => {
	return request.get(API.CATELIST_URL)
}