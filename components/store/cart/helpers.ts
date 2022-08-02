import { OrderProduct } from "swagger/services";

const getTotalQuantity = (orderProducts: OrderProduct[]) => {
  return orderProducts?.reduce((accum, orderProduct) => {
    return accum + Number(orderProduct.qty);
  }, 0);
};

const getTotalPrice = (orderProducts: OrderProduct[]) => {
  return orderProducts?.reduce((accum, orderProduct) => {
    return (
      accum + Number(orderProduct.qty) * Number(orderProduct.productPrice)
    );
  }, 0);
};

const getTotalDiscount = (orderProducts: OrderProduct[]) => {
  const totalPrice = getTotalPrice(orderProducts);
  const totalOldPrice = orderProducts?.reduce((accum, orderProduct) => {
    return (
      accum +
      Number(orderProduct.qty) * Number(orderProduct.product?.oldPrice)
    );
  }, 0);
  return totalPrice - totalOldPrice;
};

export { getTotalQuantity, getTotalPrice, getTotalDiscount };