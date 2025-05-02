import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: JSON.parse(localStorage.getItem("cart") || "[]") as { id: number; qty: number }[],
  },
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) => {
      const itemInCart = state.data.find(
        (item) => item.id == action.payload.id
      );
      if (itemInCart) {
        itemInCart.qty++
      } else {
        state.data.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;