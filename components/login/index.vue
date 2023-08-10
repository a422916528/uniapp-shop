<script setup>
	import { useUserStore } from '../../store/useUser.js'
	import { reqLogin } from '../../api/login/index.js'
	const userStore = useUserStore()
	// 点击登录按钮的回调
	const getUserInfo = () => {
		uni.getUserProfile({
			desc: '完善个人资料',
			success(res) {
				if (res.errMsg === 'getUserProfile:ok') {
					// 存储用户信息
					userStore.updateUserInfo(res.userInfo)
					// 获取 token
					getToken(res)
					// 重定向到上次页面
					const redirect = JSON.parse(uni.getStorageSync('redirect') || '{}')
					if (redirect.from) {
						// 跳转到上次页面
						uni.switchTab({
							url: redirect.from,
							complete() {
								// 清空本地存储中的重定向数据
								uni.removeStorageSync('redirect')
							}
						})
					}
				}
			},
			fail(res) {
				if (res.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了登录授权')
			}
		})
	}
	// 获取 token
	const getToken = async (info) => {
		// 获取 code 对应的值
		const res = await uni.login().catch((err) => err)
		if (res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
		// 准备参数
		const params = {
			code: res.code,
			encryptedData: info.encryptedData,
			iv: info.iv,
			rawData: info.rawData,
			signature: info.signature
		}
		// 目前接口获取不了
		// const result = await reqLogin(params)
		// 设置假 Token
		const token =
			'Bearer eyJhbGc101JIUzI1NiIsInRScCI6IkpXVCJ9.eyJ1aNQ10jEyLCJpYXQ10jE1MjUOMDIyMjMsImV4cCI6MTUyNTQ40DYyM30.g-4GtEQNPwT_XsOPq7Lrco_9DfHQQsB1OKZerk0-0-o'
		userStore.updateToken(token)
	}
</script>

<template>
	<view class="login-container">
		<!-- 登录图标 -->
		<uni-icons type="contact-filled" size="100" color="#afafaf" class="login-img"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="login-btn" @click="getUserInfo">一键登录</button>
		<!-- 提示文字 -->
		<text class="login-tip">登录后尽享更多权益</text>
	</view>
</template>

<style lang="scss" scoped>
	.login-container {
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 100px;
		.login-img {
		}
		.login-btn {
			display: block;
			width: 90%;
			border-radius: 100px;
			background-color: #c00000;
			margin-top: 10px;
		}
		.login-tip {
			margin-top: 10px;
			color: gray;
			font-size: 12px;
		}
	}
</style>
