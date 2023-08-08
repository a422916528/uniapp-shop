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
	// 改变商品勾选状态
	const changeState = (goods) => {
		const findResult = carts.value.find(item => item.goods_id === goods.goods_id)
		if (findResult) {
			findResult.goods_state = !goods.goods_state
		}
	}
	// 删除商品
	const removeGoods = (goods) => {
		carts.value = carts.value.filter(item => item.goods_id !== goods.goods_id)
	}
	// 全选和全不选
	const updateState = (state) => {
		carts.value.forEach(item => item.goods_state = state)
	}
	// 计算购物车商品总数
	const total = computed(() => {
		return carts.value.reduce((amt, current) => {
			return amt + current.goods_count
		}, 0)
	})
	// 计算已勾选的商品总数
	const checkedSum = computed(() => {
		return carts.value.filter(item => item.goods_state).reduce((total, item) => total + item.goods_count, 0)
	})
	// 计算已勾选商品的总价
	const checkedTotal = computed(() => {
		return carts.value.filter(item => item.goods_state).reduce((total, item) => total + item.goods_count * item
			.goods_price, 0)
	})
	return {
		carts,
		total,
		checkedSum,
		checkedTotal,
		addCart,
		clear,
		changeState,
		removeGoods,
		updateState
	}
}, {
	unistorage: true
})