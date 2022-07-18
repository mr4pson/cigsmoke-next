import Head from 'next/head';
import StoreLayout from 'components/store/storeLayout/layouts';
import SectionOne from 'components/home-page/section.one';
import SectionTwo from 'components/home-page/section.two';
import SectionThree from 'components/home-page/section.three';
import SectionFour from 'components/home-page/section.four';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>cigsmoke</title>
        <meta name="description" content="Test description" />
      </Head>
      <SectionOne />
      <SectionTwo />
      <SectionThree /> {/* Shows products based on cockies */}
      <SectionFour />
    </>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
