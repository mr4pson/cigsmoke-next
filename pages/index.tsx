import Head from 'next/head';
import StoreLayout from 'components/store/storeLayout/layouts';
import Banners from 'components/home-page/banners';
import Bestsellers from 'components/home-page/bestsellers';
import CreatedForYou from 'components/home-page/createdForYou';
import Reviews from 'components/home-page/reviews';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>cigsmoke</title>
        <meta name="description" content="Test description" />
      </Head>
      <Banners />
      <Bestsellers />
      <CreatedForYou /> {/* Shows products based on cockies */}
      <Reviews />
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
