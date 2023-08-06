<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { reqGoodsDetail } from '/subpkg/subApi/goodsDetail/index.js'
	// 商品详情信息
	const goodsInfo = ref({})

	// 获取商品详情请求
	const getGoodsDetail = async (goodsId) => {
		const { data: res } = await reqGoodsDetail(goodsId)
		if (res.meta.status !== 200) return uni.$showMsg()
		// 处理 img 字符串
		res.message.goods_introduce = res.message.goods_introduce
			.replace(/<img /g, "<img style='display: block;'")
			.replace(/webp/g, 'jpg')
		goodsInfo.value = res.message
	}
	// 点击图片预览的回调
	const preview = (index) => {
		// 图片预览
		uni.previewImage({
			current: index,
			urls: goodsInfo.value.pics.map((item) => item.pics_big)
		})
	}
	// 底部商品导航配置项
	const options = ref([
		{
			icon: 'shop',
			text: '店铺',
			infoBackgroundColor: '#007aff',
			infoColor: '#f5f5f5'
		},
		{
			icon: 'cart',
			text: '购物车',
			info: 2
		}
	])
	// 底部商品导航配置项
	const buttonGroup = ref([
		{
			text: '加入购物车',
			backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
			color: '#fff'
		}
	])
	// 点击立即购买按钮回调
	const onClick = () => {}
	// 点击加入购物车按钮回调
	const buttonClick = () => {
		// 跳转到购物车页面
		uni.switchTab({
			url: '/pages/cart/cart'
		})
	}
	onLoad((options) => {
		// 获取商品 id
		const goodsId = options.goods_id
		// 获取商品详情
		getGoodsDetail(goodsId)
	})
</script>

<template>
	<view class="goods-detail-container">
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
			:circular="true"
		>
			<swiper-item v-for="(item, index) in goodsInfo.pics" :key="item.pics_id">
				<image :src="item.pics_big" mode="" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{ goodsInfo?.goods_price }}</view>
			<!-- 商品主体区域 -->
			<view class="goods-body">
				<!-- 商品名字 -->
				<view class="goods-name">
					{{ goodsInfo.goods_name }}
				</view>
				<!-- 收藏 -->
				<view class="goods-collect">
					<uni-icons type="star" size="18" color="gary"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="freight">快递：免运费</view>
		</view>
		<!-- 商品介绍图片 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品导航 -->
		<view class="goods-carts">
			<uni-goods-nav
				:options="options"
				:fill="true"
				:button-group="buttonGroup"
				@click="onClick"
				@buttonClick="buttonClick"
			/>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.goods-detail-container {
		padding-bottom: 50px;
		swiper {
			height: 750rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.goods-info-box {
			padding: 10px;
			.goods-price {
				color: #c00000;
				font-size: 18px;
				margin: 10px 0;
			}
			.goods-body {
				display: flex;
				justify-content: space-between;
				.goods-name {
					font-size: 13px;
					margin-right: 10px;
				}
				.goods-collect {
					width: 120px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-left: 1px solid #efefef;
					color: gray;
				}
			}
			.freight {
				font-size: 12px;
				color: gray;
				margin-top: 10px;
			}
		}
		.goods-carts {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
