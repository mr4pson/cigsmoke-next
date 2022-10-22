import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { handleVerification } from './helpers';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';

const VerifyAcountByToken = () => {
  const [serverResponse, setServerResponse] = useState(undefined);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    handleVerification(router, setServerResponse, dispatch);
  }, []);
  const [counter, setCounter] = useState(10);
  useEffect(() => {
    setTimeout(() => setCounter(counter - 1), 1000);
  });

  return (
    <>
      {serverResponse == 401 ? <Err>Ключ не найден</Err> : ''}
      {serverResponse == 403 ? <Err>Срок действия ключа истек</Err> : ''}
      {serverResponse == 408 ? <Err>Уже проверено</Err> : ''}
      {serverResponse == 500 || serverResponse == 504 ? (
        <Err>Что-то пошло не так, нам очень жаль</Err>
      ) : (
        ''
      )}
      {serverResponse == 200 ? (
        <>
          <Confirmed>Ваша учетная запись была подтверждена</Confirmed>
          <Ok>Вскоре мы перенаправим вас в вашу учетную запись</Ok>
        </>
      ) : (
        ''
      )}
      <Counter>
        Мы перенаправим вас на страницу вашего профиля после: {counter}
      </Counter>
    </>
  );
};

const Err = styled(motion.h2)`
  color: ${color.hover};
`;

const Confirmed = styled(motion.h1)`
  color: ${color.ok};
  font-family: 'intro';
`;
const Ok = styled(motion.span)`
  color: ${color.ok};
`;

const Counter = styled.h2`
  color: ${color.ok};
  font-family: 'intro';
`;

export default VerifyAcountByToken;
