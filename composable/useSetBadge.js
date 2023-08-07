import {
	useCartStore
} from '../store/useCart.js'

export const setBadge = () => {
	const useCart = useCartStore()
	uni.setTabBarBadge({
		index: 2,
		text: useCart.total + ''
	})
}