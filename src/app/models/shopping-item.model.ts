export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  price?: number; // Optional property
}
