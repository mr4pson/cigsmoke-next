import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Like from '../../../../assets/like.svg';
import { styleProps } from 'components/store/lib/types';

const LikeDisLike = (props: any) => {
  return (
    <LikeDisLikeWrapper bgcolor={props.bgColor}>
      <motion.button
        custom={1.1}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
      >
        <Like />
        {`0`}
      </motion.button>
      <motion.button
        custom={1.1}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
        className="dislike"
      >
        <Like />
        {`0`}
      </motion.button>
    </LikeDisLikeWrapper>
  );
};

const LikeDisLikeWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  font-family: 'intro';
  transition: 300ms;
  button {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    border-radius: 20px;
    background-color: ${(p: styleProps) => p.bgcolor};
    box-shadow: 0px 2px 6px ${color.boxShadowBtn};
    cursor: pointer;
  }
  .dislike {
    svg {
      transform: rotate(180deg);
    }
  }
`;

export default LikeDisLike;
