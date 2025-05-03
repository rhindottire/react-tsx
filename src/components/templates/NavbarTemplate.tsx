import Button from "../elements/button/Button";
import { useLogin } from "../../hooks/useLogin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currency } from "../../lib/utils";
import { useTotalPrice } from "../../hooks/useTotalPrice";

interface CartItem {
  id: number;
  qty: number;
}

export default function NavbarTemplate() {
  const user = useLogin();
  const [totalCart, setTotalCart] = useState<number>(0);
  const cart = useSelector((state: { cart: { data: CartItem[] } }) => state.cart.data);
  const { total } = useTotalPrice();

  useEffect(() => {
    const sum = cart.reduce((acc: number, item: CartItem) => {
      return acc + item.qty;
    }, 0);
    setTotalCart(sum);
  }, [cart]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="flex justify-between items-center w-full p-3 bg-neutral-950">
      {/* Logo */}
      <h1 className="text-4xl font-bold 
        bg-gradient-to-br from-blue-500 via-cyan-300 to-green-500 
        bg-clip-text text-transparent 
        animate-gradient-x
        drop-shadow-[0_2px_4px_rgba(34,211,238,0.5)]">
        <strong>Next-Bitjhi</strong>
      </h1>

      {/* search */}
      <div className="flex-1 max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-full border-2 border-cyan-500/30
            bg-neutral-800 text-white placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-cyan-400
            transition-all duration-300"
        />
      </div>

      {/* user and logout */}
      <div className="flex items-center gap-4">
        <p className="text-xl bg-gradient-to-r from-green-400 to-cyan-400 
          bg-clip-text text-transparent font-medium hover:text-blue-500 hover:underline">
          Welcome {user ? user : "ACUMALAKA"}
        </p>

        <Button
          variant="bg-gradient-to-br from-blue-600 to-cyan-500
            hover:from-blue-500 hover:to-cyan-400
            text-white px-6 py-2 rounded-full
            transform hover:scale-105 transition-all
            shadow-lg shadow-blue-500/20"
          onClick={handleLogout}>
          Logout
        </Button>

        <div className="flex items-center py-2 px-4 rounded-md ml-5 bg-white">
          { totalCart } Items | { currency(total) }
        </div>
      </div>
    </nav>
  );
};