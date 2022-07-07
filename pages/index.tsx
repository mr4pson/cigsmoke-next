import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Page } from 'routes/constants';
import StoreLayout from 'components/storeLayout/layouts';

const IndexPage = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    navigateTo(router, Page.LOGIN)();
  }, []);

  return <></>;
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
