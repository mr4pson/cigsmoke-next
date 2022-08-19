import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import styled from 'styled-components';
import { PopupDisplay } from '../HeaderCart/constants';
import { handleClickOutside } from '../HeaderCart/helpers';
import AuthBtn from './AuthBtn';
import Authorization from './authorize';

import { UsePagination } from './authorize/helpers';
import { handleAfterAuthorized } from './helpers';
import { Profile } from './Profile';

const Authorize = () => {
  const [direction, authType, paginate] = UsePagination();
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      handleClickOutside(isOpened, setIsOpened, setDisplay)();
    },
  });

  return (
    <>
      <AuthBtn
        user={user}
        isSignedIn={!!user}
        setIsOpened={setIsOpened}
        setDisplay={setDisplay}
        paginate={paginate}
        // avatar={} Todo pass the profile avatar
      />
      <PopupWrapper
        ref={ref}
        style={{ display }}
        animate={isOpened ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        <AuthContent>
          {user ? (
            <Profile
              user={user}
              direction={direction}
              setDisplay={setDisplay}
              setIsOpened={setIsOpened}
            />
          ) : (
            <Authorization
              direction={direction}
              authType={authType}
              paginate={paginate}
              onAfterAuthorized={handleAfterAuthorized(setDisplay, setIsOpened)}
            />
          )}
        </AuthContent>
      </PopupWrapper>
    </>
  );
};

const PopupWrapper = styled(motion.div)`
  width: 400px;
  height: 412px;
  position: absolute;
  top: 70px;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
`;

const AuthContent = styled(motion.div)`
  width: 85%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  p {
    text-align: center;
  }
  span {
    color: ${color.hover};
  }
`;

export default Authorize;
