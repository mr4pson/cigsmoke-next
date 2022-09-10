import { Payment } from '@a2seven/yoo-checkout';
import axios from 'axios';
import { PaymentStatus } from 'common/enums/paymentStatus.enum';
import { openErrorNotification } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';
import { TCartState, TDeliveryInfo, TOrderInfo } from 'redux/types';
import { AddressService, CheckoutService } from 'swagger/services';
import Loading from 'ui-kit/Loading';

const AfterPaymentPage = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { cart } = useAppSelector<TCartState>((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const deliveryInfo: TDeliveryInfo = JSON.parse(
        localStorage.getItem('deliveryInfo')!,
      );

      const orderInfo: TOrderInfo = JSON.parse(
        localStorage.getItem('orderInfo')!,
      );

      if (router.query.paymentId && deliveryInfo && orderInfo && cart) {
        const response = await axios.get<Payment>(
          `/api/payments/${router.query.paymentId}`,
        );

        if (response.data?.status !== PaymentStatus.succeeded) {
          openErrorNotification('Ваш Заказ не прошел оплату');
          return;
        }

        try {
          const response = await AddressService.createAddress({
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
          setLoading(false);
          localStorage.removeItem('deliveryInfo');
          localStorage.removeItem('orderInfo');

          await CheckoutService.createCheckout({
            body: {
              paymentId: router.query.paymentId as string,
              address: response.id,
              basket: cart?.id,
              totalAmount: cart.totalAmount,
              comment: orderInfo.comment,
              leaveNearDoor: orderInfo.leaveNearDoor,
            },
          });

          await dispatch(createCart());

          const basketId = localStorage.getItem('basketId') ?? '';

          dispatch(fetchCart(basketId));

          openSuccessNotification('Ваш Заказ успешно оплачен');

          router.push('/');
        } catch (error) {
          openErrorNotification('Ваш Заказ не прошел оплату');
          console.log(error);
          setLoading(false);
        }

        return;
      }

      router.push('/');
    })();
  }, [router.query, cart]);

  return (
    <Container
      variants={variants.fadInOut}
      key="header"
      initial="start"
      animate="middle"
      exit="end"
      flex_direction="column"
      justify_content="center"
      style={{ backgroundColor: '#F6F6F6', padding: '35px 0 50px' }}
    >
      <Wrapper>
        <Content
          style={{ minHeight: 'calc(90vh + 124px)' }}
          flex_direction="column"
        >
          {!loading ? <></> : <Loading />}
        </Content>
      </Wrapper>
    </Container>
  );
};

AfterPaymentPage.PageLayout = StoreLayout;

export default AfterPaymentPage;
