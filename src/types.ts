export interface Address {
  id: number;
  userId: number;
  street: string;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country: string;
  user?: User;
}

export interface User {
  id: number;
  firstName: string;
  email: string;
  passwordHash: string;
  address?: Address[];
  orders?: Order[];
}

export interface Order {
  id: number;
  userId: number;
  createdAt: Date;
  status: string;
  totalAmount: number;
  user?: User;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  order?: Order;
  product?: Product;
}

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
  exploreInfo?: string | null;
  products?: Product[];
}

export interface Brand {
  id: number;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
  products?: Product[];
}

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  categoryId: number;
  brandId: number;
  category?: Category;
  orderItems?: OrderItem[];
  images?: Image[];
}

export interface Image {
  id: number;
  url: string;
  productId: number;
}
