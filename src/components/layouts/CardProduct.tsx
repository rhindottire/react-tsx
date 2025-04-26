import { Link } from "react-router-dom";
import { currency } from "../../lib/utils";
import Button from "../elements/button/Button";

type CardProductProps = {
  children: React.ReactNode;
};

const CardProduct: React.FC<CardProductProps> & {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
} = ({ children }) => {
  return (
    <section aria-label="card-product" className="flex flex-col justify-between w-full h-[36rem]
      max-w-sm bg-neutral-950 border border-gray-200 rounded-lg shadow">
      { children }
    </section>
  );
};

const Header = ({ href, img, alt }: {
  href: string;
  img: string;
  alt?: string;
}) => {
  return (
    <Link to={ href } className="w-full h-96">
      <img src={ img } alt={ alt }
        className="w-full p-8"
      />
    </Link>
  );
};

const Body = ({ link, name, description }: {
  link: string;
  name: string;
  description?: string;
}) => {
  return (
    <div className="h-full px-5 pb-5">
      <Link to={ link }>
        <h1 className="text-xl font-semibold tracking-tight pb-3">{ name }</h1>
      </Link>
      <p className="text-sm line-clamp-3">{ description }</p>
    </div>
  );
};

const Footer = ({ id, price, handleAdd }: {
  id: number;
  price: number;
  handleAdd: (id:number) => void;
}) => {
  return (
    <div className="flex justify-between items-center gap-3 p-3">
      <span className="text-xl font-bold">{currency( price )}</span>
      <Button variant="bg-blue-500"
        onClick={() => handleAdd( id )}>
          Add To Cart
      </Button>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;