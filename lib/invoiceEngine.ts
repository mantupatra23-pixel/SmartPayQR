import { logMovement, getProducts } from "./inventoryEngine";

export const processInvoiceStockDeduction = (items: Array<{ productId?: string; productName: string; quantity: number }>) => {
  const products = getProducts();

  items.forEach((item) => {
    let targetProduct = products.find((p) => p.id === item.productId);
    
    if (!targetProduct) {
      targetProduct = products.find((p) => p.name.toLowerCase() === item.productName.toLowerCase());
    }

    if (targetProduct) {
      logMovement(targetProduct.id, "sale", item.quantity, "Automated Invoice Stock Deduct");
    }
  });
};
