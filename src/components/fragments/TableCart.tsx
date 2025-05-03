import { useTotalPrice, useTotalPriceDispatch } from "../../hooks/useTotalPrice";
import { currency } from "../../lib/utils";
import { Product } from "../../services/product.service";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

interface CartItem {
  id: number;
  qty: number;
}

interface TableCartProps {
  products: Product[];
}

export default function TableCart({ products }: TableCartProps) {
  const cart = useSelector((state: { cart: { data: CartItem[] } }) => state.cart.data);
  const dispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        if (!product) return acc;
        return acc + product.price * item.qty;
      }, 0);
      dispatch({
        type: "UPDATE",
        payload: {
          total: sum,
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },[cart, products, dispatch]);

  const totalPriceRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (totalPriceRef.current) {
      totalPriceRef.current.style.display = cart.length > 0 ? "table-row" : "none";
    }
  }, [cart]);

  return (
    <table className="text-left table-auto border-separate border-spacing-x-5">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 && cart.map( (item ) => {
          const product = products.find((p: Product) => p.id === item.id);
          if (!product) return null;
          return (
            <tr key={ item.id }>
              <th>{ product.title.substring(0, 100) }</th>
              <th>{ currency( product.price ) }</th>
              <th>{ item.qty }</th>
              <th>{ currency( item.qty * product.price ) }</th>
            </tr>
          )
        })}
        <tr ref={ totalPriceRef }>
          <td colSpan={3}>
            <strong>Total Price:</strong>
          </td>
          <td>
            <b>{ currency(total) }</b>
          </td>
        </tr>
      </tbody>
    </table>
  );
};