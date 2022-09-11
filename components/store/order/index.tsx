import styled from 'styled-components';
import { Checkout } from 'swagger/services';
import { devices } from '../lib/Devices';
import AskQuastion from './AskQuestion';
import Order from './Order';

type Props = {
  checkouts: Checkout[];
};
const MyOrders: React.FC<Props> = ({ checkouts }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <h1>Мои заказы</h1>
      </HeaderWrapper>
      <Content>
        <OrdersWrapper>
          {checkouts.map((checkout, index) => (
            <Order key={`order-${index}`} checkout={checkout} index={index} />
          ))}
        </OrdersWrapper>
        {/* <AskQuastion /> */}
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

  @media ${devices.laptopS} {
    padding-top: 30px;
  }

  @media ${devices.mobileL} {
    padding-top: 30px;
  }
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

  @media ${devices.laptopS} {
    flex-direction: column-reverse;
  }

  @media ${devices.mobileL} {
    flex-direction: column-reverse;
  }
`;

const OrdersWrapper = styled.ul`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  @media ${devices.laptopS} {
    width: 100%;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export default MyOrders;
