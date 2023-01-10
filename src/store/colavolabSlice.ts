import { Colavolab } from "../api/colavo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, Discount } from "./cartSlice";
export interface ColavolabItem {
  [key: string]: any;
}

interface ColavolabState {
  items: { [key: string]: Item };
  discounts: { [key: string]: Discount };
  currency_code: string;
}

const initialState: ColavolabState = {
  items: {} as { [key: string]: Item },
  discounts: {} as { [key: string]: Discount },
  currency_code: "",
};

const colavolabSlice = createSlice({
  name: "colavolab",
  initialState,
  reducers: {
    fetchColavolabData: (state, action: PayloadAction<Colavolab>) => {
      state.items = action.payload.items;
      state.discounts = action.payload.discounts;
      state.currency_code = action.payload.currency_code;
    },
  },
});

export const { fetchColavolabData } = colavolabSlice.actions;

export default colavolabSlice.reducer;
