<script setup>
	import { getCateList } from '../../api/cate/index.js'
	import { ref } from 'vue'
	import { onReady } from '@dcloudio/uni-app'
	// 存储分类列表数据
	const cateList = ref([])
	// 存储二级分类数据
	const cateLevel2 = ref([])
	// 获取分类数据
	const getCateListData = async () => {
		const { data: res } = await getCateList()
		if (res.meta.status !== 200) return uni.$showMsg()
		// 获取分类列表
		cateList.value = res.message
		// 获取第一级的二级分类展示(默认展示)
		cateLevel2.value = res.message[0].children
	}
	// 当前激活的索引
	const activeIndex = ref(0)
	// 二级分类渲染时的滚动距离
	const scrollTop = ref(0)
	// 点击每一项的回调
	const activeChange = (index) => {
		// 激活状态改变
		activeIndex.value = index
		// 获取对应一级分类索引下的二级分类
		cateLevel2.value = cateList.value[index].children
		// 重置二级分类滚动条的距离
		scrollTop.value = scrollTop.value === 0 ? 0.1 : 0
	}
	onReady(() => {
		getCateListData()
	})
</script>

<template>
	<view class="scroll-view-container">
		<!-- 左侧滑动 -->
		<scroll-view scroll-y="true" class="scroll-left">
			<view
				class="scroll-left-item"
				:class="{ active: activeIndex === index }"
				v-for="(item, index) in cateList"
				:key="item.cat_id"
				@click="activeChange(index)"
			>
				{{ item.cat_name }}
			</view>
		</scroll-view>
		<!-- 右侧滑动 -->
		<scroll-view scroll-y="true" class="scroll-right" :scroll-top="scrollTop">
			<view class="cate-lv2" v-for="item in cateLevel2" :key="item.cat_id">
				<!-- 二级分类标题 -->
				<view class="cate-lv2-title">/{{ item.cat_name }}/</view>
				<!-- 二级分类列表 -->
				<view class="cate-lv2-content">
					<!-- 每一项二级分类 -->
					<navigator
						class="cate-lv2-item"
						v-for="val in item.children"
						:key="val.cat_id"
						:url="`/subpkg/goods_list/goods_list?cid=${val.cat_id}`"
					>
						<image :src="val.cat_icon" mode=""></image>
						<text class="cate-lv2-item-title">{{ val.cat_name }}</text>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<style lang="scss" scoped>
	.scroll-view-container {
		display: flex;
		.scroll-left {
			width: 120px;
			height: 100vh;
			.scroll-left-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;
			}
			& .active {
				position: relative;
				background-color: #fff;
				&::before {
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
		.scroll-right {
			background-color: #fff;
			height: 100vh;
			.cate-lv2-title {
				font-size: 12px;
				font-weight: 700;
				text-align: center;
				padding: 15px 0;
			}
			.cate-lv2-content {
				display: flex;
				flex-wrap: wrap;
				.cate-lv2-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 33.33%;
					margin-bottom: 10px;
					& > image {
						width: 60px;
						height: 60px;
					}
					.cate-lv2-item-title {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
