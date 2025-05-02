import CardProduct from "../components/layouts/CardProduct";
import { Fragment, useEffect, useState } from "react";
import { getProducts, Product } from "../services/product.service";
import NavbarTemplate from "../components/templates/NavbarTemplate";
import TableCart from "../components/fragments/TableCart";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts((data: Product[]) => {
      setProducts(data);
    });
  }, []);

  return (
    <Fragment>
      <NavbarTemplate />
      <div className="flex justify-center text-white min-h-screen bg-neutral-900 overflow-x-hidden">
        <div className="flex flex-wrap w-3/4 p-5 gap-3">
          {products.length > 0 && products.map(( product ) => (
            <CardProduct key={ product.id }>
              <CardProduct.Header
                image={ product.image }
                alt={ product.title }
              />
              <CardProduct.Body
                title={ product.title }
                description={ product.description }
              />
              <CardProduct.Footer
                id={ product.id }
                price={ product.price }
              />
            </CardProduct>
          ))}
        </div>
        <div className="w-1/4">
          <h1 className="text-xl mt-8 ml-5 mb-2 font-bold bg-blue-600 w-max p-2 rounded-2xl">
            Cart
          </h1>
          <TableCart products={ products } />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;