import { getView } from "@/common/helpers.js";
import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Index",
    component: getView("Index"),
    children: [
      {
        path: "/login",
        name: "LoginIndex",
        component: getView("Login"),
        meta: {
          middlewares: [isLoggedIn],
        },
      },
    ],
  },
  {
    path: "/auth",
    name: "Login",
    component: getView("Login"),
    meta: { middlewares: [isLoggedIn], layout: "AppLayoutWithoutHeader" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: getView("Cart"),
    children: [
      {
        path: "/order_placed",
        name: "OrderPlaced",
        component: getView("OrderPlaced"),
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: getView("Orders"),
    meta: { middlewares: [auth], layout: "AppLayoutCabinet" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: getView("Profile"),
    meta: { middlewares: [auth], layout: "AppLayoutCabinet" },
  },
];
