import { configureStore, createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
  },
});

const sessionSlice = createSlice({
  name: "session",
  initialState: { status : false },
  reducers: {
    login(state) {
      state.status = true
    },
    logout(state) {
      state.status = false
    }
  }
});

// store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    session: sessionSlice.reducer,
  },
});
console.log("oncreate store :", store.getState());

// subscribe
store.subscribe(() => {
  console.log("Store Changes : ", store.getState());
});

// dispatch
store.dispatch(sessionSlice.actions.login());
store.dispatch(cartSlice.actions.addToCart( { id: 1, qty: 10} ));
store.dispatch(cartSlice.actions.addToCart( { id: 2, qty: 20} ));
store.dispatch(sessionSlice.actions.logout());