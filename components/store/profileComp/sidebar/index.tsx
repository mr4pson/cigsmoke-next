import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import UserInfo from './UserInfo';
import Nav from './Nav';
import { useState } from 'react';

const SideBar = (props: any) => {
  return (
    <ContainerSideBar>
      <UserInfo />
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
