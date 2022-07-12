import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';

import styled from 'styled-components';

interface props {
  width?: string;
  height?: string;
}

const Btns = styled(motion.button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  gap: 5px;
  user-select: none;
  cursor: pointer;
  span {
    font-size: 1rem;
    line-height: 1;
  }
  &:hover {
    color: ${color.hover};
  }
`;

export { Btns };
