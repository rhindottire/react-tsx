import { TotalPriceContext, TotalPriceDispatchContext } from "../contexts/TotalPriceContextProvider";
import { useContext } from "react";

export function useTotalPrice() {
  const context = useContext(TotalPriceContext);
  if (!context) throw new Error("useTotalPrice must be used within TotalPriceProvider");
  return context;
}

export function useTotalPriceDispatch() {
  const context = useContext(TotalPriceDispatchContext);
  if (!context) throw new Error("useTotalPriceDispatch must be used within TotalPriceProvider");
  return context;
}