import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import CheckoutContent from 'components/store/checkout';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';

const Checkout = () => {
  return (
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
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
          style={{ overflowX: 'hidden' }}
        >
          <CheckoutContent />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
