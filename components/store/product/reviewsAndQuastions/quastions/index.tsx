import styled from 'styled-components';
import { useState } from 'react';
import Quastion from './Quastions';
import AuthorizeQuastionBtn from '../AuthorizeBtn';
import AskQuastion from './askQuastion';
const Quastions = () => {
  const [isAuthorized, setAuthorized] = useState(false);

  return (
    <ContentContainer>
      <ContentWrapper style={{ alignItems: 'flex-start' }}>
        <Quastion />
      </ContentWrapper>
      <ContentWrapper>
        {isAuthorized ? (
          <AskQuastion />
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
