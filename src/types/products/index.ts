export interface Category {
  id: number;
  name: string;
  image: string;
  slug?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  image?: string;
  slug?: string;
}

export interface CreateProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProductPayload {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}
