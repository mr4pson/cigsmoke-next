import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
`;

const Header = styled.h2`
  font-family: 'intro';
  font-size: 1.5rem;
`;

const PopupContainer = styled.div`
  width: 100%;
  height: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  background-color: #ffffff66;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 25;
`;

export { Container, Header, PopupContainer };
