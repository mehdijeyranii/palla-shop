export interface IProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
}

export const mockProducts: IProduct[] = [
  { id: "1", name: "لپ‌تاپ گیمینگ ASUS", brand: "ASUS", category: "لپ‌تاپ" },
  { id: "2", name: "مبل مدرن چوبی", brand: "مبل‌سازان", category: "مبلمان" },
  { id: "3", name: "کفش ورزشی Nike Air", brand: "Nike", category: "کفش" },
  { id: "4", name: "هدفون بلوتوثی Sony", brand: "Sony", category: "هدفون" },
  {
    id: "5",
    name: "کتاب ریاضی دوازدهم",
    brand: "انتشارات خیام",
    category: "کتاب",
  },
  { id: "6", name: "عینک آفتابی Ray-Ban", brand: "Ray-Ban", category: "عینک" },
  {
    id: "7",
    name: "ماشین لباس‌شویی سامسونگ",
    brand: "Samsung",
    category: "لوازم خانگی",
  },
  {
    id: "8",
    name: "گوشی هوشمند iPhone 15",
    brand: "Apple",
    category: "موبایل",
  },
];
