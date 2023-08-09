<script setup>
	import { ref, computed } from 'vue'
	import {} from '@dcloudio/uni-app'
	import { useUserStore } from '/store/useUser.js'
	const userStore = useUserStore()
	// 收货信息
	const address = ref({})
	// 点击收货地址的回调
	const chooseAddress = async () => {
		const res = await uni.chooseAddress().catch((err) => err)
		// 选择了收货地址
		if (res.errMsg === 'chooseAddress:ok') {
			// 存储到 pinia 中
			userStore.addAddressInfo(res)
		}
	}
</script>

<template>
	<!-- 选择收货地址 -->
	<view class="address-box" v-if="!userStore.address.provinceName">
		<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
	</view>
	<!-- 展示收货信息 -->
	<view class="address-info" v-else @click="chooseAddress">
		<view class="row1">
			<view class="row1-lf">收货人：{{ userStore.address.userName }}</view>
			<view class="row-rt">
				<view class="phone">电话：{{ userStore.address.telNumber }}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="row2">
			<view class="row2-address-text">收货地址：</view>
			<view class="row2-address-info">{{ userStore.shippingAddress || '' }}</view>
		</view>
	</view>
	<!-- 底部边框线 -->
	<image src="/static/cart_border@2x.png" mode="" class="address-border"></image>
</template>

<style lang="scss" scoped>
	.address-box {
		height: 90px;
		text-align: center;
		line-height: 90px;
	}
	.address-border {
		width: 100%;
		height: 5px;
		display: block;
	}
	.address-info {
		width: 100%;
		height: 90px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px 5px;
		overflow: hidden;
		.row1 {
			display: flex;
			justify-content: space-between;
			height: 35px;
			width: 100%;
			.row-rt {
				display: flex;
				justify-content: space-between;
			}
			border-bottom: 1px solid #efefef;
		}
		.row2 {
			width: 100%;
			display: flex;
			align-items: center;
			.row2-address-text {
				white-space: nowrap;
			}
		}
	}
</style>
