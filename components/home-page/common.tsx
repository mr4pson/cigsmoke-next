import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  place-items: center;
  gap: 35px;
`;

export { Wrapper, Content };
