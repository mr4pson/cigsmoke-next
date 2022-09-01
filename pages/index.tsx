import StoreLayout from 'components/store/storeLayout/layouts';
import Banners from 'components/home-page/banners';
import Bestsellers from 'components/home-page/bestsellers';
import CreatedForYou from 'components/home-page/createdForYou';
import Reviews from 'components/home-page/reviews';
import Head from 'next/head';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Главный | Wuluxe</title>
      </Head>
      <Banners />
      <Bestsellers />
      <CreatedForYou />
      <Reviews />
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
