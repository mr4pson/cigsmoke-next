import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import isEmpty from 'validator/lib/isEmpty';
import Link from 'next/link';
import DiscountSVG from '../../../../assets/discount.svg';
import ArrowRight from '../../../../assets/arrow_right.svg';
import { Payment } from '@a2seven/yoo-checkout';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TCartState, TStoreCheckoutState } from 'redux/types';
import {
  getDiscount,
  getOldPrice,
  getTotalPrice,
  findTotalWheight,
  getTotalPriceSuperUser,
} from './helpers';
import { formatNumber } from 'common/helpers/number.helper';
import { NextRouter, useRouter } from 'next/router';
import { setOrderInfo } from 'redux/slicers/store/checkoutSlicer';
import { devices } from 'components/store/lib/Devices';
import { axiosInstance } from 'common/axios.instance';
import { AddressService, CheckoutService, CheckoutDTO } from 'swagger/services';
import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { openErrorNotification } from 'common/helpers';
import { TAuthState } from 'redux/types';
import { Role } from 'common/enums/roles.enum';
import { Basket } from 'swagger/services';
const TotalDetails = ({ comment, leaveNearDoor, setLoading }) => {
  const dispatch = useAppDispatch();
  const [discount, setDiscount] = useState('');
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoInput, setPormoInput] = useState('');
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const { deliveryInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const [withDelivery, setWithDelivery] = useState(true);
  const [totalUI, setTotalUI] = useState(
    user?.role === Role.SuperUser
      ? getTotalPriceSuperUser(cart, withDelivery)
      : getTotalPrice(cart, withDelivery, discount),
  );
  const handlePayClick = (router: NextRouter) => async () => {
    setLoading(true);
    const payload = {
      comment,
      leaveNearDoor,
    };

    // const response = await axiosInstance.post('/payments', {
    //   value: `${Math.floor(
    //     Number(getTotalPrice(cart, withDelivery, discount)),
    //   )}.0`,
    // });
    // response.data.id &&
    if (deliveryInfo && payload && cart) {
      try {
        const responseAdress = await AddressService.createAddress({
          body: {
            receiverName: deliveryInfo.fullName,
            receiverPhone: deliveryInfo.phone,
            address: deliveryInfo.address,
            roomOrOffice: deliveryInfo.roomOrOffice,
            door: deliveryInfo.door,
            floor: deliveryInfo.floor,
            rignBell: deliveryInfo.rignBell,
            zipCode: deliveryInfo.postCode,
          },
        });

        await CheckoutService.createCheckout({
          body: {
            // paymentId: response.data.id as string,
            address: responseAdress.id,
            basket: cart?.id,
            totalAmount:
              user?.role === Role.SuperUser
                ? getTotalPriceSuperUser(cart, withDelivery)
                : getTotalPrice(cart, withDelivery, discount),
            comment: payload.comment,
            leaveNearDoor: payload.leaveNearDoor,
          } as CheckoutDTO,
        });

        await dispatch(createCart());

        const basketId = localStorage.getItem('basketId') ?? '';

        dispatch(fetchCart(basketId));

        openSuccessNotification('Ваш Заказ успешно');

        router.push('/orders');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openErrorNotification('Ваш Заказ не прошел');
      }

      return;
    }
  };

  useEffect(() => {
    setTotalUI(
      user?.role === Role.SuperUser
        ? getTotalPriceSuperUser(cart, withDelivery)
        : getTotalPrice(cart, withDelivery, discount),
    );
  });
  return (
    <Container>
      <h3 className="total-header">Ваша сумма</h3>
      <Wrapper>
        <Content>
          <ItemColumn>
            <a>
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                onClick={handlePayClick(router)}
              >
                Завершить мой заказ
              </motion.button>
            </a>
            <span>
              Нажимая на кнопку, вы соглашаетесь с{' '}
              <Link href="/privacy">
                <a>Условиями обработки перс. данных</a>
              </Link>
              , а также с{' '}
              <Link href="/policy">
                <a>Условиями продажи</a>
              </Link>
            </span>
          </ItemColumn>
          <ItemRowWrapper>
            <ItemRow>
              <h3>Ваш заказ</h3>
              <span className="product-wheight">
                {cart?.orderProducts?.length} товар(ов) •{' '}
                {findTotalWheight(cart).totalWeight.toFixed(2)}{' '}
                {findTotalWheight(cart).in == 'gram' ? 'гр' : 'кг'}
              </span>
            </ItemRow>
            {cart?.orderProducts?.map((product: any) => {
              return (
                <ItemRow>
                  <span>{product.product?.name?.slice(0, 20)}..</span>
                  <b>
                    <span>{product!.qty} шт</span> *{'  '}
                    <span>
                      {user?.role === Role.SuperUser
                        ? product.productVariant?.wholeSalePrice
                        : product.productVariant?.price}{' '}
                      ₽
                    </span>
                    {'  '}
                    <span>=</span>
                    {'  '}
                    <span style={{ whiteSpace: 'nowrap' }}>
                      {user?.role === Role.SuperUser
                        ? product.productVariant?.wholeSalePrice * product.qty
                        : product.productVariant?.price * product.qty}{' '}
                      ₽
                    </span>
                  </b>
                </ItemRow>
              );
            })}
            {user?.role === Role.SuperUser ? (
              ''
            ) : (
              <ItemRow>
                <span>Скидка</span>
                <b>
                  <span style={{ color: color.ok }}>
                    {`${formatNumber(getDiscount(cart))}`} ₽
                  </span>
                </b>
              </ItemRow>
            )}
            <ItemRow>
              <label className="self-pick-up" htmlFor="self-pick-up">
                <input
                  type="checkbox"
                  onClick={(e: any) =>
                    setWithDelivery(e.target.checked ? false : true)
                  }
                  id="self-pick-up"
                  title="Самовывоз?"
                />
                <span>Самовывоз?</span>
              </label>
            </ItemRow>
            {withDelivery ? (
              <ItemRow>
                <span>Стоимость доставки</span>
                <b>
                  <span>{user?.role === Role.SuperUser ? '500' : '150'} ₽</span>
                </b>
              </ItemRow>
            ) : (
              ''
            )}
          </ItemRowWrapper>
          <ItemRow>
            <h3 className="total">Итого</h3>
            <h3 className="total">{formatNumber(totalUI)} ₽</h3>
          </ItemRow>
        </Content>
      </Wrapper>
      {user?.role === Role.SuperUser ? (
        ''
      ) : (
        <Wrapper>
          <ItemRow>
            <span className="disount-svg">
              <DiscountSVG />
            </span>
            <TextField
              fullWidth
              label="Промокод"
              multiline
              rows={1}
              value={promoInput}
              defaultValue=""
              onChange={(e) => setPormoInput(e.target.value.toLowerCase())}
            />
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={variants.boxShadow}
              disabled={isEmpty(promoInput) ? true : false}
              style={{
                backgroundColor: isEmpty(promoInput)
                  ? color.textSecondary
                  : color.btnPrimary,
              }}
              onClick={() => {
                setDiscount(promoInput);
                setSuccess(promoInput === 'wuluxeosen2022' ? true : false);
                setPromoMessage(
                  promoInput === 'wuluxeosen2022' ? 'Успешно' : 'Не успешно',
                );
                setTimeout(() => {
                  setSuccess(false);
                  setPromoMessage('');
                }, 1000);
              }}
              className="promo-btn"
            >
              <ArrowRight />
            </motion.button>
          </ItemRow>
          <span
            className="promo-message"
            style={{
              color: success ? color.ok : color.hover,
            }}
          >
            {promoMessage}
          </span>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  position: sticky;
  top: 0;
  .total-header {
    font-family: 'intro';
    color: ${color.textSecondary};
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  .promo-message {
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const ItemColumn = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(124 124 124 / 19%);
  a {
    width: 100%;
    button {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      background-color: ${color.ok};
      color: ${color.textPrimary};
      font-family: 'intro';
    }
  }
  span {
    color: ${color.textSecondary};
    a {
      color: ${color.yellow};
      &:hover {
        color: ${color.hover};
      }
    }
  }
`;

const ItemRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid rgb(124 124 124 / 19%);
  padding: 10px 0;
`;

const ItemRow = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  .self-pick-up {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    input {
      cursor: pointer;
    }
  }
  h3 {
    font-size: 1rem;
    font-weight: 800;
  }
  .product-wheight {
    color: ${color.textTertiary};
  }
  .total {
    font-family: 'intro';
    font-size: 1.1rem;
  }
  .disount-svg {
    display: flex;
    flex-direction: row;
    justify-contetn: center;
    align-items: center;
  }

  .promo-btn {
    width: 50px;
    min-width: 50px;
    height: 55px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export default TotalDetails;
