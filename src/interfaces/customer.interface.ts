export interface CustomerCreate {
  name: string;
  email: string;
  cardNumber?: string;
  phoneNumber?: string;
}

export interface CustomerUpdate {
  id: number;
  name?: string;
  email?: string;
  cardNumber?: string;
  phoneNumber?: string;
}
