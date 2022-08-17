import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';
import Head from 'next/head';

const PswReset = () => {
  return (
    <>
      <Head>
        <title>Сброс пароля | Wuluxe</title>
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
          ></Content>
        </Wrapper>
      </Container>
    </>
  );
};

const NoOreder = styled.div`
  width: 100vw;
  height: 70vh;
  h2 {
    font-family: 'intro';
  }
`;

PswReset.PageLayout = StoreLayout;

export default PswReset;
