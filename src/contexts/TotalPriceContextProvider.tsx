import { createContext, Dispatch, ReactNode, useReducer } from "react";
import totalPriceReducer, { Action } from "./TotalPriceContext";

const TotalPriceContext = createContext<{total: number} | null>(null);
const TotalPriceDispatchContext = createContext<Dispatch<Action> | null>(null);

export function TotalPriceProvider({ children }: { children: ReactNode }) {
  const [totalPrice, dispatch] = useReducer(totalPriceReducer, { total: 0 });

  return (
    <TotalPriceContext.Provider value={totalPrice}>
      <TotalPriceDispatchContext.Provider value={dispatch}>
        {children}
      </TotalPriceDispatchContext.Provider>
    </TotalPriceContext.Provider>
  );
}

export { TotalPriceContext, TotalPriceDispatchContext };