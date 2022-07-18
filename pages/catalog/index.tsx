import FilterBar from 'components/store/catalog/FilterBar';
import ProductItem from 'components/store/catalog/ProductItem';
import variants from 'components/store/lib/variants';
import { Container, Wrapper } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';
import styled from 'styled-components';

const CatalogPage = () => {
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
        <FilterBar />
        <Content>
          <CategoryTitle>Кальяны</CategoryTitle>
          <Products>
            <ProductItem
              data={{
                name: 'Кальян Magix 2203 Black',
                images: JSON.stringify(['./assets/images/test-product.jpg']),
                price: 3000,
              }}
            />
            <ProductItem
              data={{
                name: 'Кальян Magix 2203 Black',
                images: JSON.stringify(['./assets/images/test-product.jpg']),
                price: 3000,
              }}
            />
            <ProductItem
              data={{
                name: 'Кальян Magix 2203 Black',
                images: JSON.stringify(['./assets/images/test-product.jpg']),
                price: 3000,
              }}
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

const CategoryTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const Products = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 68px;
`;

export default CatalogPage;
