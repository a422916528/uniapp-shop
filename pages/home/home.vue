<script setup>
	import request from '../../utils/request.js'
	import { ref } from 'vue'
	import { onReady } from '@dcloudio/uni-app'

	// 存储轮播图
	const swiperList = ref([])
	// 获取轮播图数据
	const getSwiperList = async () => {
		const { data: res } = await request.get('/api/public/v1/home/swiperdata')
		console.log(res)
		if (res.meta.status !== 200) {
			return uni.showToast({
				title: '数据请求失败',
				icon: 'none',
				duration: 1500
			})
		}
		swiperList.value = res.message
	}
	onReady(() => {
		getSwiperList()
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
</style>
