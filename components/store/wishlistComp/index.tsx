import styled from 'styled-components';
import ProductGrid from 'ui-kit/products/productGrid';
import { useEffect, useState } from 'react';
import { Product, ProductService } from 'swagger/services';
import { generateArrayOfNumbers } from 'common/helpers/array.helper';

const productArray = generateArrayOfNumbers(3);
const WishlistComp = () => {
  const [products, setProducts]: [any, any] = useState([]);

  useEffect(() => {
    // (async () => {
    //   const products = (await ProductService.getProducts({
    //     limit: 8,
    //   })) as unknown as { rows: Product[] };
    //   setProducts(products.rows);
    // })();
    setProducts(productArray);
  }, []);
  return (
    <>
      <Header>
        <h2>Избранное</h2>
      </Header>
      <ProductGrid products={products} />
    </>
  );
};

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h2 {
    font-family: 'intro';
    font-size: 2rem;
  }
`;

export default WishlistComp;
