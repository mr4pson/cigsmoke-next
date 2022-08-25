import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import SignIn from './signin';
import SignUp from './signup';
import { UsePagination } from './helpers';
import { Content, AuthBtns, Loading } from './common';
import { paginateTo } from './constant';
import { useState } from 'react';

const Authorize = (props: any) => {
  const [direction, authType, paginate] = UsePagination();
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState(undefined);
  const [isCap, setCap] = useState(false);
  return (
    <Contianer>
      <Wrapper>
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
              Для регистрации мы вышлем вам ссылку для подтверждения на ваш
              почтовый ящик
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
          {...props}
          direction={direction}
          authType={authType}
          paginate={paginate}
          setLoading={setLoading}
          serverErr={serverErr}
          setServerErr={setServerErr}
          isCap={isCap}
          setCap={setCap}
        />
        <SignUp
          {...props}
          direction={direction}
          authType={authType}
          paginate={paginate}
          setLoading={setLoading}
          serverErr={serverErr}
          setServerErr={setServerErr}
          isCap={isCap}
          setCap={setCap}
        />
        <Loading style={{ display: loading ? 'flex' : 'none' }} />
      </Wrapper>
    </Contianer>
  );
};

const Contianer = styled(motion.div)`
  width: 100%;
  // height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 400px;
  height: 450px;
  border-radius: 30px;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 6px ${color.boxShadow};
  overflow: hidden;
  position: relative;
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
