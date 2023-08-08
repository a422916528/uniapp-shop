<script setup>
	import { computed } from 'vue'
	import {} from '@dcloudio/uni-app'
	import { useCartStore } from '/store/useCart.js'
	const cartStore = useCartStore()

	// 计算全选按钮的勾选状态
	const isFullCheck = computed(() => {
		return cartStore.carts.every((item) => item.goods_state)
	})
	// 点击全选按钮
	const fullCheck = () => {
		cartStore.updateState(!isFullCheck.value)
	}
</script>

<template>
	<view class="settle-container">
		<!-- 全选 -->
		<view class="settle-ft">
			<label class="radio" @click="fullCheck">
				<radio color="#c00000" :checked="isFullCheck" />
				<text>全选</text>
			</label>
		</view>
		<!-- 合计 -->
		<view class="settle-center">
			合计:
			<text class="settle-text">￥{{ cartStore.checkedTotal.toFixed(2) }}</text>
		</view>
		<!-- 结算 -->
		<view class="settle-rt">结算({{ cartStore.checkedSum }})</view>
	</view>
</template>

<style lang="scss" scoped>
	.settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 50px;
		width: 100%;
		z-index: 999;
		display: flex;
		background-color: #fff;
		justify-content: space-between;
		align-items: center;
		padding: 0 5px;
		font-size: 14px;
		.settle-center {
			.settle-text {
				font-weight: 700;
				color: #c00000;
			}
		}
		.settle-rt {
			background-color: #c00000;
			line-height: 50px;
			padding: 0 40px;
			color: #fff;
		}
	}
</style>
