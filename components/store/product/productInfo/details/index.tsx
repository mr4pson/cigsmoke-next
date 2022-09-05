import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as React from 'react';
import { Rating } from '@mui/material'; // docs: https://mui.com/material-ui/api/rating/ *** https://mui.com/material-ui/react-rating/
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import ShareToSocial from './ShareToSocial';
import DropDowns from './DropDowns';
import ActionBtns from './ActionBtns';
import ColorPicker from './ColorPicker';
import { UserSelectWrapper } from './common';
import Quastions from '../../../../../assets/quastions.svg';
import { Basket, Product, ProductVariant, Wishlist } from 'swagger/services';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  checkIfItemInCart,
  checkIfItemInWishlist,
  handleCartBtnClick,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateCart } from 'redux/slicers/store/cartSlicer';
import { devices } from 'components/store/lib/Devices';
import { TCartState } from 'redux/types';
import { TProductInfoState } from 'redux/types';
type Props = {
  images: string[];
  product?: Product;
  cart?: Basket;
  wishlist?: Wishlist;
  selectedIndex: number;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const Details: React.FC<Props> = ({
  images,
  product,
  cart,
  wishlist,
  selectedIndex,
  questionRef,
  reviewRef,
  setSelectedIndex,
  paginateImage,
}) => {
  const dispatch = useAppDispatch();
  const { variant } = useAppSelector<TCartState>((state) => state.cart);
  const orderProduct = cart?.orderProducts?.find(
    (orderProduct) => orderProduct.product?.id === product?.id,
  );
  const [curVariant, setCurVariant] = useState<ProductVariant>();

  const onCountChange = (counter: number, product: Product) => {
    dispatch(
      updateCart({
        orderProducts: cart?.orderProducts
          ?.filter((orderProduct) => orderProduct.product?.id != product.id)
          ?.concat({
            product: { id: product.id },
            qty: counter,
            productVariantId: curVariant?.id!,
          } as any)
          .map((orderProduct) => ({
            productId: orderProduct.product?.id,
            qty: orderProduct.qty,
            productVariantId: orderProduct?.productVariant?.id,
          })),
      }),
    );
  };

  useEffect(() => {
    const curVariant = variant
      ? variant
      : product?.productVariants![0]
      ? product.productVariants![0]
      : ({} as any);

    setCurVariant(curVariant);
  }, [variant, product]);

  //   const { product } = useAppSelector<TProductInfoState>(
  //   (state) => state.productInfo,
  // );

  return (
    <DetailsContainer>
      <ShareToSocial
        title={product?.name}
        image={images[0]}
        productId={product?.id}
        description={product?.desc}
      />
      <UserSelectWrapper>
        <motion.h1
          key="title-product-page"
          custom={0.1}
          initial="init"
          animate="animate"
          exit={{ y: -20, opacity: 0, transition: { delay: 0.05 } }}
          variants={variants.fadInSlideUp}
        >
          {product?.name}
        </motion.h1>
        <ConvoContainer>
          <ConvoWrappers
            key="reveiws-product-page"
            custom={0.2}
            initial="init"
            animate="animate"
            exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
            variants={variants.fadInSlideUp}
          >
            <Rating value={product?.rating?.avg} size="small" readOnly />

            <span
              onClick={() => {
                reviewRef.current.click();
                reviewRef.current.scrollIntoView();
              }}
            >
              <span>{product?.reviews?.length ?? 0} Отзыв(ов)</span>
            </span>
          </ConvoWrappers>
          <ConvoWrappers
            key="quastions-product-page"
            custom={0.3}
            initial="init"
            animate="animate"
            exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
            variants={variants.fadInSlideUp}
          >
            <span>
              <Quastions />
            </span>

            <span
              onClick={() => {
                questionRef.current.click();
                questionRef.current.scrollIntoView();
              }}
            >
              <span>{product?.questions?.length} вопрос(ов)</span>
            </span>
          </ConvoWrappers>
        </ConvoContainer>
        <PriceWrapper
          key="prices-product-page"
          custom={0.35}
          initial="init"
          animate="animate"
          exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
          variants={variants.fadInSlideUp}
        >
          <PriceItem>{curVariant?.price}₽</PriceItem>
          {!!curVariant?.oldPrice && (
            <PriceItem>{curVariant?.oldPrice}₽</PriceItem>
          )}
        </PriceWrapper>
        <ColorPicker
          variantColor={curVariant?.color}
          productVariants={product?.productVariants}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          paginateImage={paginateImage}
        />
      </UserSelectWrapper>
      <ActionBtns
        orderProduct={orderProduct}
        isInCart={checkIfItemInCart(product, cart)}
        isInWishlist={checkIfItemInWishlist(product, wishlist)}
        onCartBtnClick={handleCartBtnClick(product, dispatch, curVariant, cart)}
        onWishBtnClick={handleWishBtnClick(product, dispatch, wishlist)}
        onCountChange={onCountChange}
      />
      <DropDowns
        parameterProducts={product?.parameterProducts}
        description={product?.desc}
      />
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 60px;

  @media ${devices.laptopS} {
    width: 304px;
  }
`;

const ConvoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  @media ${devices.laptopS} {
    display: block;
  }
`;

const ConvoWrappers = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  span {
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      color: ${color.hover};
    }
  }
`;

const PriceWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const PriceItem = styled.span`
  &:nth-child(1) {
    font-size: 1.5rem;
    font-family: 'intro';
  }
  &:nth-child(2) {
    font-size: 1rem;
    font-family: 'intro';
    text-decoration: line-through;
    text-decoration-color: ${color.hover};
    color: ${color.textSecondary};
  }
`;

export default Details;
