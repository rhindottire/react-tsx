import Counter from "../components/layouts/Counter";
import Button from "../components/elements/button/Button";
import CardProduct from "../components/layouts/CardProduct";
import { useEffect, useRef, useState } from "react";
import { currency } from "../lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  href: string;
  img: string;
  alt: string;
  link: string;
  description: string;
}

interface CartItem {
  id: number;
  qty: number;
}

const products = [
  {
    id: 1,
    href: "https://github.com/Mufid-031",
    img: "/img/risqi.jpg",
    alt: "Gyattzilla Images",
    link: "#",
    name: "Brand New Risqi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum distinctio, alias adipisci odio incidunt ad expedita sint tenetur error labore?",
    price: 1000000,
  },
  {
    id: 2,
    href: "#",
    img: "/img/keyboard.jpg",
    alt: "Keyboard IMG",
    link: "#",
    name: "New Keyboard",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, adipisci?",
    price: 500000,
  },
  {
    id: 3,
    href: "#",
    img: "/img/sapu.jpg",
    alt: "Sapu IMG",
    link: "#",
    name: "Arlot Sapu Jagat",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique autem, quibusdam tempora molestiae quam labore corrupti saepe reprehenderit, dignissimos omnis corporis, velit neque quia placeat cumque sit eligendi quas maxime nulla iste error voluptas? Dignissimos totam provident magnam minus architecto, neque laudantium. Impedit laudantium asperiores nobis!",
    price: 6900000,
  },
];

const user = localStorage.getItem("username");

const ProductPage = () => {
  // const [cart, setCart] = useState<{ name: string; qty: number }[]>([]);
  // const [cart, setCart] = useState([{ id: 1, qty: 10 }]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []); // dependencies

  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        if (!product) return acc;
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },[cart]);

  const cartRef = useRef<CartItem[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const handleAddToCartRef = (id: number): void => {
    cartRef.current = [...cartRef.current, { id, qty: 1 }];
    localStorage.setItem("cart", JSON.stringify(cartRef.current));
  };
  const totalPriceRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (totalPriceRef.current) {
      totalPriceRef.current.style.display = cart.length > 0 ? "table-row" : "none";
    }
  }, [cart]);

  const handleAdd = (id: number) => {
    if(cart.find((item) => item.id === id )) {
      setCart(
        cart.map((item) => item.id === id ? { ...item, qty: item.qty + 1} : item)
      )
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  return (
    <>
      <div>
        <Counter />
      </div>
      <div className="flex justify-between items-center w-full p-3 bg-neutral-950">
      {/* Logo */}
      <h1 className="text-4xl font-bold 
        bg-gradient-to-br from-blue-500 via-cyan-300 to-green-500 
        bg-clip-text text-transparent 
        animate-gradient-x
        drop-shadow-[0_2px_4px_rgba(34,211,238,0.5)]">
        <strong>Next-Bitjhi</strong>
      </h1>

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
      </div>
    </div>
      <div className="flex justify-center text-white min-h-screen bg-neutral-900 overflow-x-hidden">
        <div className="flex flex-wrap w-3/4 p-5 gap-3">
          {products.map(( product ) => (
            <CardProduct key={ product.id }>
              <CardProduct.Header
                href={ product.href }
                img={ product.img }
                alt={ product.alt }
              />
              <CardProduct.Body
                link={ product.link }
                name={ product.name }
                description={ product.description }
              />
              <CardProduct.Footer
                id={ product.id }
                price={ product.price }
                handleAdd={() => handleAdd( product.id )}
              />
            </CardProduct>
          ))}
        </div>
        <div className="w-1/4">
          <h1 className="text-xl mt-8 ml-5 mb-2 font-bold bg-blue-600 w-max p-2 rounded-2xl">
            Cart
          </h1>
          {/* <ul>
            {cart.map(( item ) => (
              <li className="bg-slate-500 w-max p-2 rounded-2xl mt-2 text-white"
                key={ item.id }>
                  { item.id }
              </li>
            ))}
          </ul> */}
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
              {cart.map( (item ) => {
                const product = products.find((p: Product) => p.id === item.id);
                if (!product) return null;
                return (
                  <tr key={ item.id }>
                    <th>{ product.name }</th>
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
                  <b>{ currency(totalPrice) }</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductPage;