import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import colavolabReducer from "./colavolabSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    colavolab: colavolabReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
