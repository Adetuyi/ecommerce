import { createContext, useReducer } from 'react';
import { actions } from './actions/StoreContext';

export const StoreContext = createContext();

const initialState = {
	cart: { cartItems: [] },
};

function reducer(state, action) {
	switch (action.type) {
		case actions.ADD_CART: {
			const newItem = action.payload;

			const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);

			// If the item already is in cart, replace the item with the newItem else return the item
			// If not, just add the item
			const cartItems = existItem
				? state.cart.cartItems.map((item) => (item.name === existItem.name ? newItem : item))
				: [...state.cart.cartItems, newItem];

			return { ...state, cart: { ...state.cart, cartItems } };
		}
		default:
			return state;
	}
}

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
