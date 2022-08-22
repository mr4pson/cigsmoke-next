import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { devices } from '../lib/Devices';

type styleProps = {
  flexDirectionMobile?: string;
};
const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media ${devices.mobileL} {
    flex-direction: ${(p: styleProps) => p.flexDirectionMobile ?? 'row'};
  }
`;

export { Wrapper };
