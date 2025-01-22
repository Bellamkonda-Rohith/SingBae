import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    totalItems: 0,
    total: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cart.find(cartItem => cartItem.id === item.id);

            // If the item is already in the cart, don't change the quantity
            if (!existingItem) {
                state.cart.push({ ...item, quantity: 1 });
                state.totalItems += 1; // Increment the totalItems only when a new item is added
                state.total += item.price; // Add the price of the new item to total
            }
        },

        incrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cart.find(cartItem => cartItem.id === itemId);

            if (item) {
                item.quantity += 1;
                state.total += item.price; // Add the price for the additional quantity
            }
        },

        decrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cart.find(cartItem => cartItem.id === itemId);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.total -= item.price; // Subtract the price for the reduced quantity
            }
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const index = state.cart.findIndex(item => item.id === itemId);

            if (index >= 0) {
                const item = state.cart[index];
                state.totalItems -= item.quantity; // Decrease total items count by the quantity removed
                state.total -= item.price * item.quantity; // Subtract the total price for the item
                state.cart.splice(index, 1); // Remove the item from the cart
            }
        },

        resetCart: state => {
            state.cart = [];
            state.totalItems = 0;
            state.total = 0;
        }
    }
})

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
