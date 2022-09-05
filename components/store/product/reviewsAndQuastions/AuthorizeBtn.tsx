import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { TAuthState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';

const AuthorizeReviewBtn = (props: any) => {
  const [isSignedIn, setSignedIn] = useState(true);
  const [isPurchased, setPurchesed] = useState(true);
  const [signInAlert, setSignInAlert] = useState(false);
  const [purchasAlert, setPurchesedAlert] = useState(false);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  return (
    <>
      <AddReviewBtn
        style={{
          backgroundColor: isSignedIn ? color.btnPrimary : '#0000009e',
        }}
        custom={0.2}
        initial="init"
        whileInView="animate"
        whileHover={{ boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)' }}
        whileTap={{ boxShadow: '0px 0px 0px 0px #ffffff' }}
        viewport={{ once: true }}
        variants={variants.fadeOutSlideOut}
        onClick={() => {
          setSignInAlert(user ? false : true);
          props.setAuthorized(isPurchased && user ? true : false);
          setTimeout(() => {
            setSignInAlert(false);
            setPurchesedAlert(false);
          }, 3000);
        }}
      >
        <span>{props.text}</span>
      </AddReviewBtn>
      {signInAlert ? (
        <motion.span
          custom={0}
          initial="init"
          whileInView="animate"
          variants={variants.fadeOutSlideOut}
          style={{ color: color.hover, textAlign: 'center', width: '100%' }}
        >
          {props.alertSignIn}
        </motion.span>
      ) : (
        ''
      )}
      {purchasAlert ? (
        <motion.span
          custom={0}
          initial="init"
          whileInView="animate"
          variants={variants.fadeOutSlideOut}
          style={{ color: color.hover, textAlign: 'center', width: '100%' }}
        >
          Вы не приобретали этот товар
        </motion.span>
      ) : (
        ''
      )}
    </>
  );
};

const AddReviewBtn = styled(motion.button)`
  width: 100%;
  height: 50px;
  background-color: ${color.btnPrimary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  span {
    font-family: 'intro';
    color: ${color.textPrimary};
  }
`;

export default AuthorizeReviewBtn;
