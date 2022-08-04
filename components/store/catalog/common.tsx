import styled from 'styled-components';
import { motion } from 'framer-motion';

const Filter = styled.div`
  margin-bottom: 17px;
`;

const FilterTitle = styled(motion.div)`
  font-size: 24px;
  font-weight: bold;
`;

const FilterBody = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.09);
  padding: 12px 16px;
  margin-top: 16px;
`;

export { Filter, FilterTitle, FilterBody };
