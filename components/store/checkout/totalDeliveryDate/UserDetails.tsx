import styled from 'styled-components';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import { DeliveryTooltip } from './helpers';
import Delivery from '../../../../assets/delivery.svg';
import Avatar from '../../../../assets/avatar.svg';
import ArrowGray from '../../../../assets/arrowGray.svg';
import Comment from '../../../../assets/comment.svg';
import UserCommment from './UserComment';
import { useAppSelector } from 'redux/hooks';
import { TStoreCheckoutState } from 'redux/types';
const UserDetails = (props: any) => {
  const {
    setStep,
    setHasAddress,
    setBacktoFinal,
    leaveNearDoor,
    setLeaveNearDoor,
    setComment,
    comment,
  } = props;
  const { deliveryInfo } = useAppSelector<TStoreCheckoutState>(
    (state) => state.storeCheckout,
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleNavBack = () => {
    setStep(1);
    setHasAddress(false);
    setBacktoFinal(true);
  };

  const selectedSize: any = localStorage.getItem('selectedSize');
  useEffect(() => {
    if (selectedSize && isOpen === false)
      setComment(`${comment}  ${isOpen ? '' : JSON.parse(selectedSize)}`);
  }, [isOpen]);
  useEffect(() => {
    if (selectedSize)
      setComment(
        `${comment} ${isOpen ? '' : 'Размер:' + JSON.parse(selectedSize)}`,
      );
  }, []);

  return (
    <>
      <Wrapper
        custom={0.1}
        initial="init"
        animate="animate"
        variants={variants.fadInSlideUp}
        onClick={handleNavBack}
      >
        <span>
          <Delivery />
        </span>
        <div className="address-wrapper">
          <h3>Курьером по адресу</h3>
          <span>{`${deliveryInfo?.address!}`}</span>
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
        onClick={handleNavBack}
      >
        <span>
          <Avatar />
        </span>
        <div className="user-comment-wrapper">
          <span>{deliveryInfo?.fullName}</span>
          <span>{deliveryInfo?.phone}</span>
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
      >
        <label className="leave-on-door-wrapper" htmlFor="leave-on-door">
          <input
            type="checkbox"
            id="leave-on-door"
            title="Оставить на двери?"
          />
          <span>Оставить у двери</span>
        </label>
        <span>
          <DeliveryTooltip
            enterTouchDelay={0}
            leaveTouchDelay={5000}
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
  .leave-on-door-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    cursor: pointer;
    input {
      cursor: pointer;
    }
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
