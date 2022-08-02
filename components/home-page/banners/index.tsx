import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import styled from 'styled-components';
import ImageBanner from './ImageBanner';
import LatestProductsBanner from './latestProductsBanner';
import OurBrands from './ourBrands';

const Banners = () => {
  return (
    <Container
      variants={variants.fadInOut}
      key="container-home-banners"
      initial="start"
      animate="middle"
      exit="end"
      flex_direction="row"
      justify_content="space-evenly"
      padding="42px 0 0 20px"
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
          gap="35px"
        >
          <Grid>
            <ImageBanner />
            <LatestProductsBanner />
          </Grid>
          <OurBrands />
        </Content>
      </Wrapper>
    </Container>
  );
};

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  place-items: flex-start;
  gap: 40px;
`;

export default Banners;
