import {
	defineStore
} from 'pinia'
import {
	ref,
	computed
} from 'vue'

export const useUserStore = defineStore('user', () => {
	// 存储用户姓名地址电话相关
	const address = ref({})
	// 存储 token
	const token = ref('')
	// 存储用户信息
	const userInfo = ref({})
	// 获取用户信息
	const updateUserInfo = (user) => {
		userInfo.value = user
	}
	// 添加地址信息
	const addAddressInfo = (addressObj) => {
		address.value = addressObj
	}
	// 添加 token 
	const updateToken = (tokenStr) => {
		token.value = tokenStr
	}
	// 清空数据
	const clear = () => {
		address.value = {}
		token.value = ''
		userInfo.value = {}
	} // 计算收货地址
	const shippingAddress = computed(() => {
		return (
			address.value.provinceName +
			address.value.cityName +
			address.value.countyName +
			address.value.detailInfo
		)
	})
	return {
		address,
		token,
		userInfo,
		shippingAddress,
		addAddressInfo,
		updateUserInfo,
		updateToken,
		clear
	}
}, {
	unistorage: true
})