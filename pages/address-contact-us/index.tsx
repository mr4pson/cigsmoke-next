import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { devices } from 'components/store/lib/Devices';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';

import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import AddressContactUs from 'components/store/addressContactUs';

const ContactUsAndAddress = () => {
  return (
    <>
      <Head>
        <title>Правила использования контента сайта | Wuluxe</title>
      </Head>
      <Container
        variants={variants.fadInOut}
        key="profile-page"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        align_items="center"
        padding="200px 0"
        bg_color={color.textPrimary}
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="flex-start"
            align_items="center"
            gap="30px"
          >
            <AddressContactUs />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

ContactUsAndAddress.PageLayout = StoreLayout;

export default ContactUsAndAddress;
