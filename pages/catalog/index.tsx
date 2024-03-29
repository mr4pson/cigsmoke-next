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
import { Category, Size } from 'swagger/services';
import ProductGrid from 'ui-kit/products/productGrid';
import SEOstatic from 'components/store/SEO/SEOstatic';
import color from 'components/store/lib/ui.colors';
import FiltersSVg from '../../assets/catalog-filters.svg';

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
    sizes,
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
      // await dispatch(fetchTags());
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
  const filteredSizes: any = sizes.filter((size) => {
    if (size.url?.match(/(?:^|\W)not-in-stock(?:$|\W)/)) {
      return;
    }
    return size;
  });

  const filteredColors: any = colors.filter((color) => color.url != '_');

  const [expanded, setExpanded] = useState(false);

  const handleExpantionChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <SEOstatic
        page={{
          name: `Wuluxe ${catalogTitle}` || 'Каталог',
          url: `https://wuluxe.ru${router.asPath}`,
          desc: `Интернет-магазин Wuluxe - ${catalogTitle} - ${products[randomProduct]?.shortDesc}`,
          keywords: `${products[randomProduct]?.keywords}`,
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
            colors={filteredColors}
            priceRange={priceRange}
            tags={tags}
            sizes={filteredSizes.reverse()}
            expanded={expanded}
            handleExpantionChange={handleExpantionChange}
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
            <FilterBtnWrapper>
              <CategoryTitleMobile
                custom={0.1}
                initial="init"
                animate="animate"
                exit={{ y: -80, opacity: 0, transition: { delay: 0.1 } }}
                variants={variants.fadInSlideUp}
              >
                {catalogTitle.length > 11
                  ? catalogTitle.slice(0, 11)
                  : catalogTitle}
              </CategoryTitleMobile>
              <motion.button
                whileTap="tap"
                whileInView="hover"
                variants={variants.boxShadow}
                onClick={handleExpantionChange}
              >
                <span>Фильтры</span>
                <span>
                  <FiltersSVg />
                </span>
              </motion.button>
            </FilterBtnWrapper>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  @media ${devices.mobileL} {
    margin-left: 0;
    padding: 10px 15px;
  }
`;

const CategoryTitle = styled(motion.h1)`
  font-size: 2rem;
  font-weight: bold;
  @media ${devices.mobileL} {
    display: none;
  }
`;

const CategoryTitleMobile = styled(motion.h1)`
  font-size: 1.25rem;
  font-weight: bold;
  display: none;
  @media ${devices.mobileL} {
    display: block;
  }
`;

const Products = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 68px;

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const FilterBtnWrapper = styled.div`
  width: 100%;
  display: none;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background-color: ${color.textPrimary};
  border-radius: 15px;
  padding: 15px;
  top: 150px;
  position: sticky;
  z-index: 10;
  @media ${devices.mobileL} {
    display: flex;
  }
  button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 15px;
    background-color: ${color.btnPrimary};
    span {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: ${color.textPrimary};
      font-size: 1rem;
    }
  }
`;

export default CatalogPage;
