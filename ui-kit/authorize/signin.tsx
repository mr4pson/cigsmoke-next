import React, { useState } from 'react';
import { motion } from 'framer-motion';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import {
  Content,
  AuthBtns,
  BtnsWrapper,
  AuthInput,
  AuthInputsWrapper,
  FormWrapper,
  ConfidentialityWrapper,
} from './common';
import { handleBack, handleSignIn } from './helpers';
import { InputsTooltip } from 'components/store/checkout/helpers';
import PswShow from '../../assets/pswshow.svg';
import PswHide from '../../assets/pswhide.svg';
import Link from 'next/link';
import { useAppDispatch } from 'redux/hooks';
const SignIn = (props: any) => {
  const {
    direction,
    authType,
    paginate,
    setStep,
    setLoading,
    serverErr,
    setServerErr,
    isCap,
    setCap,
    setAuthorized,
  } = props;
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pswErr, setPswErr] = useState(false);
  const [confidentiality, setConfidentiality] = useState('password');
  const [secret, setSecret] = useState(0);
  const dispatch = useAppDispatch();
  const payLoad = {
    setStep,
    email,
    psw,
    setLoading,
    setServerErr,
    setAuthorized,
    dispatch,
  };

  return (
    <Content
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      custom={direction}
      variants={variants.authorizeSlideX}
      animate={authType == 'signin' ? 'center' : 'enter'}
    >
      <FormWrapper>
        <h4>Введите свой Логен и Пароль, чтобы войти</h4>
        <span style={{ color: color.hover }}>
          {serverErr >= 500 ? 'Нам очень жаль, что что-то пошло не так 😔' : ''}
        </span>
        <AuthInputsWrapper>
          <label htmlFor="signin-mail">
            <b>
              <span>Логин</span>
              <span className="required">*</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="email-tip"
              title={
                <React.Fragment>
                  <span>Это поле обязательно к заполнению</span>
                  <span
                    style={{
                      color: serverErr == 403 ? color.hover : color.btnPrimary,
                    }}
                  >
                    Эл. адрес должна быть подтверждена для входа
                  </span>
                </React.Fragment>
              }
            >
              <span
                style={{
                  borderColor:
                    serverErr == 403 ? color.hover : color.btnPrimary,
                  color: serverErr == 403 ? color.hover : color.btnPrimary,
                }}
                className="tool-tip"
              >
                ?
              </span>
            </InputsTooltip>
            <span style={{ color: color.hover }}>
              {serverErr == 400 ? 'Неверный эл. адрес' : ''}
            </span>
            <span style={{ color: color.hover, fontSize: '0.4rem' }}>
              {serverErr == 403 ? 'Срок действия ключа истек' : ''}
            </span>
          </label>
          <AuthInput
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder={emailErr ? 'Логин не может быть пустым' : 'Логин'}
            type="email"
            id="signin-mail"
            value={email}
            style={{
              border: `solid 1px ${
                emailErr || serverErr == 403 || serverErr == 400
                  ? color.hover
                  : color.btnPrimary
              }`,
            }}
            onChange={(e) => {
              setServerErr(undefined);
              setEmail(e.target.value.toLowerCase());
              setEmailErr(isEmail(e.target.value) ? false : true);
            }}
          />
        </AuthInputsWrapper>
        <AuthInputsWrapper>
          <label htmlFor="signin-psw">
            <b>
              <span>Пароль</span>
              <span className="required">*</span>
            </b>
            <InputsTooltip
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              key="psw-tip"
              title={
                <React.Fragment>
                  <span>Это поле обязательно к заполнению</span>
                  <span>Эл. адрес должна быть подтверждена для входа</span>
                </React.Fragment>
              }
            >
              <span className="tool-tip">?</span>
            </InputsTooltip>
            <span style={{ color: color.hover }}>
              {serverErr == 401 ? 'Неверный пароль' : ''}
            </span>
            <span>
              {isCap && serverErr == undefined ? 'Капслок включен' : ''}
            </span>
          </label>
          <AuthInput
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            placeholder={pswErr ? 'Пароль не может быть пустым' : 'Пароль'}
            type={confidentiality}
            id="signin-psw"
            value={psw}
            style={{
              border: `solid 1px ${
                pswErr || serverErr == 401 ? color.hover : color.btnPrimary
              }`,
            }}
            onChange={(e) => {
              setServerErr(undefined);
              setPsw(e.target.value);
              setPswErr(isEmpty(e.target.value) ? true : false);
            }}
            onKeyUp={(e) =>
              setCap(e.getModifierState('CapsLock') ? true : false)
            }
          />
          <ConfidentialityWrapper>
            <span className="content-confidentiality">
              <motion.span
                custom={secret}
                animate={confidentiality == 'password' ? 'show' : 'hide'}
                variants={variants.pswConfidential}
                onClick={() => {
                  setSecret(1);
                  setConfidentiality('text');
                }}
              >
                <PswHide />
              </motion.span>
              <motion.span
                custom={secret}
                animate={confidentiality == 'text' ? 'show' : 'hide'}
                variants={variants.pswConfidential}
                onClick={() => {
                  setSecret(-1);
                  setConfidentiality('password');
                }}
              >
                <PswShow />
              </motion.span>
            </span>
          </ConfidentialityWrapper>
        </AuthInputsWrapper>
      </FormWrapper>
      <Link href="/profile/pswreset">
        <a>забыл пароль?</a>
      </Link>
      <BtnsWrapper>
        <AuthBtns
          initial="init"
          whileInView="animate"
          custom={0.05}
          whileHover={{ boxShadow: `0px 0px 4px 2px ${color.boxShadowBtn}` }}
          whileTap={{ boxShadow: `0px 0px 0px 0px ${color.boxShadowBtn}` }}
          variants={variants.fadInSlideUp}
          bgcolor={
            isEmpty(email) || isEmpty(psw) || !isEmail(email)
              ? color.textSecondary
              : color.btnPrimary
          }
          disabled={
            isEmpty(email) || isEmpty(psw) || !isEmail(email) ? true : false
          }
          onClick={() => handleSignIn(payLoad)}
        >
          Войти
        </AuthBtns>
        <AuthBtns
          initial="init"
          whileInView="animate"
          custom={0.1}
          whileHover={{ boxShadow: `0px 0px 4px 2px ${color.boxShadowBtn}` }}
          whileTap={{ boxShadow: `0px 0px 0px 0px ${color.boxShadowBtn}` }}
          variants={variants.fadInSlideUp}
          bgcolor={color.textTertiary}
          onClick={() =>
            handleBack(paginate, setEmailErr, setPswErr, setServerErr, dispatch)
          }
        >
          Назад
        </AuthBtns>
      </BtnsWrapper>
    </Content>
  );
};

export default SignIn;
