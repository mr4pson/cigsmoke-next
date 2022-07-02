import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Page } from 'routes/constants';

const IndexPage = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    navigateTo(router, Page.LOGIN)();
  }, []);

  return <></>;
};

export default IndexPage;
