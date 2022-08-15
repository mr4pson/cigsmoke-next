import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchBanner, fetchBrands } from 'redux/slicers/store/homePageSlicer';
import { THomePageState } from 'redux/types';
import styled from 'styled-components';
import Loading from 'ui-kit/Loading';
import ImageBanner from './ImageBanner';
import LatestProductsBanner from './latestProductsBanner';
import OurBrands from './ourBrands';

const Banners = () => {
  const dispatch = useAppDispatch();
  const { banner } = useAppSelector<THomePageState>((state) => state.homePage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(fetchBanner()), dispatch(fetchBrands())]);
      setLoading(false);
    })();
  }, []);

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
          {!loading ? (
            <>
              <Grid>
                <ImageBanner slides={banner?.slides} />
                <LatestProductsBanner advertisement={banner?.advertisement} />
              </Grid>
              <OurBrands />
            </>
          ) : (
            <Loading />
          )}
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
