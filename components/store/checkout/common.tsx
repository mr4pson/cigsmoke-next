import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';

const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direcition: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export { Wrapper };
