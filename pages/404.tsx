import styled from 'styled-components';
import StoreLayout from 'components/store/storeLayout/layouts';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import Head from 'next/head';
import NotFoundSvg from 'components/store/404';

const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Страница не найдена | Wuluxe</title>
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
            style={{ userSelect: 'none' }}
          >
            <NotFoundSvg />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

const NotFoundWrapper = styled.span`
  width: 90%;
`;

NotFound.PageLayout = StoreLayout;
export default NotFound;
