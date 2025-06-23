import api from "@/api/client";

const orderApi = {
  async getOrders(): Promise<any[]> {
    return api.get("/orders")
  },

  // Orders APIs (Ruby Rails - port 3000)
  createOrder(orderData: {
    shipping_address: any
    billing_address: any
    payment_method: string
  }): Promise<any> {
    return api.post("/orders", { order: orderData })
  }
};

export default orderApi;
