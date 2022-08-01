import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../../../../assets/arrow_white.svg';
import Cards from '../../../../../assets/creditCard.svg';
import Bookmark from '../../../../../assets/bookmark.svg';
import AuthBtn from './AuthBtn';

interface props {
  width?: string;
  rotate?: string;
}

const validateEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const AuthPopup = () => {
  const [[isForm, formDisplay], setForm] = useState([false, 'none']);
  const [formType, setformType] = useState('step-1');
  const [[page, direction], setPage] = useState([0, 0]);
  const [isSignedIn, setSignedIn] = useState(false);

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

  const ProfileComp = () => {
    return (
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
        <ProfileWrapper>
          <Auth_devider style={{ justifyContent: 'flex-start' }}>
            <Link href="/lk">
              <a>
                <motion.img src="/static/temp/gamer.png" />
              </a>
            </Link>
            <ProfileDataWrapper>
              <h3>Username</h3>
              <span>user@mail.com</span>
              <Link href="/user-data">
                <a>
                  <b>Личные данные</b>
                </a>
              </Link>
            </ProfileDataWrapper>
          </Auth_devider>
        </ProfileWrapper>

        <Link href="/cards">
          <motion.a
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            style={{ alignSelf: 'flex-start' }}
          >
            <Auth_devider style={{ justifyContent: 'flex-start' }}>
              <Cards />
              <span style={{ fontWeight: '500', color: color.btnPrimary }}>
                Мои карты
              </span>
            </Auth_devider>
          </motion.a>
        </Link>
        <Link href="/bookmarks">
          <motion.a
            whileHover="hover"
            whileTap="tap"
            custom={1.04}
            variants={variants.grow}
            style={{ alignSelf: 'flex-start' }}
          >
            <Auth_devider style={{ justifyContent: 'flex-start' }}>
              <Bookmark />
              <span style={{ fontWeight: '500', color: color.btnPrimary }}>
                Любимые бренды
              </span>
            </Auth_devider>
          </motion.a>
        </Link>

        <Auth_btns
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          width="100"
          onClick={() => {
            setformType('step-1');
            paginate(1);
            setSignedIn(false);
          }}
        >
          Выйти
        </Auth_btns>
      </Auth_content>
    );
  };

  const SignIn_comp = () => {
    const [email, setEmail]: [any, any] = useState('');
    const [psw, setPsw] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pswErr, setPswErr] = useState(false);
    return (
      <Auth_form>
        <h4>
          <span>Введите свой Логен и Пароль, чтобы войти</span>
        </h4>
        <span style={{ color: color.hover, fontSize: '0.875rem' }}>
          {emailErr ? 'Неправильный логин' : ''}
        </span>
        <span style={{ color: color.hover, fontSize: '0.875rem' }}>
          {pswErr ? 'Пароль не может быть пустым' : ''}
        </span>
        <Auth_feilds_wrapper>
          <label htmlFor="signin-email">
            <b>
              <span>Логин</span>
            </b>
          </label>
          <Auth_feilds
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder="Логин"
            width="90"
            type="email"
            id="signin-email"
            value={email}
            style={{
              border: emailErr
                ? `solid 1px ${color.hover}`
                : `solid 1px ${color.btnPrimary}`,
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErr(false);
            }}
          />
        </Auth_feilds_wrapper>
        <Auth_feilds_wrapper>
          <label htmlFor="signin-pws">
            <b>
              <span>Пароль</span>
            </b>
          </label>
          <Auth_feilds
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder="Пароль"
            width="90"
            type="password"
            id="signin-pws"
            style={{
              border: pswErr
                ? `solid 1px ${color.hover}`
                : `solid 1px ${color.btnPrimary}`,
            }}
            value={psw}
            onChange={(e) => {
              setPsw(e.target.value);
              setPswErr(false);
            }}
          />
        </Auth_feilds_wrapper>
        <Link href="/">
          <a style={{ alignSelf: 'flex-start', color: color.hover }}>
            Забыл пароль
          </a>
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
              if (validateEmail(email) && psw != '') {
                paginate(1);
                setformType('signed-in');
                setSignedIn(!isSignedIn);
              } else {
                !validateEmail(email) ? setEmailErr(true) : setPswErr(true);
              }
            }}
          >
            Войти
          </Auth_btns>
        </Auth_devider>
      </Auth_form>
    );
  };
  const SignUp_comp = () => {
    const [email, setEmail]: [any, any] = useState('');
    const [psw, setPsw] = useState('');
    const [confirmPsw, setConfirmPsw] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pswErr_1, setPswErrOne] = useState(false);
    const [pswErr_2, setPswErrTwo] = useState(false);
    return (
      <>
        {formType == 'signup-1' ? (
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
                  <b>
                    <span>Имя</span>
                  </b>
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
                  <b>
                    <span>Фамилия</span>
                  </b>
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
                <b>
                  <span>Эл. адрес</span>
                </b>
              </label>
              <Auth_feilds
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                placeholder="Эл. адрес"
                type="email"
                id="email"
                value={email}
                style={{
                  border: emailErr
                    ? `solid 1px ${color.hover}`
                    : `solid 1px ${color.btnPrimary}`,
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErr(false);
                }}
              />
            </Auth_feilds_wrapper>
            <span style={{ color: color.hover, fontSize: '0.875rem' }}>
              {emailErr ? 'Неправильный эл. адрес' : ''}
            </span>
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
                  if (validateEmail(email)) {
                    paginate(1);
                    setformType('signup-2');
                  } else {
                    setEmailErr(true);
                  }
                }}
              >
                Следующий
                <Arrow_span rotate="0">
                  <Arrow />
                </Arrow_span>
              </Auth_btns>
            </Auth_devider>
          </Auth_form>
        ) : (
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
                <b>
                  <span>Пароль</span>
                </b>
              </label>
              <Auth_feilds
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                placeholder="Пароль"
                type="password"
                id="psw"
                value={psw}
                onChange={(e) => {
                  setPsw(e.target.value);
                  setPswErrOne(false);
                  setPswErrTwo(false);
                }}
              />
            </Auth_feilds_wrapper>
            <Auth_feilds_wrapper>
              <label htmlFor="psw-repeat">
                <b>
                  <span>Повторите пароль</span>
                </b>
              </label>
              <Auth_feilds
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                placeholder="Повторите пароль"
                type="password"
                id="psw-repeat"
                value={confirmPsw}
                onChange={(e) => {
                  setConfirmPsw(e.target.value);
                  setPswErrOne(false);
                  setPswErrTwo(false);
                }}
              />
            </Auth_feilds_wrapper>
            <span style={{ color: color.hover, fontSize: '0.875rem' }}>
              {pswErr_1 ? 'Пароль не может быть пустым' : ''}
            </span>
            <span style={{ color: color.hover, fontSize: '0.875rem' }}>
              {pswErr_2 ? 'Пароль не совпадает' : ''}
            </span>
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
                  if (psw === confirmPsw && psw != '' && confirmPsw != '') {
                    paginate(1);
                    setformType('signed-up');
                    setSignedIn(!isSignedIn);
                  } else {
                    psw == '' || confirmPsw == ''
                      ? setPswErrOne(true)
                      : setPswErrTwo(true);
                  }
                }}
              >
                регистрироваться
              </Auth_btns>
            </Auth_devider>
          </Auth_form>
        )}
      </>
    );
  };

  return (
    <>
      <AuthBtn
        setForm={setForm}
        isForm={isForm}
        formDisplay={formDisplay}
        isSignedIn={isSignedIn}
        setformType={setformType}
        // avatar={} Todo pass the profile avatar
      />
      <Auth_wrapper
        style={{ display: formDisplay }}
        animate={isForm ? 'open' : 'close'}
        variants={variants.fadeInReveal}
      >
        <AnimatePresence>
          {isSignedIn ? (
            <ProfileComp />
          ) : formType == 'step-1' ? (
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
                <strong>
                  <span>Войдите, чтобы делать покупки,</span>{' '}
                </strong>
                <span>
                  отслеживать заказы и пользоваться персональными скидками и
                  баллами. После входа вы сможете создать аккаунт юрлица.
                </span>
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
          ) : formType == 'signin' ? (
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
          ) : (
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
          )}
        </AnimatePresence>
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
  box-shadow: 0px 2px 10px ${color.boxShadowBtn};
  overflow: hidden;
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
  span {
    color: ${color.hover};
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
  span {
    color: ${color.hover};
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

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  a {
    &:hover {
      color: ${color.hover};
    }
  }
`;

const ProfileDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Intro';
  }
  span {
    color: ${color.ratingEmpty};
  }
`;

export default AuthPopup;
