import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: auto;
  padding: 0 10px;
`;
const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${color.textPrimary};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
`;

export { Container, Wrapper, Content };