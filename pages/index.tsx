import StoreLayout from 'components/store/storeLayout/layouts';
import Banners from 'components/home-page/banners';
import Bestsellers from 'components/home-page/bestsellers';
import CreatedForYou from 'components/home-page/createdForYou';
import Reviews from 'components/home-page/reviews';
import SEO from 'components/store/SEO';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <SEO
        url="/"
        title="Главный"
        description="test decription"
        image="image/path"
        schemaType="cart"
        keywords="test, keywords"
      />
      <Banners />
      <Bestsellers />
      <CreatedForYou /> {/* Shows products based on cockies */}
      <Reviews />
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
