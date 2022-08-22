import { useEffect, useState } from 'react';
import Header from './Header';
// import Authorize from './authorize';
import UserData from './userdata';
import TotalDeleveryDate from './totalDeliveryDate';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import Authorization from '../storeLayout/utils/HeaderAuth/authorize';
import { UsePagination } from '../storeLayout/utils/HeaderAuth/authorize/helpers';
import { devices } from '../lib/Devices';

const CheckoutContent = () => {
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const [hasAddress, setHasAddress] = useState(false);
  const [backToFinal, setBacktoFinal] = useState(false);
  const [direction, authType, paginate] = UsePagination();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (user) {
      setStep(1);
    }
  }, [user]);

  return (
    <>
      <Header step={step} setStep={setStep} />
      {step == 0 && !user ? (
        <Contianer>
          <Wrapper variants={variants.fadeInReveal}>
            <AuthContent>
              <Authorization
                direction={direction}
                authType={authType}
                paginate={paginate}
              />
            </AuthContent>
          </Wrapper>
        </Contianer>
      ) : step == 1 && user && !hasAddress ? (
        <UserData
          setStep={setStep}
          backToFinal={backToFinal}
          setHasAddress={setHasAddress}
        />
      ) : (
        <TotalDeleveryDate
          setHasAddress={setHasAddress}
          setStep={setStep}
          setBacktoFinal={setBacktoFinal}
        />
      )}
    </>
  );
};

const Contianer = styled(motion.div)`
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media ${devices.mobileL} {
    height: auto;
    padding: 30px 0;
  }
`;

const Wrapper = styled(motion.div)`
  width: 400px;
  height: 412px;
  position: relative;
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

export default CheckoutContent;

// |if the user is not signed in bring authrization whick is first step
// |
// |---if the user is new bring user data which is second step
// |
// |
// |---|if the user is old and has delivery address bring details which is second step finished
//     |and ready to go to third step -> /payment
//     |
//     |--user can edit address and oreder reciver data
