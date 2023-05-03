export default {
  routes: [
    {
      method: "PUT",
      path: "/deliveries/continue/:id",
      handler: "delivery.continue",
    },
  ],
};
