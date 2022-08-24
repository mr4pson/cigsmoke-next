import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import Arrow from '../../../../../assets/arrow.svg';

type Props = {
  title: string;
  imgSrc: any;
  children: JSX.Element | JSX.Element[] | string | string[];
};

const CatalogDropDown = ({ title, imgSrc, children }: Props) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [displayInfo, setDisplayInfo] = useState('none');

  return (
    <>
      <CatalogItemWrapper
        onClick={() => {
          setOpenInfo(!openInfo);
          setTimeout(() => {
            setDisplayInfo(displayInfo == 'none' ? 'flex' : 'none');
          }, 200);
        }}
      >
        <img src={imgSrc} />
        <CatalogNameWrappers>
          <span>{title}</span>
          <motion.span
            className="arrow"
            animate={openInfo ? 'open' : 'close'}
            variants={variants.rotate}
          >
            <Arrow />
          </motion.span>
        </CatalogNameWrappers>
      </CatalogItemWrapper>
      <SubContentWrappers
        style={{ display: displayInfo }}
        animate={{
          padding: openInfo ? '15px' : 0,
        }}
        transition={{ duration: 0.3, padding: { delay: 0.1 } }}
      >
        <motion.div
          id="info-content"
          style={{ display: displayInfo }}
          animate={{
            opacity: openInfo ? 1 : 0,
          }}
        >
          {children}
        </motion.div>
      </SubContentWrappers>
    </>
  );
};

const CatalogItemWrapper = styled.li`
  grid-area: main;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  padding: 10px;
  a {
    width: 100%;
    height: 100%;
    img {
      width: 80%;
    }
  }
`;

const CatalogNameWrappers = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  span {
    font-family: 'intro';
  }
  .arrow {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const SubContentWrappers = styled(motion.li)`
  grid-area: sub;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  overflow: hidden;
  #info-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
  }
`;

export default CatalogDropDown;
