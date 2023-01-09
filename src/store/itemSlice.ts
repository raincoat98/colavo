import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  count: number;
  name: string;
  price: number;
}

export interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

const itemSlice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {
    addItems(state, action: PayloadAction<Item[]>) {
      //TODO: id 중복이 들어오면 안됨
      state.items.push(...action.payload);
    },

    removeItem(state, action: PayloadAction<Item[]>) {
      state.items = state.items.filter(item => {
        action.payload.filter(action => item.id === action.id);
      });
    },
  },
});

export const { addItems, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
