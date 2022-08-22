import Link from 'next/link';
import styled from 'styled-components';
import { Basket } from 'swagger/services';
import { devices } from '../lib/Devices';
import { getTotalDiscount, getTotalPrice, getTotalQuantity } from './helpers';

type Props = {
  cart: Basket | null;
};

const CartFooter: React.FC<Props> = ({ cart }) => {
  return (
    <Wrapper>
      <CartCol>
        <CartTitle>Ваша корзина</CartTitle>
        <CartColBody>
          <ProductInfo>
            {getTotalQuantity(cart?.orderProducts!)} товар /
          </ProductInfo>
          <ProductInfo>
            {cart?.orderProducts!.length} вида товаров /
          </ProductInfo>
          <ProductInfo>14, 288 кг общий вес</ProductInfo>
        </CartColBody>
      </CartCol>
      <CartCol>
        <CartTitle>Общая сумма</CartTitle>
        <CartTotalPrice>{getTotalPrice(cart?.orderProducts!)} ₽</CartTotalPrice>
        <CartDiscount>
          <DiscountTitle>Скидка</DiscountTitle>
          <DiscountPrice>
            {getTotalDiscount(cart?.orderProducts!)} ₽
          </DiscountPrice>
        </CartDiscount>
      </CartCol>
      <CartCol>
        <Link href={'/checkout'}>
          <CheckoutBtn>Перейти к оформлению</CheckoutBtn>
        </Link>
      </CartCol>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #fff;
  display: flex;
  padding: 40px 54px;
  border-radius: 15px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  @media ${devices.laptopS} {
    display: block;
  }

  @media ${devices.mobileL} {
    display: block;
    padding: 15px;
  }
`;

const CartTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const CartColBody = styled.span`
  @media ${devices.laptopS} {
    display: flex;
    gap: 5px;
  }
`;

const CartTotalPrice = styled.h3`
  font-size: 14px;
  font-weight: bold;
`;

const CartCol = styled.div`
  @media ${devices.laptopS} {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  @media ${devices.mobileL} {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

const ProductInfo = styled.div`
  font-size: 14px;
  color: #989898;
`;

const CartDiscount = styled.div`
  margin-top: 10px;

  @media ${devices.laptopS} {
    margin-top: 0;
  }

  @media ${devices.mobileL} {
    margin-top: 0;
  }
`;

const DiscountTitle = styled.span`
  font-size: 14px;
`;

const DiscountPrice = styled.span`
  font-size: 14px;
  color: #ff0000;
  margin-left: 10px;
`;

const CheckoutBtn = styled.button`
  background: #ffc54d;
  color: #000;
  font-size: 18px;
  padding: 12px 81px;
  border-radius: 8px;
  cursor: pointer;

  @media ${devices.laptopS} {
    margin-top: 10px;
  }

  @media ${devices.mobileL} {
    margin-top: 10px;
    padding: 12px 15px;
    width: 100%;
    text-align: center;
  }
`;

export default CartFooter;
