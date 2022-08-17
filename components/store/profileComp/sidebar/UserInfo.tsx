import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';

const UserInfo = () => {
  return (
    <Wrapper>
      <img src="/static/temp/gamer.png" alt="profile" />
      <h1>Rishad Moammadi</h1>
      <span>email@mail.com</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  img {
    width: 60px;
    border-radius: 60%;
  }
  h1 {
    font-family: 'intro';
    font-size: 1.5rem;
  }
  span {
    color: ${color.textSecondary};
  }
`;

export default UserInfo;
