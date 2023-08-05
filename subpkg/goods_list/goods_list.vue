<script setup>
	import { ref } from 'vue'
	import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
	import { reqGoodsList } from '/subpkg/subApi/goodsList/index.js'
	// 请求服务器的参数
	const params = ref({
		query: '',
		cid: '',
		pagenum: 1,
		pagesize: 10
	})
	// 总数
	const total = ref(0)
	// 商品列表
	const goodsList = ref([])
	// 默认图片
	const defaultImg = ref(
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
	)
	// 节流阀控制
	const isLoading = ref(false)
	// 获取商品列表数据
	const getGoodsList = async (cb) => {
		// 打开节流阀
		isLoading.value = true
		const { data: res } = await reqGoodsList(params.value)
		// 关闭节流阀
		isLoading.value = false
		// 关闭下拉刷新效果
		cb && cb()
		if (res.meta.status !== 200) return uni.$showMsg()
		goodsList.value = [...goodsList.value, ...res.message.goods]
		total.value = res.message.total
	}
	// 点击商品跳转到详情页面回调
	const gotoDetail = (goods) => {
		uni.navigateTo({
			url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
		})
	}
	onReachBottom(() => {
		// 判断是否加载完毕
		if (params.value.pagenum * params.value.pagesize >= total.value) {
			return uni.$showMsg('没有更多了...')
		}
		// 节流阀控制
		if (isLoading.value === true) return
		// 页码值加一
		params.value.pagenum++
		getGoodsList()
	})
	onPullDownRefresh(() => {
		// 重置数据
		params.value.pagenum = 1
		goodsList.value = []
		total.value = 0
		// 重新发起请求
		getGoodsList(() => uni.stopPullDownRefresh())
	})
	onLoad((options) => {
		// 保存参数
		params.value.query = options.query || ''
		params.value.cid = options.cid || ''
		// 获取商品列表
		getGoodsList()
	})
</script>

<template>
	<view class="goods-list">
		<view
			class="goods-item"
			v-for="item in goodsList"
			:key="item.goods_id"
			@click="gotoDetail(item)"
		>
			<!-- 左侧图片 -->
			<view class="goods-item-left">
				<image :src="item.goods_small_logo || defaultImg" mode="" class="goods-img"></image>
			</view>
			<!-- 右侧描述 -->
			<view class="goods-item-right">
				<view class="goods-title">
					{{ item.goods_name }}
				</view>
				<view class="goods-info">
					<view class="goods-price">￥{{ item.goods_price }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.goods-item {
		display: flex;
		padding: 10 5px;
		border-bottom: 1px solid #f0f0f0;
		.goods-item-left {
			.goods-img {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 5px;
			padding: 10px 0;
			.goods-title {
				font-size: 13px;
			}
			.goods-info {
				.goods-price {
					font-size: 16px;
					color: #c00000;
				}
			}
		}
	}
</style>
