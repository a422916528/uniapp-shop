import {
	defineStore
} from 'pinia'
import {
	ref,
	computed
} from 'vue'

export const useCartStore = defineStore('cart', () => {
	// {goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state}
	// 购物车商品列表
	const carts = ref([])
	// 添加商品方法
	const addCart = (goods) => {
		const findResult = carts.value.find(item => item.goods_id === goods.goods_id)
		// 存在
		if (findResult) {
			// 数值加一
			findResult.goods_count++
		} else {
			// 不存在
			carts.value.push(goods)
		}
	}
	// 清空购物车方法
	const clear = () => {
		carts.value = []
	}
	// 计算购物车商品总数
	const total = computed(() => {
		return carts.value.reduce((amt, current) => {
			return amt + current.goods_count
		}, 0)
	})

	return {
		carts,
		total,
		addCart,
		clear
	}
}, {
	unistorage: true
})