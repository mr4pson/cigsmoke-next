import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type Props = {
  defaultContent: React.ReactElement;
  activatedContent: React.ReactElement;
  active: boolean;
  onClick: (props?: any) => void;
};

const SwitchBtn: React.FC<Props> = ({
  defaultContent,
  activatedContent,
  active,
  onClick,
}) => {
  return (
    <SwitchWrapper
      whileHover="hover"
      whileTap="tap"
      variants={variants.boxShadow}
      onClick={onClick}
    >
      <Content
        animate={active ? 'exit' : 'animate'}
        variants={variants.fadeOutSlideOut}
        style={{ display: active ? 'none' : 'flex' }}
      >
        {defaultContent}
      </Content>
      <Content
        animate={active ? 'animate' : 'exit'}
        variants={variants.fadeInSlideIn}
        style={{ display: active ? 'flex' : 'none' }}
      >
        {activatedContent}
      </Content>
    </SwitchWrapper>
  );
};

const SwitchWrapper = styled(motion.button)`
  width: 100%;
  height: 45px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const Content = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    white-space: nowrap;
  }

  @media ${devices.laptopS} {
    span {
      display: none;
    }
  }
`;

export default SwitchBtn;
