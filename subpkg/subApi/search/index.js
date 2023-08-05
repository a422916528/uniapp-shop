import request from '/utils/request.js'
// 搜索建议接口
const API = {
	// 搜索建议
	SEARCH_URL: '/api/public/v1/goods/qsearch'
}

// 搜索建议
export const getSearchList = (keyWord) => {
	return request.get(API.SEARCH_URL, {
		query: keyWord
	})
}