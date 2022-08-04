import styled from 'styled-components';
import { useState } from 'react';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Images from './images';
import Details from './details';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { Basket, Product, Wishlist } from 'swagger/services';

type Props = {
  product?: Product;
  cart?: Basket;
  wishlist?: Wishlist;
};

const ProductInfo: React.FC<Props> = ({ product, cart, wishlist }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const images = product?.images ? product.images?.split(', ') : [];

  return (
    <Container
      key="container-product-section-one"
      flex_direction="row"
      justify_content="center"
      align_items="center"
      padding="50px 0 150px 0"
      bg_color={color.bgProduct}
      initial="start"
      animate="middle"
      exit="end"
      variants={variants.fadInOut}
      transition={{ when: 'afterChildren' }}
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
        >
          <Grid>
            <Images
              product={product}
              images={images}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              paginateImage={paginateImage}
              direction={direction}
              page={page}
              setPage={setPage}
            />
            <Details
              product={product}
              cart={cart}
              wishlist={wishlist}
              images={images}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              paginateImage={paginateImage}
            />
          </Grid>
        </Content>
      </Wrapper>
    </Container>
  );
};

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 50px;
  user-select: none;
`;

export default ProductInfo;
