import { paginateTo } from 'components/store/checkout/constant';
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

import { AuthBtns, Content, Loading } from './common';
import { UsePagination } from './helpers';
import { Profile } from './Profile';
import SignIn from './signin';
import SignUp from './signup';

const Authorize = () => {
  const [direction, authType, paginate] = UsePagination();
  const [isCap, setCap] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [display, setDisplay] = useState(PopupDisplay.None);
  const { user, serverErr, loading } = useAppSelector<TAuthState>(
    (state) => state.auth,
  );

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
            <>
              <Content
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                custom={direction}
                variants={variants.authorizeSlideX}
                animate={authType == 'selection' ? 'center' : 'enter'}
              >
                <AuthMessege
                  custom={0.1}
                  initial="init"
                  whileInView="animate"
                  variants={variants.fadInSlideUp}
                >
                  <h3>Wuluxe</h3>
                  <h4>Войдите или зарегистрируйтесь для оформления заказа</h4>
                  <span>
                    Для регистрации мы вышлем вам ссылку для подтверждения на
                    ваш почтовый ящик
                  </span>
                  <span>это разовое подтверждение</span>
                </AuthMessege>
                <AuthBtns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  bgcolor={color.btnPrimary}
                  onClick={() => paginate(paginateTo.forward, 'signin')}
                >
                  Войти
                </AuthBtns>
                <span style={{ fontFamily: 'intro' }}>или</span>
                <AuthBtns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  bgcolor={color.btnPrimary}
                  onClick={() => paginate(paginateTo.forward, 'signup')}
                >
                  Зарегистрироваться
                </AuthBtns>
              </Content>

              <SignIn
                setDisplay={setDisplay}
                setIsOpened={setIsOpened}
                direction={direction}
                authType={authType}
                paginate={paginate}
                serverErr={serverErr}
                isCap={isCap}
                setCap={setCap}
              />
              <SignUp
                direction={direction}
                authType={authType}
                paginate={paginate}
                serverErr={serverErr}
                isCap={isCap}
                setCap={setCap}
              />
              <Loading
                style={{
                  display: loading ? PopupDisplay.Flex : PopupDisplay.None,
                }}
              />
            </>
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

const AuthMessege = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  h3 {
    font-family: 'intro';
    font-size: 1.3rem;
    margin: 0;
  }
  span {
    color: ${color.textSecondary};
  }
`;

export default Authorize;
