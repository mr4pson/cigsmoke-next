import { useState } from 'react';
import Header from './Header';
import Authorize from './authorize';
import UserData from './userdata';
import TotalDeleveryDate from './totalDeliveryDate';

const CheckoutContent = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [backToFinal, setBacktoFinal] = useState(false);
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
      ) : step == 1 && isAuthorized && !hasAddress ? (
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
