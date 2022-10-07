import Head from 'next/head';
import AdminLayout from 'components/admin/adminLayout/layout';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Wuluxe | Admin</title>
        <meta name="description" content="Test description" />
      </Head>
      Main page
    </>
  );
};

IndexPage.PageLayout = AdminLayout;
export default IndexPage;
