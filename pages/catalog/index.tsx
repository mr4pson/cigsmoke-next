import { Pagination } from 'antd';
import {
  getQueryParams,
  pushQueryParams,
} from 'common/helpers/manageQueryParams.helper';
import FilterBar from 'components/store/catalog/FilterBar';
import {
  convertQueryParams,
  onLocationChange,
  setPriceRange,
} from 'components/store/catalog/helpers';
import { devices } from 'components/store/lib/Devices';
import variants from 'components/store/lib/variants';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchParentCategories,
  fetchTags,
} from 'redux/slicers/store/catalogSlicer';
import { TCatalogState } from 'redux/types';
import styled from 'styled-components';
import { Category } from 'swagger/services';
import ProductGrid from 'ui-kit/products/productGrid';
import SEOstatic from 'components/store/SEO/SEOstatic';

const PAGE_ITEMS_LIMIT = 12;

const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [category, setCategory] = useState<Category | undefined>();
  const [catalogTitle, setCatalogTitle] = useState('Каталог');
  const {
    products,
    productsLength,
    categories,
    subCategories,
    brands,
    colors,
    tags,
    priceRange,
    loading,
    page,
  } = useAppSelector<TCatalogState>((state) => state.catalog);

  const handleLocationChange = onLocationChange(dispatch);

  const onCategoryChange = () => {
    const queryParams = convertQueryParams(
      getQueryParams(window.location.search),
    );
    const categoryUrl =
      queryParams.categories && queryParams.categories![0]
        ? queryParams.categories![0]
        : '';
    const category = categories.find(
      (category) => category.url === categoryUrl,
    );
    setCategory(category);
  };

  const handlePageChange = (page: number) => {
    pushQueryParams([{ name: 'page', value: page }]);
  };

  useEffect(() => {
    localStorage.removeItem('location');
    window.addEventListener('locationChange', () => {
      handleLocationChange();
      onCategoryChange();
    });
    setPriceRange(dispatch);

    (async () => {
      await dispatch(fetchParentCategories());
      await dispatch(fetchTags());
      await handleLocationChange();
      onCategoryChange();
    })();

    return () => {
      window.removeEventListener('locationChange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    setCatalogTitle(`${products[0]?.category?.parent?.name ?? 'Каталог'}`);
  });
  const randomProduct = Math.floor(Math.random() * products?.length);
  return (
    <>
      <SEOstatic
        page={{
          name: `Wuluxe ${catalogTitle}` || 'Каталог',
          url: `https://wuluxe.ru${router.asPath}`,
          desc: `Интернет-магазин Wuluxe - ${catalogTitle} - ${products[
            randomProduct
          ]?.desc?.slice(0, 160)}`,
          keywords: `${products[randomProduct]?.parameterProducts?.map(
            (item) => item.value,
          )}`,
          createdAt: products[randomProduct]?.createdAt,
          updatedAt: products[randomProduct]?.updatedAt,
        }}
        image={`https://wuluxe.ru/api/images/${
          products[0]?.category?.parent?.image ?? 'Каталог'
        }`}
      />
      <Container
        variants={variants.fadInOut}
        key="header"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="column"
        justify_content="center"
        bg_color="#F6F6F6"
        padding="35px 0 50px"
      >
        <Wrapper style={{ paddingTop: '110px' }}>
          <FilterBar
            categories={categories}
            subCategories={subCategories}
            brands={brands}
            colors={colors}
            priceRange={priceRange}
            tags={tags}
          />
          <Content>
            <CategoryTitle
              custom={0.1}
              initial="init"
              animate="animate"
              exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
              variants={variants.fadInSlideUp}
            >
              {catalogTitle}
            </CategoryTitle>
            <Products>
              <ProductGrid
                gridStyle={{
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  columnGap: '53px',
                  laptopColumnGap: '138px!important',
                  laptopGridTemplateColumns: 'repeat(2, 1fr) !important',
                  laptopSColumnGap: '28px!important',
                  laptopSGridTemplateColumns: 'repeat(2, 1fr) !important',
                }}
                products={products}
                loading={loading}
                emptyProductsTitle={'По вашему запросу ничего не найдено.'}
              />
            </Products>
            {!loading && !!productsLength && (
              <Pagination
                style={{ marginTop: '20px' }}
                defaultCurrent={page}
                total={productsLength}
                pageSize={PAGE_ITEMS_LIMIT}
                onChange={handlePageChange}
              />
            )}
          </Content>
        </Wrapper>
      </Container>
    </>
  );
};

CatalogPage.PageLayout = StoreLayout;

const Content = styled.div`
  width: 100%;
  margin-left: 41px;

  @media ${devices.mobileL} {
    margin-left: 0;
    padding: 10px 15px;
  }
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

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
  }
`;

export default CatalogPage;
