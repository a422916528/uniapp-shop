<script setup>
	import request from '../../utils/request.js'
	import { ref } from 'vue'
	import { onReady } from '@dcloudio/uni-app'

	// 存储轮播图
	const swiperList = ref([])
	// 获取轮播图数据
	const getSwiperList = async () => {
		const { data: res } = await request.get('/api/public/v1/home/swiperdata')
		if (res.meta.status !== 200) {
			return uni.$showMsg()
		}
		swiperList.value = res.message
	}

	// 存储导航
	const navList = ref([])
	// 获取导航数据
	const getNavList = async () => {
		const { data: res } = await request.get('/api/public/v1/home/catitems')
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
	onReady(() => {
		// 获取轮播图数据
		getSwiperList()
		// 获取导航数据
		getNavList()
	})
</script>

<template>
	<view>
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
	</view>
</template>

<style lang="scss">
	swiper {
		height: 330rpx;
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
</style>
