import styled from 'styled-components';
import { MutableRefObject, useEffect, useState } from 'react';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Images from './images';
import ImagesMobile from './images/imagesMobile';
import Details from './details';
import { UseImagePaginat } from 'components/store/storeLayout/helpers';
import { Basket, Product, Wishlist } from 'swagger/services';
import { devices } from 'components/store/lib/Devices';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';

type Props = {
  product?: Product;
  cart?: Basket;
  wishlist?: Wishlist;
  reviewRef: MutableRefObject<any>;
  questionRef: MutableRefObject<any>;
};

const ProductInfo: React.FC<Props> = ({
  product,
  cart,
  wishlist,
  reviewRef,
  questionRef,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, direction, setPage, paginateImage] = UseImagePaginat();
  const images = getProductVariantsImages(product?.productVariants);

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
            <ImagesMobile
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
              paginateImage={paginateImage}
              reviewRef={reviewRef}
              questionRef={questionRef}
              setSelectedIndex={setSelectedIndex}
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
  grid-template-columns: 2fr 1.5fr;
  column-gap: 50px;
  user-select: none;
  padding-top: 90px;

  @media ${devices.laptopS} {
    column-gap: 30px;
    padding-top: 100px;
  }

  @media ${devices.mobileL} {
    padding-top: 120px;
    display: flex;
    flex-direction: column;
  }
`;

export default ProductInfo;
