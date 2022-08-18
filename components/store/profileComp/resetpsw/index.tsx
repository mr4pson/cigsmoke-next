import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { useEffect, useState } from 'react';
import { handleResetClick } from './helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ResetPsw = () => {
  // TODO: add json response to not verified users in reset password route
  const [serverResponse, setServerResponse] = useState(undefined);
  const [email, setEmail] = useState('');
  const [inputErr, setInputErr] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <Title>Сброс пароля</Title>
      <span
        style={{
          color: color.hover,
          width: '50%',
          textAlign: 'center',
          fontSize: '1rem',
        }}
      >
        Мы отправим вам письмо на ваш адрес электронной почты для сброса пароля
      </span>
      <ServerErrResponses>
        {serverResponse == 404
          ? 'Такой электронной почты нет в нашей базе данных'
          : ''}
        {serverResponse == 403
          ? 'ваша электронная почта еще не подтверждена'
          : ''}
      </ServerErrResponses>
      <ServerSuccessResponse>
        <Link href="/profile">
          <a>
            {serverResponse == 404 ? 'Вы можете зарегистрироваться здесь' : ''}
          </a>
        </Link>
        {serverResponse == 403
          ? 'проверьте папку со спамом, если вы не видите письма от нас'
          : ''}
        {serverResponse == 200
          ? `Мы отправим вам электронное письмо с подтверждением на ${email}, нажмите на ссылку внутри письма, чтобы изменить свой пароль`
          : ''}
      </ServerSuccessResponse>
      <InputWrapper>
        <motion.input
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          type="email"
          value={email}
          placeholder={
            (isEmpty(email) || !isEmail(email)) && inputErr
              ? 'Эл. адрес не может быть пустым'
              : 'Эл. адрес'
          }
          style={{
            border: `solid 1px ${
              (isEmpty(email) || !isEmail(email)) && inputErr
                ? color.hover
                : color.btnPrimary
            }`,
          }}
          onChange={(e) => {
            setEmail(e.target.value);
            setInputErr(true);
            setServerResponse(undefined);
          }}
        />
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={variants.boxShadow}
          onClick={(e) => {
            e.preventDefault();
            handleResetClick(email, setServerResponse);
          }}
          style={{
            backgroundColor:
              isEmpty(email) || !isEmail(email)
                ? color.textSecondary
                : color.btnPrimary,
          }}
          disabled={isEmpty(email) || !isEmail(email) ? true : false}
        >
          Отправь мне ссылку
        </motion.button>
      </InputWrapper>
    </>
  );
};

const Title = styled.h2`
  font-family: 'intro';
  font-size: 1.5rem;
`;

const ServerErrResponses = styled.span`
  color: ${color.hover};
  font-size: 1.2rem;
  width: 50%;
  text-align: center;
`;
const ServerSuccessResponse = styled.span`
  color: ${color.ok};
  font-size: 1.2rem;
  width: 50%;
  text-align: center;
  a {
    color: ${color.ok};
    &:hover {
      color: ${color.btnPrimary};
    }
  }
`;

const InputWrapper = styled.form`
  width: 400px;
  heght: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  input {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    padding: 0 10px;
    border: 1px solid ${color.btnPrimary};
  }
  button {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
  }
`;
export default ResetPsw;
