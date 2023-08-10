// 登录接口
import request from '../../utils/request.js'

const API = {
	// 登录
	LOGIN_URL: '/api/public/v1/users/wxlogin'
}
// 登录
export const reqLogin = (data) => {
	return request.post(API.LOGIN_URL, data)
}