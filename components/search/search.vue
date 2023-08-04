<script setup>
	import {} from 'vue'
	import {} from '@dcloudio/uni-app'
	const props = defineProps({
		// 背景颜色
		bgColor: {
			type: String,
			default: '#c00000'
		},
		// 圆角尺寸
		radius: {
			type: Number,
			default: 18
		}
	})
	// 点击搜索的回调
	const gotoSearch = () => {
		uni.navigateTo({
			url: '/subpkg/search/search'
		})
	}
</script>

<template>
	<view class="my-search-container" :style="{ backgroundColor: bgColor }">
		<view class="my-search-box" :style="{ borderRadius: radius + 'px' }" @click="gotoSearch">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.my-search-container {
		position: fixed;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		z-index: 999;
		background-color: #c00000;
		.my-search-box {
			height: 36px;
			background-color: #fff;
			border-radius: 18px;
			text-align: center;
			line-height: 36px;
			width: 90%;
			.placeholder {
				margin-left: 5px;
			}
		}
	}
</style>
