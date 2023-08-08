<script setup>
	import {} from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { setBadge } from '/composable/useSetBadge.js'
	onShow(() => {
		setBadge()
	})
</script>

<template>My</template>

<style lang="scss" scoped></style>
