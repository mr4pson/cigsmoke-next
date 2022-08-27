import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import isEmpty from 'validator/lib/isEmpty';
import React, { useState } from 'react';
import { InputsTooltip } from 'components/store/checkout/helpers';
import PswShow from '../../../../assets/pswshow.svg';
import PswHide from '../../../../assets/pswhide.svg';
import { handleResetClick } from './helpers';
import { useRouter } from 'next/router';
const ConfirmResetPsw = () => {
  const [serverResponse, setServerResponse] = useState(undefined);
  const [psw, setPsw] = useState('');
  const [repeatPsw, setRepeatPsw] = useState('');
  const [pswErr, setPswErr] = useState(false);
  const [repeatErr, setrepeatErr] = useState(false);
  const [isCap, setCap] = useState(false);
  const [confidentiality, setConfidentiality] = useState('password');
  const [secret, setSecret] = useState(0);
  const router = useRouter();
  return (
    <Wrapper>
      <Title>Сбросить пароль</Title>
      <ErrorsWrapper>
        {isCap ? <ServerErrResponses>Капслок включен</ServerErrResponses> : ''}
        {repeatPsw !== psw ? (
          <ServerErrResponses>пароль не подходит</ServerErrResponses>
        ) : (
          ''
        )}
        {serverResponse == 401 ? (
          <ServerErrResponses>
            Неавторизованный: токен не найден
          </ServerErrResponses>
        ) : (
          ''
        )}
        {serverResponse == 403 ? (
          <ServerErrResponses>
            Токен просрочен или недействителен
          </ServerErrResponses>
        ) : (
          ''
        )}
        {serverResponse == 409 ? (
          <ServerErrResponses>
            Нельзя использовать тот же пароль, что и предыдущий
          </ServerErrResponses>
        ) : (
          ''
        )}
        {serverResponse == 408 ? (
          <ServerErrResponses>Срок действия токена истек</ServerErrResponses>
        ) : (
          ''
        )}
        {serverResponse == 200 ? (
          <ServerSuccessResponse>Ваш пароль был изменен </ServerSuccessResponse>
        ) : (
          ''
        )}
      </ErrorsWrapper>
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
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
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
            border: `solid 1px ${pswErr ? color.hover : color.btnPrimary}`,
          }}
          onChange={(e) => {
            setPsw(e.target.value);
            setPswErr(isEmpty(e.target.value) ? true : false);
            setServerResponse(undefined);
          }}
          onKeyUp={(e) => setCap(e.getModifierState('CapsLock') ? true : false)}
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
      <AuthInputsWrapper>
        <label htmlFor="signup-psw-repeat">
          <b>
            <span>Повторите пароль</span>
            <span className="required">*</span>
          </b>
          <InputsTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
            key="rpeat-psw-tip"
            title={
              <React.Fragment>
                <span>Это поле обязательно к заполнению</span>
                <span style={{ color: color.hover }}>
                  повторите тот же пароль сверху
                </span>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </InputsTooltip>
        </label>
        <AuthInput
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          placeholder={
            isEmpty(repeatPsw) && repeatErr
              ? 'Пароль не может быть пустым'
              : 'Повторите пароль'
          }
          type={confidentiality}
          id="signup-psw-repeat"
          value={repeatPsw}
          style={{
            border: `solid 1px ${
              isEmpty(repeatPsw) && repeatErr ? color.hover : color.btnPrimary
            }`,
          }}
          onChange={(e) => {
            setRepeatPsw(e.target.value);
            setrepeatErr(isEmpty(e.target.value) ? true : false);
            setServerResponse(undefined);
          }}
          onKeyUp={(e) => setCap(e.getModifierState('CapsLock') ? true : false)}
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
      <ActionBtn
        whileHover="hover"
        whileTap="tap"
        variants={variants.boxShadow}
        style={{
          backgroundColor:
            isEmpty(psw) || isEmpty(repeatPsw) || psw != repeatPsw
              ? color.textSecondary
              : color.btnPrimary,
        }}
        disabled={
          isEmpty(psw) || isEmpty(repeatPsw) || psw != repeatPsw ? true : false
        }
        onClick={(e) => {
          e.preventDefault();
          handleResetClick(psw, router, setServerResponse);
        }}
      >
        Изменить пароль
      </ActionBtn>
    </Wrapper>
  );
};

const Title = styled.h2`
  font-family: 'intro';
  font-size: 1.5rem;
`;

const ServerErrResponses = styled.span`
  color: ${color.hover};
  font-size: 1.2rem;
  text-align: start;
`;
const ServerSuccessResponse = styled.span`
  color: ${color.ok};
  font-size: 1.2rem;
  text-align: start;
  a {
    color: ${color.ok};
    &:hover {
      color: ${color.btnPrimary};
    }
  }
`;

const Wrapper = styled.form`
width:500px;
display:flex;
flex-direction:column;
justify-content:flex-start
align-items:flex-start;
gap:30px;
 @media ${devices.mobileL} {
    width: 100%;
  }
`;

const ErrorsWrapper = styled.div`
width:100%;
display:flex;
flex-direction:column;
justify-content:flex-start
align-items:flex-start;
`;

const AuthInputsWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  position: relative;
  label {
    width: 96%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    span {
      font-family: 'intro';
    }
    .tool-tip {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: help;
    }
    .required {
      color: ${color.hover};
    }
  }
`;

const AuthInput = styled(motion.input)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 1rem;
  font-weight: 700;
`;
const ConfidentialityWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32px;
  right: 5px;
  .content-confidentiality {
    width: 35px;
    height: 25px;
    overflow: hidden;
    position: relative;
    span {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
`;

const ActionBtn = styled(motion.button)`
  width: 100%;
  height: 50px;
  background-color: ${color.btnPrimary};
  color: ${color.textPrimary};
  border-radius: 10px;
  font-family: 'intro';
`;

export default ConfirmResetPsw;
