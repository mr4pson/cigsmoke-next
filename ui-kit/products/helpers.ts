import { updateCart } from 'redux/slicers/store/cartSlicer';
import { updateWishlist } from 'redux/slicers/store/globalSlicer';
import { AppDispatch } from 'redux/store';
import { Basket, Product, Wishlist } from 'swagger/services';

const getAnimationDelay = (length: number) => {
  let delay = 0.8;
  const passDelay: number[] = [];

  for (let i = 0; i < length; i++) {
    switch (delay) {
      case 0.2:
        delay = 0.4;
        break;
      case 0.4:
        delay = 0.6;
        break;
      case 0.6:
        delay = 0.8;
        break;
      default:
        delay = 0.2;
        break;
    }
    passDelay.push(delay);
  }

  return passDelay;
};

const handleCartBtnClick =
  (product: Product | undefined, dispatch: AppDispatch, cart?: Basket) => async () => {
    const curOrderProduct = cart?.orderProducts?.find(
      (orderProduct) => orderProduct.product?.id == product?.id,
    );
    if (curOrderProduct) {
      dispatch(
        updateCart({
          orderProducts: cart?.orderProducts
            ?.filter((orderProduct) => orderProduct.product?.id != product?.id)
            .map((orderProduct) => ({
              productId: orderProduct.product?.id?.toString(),
              qty: orderProduct.qty,
            })),
        }),
      );

      return;
    }

    dispatch(
      updateCart({
        orderProducts: cart?.orderProducts
          ?.concat({ product: { id: product?.id }, qty: 1 })
          .map((orderProduct) => ({
            productId: orderProduct.product?.id,
            qty: 1,
          })),
      }),
    );
  };

const handleWishBtnClick =
  (product: Product | undefined, dispatch: AppDispatch, wishlist?: Wishlist) =>
    async () => {
      const curItem = wishlist?.items?.find(
        (wishlistProduct) => wishlistProduct.productId == product?.id,
      );
      if (curItem) {
        dispatch(
          updateWishlist({
            items: wishlist?.items
              ?.filter((item) => item.productId != product?.id)
              .map((item) => ({
                productId: item.productId?.toString(),
              })),
          }),
        );

        return;
      }

      dispatch(
        updateWishlist({
          items: wishlist?.items
            ?.concat({ productId: product?.id })
            .map((orderProduct) => ({
              productId: orderProduct.productId,
            })),
        }),
      );
    };

const checkIfItemInCart = (product: Product | undefined, cart: Basket | undefined) =>
  !!cart?.orderProducts?.find(
    (orderProduct) => orderProduct.product?.id == product?.id,
  );

const checkIfItemInWishlist = (product: Product | undefined, wishlist: Wishlist | undefined) =>
  !!wishlist?.items?.find((item) => item.productId == product?.id);

export {
  getAnimationDelay,
  handleCartBtnClick,
  handleWishBtnClick,
  checkIfItemInCart,
  checkIfItemInWishlist,
};
