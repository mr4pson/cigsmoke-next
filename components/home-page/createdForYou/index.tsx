import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { useEffect, useState } from 'react';
import {
  Container,
  Wrapper,
  Content,
} from 'components/store/storeLayout/common';
import ProductGrid from '../productGrid';
import Subscription from './subscription';
import { Basket, Product, ProductService, Wishlist } from 'swagger/services';
import { useAppSelector } from 'redux/hooks';

const Section = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const cart: Basket = useAppSelector((state) => state.global.cart);
  const wishlist: Wishlist = useAppSelector((state) => state.global.wishlist);

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
        key="section_three"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="row"
        justify_content="space-evenly"
        padding="50px 0 0 0"
        bg_color={color.bgSecondary}
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
                <h2>Создано для тебе</h2>
              </Header>
            </AnimatePresence>
            <ContentInner>
              <ProductGrid
                gridStyle={{
                  gridTemplateAreas: "'item item item subscribe'",
                  justify_content: 'space-between',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '50px 20px',
                }}
                products={products}
                cart={cart}
                wishlist={wishlist}
              >
                <Subscription />
              </ProductGrid>
              <Footer
                key="header-messege"
                custom={0.4}
                initial="init"
                whileInView="animate"
                exit="exit"
                viewport={{ once: true }}
                variants={variants.fadInSlideUp}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                  harum nesciunt ipsum debitis quas aliquid
                </p>
                <Link href="#">
                  <motion.a
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                  >
                    <button>Показать все</button>
                  </motion.a>
                </Link>
              </Footer>
            </ContentInner>
          </Content>
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

const ContentInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  place-items: center;
  gap: 50px;
  border-radius: 30px 30px 0 0;
  background-color: ${color.bgProduct};
  padding-bottom: 80px;
`;

const Header = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h2 {
    font-family: intro;
    font-weight: 700;
    font-size: 4rem;
    margin: 0;
    color: ${color.textPrimary};
  }
`;

const Footer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.bgProduct};
  p {
    text-align: center;
    width: 60%;
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

export default Section;
