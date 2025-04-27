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
    <section aria-label="card-product" className="flex flex-col justify-between w-full h-[40rem]
      max-w-sm bg-neutral-950 border border-gray-200 rounded-lg shadow">
      { children }
    </section>
  );
};

const Header = ({ image, alt }: {
  image: string;
  alt?: string;
}) => {
  return (
    <div className="w-full h-96 overflow-hidden">
      <img src={ image } alt={ alt }
        className="w-full h-full object-cover p-8 rounded-4xl"
      />
    </div>
  );
};

const Body = ({ title, description }: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="h-full px-5 pb-5">
      <h1 className="text-xl font-semibold tracking-tight pb-3">{ title }</h1>
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