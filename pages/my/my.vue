<script setup>
	import {} from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { setBadge } from '/composable/useSetBadge.js'
	import Login from '/components/login/index.vue'
	import UserInfo from '/components/userInfo/index.vue'
	import { useUserStore } from '../../store/useUser.js'
	const userStore = useUserStore()
	onShow(() => {
		setBadge()
	})
</script>

<template>
	<Login v-if="!userStore.token"></Login>
	<UserInfo v-else></UserInfo>
</template>

<style lang="scss" scoped></style>
