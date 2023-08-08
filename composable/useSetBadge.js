import {
	useCartStore
} from '../store/useCart.js'

export const setBadge = () => {
	const useCart = useCartStore()
	if (useCart.total !== 0) {
		uni.setTabBarBadge({
			index: 2,
			text: useCart.total + ''
		})
	}
}