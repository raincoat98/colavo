import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: string;
  count: number;
  name: string;
  price: number;
}

export interface Discount {
  id: number;
  name: string;
  rate: number;
  items?: Item[];
}

export interface CartState {
  items: Item[];
  discounts: Discount[];
}

const initialState: CartState = {
  items: [],
  discounts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<Item[]>) {
      const newItems = action.payload.filter(newItem => {
        return !state.items.some(item => item.id === newItem.id);
      });
      state.items.push(...newItems);
    },
  },
});

export const { addItems } = cartSlice.actions;
export default cartSlice.reducer;
