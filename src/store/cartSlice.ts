import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
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
  reducers: {},
});

export default cartSlice.reducer;
