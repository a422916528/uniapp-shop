<script setup>
	import { ref, watch } from 'vue'
	import { onShow, onHide } from '@dcloudio/uni-app'
	import { useCartStore } from '/store/useCart.js'
	import { setBadge } from '/composable/useSetBadge.js'
	import Goods from '/components/goods/index'
	import Address from '/components/address/index.vue'
	import Settle from '/components/settle/index.vue'
	const useCart = useCartStore()
	// 默认图片
	const defaultImg = ref(
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
	)
	// 点击勾选按钮的回调
	const radioChange = (item) => {
		useCart.changeState(item)
	}
	// 数值发生改变的回调
	const numChange = () => {
		// 只是阻止冒泡事件，不具有任何逻辑操作
	}
	// 右滑配置项
	const options = ref([
		{
			text: '删除',
			style: {
				backgroundColor: '#c00000'
			}
		}
	])
	// 滑动点击删除回调
	const swipeClick = (goods) => {
		useCart.removeGoods(goods)
	}
	// 点击商品跳转到详情页面回调
	const gotoDetail = (goods) => {
		uni.navigateTo({
			url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
		})
	}
	let unWatch = null
	onShow(() => {
		// 设置购物车徽标
		setBadge()
		// 变化了重新设置
		unWatch = watch(
			() => useCart.total,
			(newVal) => {
				if (newVal !== 0) {
					uni.setTabBarBadge({
						index: 2,
						text: newVal + ''
					})
				}
				if (newVal === 0) {
					// 购物车为空移除徽标
					uni.removeTabBarBadge({
						index: 2
					})
				}
			}
		)
	})
	onHide(() => {
		// 关闭侦听器
		unWatch()
	})
</script>

<template>
	<view class="cart-container" v-if="useCart.carts.length > 0">
		<Address></Address>
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表 -->
		<view class="cart-list">
			<block v-for="item in useCart.carts" :key="item.goods_id">
				<uni-swipe-action ref="swipeAction">
					<uni-swipe-action-item
						:right-options="options"
						:key="item.goods_id"
						@click="swipeClick(item)"
					>
						<Goods :goodsItem="item" @click="gotoDetail" :defaultImg="defaultImg">
							<template #radio>
								<radio
									:checked="item.goods_state"
									style="margin-left: 5px"
									color="#c00000"
									@click.stop="radioChange(item)"
								></radio>
							</template>
							<template #count>
								<uni-section padding title="">
									<view @click.stop="numChange">
										<uni-number-box v-model="item.goods_count" :min="1" />
									</view>
								</uni-section>
							</template>
						</Goods>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</block>
		</view>
		<Settle></Settle>
	</view>
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="empty-text">空空如也~</text>
	</view>
</template>

<style lang="scss" scoped>
	.cart-container {
		background-color: #fff;
		padding-bottom: 50px;
		.cart-title {
			display: flex;
			height: 50px;
			align-items: center;
			padding: 0 10px;
			border-bottom: 1px solid #efefef;
			.cart-title-text {
				margin-left: 10px;
			}
		}
	}
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		.empty-img {
			width: 90px;
			height: 90px;
		}
		.empty-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
