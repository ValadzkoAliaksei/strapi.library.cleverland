export default {
  routes: [
    {
      method: "DELETE",
      path: "/bookings/delete/old",
      handler: "booking.deleteOld",
      config: {
        auth: false,
      },
    },
  ],
};
