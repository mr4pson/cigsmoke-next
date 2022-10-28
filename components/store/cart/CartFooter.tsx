import Link from 'next/link';
import styled from 'styled-components';
import { Basket } from 'swagger/services';
import { devices } from '../lib/Devices';
import { motion } from 'framer-motion';
import { getDiscount } from '../checkout/totalDeliveryDate/helpers';
import {
  getTotalDiscount,
  getTotalPrice,
  getTotalQuantity,
  findTotalWheight,
} from './helpers';
import color from 'components/store/lib/ui.colors';
import variants from '../lib/variants';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { Role } from 'common/enums/roles.enum';

type Props = {
  cart: Basket | null;
};

const CartFooter: React.FC<Props> = ({ cart }) => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
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
          <ProductInfo>
            {findTotalWheight(cart).totalWeight.toFixed(2)}{' '}
            {findTotalWheight(cart).in == 'gram' ? 'гр' : 'кг'} общий вес
          </ProductInfo>
        </CartColBody>
      </CartCol>
      <CartCol>
        <CartTitle>Общая сумма</CartTitle>
        <CartTotalPrice>
          {getTotalPrice(cart?.orderProducts!, user)} ₽
        </CartTotalPrice>
        <CartDiscount>
          <DiscountTitle>
            {user?.role === Role.SuperUser ? '' : `Скидка`}
          </DiscountTitle>
          <DiscountPrice>
            {/* {getTotalDiscount(cart?.orderProducts!)} ₽ */}
            {user?.role === Role.SuperUser ? '' : `${getDiscount(cart)} ₽`}
          </DiscountPrice>
        </CartDiscount>
      </CartCol>
      <CartCol>
        <Link href={'/checkout'}>
          <CheckoutBtn
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
          >
            Перейти к оформлению
          </CheckoutBtn>
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
  color: ${color.ok};
  margin-left: 10px;
`;

const CheckoutBtn = styled(motion.button)`
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
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
