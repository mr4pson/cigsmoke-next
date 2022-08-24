import StoreLayout from 'components/store/storeLayout/layouts';
import CatalogDropDown from 'components/store/storeLayout/utils/HeaderCatalog/CatalogMobile';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Head from 'next/head';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
const CatalogMobile = () => {
  return (
    <>
      {' '}
      <Head>
        <title>Личные кабинет | Wuluxe</title>
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
            gap="30px"
          >
            <CatalogDropDown />
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

CatalogMobile.PageLayout = StoreLayout;

export default CatalogMobile;
