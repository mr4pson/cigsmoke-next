import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import WishlistComp from 'components/store/wishlistComp';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const Wishlist = () => {
  const [hasWishlist, setWishlist] = useState(true);
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
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            gap="30px"
          >
            {hasWishlist ? (
              <WishlistComp />
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

Wishlist.PageLayout = StoreLayout;

export default Wishlist;
