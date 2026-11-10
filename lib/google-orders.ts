import type { Order } from "./types";

const ORDERS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwO8mgaR2rroJQr-mdgUPgsMtyLjpfb81GPDl_cF1QJ-OP9MKky3rL9laKDkifhVX9D/exec";

/** Sends each order item to the deployed Apps Script doPost endpoint. */
export async function addOrderToGoogleSheet(order: Order): Promise<void> {
  for (const item of order.items) {
    await fetch(ORDERS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "addOrder",
        orderId: order.id,
        itemId: item.productId,
        qty: item.qty,
      }),
    });
  }
}
