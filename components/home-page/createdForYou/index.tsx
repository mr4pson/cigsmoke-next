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

import { BrandService, Product, ProductService } from 'swagger/services';
import ProductGrid from '../../../ui-kit/products/productGrid';
import Subscription from './subscription';

const Section = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  useEffect(() => {
    setLoading(true);
    const history: any = localStorage.getItem('history');
    let randomPruduct: any;
    (async () => {
      let products: any = [];
      if (!history) {
        const brands = await BrandService.getBrands();

        const products = (await ProductService.getProducts({
          limit: 12,
          brands: brands.rows?.map((brand: any) => brand.url).reverse(),
        })) as unknown as { rows: Product[]; length: number };
        setUrl(`/catalog?categories=${products.rows[0]?.category?.url}`);
        setLoading(false);
        setProducts(products.rows);
      }
      if (history) {
        try {
          const deStringified = JSON.parse(history);
          randomPruduct = await ProductService.findProductById({
            productId: `${
              deStringified[Math.floor(Math.random() * deStringified.length)]
            }`,
          });
          products = (await ProductService.getProducts({
            limit: 12,
            categories: [randomPruduct?.category.url],
          })) as unknown as { rows: Product[]; length: number };
          setUrl(
            `/catalog?categories=${products.rows[0].category?.parent.url}`,
          );
          setLoading(false);
          setProducts(products.rows);
        } catch (error) {
          localStorage.removeItem('history');
          const brands = await BrandService.getBrands();

          const products = (await ProductService.getProducts({
            limit: 12,
            brands: brands.rows?.map((brand: any) => brand.url).reverse(),
          })) as unknown as { rows: Product[]; length: number };
          setUrl(`/catalog?categories=${products.rows[0]?.category?.url}`);
          setLoading(false);
          setProducts(products.rows);
        }
      }
    })();
  }, []);

  return (
    <Container
      variants={variants.fadInOut}
      key="section_three"
      initial="start"
      whileInView="middle"
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
          <Header
            key="header-goods"
            custom={0.2}
            initial="init"
            whileInView="animate"
            exit="exit"
            viewport={{ once: true }}
            variants={variants.fadInSlideUp}
          >
            <h2>Создано для тебя</h2>
          </Header>

          <ContentInner>
            <ProductGrid
              gridStyle={{
                gridTemplateAreas: "'item item item subscribe'",
                justify_content: 'space-between',
                alignItems: 'center',
                rowGap: '30px',
                columnGap: '35px',
                padding: '50px 20px',
                laptopColumnGap: '70px!important',
                laptopGridTemplateAreas: `'item item subscribe' !important`,
                laptopSColumnGap: '14px!important',
                laptopSGridTemplateAreas: `'item item subscribe'!important`,
              }}
              products={products}
              loading={loading}
            >
              <Subscription />
            </ProductGrid>
            <Footer
              key="header-messege"
              custom={0.2}
              initial="init"
              whileInView="animate"
              viewport={{ once: true }}
              variants={variants.fadInSlideUp}
            >
              <p>
                Мы рады поделиться некоторыми из лучших товаров, связанных с
                вашей деятельностью на нашем веб-сайте, не стесняйтесь проверить
                их все, ура!
              </p>
              <Link href={url}>
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
