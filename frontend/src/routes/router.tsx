import { MainLayout } from "@/layouts";
import { About, Cart, Home, NotFound, ProductList } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/cart", element: <Cart /> },
      { path: "/product", element: <ProductList /> },
    ],
  },
]);

export default router;
