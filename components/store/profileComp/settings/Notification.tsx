import styled from 'styled-components';
import { motion } from 'framer-motion';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { useState } from 'react';
import MailSVg from '../../../../assets/mail.svg';
import { handleEmailChange } from './helpers';

const Notifactions = ({ user }) => {
  const [editNotify, setEditNotify] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [serverResponse, setServerResponse] = useState(undefined);
  return (
    <NotifactionWrapper>
      <span className="mail-icon">
        <MailSVg />
      </span>
      <Notifaction>
        <h2>Уведомления</h2>
        <span style={{ color: color.hover }}>
          Изменив почта, вам также нужно будет подтвердить свой адрес
          электронной почты.
        </span>
        {/* <span>{serverResponse !== 200 ? 'Ошибка сервера' : 'Успех'}</span> */}
        <div className="input-wrapper">
          <span style={{ color: color.textSecondary }}>Получать на адрес</span>
          {editNotify ? (
            <div className="notify-email-wrapper">
              <motion.input
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button
                className="change-email-btn"
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                style={{
                  backgroundColor:
                    isEmpty(email) || !isEmail(email)
                      ? color.textSecondary
                      : color.btnPrimary,
                }}
                disabled={isEmpty(email) || !isEmail(email) ? true : false}
                onClick={() => {
                  setEditNotify(false);
                  handleEmailChange({ user, email, setServerResponse });
                }}
              >
                Сохранить
              </motion.button>
              <motion.button
                className="change-email-btn"
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                onClick={() => setEditNotify(false)}
              >
                Отмена
              </motion.button>
            </div>
          ) : (
            <div className="notify-email-wrapper">
              <motion.span>{email}</motion.span>
              <motion.button
                className="change-email-btn"
                whileHover="hover"
                whileTap="tap"
                variants={variants.boxShadow}
                onClick={() => setEditNotify(true)}
              >
                Изменить
              </motion.button>
            </div>
          )}
        </div>

        <label className="check-box-wrapper " htmlFor="review-notify">
          <input
            type="checkbox"
            id="review-notify"
            title="Ответы на мои отзывы"
          />
          <span>Ответы на мои отзывы</span>
        </label>
        <label className="check-box-wrapper " htmlFor="questions-notify">
          <input
            type="checkbox"
            id="questions-notify"
            title="Ответы на мои вопросы"
          />
          <span>Ответы на мои вопросы</span>
        </label>
        <label className="check-box-wrapper " htmlFor="discounts-notify">
          <input
            type="checkbox"
            id="discounts-notify"
            title="Рассылки о скидках и акциях"
          />
          <span>Рассылки о скидках и акциях</span>
        </label>
        <label className="check-box-wrapper " htmlFor="wishlist-notify">
          <input
            type="checkbox"
            id="wishlist-notify"
            title="Уведомления о товарах в избранном и сравнении"
          />
          <span>Уведомления о товарах в избранном и сравнении</span>
        </label>
        <label className="check-box-wrapper " htmlFor="blog-notify">
          <input
            type="checkbox"
            id="blog-notify"
            title="Популярные статьи из Журнала Wuluxe"
          />
          <span>Популярные статьи из Журнала Wuluxe</span>
        </label>
      </Notifaction>
    </NotifactionWrapper>
  );
};

const NotifactionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  user-select: none;
  h2 {
    font-size: 1.3rem;
  }
  .mail-icon {
    width: 40px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;
const Notifaction = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  .check-box-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    span {
      font-size: 1rem;
    }
  }
  .input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    gap: 50px;
    span {
      font-size: 1rem;
    }
    .notify-email-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;

      input {
        width: 300px;
        height: 50px;
        border-radius: 10px;
        padding: 0 10px;
        font-size: 1rem;
        font-weight: 700;
      }
      button {
        width: 150px;
        height: 50px;
        border-radius: 10px;
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
        cursor: pointer;
      }
    }
  }
  @media ${devices.laptopS} {
    .input-wrapper {
      flex-direction: column;
      gap: 10px;
      span {
        width: 100%;
      }
      .notify-email-wrapper {
        width: 100%;
        flex-direction: column;
        .change-email-btn {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
  @media ${devices.mobileL} {
    .input-wrapper {
      flex-direction: column;
      gap: 10px;
      span {
        width: 100%;
      }
      .notify-email-wrapper {
        width: 100%;
        flex-direction: column;
        .change-email-btn {
          width: 100%;
        }
        input {
          width: 100%;
        }
      }
    }
  }
`;

export default Notifactions;
