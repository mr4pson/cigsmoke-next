import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { outsideClickListner } from 'components/store/storeLayout/helpers';
import { PopupDisplay } from '../../constants';
import { handleMenuState } from '../../helpers';
import UserData from './userdata';
import Pointer from '../../../../../assets/pointer.svg';
const LocationFinder = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const [menuRef, setMenuRef] = useState(null);
  const [btnRef, setBtnRef] = useState(null);
  const [listening, setListening] = useState(false);
  const menuNode = useCallback((node: any) => {
    setMenuRef(node);
  }, []);
  const btnNode = useCallback((node: any) => {
    setBtnRef(node);
  }, []);

  useEffect(
    outsideClickListner(
      listening,
      setListening,
      menuRef,
      btnRef,
      setIsOpened,
      setDisplay,
    ),
  );

  return (
    <>
      <LocationBtn
        ref={btnNode}
        whileHover="hover"
        whileTap="tap"
        custom={1.05}
        variants={variants.grow}
        onClick={handleMenuState(setIsOpened, setDisplay)}
      >
        <span>
          <Pointer />
        </span>
        <span style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
          Выберите ваш город
        </span>
      </LocationBtn>
      <Container style={{ display: display }}>
        <Wrapper
          ref={menuNode}
          style={{ display }}
          animate={isOpened ? 'open' : 'close'}
          variants={variants.fadeInReveal}
        >
          <UserData setIsOpened={setIsOpened} setDisplay={setDisplay} />
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fdfdfd5c;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Wrapper = styled(motion.div)`
  max-width: 1230px;
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 25px;
`;

const LocationBtn = styled(motion.button)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: none;
  padding: 5px 5px 5px 0;
  gap: 5px;
`;

export default LocationFinder;
