import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import {
  Container,
  Content,
  Wrapper,
} from 'components/store/storeLayout/common';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product, ProductService } from 'swagger/services';
import ProductGrid from '../../../ui-kit/products/productGrid';

const Bestsellers = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const products = await ProductService.getProducts({ limit: 8 });
      setProducts(products);
    })();
  }, []);

  return (
    <AnimatePresence>
      <Container
        variants={variants.fadInOut}
        key="section_two"
        initial="start"
        animate="middle"
        exit="end"
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
            <AnimatePresence>
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
                <Link href="#">
                  <motion.a
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                  >
                    <button>Показать все</button>
                  </motion.a>
                </Link>
              </Header>
            </AnimatePresence>
            <ProductGrid products={products} />
          </Content>
        </Wrapper>
      </Container>
    </AnimatePresence>
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
