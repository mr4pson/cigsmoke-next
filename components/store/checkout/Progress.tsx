import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import { progressStep } from './constant';
import { styleProps } from '../lib/types';
import { devices } from '../lib/Devices';

type props = {
  step: number;
};

const Progress = (props: props) => {
  const { step } = props;
  return (
    <StepsWrapper
      custom={0.1}
      initial="init"
      animate="animate"
      exit={{ y: -20, opacity: 0, transition: { delay: 0.1 } }}
      variants={variants.fadInSlideUp}
    >
      {progressStep.map((steps, index) => {
        return (
          <Step>
            <StepsNumber
              bgcolor={
                step == index || step > index
                  ? color.btnPrimary
                  : color.textSecondary
              }
            >
              {index + 1}
            </StepsNumber>
            <ProgressBarContaier>
              <span>{index == 0 ? 'Авторизация' : 'Доставка'}</span>
              <ProgressBarWrapper>
                <span id="progress-bg"></span>
                <ProgressBar
                  animate={step == index + 1 || step > index ? 'fill' : 'empty'}
                  variants={variants.progress}
                ></ProgressBar>
              </ProgressBarWrapper>
            </ProgressBarContaier>
          </Step>
        );
      })}

      <Step>
        <StepsNumber
          bgcolor={props.step == 2 ? color.btnPrimary : color.textSecondary}
        >
          3
        </StepsNumber>
        <span>Оформление заказа</span>
      </Step>
    </StepsWrapper>
  );
};

const Step = styled.div`
  display: flex;
  gap: 20px;
`;

const StepsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 20px 0;
  user-select: none;
  span {
    font-family: 'intro';
    font-size: 1rem;
  }

  @media ${devices.mobileL} {
    width: 350px;
    flex-direction: column;
  }
`;

const StepsNumber = styled.span`
  background-color: ${(p: styleProps) => p.bgcolor};
  min-width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${color.textPrimary};
`;

const ProgressBarContaier = styled(motion.div)`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  span {
    white-space: nowrap;
  }

  @media ${devices.laptopS} {
    width: 174px;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  #progress-bg {
    width: 100%;
    height: 100%;
    background-color: #e2e7ec;
    border-radius: 5px;
  }
`;

const ProgressBar = styled(motion.span)`
  height: 100%;
  background-color: ${color.ok};
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
`;

export default Progress;
