import styled from 'styled-components';
import UserInfo from './UserInfo';
import Nav from './Nav';

const SideBar = (props: any) => {
  return (
    <ContainerSideBar>
      <UserInfo {...props} />
      <Nav {...props} />
    </ContainerSideBar>
  );
};

const ContainerSideBar = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  position: sticky;
  top: 0;
  user-select: none;
`;

const Wrapper = styled.div``;
export default SideBar;
