import { useCartStore } from "@/store/cartStore";
import { mockApi, type CartItem, type IProductCart } from "@/utils/mockApi";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState<IProductCart[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await mockApi.getProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 text-center">
        در حال بارگذاری...
      </div>
    );
  }

  const handleAddToCart = (product: IProductCart) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };
    addToCart(cartItem);
  };
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">محصولات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-zinc-200 rounded-lg p-4"
          >
            <h3 className="font-medium text-zinc-800">{product.name}</h3>
            <p className="text-zinc-600 mt-2">
              {product.price.toLocaleString()} تومان
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md transition-colors"
            >
              افزودن به سبد
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
