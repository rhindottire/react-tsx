import CardProduct from "../components/layouts/CardProduct";

const ProductPage = () => {
  return (
    <div className="flex justify-center text-white bg-black min-h-screen p-5">
      <CardProduct >
        <CardProduct.Header
          href="#"
          img="/img/keyboard.jpg"
          alt="Keyboard IMG"
        />
        <CardProduct.Body
          link="#"
          title="New Keyboard"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam amet fugiat nam optio minima atque laborum, nulla dolorem consequuntur ea."
        />
        <CardProduct.Footer price="1.000.000"/>
      </CardProduct>
    </div>
  );
};

export default ProductPage;