import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
import { Basket, Product, Wishlist } from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import {
  checkIfItemInCart,
  checkIfItemInWishlist,
  handleCartBtnClick,
  handleWishBtnClick,
} from 'ui-kit/products/helpers';
import { useAppDispatch } from 'redux/hooks';
import { updateCart } from 'redux/slicers/store/cartSlicer';

type Props = {
  images: string[];
  product?: Product;
  cart?: Basket;
  wishlist?: Wishlist;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
};

const Details: React.FC<Props> = ({
  images,
  product,
  cart,
  wishlist,
  selectedIndex,
  setSelectedIndex,
  paginateImage,
}) => {
  const dispatch = useAppDispatch();
  const orderProduct = cart?.orderProducts?.find(
    (orderProduct) => orderProduct.product?.id === product?.id,
  );

  const onCountChange = (counter: number, product: Product) => {
    dispatch(
      updateCart({
        orderProducts: cart?.orderProducts
          ?.filter((orderProduct) => orderProduct.product?.id != product.id)
          ?.concat({ product: { id: product.id }, qty: counter })
          .map((orderProduct) => ({
            productId: orderProduct.product?.id,
            qty: orderProduct.qty,
          })),
      }),
    );
  };

  return (
    <DetailsContainer>
      <ShareToSocial productId={product?.id} />
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
            <Rating value={5} size="small" readOnly />
            <Link href="#reveiws-quastions">
              <a>
                <span>148 Отзывы</span>
              </a>
            </Link>
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
            <Link href="#reveiws-quastions">
              <a>
                <span>31 вопрос</span>
              </a>
            </Link>
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
          <PriceItem>{product?.price}₽</PriceItem>
          {!!product?.oldPrice && <PriceItem>{product?.oldPrice}₽</PriceItem>}
        </PriceWrapper>
        <ColorPicker
          images={images}
          colors={product?.colors ?? []}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          paginateImage={paginateImage}
        />
      </UserSelectWrapper>
      <ActionBtns
        orderProduct={orderProduct}
        isInCart={checkIfItemInCart(product, cart)}
        isInWishlist={checkIfItemInWishlist(product, wishlist)}
        onCartBtnClick={handleCartBtnClick(product, dispatch, cart)}
        onWishBtnClick={handleWishBtnClick(product, dispatch, wishlist)}
        onCountChange={onCountChange}
      />
      <DropDowns description={product?.desc} />
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
`;

const ConvoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const ConvoWrappers = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  a {
    font-size: 0.8rem;
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
