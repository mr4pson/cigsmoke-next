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
import Link from 'next/link';
import { devices } from 'components/store/lib/Devices';

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
    !isInCart ? onCartBtnClick() : '';
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
        <CounterAndGotoCartWrapper
          animate={isInCart ? 'animate' : 'exit'}
          variants={variants.fadeInSlideIn}
        >
          <ItemCounter
            qty={orderProduct?.qty!}
            product={orderProduct?.product!}
            onCountChange={onCountChange}
          />

          <Link href="/cart">
            <GoToCartLink laptopSWidth={'150px!important'}>
              <ActionBtn
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
              >
                <span style={{ color: color.textPrimary }}>
                  Перейти в корзину
                </span>
              </ActionBtn>
            </GoToCartLink>
          </Link>
        </CounterAndGotoCartWrapper>
      )}
      <Link href="/checkout">
        <a onClick={handleCartClick} style={{ justifySelf: 'flex-end' }}>
          <ActionBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
          >
            Купить в один клик
          </ActionBtn>
        </a>
      </Link>
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

const CounterAndGotoCartWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    width: 170px;
    justify-self: flex-end;
  }
`;

const ActionBtn = styled(motion.button)<any>`
  width: 100%;
  height: 45px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const GoToCartLink = styled.a<any>`
  @media ${devices.laptopS} {
    width: ${(props) => props.laptopSWidth ?? '100%'};
  }
`;

export default ActionBtns;
