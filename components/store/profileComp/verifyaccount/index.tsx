import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleVerification } from './helpers';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from 'components/store/lib/ui.colors';

const VerifyAcountByToken = () => {
  const [serverResponse, setServerResponse] = useState(undefined);
  const routre = useRouter();
  useEffect(() => {
    handleVerification(routre, setServerResponse);
  }, []);
  return (
    <>
      {serverResponse == 401 ? <Err>Ключ не найден</Err> : ''}
      {serverResponse == 403 ? <Err>Срок действия ключа истек</Err> : ''}
      {serverResponse == 408 ? <Err>Уже проверено</Err> : ''}
      {serverResponse == 500 ? (
        <Err>Что-то пошло не так, нам очень жаль</Err>
      ) : (
        ''
      )}
      {serverResponse != 401 ||
      serverResponse != 403 ||
      serverResponse != 408 ||
      serverResponse != 500 ? (
        <>
          <Confirmed>Ваша учетная запись была подтверждена</Confirmed>
          <Ok>Вскоре мы перенаправим вас в вашу учетную запись</Ok>
        </>
      ) : (
        ''
      )}
    </>
  );
};

const Err = styled(motion.span)`
  color: ${color.hover};
`;

const Confirmed = styled(motion.h1)`
  color: ${color.ok};
  font-family: 'intro';
`;
const Ok = styled(motion.span)`
  color: ${color.ok};
`;

export default VerifyAcountByToken;
