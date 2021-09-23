export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/auth",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { layout: "AppLayoutWithoutHeader" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    children: [
      {
        path: "/order_placed",
        name: "OrderPlaced",
        component: () => import("@/views/OrderPlaced.vue"),
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
];
