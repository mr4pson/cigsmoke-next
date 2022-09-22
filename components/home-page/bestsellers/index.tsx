import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product, ProductService } from 'swagger/services';
import ProductGrid from 'ui-kit/products/productGrid';

const Bestsellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      const products = (await ProductService.getProducts({
        limit: 8,
        tags: ['bestseller'],
      })) as unknown as { rows: Product[] };
      setUrl(`/catalog?tags=bestseller&page=1`);
      setLoading(false);
      setProducts(products.rows);
    })();
  }, []);

  return (
    <Container
      variants={variants.fadInOut}
      key="bestsellers-home-page"
      initial="start"
      whileInView="middle"
      flex_direction="row"
      justify_content="space-evenly"
      bg_color={color.bgProduct}
      padding="50px 0"
    >
      <Wrapper>
        <Content
          flex_direction="column"
          justify_content="space-between"
          align_items="center"
          gap="35px"
        >
          <Header
            key="header-goods"
            custom={0.2}
            initial="init"
            whileInView="animate"
            exit="exit"
            viewport={{ once: true }}
            variants={variants.fadInSlideUp}
          >
            <h3>Бестселлер этой недели</h3>
            <Link href={url}>
              <motion.a
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
              >
                <button>Показать все</button>
              </motion.a>
            </Link>
          </Header>

          <ProductGrid products={products} loading={loading} />
        </Content>
      </Wrapper>
    </Container>
  );
};

const Header = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0;
  }
  button {
    width: 130px;
    height: 45px;
    background: ${color.btnPrimary};
    color: ${color.textPrimary};
    border: none;
    border-radius: 8px;
  }
  a {
    border-radius: 8px;
  }
`;

export default Bestsellers;
