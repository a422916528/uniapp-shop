<script setup>
	import {} from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { useCartStore } from '/store/useCart.js'
	import { setBadge } from '/composable/useSetBadge.js'
	const useCart = useCartStore()

	onShow(() => {
		// 设置购物车徽标
		setBadge()
	})
</script>

<template>cart</template>

<style lang="scss" scoped></style>
