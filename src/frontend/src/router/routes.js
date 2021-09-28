import { getView } from "@/common/helpers.js";

export default [
  {
    path: "/",
    name: "Index",
    component: getView("Index"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: getView("Login"),
      },
    ],
  },
  {
    path: "/auth",
    name: "Login",
    component: getView("Login"),
    meta: { layout: "AppLayoutWithoutHeader" },
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
  },
  {
    path: "/profile",
    name: "Profile",
    component: getView("Profile"),
  },
];
