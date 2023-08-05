<script setup>
	import { getSearchList } from '/subpkg/subApi/search/index.js'
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	// 关键字存储
	const keyWord = ref('')
	// 搜索建议存储
	const searchList = ref([])
	// 历史记录搜索关键字列表
	const historyKeyWordList = ref([])
	// 搜索框防抖
	let timer = null
	// 搜索输入事件的回调
	const input = (val) => {
		// 实现防抖
		clearTimeout(timer)
		timer = setTimeout(() => {
			keyWord.value = val
			if (keyWord.value.trim() !== '') {
				// 获取搜索列表
				getSearch()
				// 保存搜索历史记录
				saveHistoryList()
			}
		}, 500)
	}
	// 存储搜索历史记录
	const saveHistoryList = () => {
		historyKeyWordList.value.unshift(keyWord.value)
		// 数组去重
		const st = new Set(historyKeyWordList.value)
		historyKeyWordList.value = Array.from(st)
		// 存储到本地储存
		uni.setStorageSync('keyWord', JSON.stringify(historyKeyWordList.value))
	}
	// 获取搜索建议列表
	const getSearch = async () => {
		const { data: res } = await getSearchList(keyWord.value)
		if (res.meta.status !== 200) return uni.$showMsg()
		// 存储到搜索建议列表
		searchList.value = res.message
	}
	// 点击每一项商品的回调
	const gotoDetail = (goods) => {
		// 跳转到商品详情页
		uni.navigateTo({
			url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
		})
	}
	// 清空搜索历史记录
	const clearHistory = () => {
		historyKeyWordList.value = []
		uni.setStorageSync('keyWord', '')
	}
	// 点击搜索历史 Tag 标签的回调
	const gotoSearch = (name) => {
		// 重新展示搜索列表
		keyWord.value = name
		getSearch()
	}
	onLoad(() => {
		// 读取本地存储中的搜索历史，uniapp 中 JSON.parse 不能为空 ''
		historyKeyWordList.value = JSON.parse(uni.getStorageSync('keyWord') || '[]')
	})
</script>

<template>
	<!-- 搜索区域 -->
	<view class="search-box">
		<uni-search-bar
			cancelButton="none"
			placeholder="请输入搜索内容"
			:radius="18"
			:focus="true"
			@input="input"
			v-model="keyWord"
		></uni-search-bar>
	</view>
	<!-- 搜索建议列表 -->
	<view class="suggest-list" v-if="keyWord">
		<view
			class="suggest-item"
			v-for="item in searchList"
			:key="item.goods_id"
			@click="gotoDetail(item)"
		>
			<view class="goods-name">{{ item.goods_name }}</view>
			<uni-icons type="forward" size="16"></uni-icons>
		</view>
	</view>
	<!-- 搜索历史 -->
	<view class="history-box" v-else>
		<view class="history-title">
			<text>搜索记录</text>
			<uni-icons type="trash" size="18" @click="clearHistory"></uni-icons>
		</view>
		<view class="history-list">
			<uni-tag
				type="default"
				:text="item"
				v-for="(item, index) in historyKeyWordList"
				:key="index"
				@click="gotoSearch(item)"
			/>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.search-box {
		background-color: #c00000;
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.suggest-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		.goods-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 14px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
		}
	}
	.history-box {
		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			line-height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		.history-list {
			display: flex;
			flex-wrap: wrap;
			padding: 0 10px;
			:deep(.uni-tag) {
				margin-top: 5px;
				margin-right: 5px;
				background-color: #efefef;
				border: 0;
				color: black;
			}
		}
	}
</style>
