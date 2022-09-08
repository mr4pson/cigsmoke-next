import StoreLayout from 'components/store/storeLayout/layouts';
import Banners from 'components/home-page/banners';
import Bestsellers from 'components/home-page/bestsellers';
import CreatedForYou from 'components/home-page/createdForYou';
import Reviews from 'components/home-page/reviews';
import SEOstatic from 'components/store/SEO/SEOstatic';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <SEOstatic
        page={{
          name: 'Главный',
          url: '',
          desc: 'Интернет-магазин Wuluxe',
          keywords:
            'wuluxe, wuluxe.ru, волюкс, одноразовые, одноразовые сигареты, купить одноразовые, одноразовые электронные, одноразовые электронные сигареты, одноразовые сигареты купить',
        }}
        image="https://wuluxe.ru/wuluxe.svg"
      />
      <Banners />
      <Bestsellers />
      <CreatedForYou />
      <Reviews />
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
