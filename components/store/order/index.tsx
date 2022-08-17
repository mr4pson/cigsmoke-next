import { generateArrayOfNumbers } from 'common/helpers/array.helper';
import styled from 'styled-components';
import AskQuastion from './AskQuestion';
import Orders from './Orders';

const data = generateArrayOfNumbers(3);

const Order = () => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <h1>Мои заказы</h1>
      </HeaderWrapper>
      <Content>
        <Orders />
        <AskQuastion />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-contnt: flex-start;
  align-items: flex-start;
  gap: 30px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-contnet: flex-start;
  align-items: center;
  h1 {
    font-family: 'intro';
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
`;

export default Order;
