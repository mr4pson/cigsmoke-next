import styled from 'styled-components';
import { useState } from 'react';
import QuastionList from './Quastions';
import AuthorizeQuastionBtn from '../AuthorizeBtn';
import AskQuastion from './askQuastion';
import { useAppSelector } from 'redux/hooks';
import { TProductInfoState } from 'redux/types';
const Quastions = ({ productId, userId }) => {
  const [isAuthorized, setAuthorized] = useState(false);
  const { product } = useAppSelector<TProductInfoState>(
    (state) => state.productInfo,
  );

  return (
    <ContentContainer>
      <ContentWrapper style={{ alignItems: 'flex-start' }}>
        {product?.questions?.length ? (
          <QuastionList product={product} />
        ) : (
          <div>Здесь пока нет вопросов.</div>
        )}
      </ContentWrapper>
      <ContentWrapper>
        {isAuthorized ? (
          <AskQuastion productId={productId} userId={userId} />
        ) : (
          <AuthorizeQuastionBtn
            text="Задайте вопрос"
            setAuthorized={setAuthorized}
          />
        )}
      </ContentWrapper>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 20px 0;
  gap: 20px;
  position: relative;
`;

export default Quastions;
