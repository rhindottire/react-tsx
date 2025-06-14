import axios, { AxiosResponse } from "axios";

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

export const getProducts = (callback: (data: Product[]) => void) => {
  axios.get<Product[]>("https://fakestoreapi.com/products")
    .then((res: AxiosResponse<Product[]>) => {
      callback(res.data);
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unknown error occurred");
      }
    });
};

export const getProduct = (id: number, callback: (data: Product) => void) => {
  axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
    .then((res: AxiosResponse<Product>) => {
      callback(res.data);
    })
    .catch((err: unknown) => {
      console.error(`Error fetching product ${id}:`, err);
    });
};