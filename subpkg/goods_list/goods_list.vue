<script setup>
	import { ref } from 'vue'
	import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
	import { reqGoodsList } from '/subpkg/subApi/goodsList/index.js'
	import Goods from '/components/goods/index.vue'
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
		<block v-for="item in goodsList" :key="item.goods_id">
			<Goods :goodsItem="item" :defaultImg="defaultImg" @click="gotoDetail"></Goods>
		</block>
	</view>
</template>

<style lang="scss" scoped></style>