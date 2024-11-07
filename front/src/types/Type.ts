export type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
  }
  
  export type CartItem = {
    productId: number;
    quantity: number;
    price: number; 
    name: string;
    image: string

};