export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
  };
  supplier: {
    id: number;
    name: string;
  };
}