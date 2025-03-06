import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ShopDetails from "./components/home/ShopDetails";
// import Orders from "./pages/Orders";
// import Addresses from "./pages/Addresses";
// import Wishlist from "./pages/Wishlist";
// import Payments from "./pages/Payments";
// import Coupons from "./pages/Coupons";
// import Returns from "./pages/Returns";
// import Support from "./pages/Support";
// import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/cart", element: <Cart /> },
      { path: "/shop/:shopId", element: <ShopDetails /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="profile" replace /> }, // ✅ Default redirect to Profile
          { path: "profile", element: <Profile /> },
          // { path: "orders", element: <Orders /> },
          // { path: "addresses", element: <Addresses /> },
          // { path: "wishlist", element: <Wishlist /> },
          // { path: "payments", element: <Payments /> },
          // { path: "coupons", element: <Coupons /> },
          // { path: "returns", element: <Returns /> },
          // { path: "support", element: <Support /> },
          // { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

const Routing = () => <RouterProvider router={router} />;

export default Routing;
