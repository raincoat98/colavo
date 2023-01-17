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
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  discounts: [],
  totalPrice: 0,
};

function calculateTotalPrice(state: CartState) {
  let totalPrice = state.items.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  if (state.discounts.length > 0) {
    let discount = state.discounts.reduce(
      (acc, d) =>
        acc +
        (d.items
          ? d.rate *
            d.items.reduce((acc, item) => acc + item.price * item.count, 0)
          : 0),
      0
    );

    totalPrice -= discount;
  }
  return totalPrice;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<Item[]>) {
      const newItems = action.payload.filter(newItem => {
        return !state.items.some(item => item.id === newItem.id);
      });

      state.items.push(...newItems);
      state.totalPrice = calculateTotalPrice(state);
    },
    removeItems(state, action: PayloadAction<Item>) {
      state.items = state.items.filter(i => i.id !== action.payload.id);
      state.totalPrice = calculateTotalPrice(state);
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

      const updatedState = { ...state, items: updatedItems };
      updatedState.totalPrice = calculateTotalPrice(updatedState);
      return updatedState;
    },
    addDiscount(state, action: PayloadAction<Discount[]>) {
      let newDiscounts = action.payload;
      if (newDiscounts !== undefined) {
        let items = state.items;
        let discounts = [...state.discounts];
        newDiscounts.forEach(newDiscount => {
          if (discounts.some(discount => discount.id === newDiscount.id)) {
            console.warn(
              "discount with same id already exists, duplicate will be ignored"
            );
            return;
          }
          newDiscount.items = items;
          discounts.push(newDiscount);
        });
        return {
          ...state,
          discounts,
          totalPrice: calculateTotalPrice({ ...state, discounts }),
        };
      } else return state;
    },
    updateDiscount(
      state,
      action: PayloadAction<{ discount: Discount; item: Item[] }>
    ) {
      let { discount, item } = action.payload;
      if (discount !== undefined) {
        let discounts = state.discounts.map(d => {
          if (d.id === discount.id) {
            return { ...d, items: item };
          }
          return d;
        });
        return {
          ...state,
          discounts,
          totalPrice: calculateTotalPrice({ ...state, discounts }),
        };
      } else return state;
    },
    removeDiscount(state, action: PayloadAction<Discount>) {
      let discounts = state.discounts.filter(d => d.id !== action.payload.id);
      let totalPrice = calculateTotalPrice({ ...state, discounts });
      return { ...state, discounts, totalPrice };
    },
  },
});

export const {
  addItems,
  removeItems,
  updateItemCount,
  addDiscount,
  updateDiscount,
  removeDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
