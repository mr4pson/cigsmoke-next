import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../lib/ui.colors';
import variants from '../lib/variants';
import Header from './Header';
import Footer from './Footer';
import Authorize from './authorize';
import UserData from './userdata';
import DeliveryDetails from './deliverDetails';
import TotalDetails from './TotalDetails';

const CheckoutContent = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [hasAddress, setAddress] = useState(false);
  const [step, setStep] = useState(0);
  return (
    <>
      <Header step={step} setStep={setStep} />
      {step == 0 && !isAuthorized ? (
        <Authorize
          setAuthorized={setAuthorized}
          step={step}
          setStep={setStep}
        />
      ) : step == 1 && isAuthorized ? (
        <UserData step={step} setStep={setStep} />
      ) : (
        <>
          <DeliveryDetails />
          <TotalDetails />
        </>
      )}

      <Footer />
    </>
  );
};

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
