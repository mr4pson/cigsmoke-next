import FilterBar from 'components/store/catalog/FilterBar';
import {
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import variants from 'components/store/lib/variants';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchParentCategories } from 'redux/slicers/store/catalogSlicer';
import { TCatalogState } from 'redux/types';
import styled from 'styled-components';
import ProductGrid from 'ui-kit/products/productGrid';

const CatalogPage = () => {
  const { products, categories, subCategories, brands, colors, priceRange } =
    useAppSelector<TCatalogState>((state) => state.catalog);
  const dispatch = useAppDispatch();

  const handleLocationChange = onLocationChange(dispatch);

  useEffect(() => {
    localStorage.removeItem('location');
    window.addEventListener('locationChange', handleLocationChange);
    setPriceRange(dispatch);
    (async () => {
      await dispatch(fetchParentCategories());
      await handleLocationChange();
    })();

    return () => {
      window.removeEventListener('locationChange', handleLocationChange);
    };
  }, []);

  return (
    <Container
      variants={variants.fadInOut}
      key="header"
      initial="start"
      animate="middle"
      exit="end"
      flex_direction="column"
      justify_content="center"
      style={{ backgroundColor: '#F6F6F6', padding: '35px 0 50px' }}
    >
      <Wrapper>
        <FilterBar
          categories={categories}
          subCategories={subCategories}
          brands={brands}
          colors={colors}
          priceRange={priceRange}
        />
        <Content>
          <CategoryTitle
            custom={0.1}
            initial="init"
            animate="animate"
            exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
            variants={variants.fadInSlideUp}
          >
            Кальяны
          </CategoryTitle>
          <Products>
            <ProductGrid
              gridStyle={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                columnGap: '53px',
                laptopColumnGap: '138px!important',
                laptopGridTemplateColumns: 'repeat(2, 1fr) !important',
              }}
              products={products}
              emptyProductsTitle={'По вашему запросу ничего не найдено.'}
            />
          </Products>
        </Content>
      </Wrapper>
    </Container>
  );
};

CatalogPage.PageLayout = StoreLayout;

const Content = styled.div`
  width: 100%;
  margin-left: 41px;
`;

const CategoryTitle = styled(motion.h1)`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 68px;
`;

export default CatalogPage;
