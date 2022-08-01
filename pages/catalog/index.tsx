import FilterBar from 'components/store/catalog/FilterBar';
import { convertQueryParams } from 'components/store/catalog/helpers';
import variants from 'components/store/lib/variants';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchBrands,
  fetchCategories,
  fetchColors,
  fetchPriceRange,
  fetchProducts,
} from 'redux/slicers/store/catalogSlicer';
import { TFilters } from 'redux/types';
import styled from 'styled-components';
import ProductGrid from 'ui-kit/products/productGrid';

const CatalogPage = () => {
  const router = useRouter();
  const products = useAppSelector((state) => state.catalog.products);
  const categories = useAppSelector((state) => state.catalog.categories);
  const brands = useAppSelector((state) => state.catalog.brands);
  const colors = useAppSelector((state) => state.catalog.colors);
  const priceRange = useAppSelector((state) => state.catalog.priceRange);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchColors());
  }, []);

  useEffect(() => {
    const { categories } = convertQueryParams(router.query);
    const payload: TFilters = {
      categories,
    };

    dispatch(fetchPriceRange(payload));
  }, [router.query.categories]);

  useEffect(() => {
    const { minPrice, maxPrice } = router.query;
    const { categories, brands, colors } = convertQueryParams(router.query);
    const payload: TFilters = {
      categories,
      brands,
      colors,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    dispatch(fetchProducts(payload));
  }, [router.query]);

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
              }}
              products={products}
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
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 68px;
`;

export default CatalogPage;
