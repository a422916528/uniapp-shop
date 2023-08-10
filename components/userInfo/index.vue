<script setup>
	import { useUserStore } from '../../store/useUser.js'
	const userStore = useUserStore()
	// 点击退出的回调
	const logout = async () => {
		const res = await uni
			.showModal({
				title: '提示',
				content: '确定要退出吗?'
			})
			.catch((err) => err)
		// 点击确认
		if (res.confirm) {
			// 清空用户相关数据
			userStore.clear()
		}
	}
</script>

<template>
	<view class="my-userInfo-container">
		<!-- 头像和昵称 -->
		<view class="top-box">
			<image :src="userStore.userInfo.avatarUrl" mode="" class="avatar"></image>
			<view class="nickName">{{ userStore.userInfo.nickName }}</view>
		</view>
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第1个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第2个面板 -->
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" mode="" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" mode="" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" mode="" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" mode="" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第3个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15px"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15px"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15px"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.my-userInfo-container {
		height: 100vh;
		background-color: #f4f4f4;
		.top-box {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 50%;
				border: 2px solid #fff;
			}
			.nickName {
				font-size: 16px;
				font-weight: 700;
				color: #fff;
				margin-top: 10px;
			}
		}
		.panel-list {
			transform: translateY(-10px);
			padding: 0 10px;
			.panel {
				border-radius: 5px;
				background-color: #fff;
				padding: 10px 10px;
				margin-bottom: 10px;
				font-size: 15px;
				.panel-title {
					line-height: 35px;
					border-bottom: 1px solid #f4f4f4;
					margin-bottom: 5px;
				}
				.panel-list-item {
					display: flex;
					justify-content: space-between;
					line-height: 35px;
					margin-bottom: 5px;
				}
				.panel-body {
					display: flex;
					justify-content: space-between;
					.panel-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.icon {
							width: 35px;
							height: 35px;
						}
					}
				}
			}
		}
	}
</style>
