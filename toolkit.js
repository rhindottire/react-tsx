import { createAction, createReducer, configureStore } from "@reduxjs/toolkit"

const addToCart = createAction("ADD_TO_CART");
const login = createAction("CREATE_SESSION");
const logout = createAction("DESTROY_SESSION")

// reducer
const initialState = {
  cart: [],
};
const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(addToCart, (state, action) => {
    // state.cart = [...state.cart, action.payload];
    state.cart.push(action.payload);
  });
});

const initialSessionState = {
  status: false,
};
const sessionReducer = createReducer(initialSessionState, (builder) => {
  builder
    .addCase(login, (state) => {
      state.status = true;
    })
    .addCase(logout, (state) => {
      state.status = false;
    });
});

// store
const store = configureStore({
  // reducer: cartReducer
  reducer: {
    cart: cartReducer,
    session: sessionReducer,
  },
});
console.log("oncreate store :", store.getState());

// subscribe
store.subscribe(() => {
  console.log("Store Changes : ", store.getState());
  // console.dir(store.getState(), { depth: null });
  // console.log("Store Changes:", JSON.stringify(store.getState(), null, 2));
});

// dispatch
store.dispatch(login());
store.dispatch(addToCart({ id: 1, qty: 10 }));
store.dispatch(addToCart({ id: 2, qty: 20 }));
store.dispatch(logout());