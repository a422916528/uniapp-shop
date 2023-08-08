<script setup>
	const prop = defineProps(['goodsItem', 'defaultImg'])
	const emits = defineEmits(['click'])

	// 自定义事件
	const onClick = (item) => {
		emits('click', item)
	}
</script>

<template>
	<view class="goods-item" @click="onClick(prop.goodsItem)">
		<!-- 左侧图片 -->
		<view class="goods-item-left">
			<slot name="radio"></slot>
			<image
				:src="prop.goodsItem.goods_small_logo || prop.defaultImg"
				mode=""
				class="goods-img"
			></image>
		</view>
		<!-- 右侧描述 -->
		<view class="goods-item-right">
			<view class="goods-title">
				{{ prop.goodsItem.goods_name }}
			</view>
			<view class="goods-info">
				<view class="goods-price">￥{{ prop.goodsItem.goods_price }}</view>
				<slot name="count"></slot>
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
			display: flex;
			align-items: center;
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
				display: flex;
				justify-content: space-between;
				.goods-price {
					margin-top: 40px;
					font-size: 16px;
					color: #c00000;
				}
			}
		}
	}
</style>
