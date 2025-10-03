// utils/mockApi.ts
import Image01 from "@/assets/images/products/01.png";
import Image02 from "@/assets/images/products/02.png";
import Image03 from "@/assets/images/products/03.png";
import Image04 from "@/assets/images/products/04.png";
import Image05 from "@/assets/images/products/05.png";

export interface IProductCart {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  size?: string;
  color?: string;
  discount?: number;
  badge?: string;
}

export interface CartItem extends IProductCart {
  quantity: number;
}

const mockProductsCart: IProductCart[] = [
  {
    id: "1",
    name: "کیف رودوشی زنانه منط مدل 4070 کد 90259",
    price: 13998000,
    image: Image01,
    category: "کیف",
    size: "یونی‌سایز",
    color: "مشکی",
    discount: 30,
    badge: "فروش ویژه",
  },
  {
    id: "2",
    name: "کت چرم زنانه چرم مشهد با رنگ سبز و تنخور معمولی، مدل K0136-038-40",
    price: 14000000,
    image: Image02,
    category: "کت و شلوار",
    size: "M",
    color: "سبز",
    discount: 15,
    badge: "جدید",
  },
  {
    id: "3",
    name: "نیم تنه ورزشی زنانه مدل k1801",
    price: 482900,
    image: Image03,
    category: "لباس ورزشی",
    size: "L",
    color: "صورتی",
    discount: 20,
    badge: "پرفروش",
  },
  {
    id: "4",
    name: "هودی زنانه مدل لانگ کد 4104",
    price: 1650000,
    image: Image04,
    category: "هودی",
    size: "XL",
    color: "خاکستری",
    discount: 25,
    badge: "Black day",
  },
  {
    id: "5",
    name: "کفش کوهنوردی جاکس از جنس چرم مصنوعی و نبوک با زیره آج‌دار، قابلیت ارتجاعی، ضد آب، مقاوم در برابر سایش، کاهش فشارهای وارده، کد 250021",
    price: 740300,
    image: Image05,
    category: "کفش",
    size: "40",
    color: "قهوه‌ای",
    discount: 10,
    badge: "تخفیف ویژه",
  },
];

export const toCartItem = (product: IProductCart, quantity = 1): CartItem => ({
  ...product,
  quantity,
});

export const mockApi = {
  getProducts: async (): Promise<IProductCart[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(mockProductsCart)));
      }, 300);
    });
  },

  getProductById: async (id: string): Promise<IProductCart | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProductsCart.find((p) => p.id === id);
        resolve(product || null);
      }, 200);
    });
  },
};
