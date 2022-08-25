import styled from 'styled-components';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateCart } from 'redux/slicers/store/cartSlicer';
import { updateWishlist } from 'redux/slicers/store/globalSlicer';
import { Basket, Product, Wishlist } from 'swagger/services';
import ProductItem from 'ui-kit/products/productItem';

type Props = {
  products: Product[];
  children?: JSX.Element;
  width?: any;
  widthRef?: any;
  slideTo?: number;
};
const ProductFlex: React.FC<Props> = ({
  products,
  width,
  widthRef,
  slideTo,
}) => {
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const wishlist: Wishlist = useAppSelector((state) => state.global.wishlist);
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
              productVariantId: orderProduct.product?.productVariants![0]
                ? orderProduct.product?.productVariants[0].id
                : undefined,
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
            productVariantId: orderProduct.product?.productVariants![0]
              ? orderProduct.product?.productVariants[0].id
              : undefined,
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
    <FlexWrapper>
      <SliderWrapper
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        ref={widthRef}
        custom={slideTo}
        animate="animate"
        variants={variants.sliderX}
      >
        {products?.map((product, index) => {
          return (
            <ProductItem
              key={`product-item-${index}`}
              product={product}
              custom={index * 0.05}
              isInCart={checkIfItemInCart(product)}
              isInWishlist={checkIfItemInWishlist(product)}
              onCartBtnClick={handleCartBtnClick(product)}
              onWishBtnClick={handleWishBtnClick(product)}
            />
          );
        })}
      </SliderWrapper>
    </FlexWrapper>
  );
};

const FlexWrapper = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;

const SliderWrapper = styled(motion.ul)`
  width: 100%;
  display: flex;
  padding-top: 5px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aling-items: center;
  gap: 20px;
`;
const HeaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h3 {
    font-family: 'intro';
    font-size: 1.2rem;
    margin: 0;
  }
`;

const BtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
`;

export { ProductFlex, ContentWrapper, HeaderWrapper, BtnsWrapper };
