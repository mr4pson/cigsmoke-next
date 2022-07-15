import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Btns } from '../common';
import { PathCircle } from './paths';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../../../assets/arrow_white.svg';

interface props {
  width?: string;
  rotate?: string;
}

const Auth_comp = () => {
  const [isAnimate, setAnimate] = useState(false);
  const [[isForm, formDisplay], setForm] = useState([false, 'none']);
  const [formType, setformType] = useState('step-1');
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const body: any = document.getElementById('__next');
    body.addEventListener('click', (event: any) => {
      const form: any = document.getElementById('auth-container');
      if (event.target !== form && !form.contains(event.target)) {
        setForm([false, 'none']);
        setformType('step-1');
      }
    });

    return () => {
      body.removeEventListener('click', () => console.log('removed'));
    };
  }, []);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const SignIn_comp = () => {
    return (
      <Auth_form>
        <h4>Введите свой номер логен и Пароль, чтобы войти</h4>
        <Auth_feilds_wrapper>
          <label htmlFor="signin-email">
            <b>Логин</b>
          </label>
          <Auth_feilds
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder="Логин"
            width="90"
            type="email"
            id="signin-email"
          />
        </Auth_feilds_wrapper>
        <Auth_feilds_wrapper>
          <label htmlFor="signin-pws">
            <b>Пароль</b>
          </label>
          <Auth_feilds
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder="Пароль"
            width="90"
            type="password"
            id="signin-pws"
          />
        </Auth_feilds_wrapper>
        <Link href="/">
          <a style={{ alignSelf: 'flex-start' }}>Забыл пароль</a>
        </Link>
        <Auth_devider>
          <Auth_btns
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            width="100"
            onClick={(e) => {
              e.preventDefault();
              paginate(-1);
              setformType('step-1');
            }}
          >
            <Arrow_span rotate="180">
              <Arrow />
            </Arrow_span>
            Назад
          </Auth_btns>
          <Auth_btns
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            width="100"
            onClick={(e) => {
              e.preventDefault();
              paginate(1);
              setformType('step-1');
            }}
          >
            Войти
          </Auth_btns>
        </Auth_devider>
      </Auth_form>
    );
  };
  const SignUp_comp = () => {
    return (
      <>
        {formType == 'signup-1' ? (
          <AnimatePresence>
            <Auth_form
              key={page}
              custom={direction}
              variants={variants.slider_auth}
              initial="enter"
              animate="center"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
            >
              <Auth_devider>
                <Auth_feilds_wrapper>
                  <label htmlFor="name">
                    <b>Имя</b>
                  </label>
                  <Auth_feilds
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                    placeholder="Имя"
                    id="name"
                  />
                </Auth_feilds_wrapper>
                <Auth_feilds_wrapper>
                  <label htmlFor="family">
                    <b>Фамилия</b>
                  </label>
                  <Auth_feilds
                    whileHover="hover"
                    whileTap="tap"
                    variants={variants.boxShadow}
                    placeholder="Фамилия"
                    id="family"
                  />
                </Auth_feilds_wrapper>
              </Auth_devider>
              <Auth_feilds_wrapper>
                <label htmlFor="email">
                  <b>Эл. адрес</b>
                </label>
                <Auth_feilds
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  placeholder="Эл. адрес"
                  type="email"
                  id="email"
                />
              </Auth_feilds_wrapper>
              <Auth_devider>
                <Auth_btns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  width="100"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(-1);
                    setformType('step-1');
                  }}
                >
                  <Arrow_span rotate="180">
                    <Arrow />
                  </Arrow_span>
                  Назад
                </Auth_btns>
                <Auth_btns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  width="100"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(1);
                    setformType('signup-2');
                  }}
                >
                  Следующий
                  <Arrow_span rotate="0">
                    <Arrow />
                  </Arrow_span>
                </Auth_btns>
              </Auth_devider>
            </Auth_form>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <Auth_form
              key={page}
              custom={direction}
              variants={variants.slider_auth}
              initial="enter"
              animate="center"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
            >
              <Auth_feilds_wrapper>
                <label htmlFor="psw">
                  <b>Пароль</b>
                </label>
                <Auth_feilds
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  placeholder="Пароль"
                  type="psw"
                  id="password"
                />
              </Auth_feilds_wrapper>
              <Auth_feilds_wrapper>
                <label htmlFor="psw-repeat">
                  <b>Повторите пароль</b>
                </label>
                <Auth_feilds
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  placeholder="Повторите пароль"
                  type="password"
                  id="psw-repeat"
                />
              </Auth_feilds_wrapper>
              <Auth_devider>
                <Auth_btns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  width="100"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(-1);
                    setformType('signup-1');
                  }}
                >
                  <Arrow_span rotate="180">
                    <Arrow />
                  </Arrow_span>
                  Назад
                </Auth_btns>
                <Auth_btns
                  whileHover="hover"
                  whileTap="tap"
                  variants={variants.boxShadow}
                  width="140"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(1);
                    setformType('step-1');
                  }}
                >
                  регистрироваться
                </Auth_btns>
              </Auth_devider>
            </Auth_form>
          </AnimatePresence>
        )}
      </>
    );
  };

  return (
    <>
      <Btns
        onClick={() => {
          setForm([!isForm, formDisplay == 'none' ? 'flex' : 'none']);
          setformType('step-1');
          setAnimate(!isAnimate);
          setTimeout(() => setAnimate(false), 200);
        }}
      >
        <span>
          <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
            <PathCircle
              animate={isAnimate ? 'animate' : 'init'}
              variants={variants.slideRight}
              d="M0.875 13.239H20.875M20.875 13.239L16.875 17.614M20.875 13.239L16.875 8.61401"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="bevel"
            />
            <PathCircle
              animate={isAnimate ? 'animate' : 'init'}
              variants={variants.fadeOut}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M28.0169 13.114C28.0169 19.2383 23.0521 24.203 16.9279 24.203C12.2754 24.203 8.29212 21.3379 6.64626 17.2758H5.14905C6.86317 22.1271 11.4896 25.603 16.9279 25.603C23.8253 25.603 29.4169 20.0115 29.4169 13.114C29.4169 6.21652 23.8253 0.625 16.9279 0.625C11.4896 0.625 6.86317 4.10091 5.14905 8.95227H6.64626C8.29212 4.89016 12.2754 2.025 16.9279 2.025C23.0521 2.025 28.0169 6.98972 28.0169 13.114Z"
              fill="black"
            />
          </svg>
        </span>
        <span> Войти</span>
      </Btns>
      <Auth_wrapper
        style={{ display: formDisplay }}
        animate={isForm ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        {formType == 'step-1' ? (
          <AnimatePresence>
            <Auth_content
              key={page}
              custom={direction}
              variants={variants.slider_auth}
              initial="enter"
              animate="center"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
            >
              <p>
                <strong>Войдите, чтобы делать покупки, </strong>
                отслеживать заказы и пользоваться персональными скидками и
                баллами. После входа вы сможете создать аккаунт юрлица.
              </p>

              <Auth_btns
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                width="70"
                onClick={() => {
                  setformType('signin');
                  paginate(1);
                }}
              >
                Войти
              </Auth_btns>
              <span>или</span>
              <Auth_btns
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                width="70"
                onClick={() => {
                  setformType('signup-1');
                  paginate(1);
                }}
              >
                Зарегистрироваться
              </Auth_btns>
            </Auth_content>
          </AnimatePresence>
        ) : formType == 'signin' ? (
          <AnimatePresence>
            <Auth_content
              key={page}
              custom={direction}
              variants={variants.slider_auth}
              initial="enter"
              animate="center"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
            >
              <SignIn_comp />
            </Auth_content>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <Auth_content
              key={page}
              custom={direction}
              variants={variants.slider_auth}
              initial="enter"
              animate="center"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
            >
              <SignUp_comp />
            </Auth_content>
          </AnimatePresence>
        )}
      </Auth_wrapper>
    </>
  );
};

const Auth_wrapper = styled(motion.div)`
  width: 300px;
  height: 350px;
  position: absolute;
  top: 70px;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${color.textPrimary};
  box-shadow: 0px 2px 10px ${color.box_shadow_btn};
  overflow: hidden;
  z-index: 1000;
`;

const Auth_content = styled(motion.div)`
  width: 85%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  p {
    text-align: center;
  }
`;

const Auth_form = styled(motion.form)`
  width: 100%;
  height: 285px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  h4 {
    width: 100%;
  }
`;

const Auth_feilds = styled(motion.input)`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid ${color.btnPrimary};
  border-radius: 10px;
`;

const Auth_feilds_wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 5px;
  label {
    align-self: flex-start;
  }
`;

const Auth_devider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const Auth_btns = styled(motion.button)`
  width: ${(p: props) => p.width}%;
  height: 40px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Arrow_span = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: rotate(${(p: props) => p.rotate}deg);
`;

export default Auth_comp;
