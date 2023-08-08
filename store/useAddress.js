import {
	defineStore
} from 'pinia'
import {
	ref,
	computed
} from 'vue'

export const useAddressStore = defineStore('address', () => {
	// 存储用户姓名地址电话相关
	const address = ref({})
	// 添加地址信息
	const addAddressInfo = (addressObj) => {
		address.value = addressObj
	}
	// 计算收货地址
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
		shippingAddress,
		addAddressInfo,
	}
}, {
	unistorage: true
})