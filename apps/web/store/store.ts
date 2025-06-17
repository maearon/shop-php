import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import sessionReducer from "./sessionSlice"
import cartReducer from "./cartSlice"
import wishlistReducer from "./wishlistSlice"

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
