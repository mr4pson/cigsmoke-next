import { AnimatePresence } from 'framer-motion';
import { useAppDispatch } from 'redux/hooks';
import { updateCart, updateWishlist } from 'redux/slicers/store/globalSlicer';
import styled from 'styled-components';
import { Basket, Product, Wishlist } from 'swagger/services';
import { getAnimationDelay } from './helpers';
import ProductItem from './productItem';

type Props = {
  products: Product[];
  cart: Basket | null;
  wishlist: Wishlist | null;
  gridStyle?: object;
  children?: JSX.Element;
};

const ProductGrid: React.FC<Props> = ({
  products,
  gridStyle,
  cart,
  wishlist,
  children,
}) => {
  const delay = getAnimationDelay(products.length);
  const dispatch = useAppDispatch();

  const handleCartBtnClick = (product: Product) => async () => {
    const curOrderProduct = cart?.orderProducts?.find(
      (orderProduct) => orderProduct.product?.id == product.id,
    );
    if (curOrderProduct) {
      dispatch(
        updateCart({
          orderProducts: cart?.orderProducts
            ?.filter((orderProduct) => orderProduct.product?.id != product.id)
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
          ?.concat({ product: { id: product.id }, qty: 1 })
          .map((orderProduct) => ({
            productId: orderProduct.product?.id,
            qty: 1,
          })),
      }),
    );
  };

  const handleWishBtnClick = (product: Product) => async () => {
    const curItem = wishlist?.items?.find(
      (wishlistProduct) => wishlistProduct.productId == product.id,
    );
    if (curItem) {
      dispatch(
        updateWishlist({
          items: wishlist?.items
            ?.filter((item) => item.productId != product.id)
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
          ?.concat({ productId: product.id })
          .map((orderProduct) => ({
            productId: orderProduct.productId,
          })),
      }),
    );
  };

  const checkIfItemInCart = (product: Product) =>
    !!cart?.orderProducts?.find(
      (orderProduct) => orderProduct.product?.id == product.id,
    );

  const checkIfItemInWishlist = (product: Product) =>
    !!wishlist?.items?.find((item) => item.productId == product.id);

  return (
    <Grid style={gridStyle}>
      {children}
      <AnimatePresence>
        {products.map((product, index) => {
          return (
            <ProductItem
              key={`product-item-${index}`}
              product={product}
              custom={delay[index]}
              isInCart={checkIfItemInCart(product)}
              isInWishlist={checkIfItemInWishlist(product)}
              onCartBtnClick={handleCartBtnClick(product)}
              onWishBtnClick={handleWishBtnClick(product)}
            />
          );
        })}
      </AnimatePresence>
    </Grid>
  );
};

const Grid = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: inherit;
  row-gap: 30px;
`;

export default ProductGrid;
