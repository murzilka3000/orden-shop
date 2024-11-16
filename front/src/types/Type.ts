export type Product = {
    _id: string
    name: string
    description: string
    price: number
    image: string,
    discountPrice?: number | null; 
}
  
  export type CartItem = {
    productId: string;
    quantity: number;
    price: number; 
    name: string;
    image: string;
    discountPrice?: number | null; 
};