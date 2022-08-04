import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UserSelectWrapper } from './common';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Cart from '../../../../../assets/added_to_cart.svg';
import CartWhite from '../../../../../assets/cartWhiteEmpty.svg';
import HeartWhite from '../../../../../assets/heartWhiteEmpty.svg';
import HeartFull from '../../../../../assets/heartFullWhite.svg';
import { OrderProduct, Product } from 'swagger/services';
import ItemCounter from 'ui-kit/ItemCounter';
import SwitchBtn from './SwitchBtn';
import React from 'react';

type Props = {
  orderProduct?: OrderProduct;
  isInCart: boolean;
  isInWishlist: boolean;
  onCartBtnClick: () => void;
  onWishBtnClick: (product: any) => void;
  onCountChange: (counter: number, product: Product) => void;
};

const ActionBtns: React.FC<Props> = ({
  orderProduct,
  isInCart,
  isInWishlist,
  onCartBtnClick,
  onWishBtnClick,
  onCountChange,
}) => {
  const handleCartClick = () => {
    onCartBtnClick();
  };

  return (
    <UserSelectWrapper margintop="-35px">
      <ActionBtnsWrapper
        key="action-btns-product-page"
        custom={0.3}
        initial="init"
        animate="animate"
        exit={{ y: -20, opacity: 0, transition: { delay: 0.2 } }}
        variants={variants.fadInSlideUp}
      >
        <SwitchBtn
          defaultContent={
            <React.Fragment>
              <CartWhite />
              <span>В корзину</span>
            </React.Fragment>
          }
          activatedContent={
            <React.Fragment>
              <Cart />
              <span>В корзине</span>
            </React.Fragment>
          }
          active={isInCart}
          onClick={handleCartClick}
        />
        <SwitchBtn
          defaultContent={
            <React.Fragment>
              <HeartWhite />
              <span>В избранное</span>
            </React.Fragment>
          }
          activatedContent={
            <React.Fragment>
              <HeartFull />
              <span>В избранном</span>
            </React.Fragment>
          }
          active={isInWishlist}
          onClick={onWishBtnClick}
        />
      </ActionBtnsWrapper>
      {!!orderProduct && (
        <ItemCounter
          qty={orderProduct?.qty!}
          product={orderProduct?.product!}
          onCountChange={onCountChange}
        />
      )}
    </UserSelectWrapper>
  );
};

const ActionBtnsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export default ActionBtns;
