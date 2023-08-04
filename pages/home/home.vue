<script setup>
	import request from '../../utils/request.js'
	import { ref } from 'vue'
	import { onReady } from '@dcloudio/uni-app'
	import { getSwiper, getCate, getFloor } from '../../api/home/index.js'
	import mySearch from '../../components/search/search.vue'

	// 存储轮播图
	const swiperList = ref([])
	// 获取轮播图数据
	const getSwiperList = async () => {
		const { data: res } = await getSwiper()
		if (res.meta.status !== 200) {
			return uni.$showMsg()
		}
		swiperList.value = res.message
	}

	// 存储导航
	const navList = ref([])
	// 获取导航数据
	const getNavList = async () => {
		const { data: res } = await getCate()
		if (res.meta.status !== 200) return uni.$showMsg()
		navList.value = res.message
	}
	// 点击导航跳转页面
	const navHandler = (item) => {
		// 去往分类页面
		if (item.name === '分类') {
			uni.switchTab({
				url: '/pages/cate/cate'
			})
		}
	}

	// 存储楼层数据
	const floorList = ref([])
	// 获取楼层数据
	const getFloorList = async () => {
		const { data: res } = await getFloor()
		if (res.meta.status !== 200) return uni.$showMsg()
		// 处理数据中的 url 地址
		res.message.forEach((item) => {
			item.product_list.forEach((prod) => {
				prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
			})
		})
		floorList.value = res.message
	}
	onReady(() => {
		// 获取轮播图数据
		getSwiperList()
		// 获取导航数据
		getNavList()
		// 获取楼层数据
		getFloorList()
	})
</script>

<template>
	<view>
		<!-- 搜索区域 -->
		<view class="search-box">
			<my-search></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="500"
			:circular="true"
		>
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator
					class="swiper-item"
					:url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"
				>
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view
				class="nav-item"
				v-for="item in navList"
				:key="item.image_src"
				@click="navHandler(item)"
			>
				<image :src="item.image_src" mode="" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="item in floorList" :key="item.floor_title.image_src">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-img-box">
					<navigator
						class="floor-img"
						v-for="val in item.product_list"
						:key="val.image_src"
						:url="val.url"
					>
						<image :src="val.image_src" mode=""></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	.search-box {
		position: fixed;
		top: 0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;
		margin-top: 50px;
		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}
	.nav-list {
		margin-top: 10rpx;
		display: flex;
		justify-content: space-around;
		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-item {
		margin-top: 20rpx;
		.floor-title {
			width: 100%;
			height: 60rpx;
		}
		.floor-img-box {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(2, 232rpx);
			padding: 0 10rpx;
			gap: 10rpx;
			.floor-img {
				& > image {
					width: 100%;
					height: 100%;
				}
				&:nth-child(1) {
					grid-row: 1 / 3;
				}
			}
		}
	}
</style>
