import Link from 'next/link';
import styled from 'styled-components';
import { Basket } from 'swagger/services';
import { getTotalDiscount, getTotalPrice, getTotalQuantity } from './helpers';

type Props = {
  cart: Basket | null;
};

const CartFooter: React.FC<Props> = ({ cart }) => {
  return (
    <Wrapper>
      <CartCol>
        <CartTitle>Ваша корзина</CartTitle>
        <ProductInfo>
          {getTotalQuantity(cart?.orderProducts!)} товар /
        </ProductInfo>
        <ProductInfo>{cart?.orderProducts!.length} вида товаров /</ProductInfo>
        <ProductInfo>14, 288 кг общий вес</ProductInfo>
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
  margintop: 20px;
`;

const CartTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const CartTotalPrice = styled.h3`
  font-size: 14px;
  font-weight: bold;
`;

const CartCol = styled.div``;

const ProductInfo = styled.div`
  font-size: 14px;
  color: #989898;
`;

const CartDiscount = styled.div`
  margin-top: 10px;
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
`;

export default CartFooter;
