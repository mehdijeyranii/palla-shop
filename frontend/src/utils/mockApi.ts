export interface IProductCart {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
}

export interface CartItem extends IProductCart {
  quantity: number;
}

const mockProductsCart: IProductCart[] = [
  {
    id: "1",
    name: "لپ‌تاپ گیمینگ ASUS ROG",
    price: 45000000,
    category: "لپ‌تاپ",
  },
  {
    id: "2",
    name: "هدفون بلوتوثی Sony WH-1000XM5",
    price: 8500000,
    category: "هدفون",
  },
  { id: "3", name: "کفش ورزشی Nike Air Max", price: 3200000, category: "کفش" },
  { id: "4", name: "کتاب ریاضی پیشرفته", price: 120000, category: "کتاب" },
  { id: "5", name: "عینک آفتابی Ray-Ban", price: 4500000, category: "عینک" },
];

export const mockApi = {
  getProducts: async (): Promise<IProductCart[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProductsCart);
      }, 300);
    });
  },

  getProductById: async (id: string): Promise<IProductCart | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProductsCart.find((p) => p.id === id);
        resolve(product);
      }, 200);
    });
  },
};
