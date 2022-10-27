import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { Basket } from 'swagger/services';
import CartSVG from '../../../../../assets/cart.svg';
import { Btns } from '../../common';
import CartItem from './CartItem';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { handleMenuState } from '../../helpers';
import { handleItemCountChange, handleItemRemove } from './helpers';
import { PopupDisplay } from '../../constants';
import { TCartState } from 'redux/types';
import { getTotalPrice } from 'components/store/cart/helpers';
import { TAuthState } from 'redux/types';

const HeaderCart = () => {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setIsOpened,
      setDisplay,
    ),
  );
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  return (
    <>
      {!!cart?.orderProducts?.length && (
        <Counter>{cart?.orderProducts?.length}</Counter>
      )}
      <Btns
        ref={btnNode}
        id="cart-btn"
        onClick={handleMenuState(setIsOpened, setDisplay)}
      >
        <span>
          <CartSVG />
        </span>
        <span>Корзина</span>
      </Btns>
      <PopupWrapper
        ref={menuNode}
        style={{ display }}
        animate={isOpened ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        {!cart?.orderProducts?.length ? (
          <span style={{ color: color.hover }}>Корзина пуста</span>
        ) : (
          <PopupDivider>
            <PopupContent>
              {cart?.orderProducts?.map((item, index: any) => {
                return (
                  <CartItem
                    key={`cart-item-${index}`}
                    item={item}
                    onRemove={handleItemRemove(dispatch, cart)}
                    onCountChange={handleItemCountChange(dispatch, cart)}
                  />
                );
              })}
            </PopupContent>
            <TotalPriceWrapper>
              <span>Общая сумма</span>
              <span>{getTotalPrice(cart.orderProducts, user!)}₽</span>
            </TotalPriceWrapper>
            <PopupBtnsDivider>
              <Link href="/cart">
                <ActionBtns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  onClick={handleMenuState(setIsOpened, setDisplay)}
                >
                  Перейти в корзину
                </ActionBtns>
              </Link>
              <Link href="/checkout">
                <a>
                  <ActionBtns
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                    onClick={handleMenuState(setIsOpened, setDisplay)}
                  >
                    Перейти к оформлению
                  </ActionBtns>
                </a>
              </Link>
            </PopupBtnsDivider>
          </PopupDivider>
        )}
      </PopupWrapper>
    </>
  );
};

const Counter = styled.span`
  position: absolute;
  top: -10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${color.rating};
  color: ${color.textPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

const PopupWrapper = styled(motion.div)`
  width: 450px;
  height: 350px;
  position: absolute;
  top: 70px;
  right: 0px;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
`;

const PopupDivider = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const PopupBtnsDivider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const TotalPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  padding-right: 10px;
  span {
    font-family: 'intro';
    font-size: 1rem;
  }
`;

const PopupContent = styled(motion.ul)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 10px;
  ::-webkit-scrollbar {
    width: 10px;
  }
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 10px 10px 0;
  }
`;

const ActionBtns = styled(motion.button)`
  width: 90%;
  height: 45px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default HeaderCart;
