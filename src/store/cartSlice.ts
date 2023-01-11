import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: string;
  count: number;
  name: string;
  price: number;
}

export interface Discount {
  id: string;
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
    removeItems(state, action: PayloadAction<Item>) {
      state.items = state.items.filter(i => i.id !== action.payload.id);
    },
    updateItemCount(
      state,
      action: PayloadAction<{ item: Item; itemCount: number }>
    ) {
      let item = action.payload.item;
      let count = action.payload.itemCount;

      let updatedItems = state.items.map(i =>
        i.id === item.id ? { ...i, count } : i
      );

      return { ...state, items: updatedItems };
    },
    addDiscount(state, action: PayloadAction<Discount[]>) {
      let discounts = action.payload;

      console.log(discounts);
      if (discounts !== undefined) {
        discounts.forEach(discount => (discount.items = state.items));
        return { ...state, discounts };
      } else return state;
    },
  },
});

export const { addItems, removeItems, updateItemCount, addDiscount } =
  cartSlice.actions;
export default cartSlice.reducer;
