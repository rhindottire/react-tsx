import { Link } from "react-router-dom";
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
    <div className="w-full max-w-sm bg-gray-800 border border-gray-200 rounded-lg shadow">
      {children}
    </div>
  );
};

const Header = ({href, img, alt}: {href: string; img: string; alt?: string;}) => {
  return (
    <Link to={href}>
      <img src={img} alt={alt} className="p-8 rounded-t-lg" />
    </Link>
  );
};

const Body = ({link, title, description}: {link: string; title: string; description?: string;}) => {
  return (
    <div className="px-5 pb-5">
      <Link to={link}>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </Link>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const Footer = ({ price }: { price: string }) => {
  return (
    <div className="flex justify-between items-centerm gap-3 px-3">
      <span className="text-xl font-bold">{price}</span>
      <Button variant="bg-blue-500">Add To Cart</Button>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;