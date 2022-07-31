import { useRouter } from 'next/router';
import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import ProductInfo from 'components/store/product/productInfo';
import Recomendation from 'components/store/product/recomendation';
import ReveiwsAndQuastions from 'components/store/product/reviewsAndQuastions';

const Product = () => {
  const router = useRouter();
  return (
    <>
      <SEO
        url={`cigsmoke.ru${router.asPath}`}
        title={'product title'}
        description="product description"
        image="meta image link"
        schemaType="cart"
        keywords="the, keywords, is, saperated, by, comma"
      />
      <ProductInfo />
      <Recomendation />
      <ReveiwsAndQuastions />
    </>
  );
};
Product.PageLayout = StoreLayout;
export default Product;
