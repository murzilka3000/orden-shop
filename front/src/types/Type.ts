export type Product = {
    _id: string
    name: string
    description: string
    price: number
    image: string,
  }
  
  export type CartItem = {
    productId: string;
    quantity: number;
    price: number; 
    name: string;
    image: string
};