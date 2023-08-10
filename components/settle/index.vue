<script setup>
	import { ref, computed } from 'vue'
	import { useCartStore } from '/store/useCart.js'
	import { useUserStore } from '../../store/useUser.js'
	import { reqCreatePay, reqReadyPay, reqPay } from '../../api/pay/index.js'
	const cartStore = useCartStore()
	const userStore = useUserStore()
	// 倒计时秒数
	const seconds = ref(3)
	// 计算全选按钮的勾选状态
	const isFullCheck = computed(() => {
		return cartStore.carts.every((item) => item.goods_state)
	})
	// 点击全选按钮
	const fullCheck = () => {
		cartStore.updateState(!isFullCheck.value)
	}
	// 点击结算按钮的回调
	const settle = () => {
		// 不符合结算条件
		if (!cartStore.checkedSum) return uni.$showMsg('请勾选商品')
		if (!userStore.address) return uni.$showMsg('请选择收货地址')
		// 跳转到登录页面
		if (!userStore.token) return navigateLogin()
		// 符合结算条件
		payOrder()
	}
	// 提示倒计时
	const showTips = (n) => {
		uni.showToast({
			icon: 'none',
			title: `请登录后再结算，${n}秒之后自动跳转到登录页面`,
			mask: true,
			duration: 1500
		})
	}
	let timer = null
	// 跳转到登录页面
	const navigateLogin = () => {
		// 显示倒计时
		showTips(seconds.value)
		timer = setInterval(() => {
			seconds.value--
			if (seconds.value <= 0) {
				clearInterval(timer)
				uni.switchTab({
					url: '/pages/my/my',
					complete() {
						// 重定向到本页面
						uni.setStorageSync(
							'redirect',
							JSON.stringify({ openType: 'switchTab', from: '/pages/cart/cart' })
						)
					}
				})
				seconds.value = 3
				return
			}
			showTips(seconds.value)
		}, 1000)
	}
	// 发起支付
	const payOrder = async () => {
		// 创建订单
		// 收集参数
		const params = {
			// order_price: cartStore.checkedTotal,
			order_price: 0.01,
			consignee_addr: userStore.address,
			goods: cartStore.carts
				.filter((item) => item.goods_state)
				.map((item) => {
					return {
						goods_id: item.goods_id,
						goods_number: item.goods_count,
						goods_price: item.goods_price
					}
				})
		}
		// 发起订单请求
		const { data: res } = await reqCreatePay(params)
		console.log('创建订单失败，接口问题', res)
		// if (res.meta.status !== 200) return uni.$showMsg('创建订单失败')
		// // 获取订单编号
		// const orderNumber = res.message.order_number
		// 假订单号
		const orderNumber = 'HMDD20200901000000001949'
		// 发起预支付请求
		const { data: res1 } = await reqReadyPay(orderNumber)
		// if (res1.meta.status !== 200) return uni.$showMsg('预支付订单失败')
		console.log('创建预支付订单失败，接口问题', res1)
		// 假订单参数
		const payInfo = {
			nonceStr: 'IYKlc5iscUgZIfxj',
			package: 'prepay_id=wx011604003115645ec1be4d4817ea70000',
			paySign: 'AD04ED5A386B52864E176A5DF26CF436',
			signType: 'MD5',
			timeStamp: +new Date() + ''
		}
		console.log(payInfo)
		// 完成支付，查询支付状态
		// const res2 = await uni.requestPayment(payInfo) // 无权限
		// const { data: res2 } = await reqPay(orderNumber)
		// if (res2.meta.status !== 200) return uni.$showMsg('订单未支付')
		uni.showToast({
			icon: 'success',
			title: '订单支付完成'
		})
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
		<view class="settle-rt" @click="settle">结算({{ cartStore.checkedSum }})</view>
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
