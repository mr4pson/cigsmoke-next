import styled from 'styled-components';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import { DeliveryTooltip } from './helpers';
import Delivery from '../../../../assets/delivery.svg';
import Avatar from '../../../../assets/avatar.svg';
import ArrowGray from '../../../../assets/arrowGray.svg';
import Comment from '../../../../assets/comment.svg';
import UserCommment from './UserComment';
const UserDetails = (props: any) => {
  const { setStep, setHasAddress, setBacktoFinal } = props;
  const [isOpen, setIsOpen] = useState(false);
  const leaveOnDoorRef = useRef<any>(null);
  return (
    <>
      <Wrapper
        custom={0.1}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
        onClick={() => {
          setStep(1);
          setHasAddress(false);
          setBacktoFinal(true);
        }}
      >
        <span>
          <Delivery />
        </span>
        <div className="address-wrapper">
          <h3>Курьером по адресу</h3>
          <span>МО, г. Люберцы, Октябрьский проспект 181</span>
        </div>
        <span>
          <ArrowGray />
        </span>
      </Wrapper>
      <Wrapper
        custom={0.2}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
        onClick={() => {
          setStep(1);
          setHasAddress(false);
          setBacktoFinal(true);
        }}
      >
        <span>
          <Avatar />
        </span>
        <div className="user-comment-wrapper">
          <span>Mohammadi Rishad</span>
          <span>+7999999999</span>
        </div>
        <span>
          <ArrowGray />
        </span>
      </Wrapper>
      <Wrapper
        custom={0.3}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
        onClick={() => setIsOpen(true)}
      >
        <span>
          <Comment />
        </span>
        <div className="user-comment-wrapper">
          <span>Комментарий курьеру</span>
        </div>
        <span>
          <ArrowGray />
        </span>
      </Wrapper>
      <Wrapper
        custom={0.3}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
        onClick={() => {
          leaveOnDoorRef.current.click();
        }}
      >
        <span>
          <input
            ref={leaveOnDoorRef}
            type="checkbox"
            id="scales"
            name="scales"
          />
        </span>
        <div className="user-comment-wrapper">
          <span>Оставить у двери</span>
        </div>
        <span>
          <DeliveryTooltip
            key="address-room-tip"
            title={
              <React.Fragment>
                <h2>Как это работает?</h2>
                <h3>Безопасная доставка до двери</h3>
                <span>
                  Оставим заказ у двери и отправим фото с подтверждением
                  доставки. Включите «Позвонить перед доставкой», чтобы курьер
                  предупредил о прибытии.
                </span>
                <h3>Условия доставки</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Cумма заказа - не более 50 000 ₽.</span>
                </div>
              </React.Fragment>
            }
          >
            <span className="tool-tip">?</span>
          </DeliveryTooltip>
        </span>
      </Wrapper>
      {isOpen ? <UserCommment setIsOpen={setIsOpen} {...props} /> : ''}
    </>
  );
};
// Комментарий курьеру
const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  user-select: none;
  cursor: pointer;
  span {
    display: flex;
    flex-direction: row;
    justify-content: cetner;
    align-items: center;
  }
  .address-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    h3 {
      font-size: 1.2rem;
      font-weight: 800;
    }
  }
  .user-comment-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    font-weight: 700;
  }
  .tool-tip {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid ${color.textSecondary};
    color: ${color.textSecondary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

export default UserDetails;
