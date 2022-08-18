import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleVerification } from './helpers';

const VerifyAcountByToken = () => {
  const [serverResponse, setServerResponse] = useState(undefined);
  const routre = useRouter();
  useEffect(() => {
    handleVerification(routre, setServerResponse);
  }, []);
  return (
    <>
      {serverResponse == 401 ? 'Токен не найден' : ''}
      {serverResponse == 403 ? (
        'Срок действия ключа истек'
      ) : (
        <>
          <h1 style={{ fontFamily: 'intro' }}>
            Ваша учетная запись была подтверждена
          </h1>
          <span>Вскоре мы перенаправим вас в вашу учетную запись</span>
        </>
      )}
    </>
  );
};

export default VerifyAcountByToken;
