import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import ProductGrid from 'ui-kit/products/productGrid';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchWishlistProducts } from 'redux/slicers/store/wishlistSlicer';
import { TWishlistState } from 'redux/types';
import Loading from 'ui-kit/Loading';

const Wishlist = () => {
  const dispatch = useAppDispatch();

  const { products, loading }: TWishlistState = useAppSelector(
    (state) => state.wishlist,
  );

  useEffect(() => {
    const wishlistId = localStorage.getItem('wishlistId') ?? '';

    dispatch(fetchWishlistProducts(wishlistId));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Избранное | Wuluxe</title>
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
        padding="50px"
        bg_color={color.textPrimary}
      >
        <Wrapper style={{ paddingTop: '90px' }}>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            gap="30px"
          >
            <Header>
              <h2>Избранное</h2>
            </Header>
            {products.length && !loading ? (
              <ProductGrid products={products} />
            ) : loading ? (
              <Loading />
            ) : (
              <NoWishlist>
                <h2>У вас еще нет списка желаний 😃</h2>
              </NoWishlist>
            )}
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const NoWishlist = styled.div`
  width: 100vw;
  height: 70vh;
  h2 {
    font-family: 'intro';
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h2 {
    font-family: 'intro';
    font-size: 2rem;
  }
`;

Wishlist.PageLayout = StoreLayout;

export default Wishlist;
