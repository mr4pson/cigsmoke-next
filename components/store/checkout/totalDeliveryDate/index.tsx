import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import DeliveryDetails from './DeliveryDetails';
import TotalDetails from './TotalDetails';
import { devices } from 'components/store/lib/Devices';

const TotalDeliveryDate = (props: any) => {
  const [comment, setComment] = useState('');
  const [leaveNearDoor, setLeaveNearDoor] = useState(false);

  return (
    <Container>
      <div className="back-to-cart">
        <Link href="/cart">
          <a>Вернуться в корзину</a>
        </Link>
        <h1>Оформление заказа</h1>
      </div>
      <Wrapper>
        <DeliveryDetails
          comment={comment}
          leaveNearDoor={leaveNearDoor}
          setComment={setComment}
          setLeaveNearDoor={setLeaveNearDoor}
          {...props}
        />
        <TotalDetails
          comment={comment}
          leaveNearDoor={leaveNearDoor}
          {...props}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  .back-to-cart {
    a {
      &:hover {
        color: ${color.hover};
      }
    }
    h1 {
      font-family: 'intro';
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  gap: 30px;

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

export default TotalDeliveryDate;
