import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import CheckoutContent from 'components/store/checkout';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Head from 'next/head';
import Footer from 'components/store/checkout/Footer';

const Checkout = () => {
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css"
          rel="stylesheet"
        />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container
        key="container-checkout"
        flex_direction="row"
        justify_content="center"
        align_items="center"
        padding="20px 0"
        bg_color={color.bgProduct}
        initial="start"
        animate="middle"
        exit="exit"
        variants={variants.fadInOut}
      >
        <Wrapper gap={'20px'}>
          <Content
            flex_direction="column"
            justify_content="space-between"
            align_items="center"
          >
            <CheckoutContent />
          </Content>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
