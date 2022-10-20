import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import Order from 'components/store/order';
import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TStoreCheckoutState } from 'redux/types';
import Loading from 'ui-kit/Loading';
import { useEffect } from 'react';
import { fetchCheckouts } from 'redux/slicers/store/checkoutSlicer';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { checkouts, loading } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, []);

  return (
    <>
      <Head>
        <title>Мои заказы | Wuluxe</title>
      </Head>
      <Container
        variants={variants.fadInOut}
        key="order-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="150px"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            gap="30px"
          >
            <PageTitle>Заказы</PageTitle>
            {checkouts.length && !loading ? (
              <Order checkouts={checkouts} />
            ) : loading ? (
              <Loading />
            ) : (
              <NoOreder>
                <h2>У вас пока нет заказов</h2>
              </NoOreder>
            )}
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};
const PageTitle = styled.h3`
  font-size: 2rem;
  font-family: 'intro';
`;
const NoOreder = styled.div`
  width: 100%;
  height: 70vh;
  h2 {
    font-family: 'intro';
  }
`;

Orders.PageLayout = StoreLayout;

export default Orders;
