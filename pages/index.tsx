import { Container } from 'components/store/storeLayout/common';
import StoreLayout from 'components/store/storeLayout/layouts';

const IndexPage = (): JSX.Element => {
  return (
    <Container>
      <div>Home page</div>
    </Container>
  );
};

IndexPage.PageLayout = StoreLayout;
export default IndexPage;
