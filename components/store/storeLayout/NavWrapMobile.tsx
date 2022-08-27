import styled from '@emotion/styled';
import Link from 'next/link';
import { Btns } from './common';
import color from '../lib/ui.colors';
import HomeSVG from '../../../assets/home.svg';
import CatalogSVG from '../../../assets/catalog.svg';
import OrderSVG from '../../../assets/order.svg';
import WishListSVG from '../../../assets/wishlist.svg';
import CartSVG from '../../../assets/cart.svg';
import { devices } from '../lib/Devices';
import { TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';

const NavWrapMobile = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  return (
    <NavWrap>
      <Link href="/">
        <a style={{ alignSelf: 'flex-end' }}>
          <Btns>
            <span>
              <HomeSVG />
            </span>
            <span>Главная</span>
          </Btns>
        </a>
      </Link>
      <Link href="/catalog">
        <a style={{ alignSelf: 'flex-end' }}>
          <Btns>
            <span>
              <CatalogSVG />
            </span>
            <span>Каталог</span>
          </Btns>
        </a>
      </Link>
      <Link href="/orders">
        <a style={{ alignSelf: 'flex-end' }}>
          <Btns>
            <span>
              <OrderSVG />
            </span>
            <span> Заказы</span>
          </Btns>
        </a>
      </Link>
      <Link href="/wishlist">
        <a style={{ alignSelf: 'flex-end' }}>
          <Btns>
            <span>
              <WishListSVG />
            </span>
            <span>Избранное</span>
          </Btns>
        </a>
      </Link>
      <CartWrapper>
        {!!cart?.orderProducts?.length && (
          <Counter>{cart?.orderProducts?.length}</Counter>
        )}
        <Link href="/cart">
          <a style={{ alignSelf: 'flex-end' }}>
            <Btns>
              <span>
                <CartSVG />
              </span>
              <span>Корзина</span>
            </Btns>
          </a>
        </Link>
      </CartWrapper>
    </NavWrap>
  );
};

const NavWrap = styled.div`
  display: none;
  position: fixed;
  bottom: -1px;
  z-index: 1000;
  width: 100vw;
  background: #fff;
  justify-content: space-between;
  padding: 10px 10px;
  box-shadow: 0px 2px 6px #00000017;

  @media ${devices.mobileL} {
    display: flex;
  }
`;

const CartWrapper = styled.div`
  position: relative;
`;
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

export default NavWrapMobile;
