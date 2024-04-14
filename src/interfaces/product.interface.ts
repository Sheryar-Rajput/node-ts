export interface ProductCreate {
  name: string;
  price: number;
  stock: number;
  activeFlag: boolean;
  category: string;
}

export interface ProductUpdate {
  id: number;
  name?: string;
  price?: number;
  stock?: number;
  activeFlag?: boolean;
  category?: string;
}
