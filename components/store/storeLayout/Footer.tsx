import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import { Container, Wrapper, Content } from './common';
import { devices } from '../lib/Devices';
import VKSVG from '../../../assets/vkcolored.svg';
import TelegraSVG from '../../../assets/telegramcolored.svg';
import WhatsappSVG from '../../../assets/whatsappcolored.svg';
import CloseSVg from '../../../assets/close_black.svg';
import { handleCookiesClick, acceptedCookies } from './helpers';
import { useEffect, useState } from 'react';
const Footer = (): JSX.Element => {
  const copyRighYear = new Date().getFullYear();
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    acceptedCookies(setOpen);
  }, []);

  return (
    <>
      <Container
        variants={variants.fadInOut}
        key="header"
        initial="start"
        animate="middle"
        exit="end"
        flex_direction="row"
        justify_content="space-evenly"
        padding="85px 0"
        bg_color="#f5f1f1"
      >
        <Wrapper>
          <Content
            flex_direction="column"
            justify_content="center"
            align_items="space-between"
            gap="25px"
          >
            <Grid>
              <Sections_wrapper>
                <Sections_header>Персональная информация</Sections_header>
                <Sections_content>
                  <Sections_item>
                    <Link href="/catalog">
                      <a>
                        <span>Категории</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Link href="/profile">
                      <a>
                        <span>Личный кабинет</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Link href="/wishlist">
                      <a>
                        <span>Избранное</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Link href="/orders">
                      <a>
                        <span>Заказы</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Link href="/cart">
                      <a>
                        <span>Корзина</span>
                      </a>
                    </Link>
                  </Sections_item>
                </Sections_content>
              </Sections_wrapper>
              <Sections_wrapper>
                <Sections_header>Дополнительная информация</Sections_header>
                <Sections_content>
                  <Sections_item>
                    <Link href="/privacy">
                      <a>
                        <span>Политика безопасности</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Link href="/policy">
                      <a>
                        <span>Условия соглашения</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Link href="/info-delivery">
                      <a>
                        <span>Информация о доставке</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Link href="/info-refund">
                      <a>
                        <span>Информация о возврате</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Link href="/rekvizity-ooo-internet-resheniya">
                      <a>
                        <span>Реквизиты</span>
                      </a>
                    </Link>
                  </Sections_item>
                </Sections_content>
              </Sections_wrapper>
              <Sections_wrapper>
                <Sections_header>Контактные данные</Sections_header>
                <Sections_content>
                  <Sections_item>
                    <Image width="20" height="14" src="/icons/phone.svg" />
                    <Link href="tel:+79855675947">
                      <a>
                        <span>+7 (985) 567-59-47</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Image width="20" height="14" src="/icons/mail.svg" />
                    <Link href="mailto:info@wuluxe.ru">
                      <a>
                        <span>info@wuluxe.ru</span>
                      </a>
                    </Link>
                  </Sections_item>
                  <Sections_item>
                    <Image
                      width="20"
                      height="14"
                      src="/icons/location-black.svg"
                    />
                    <Link href="/address-contact-us">
                      <a>
                        <span>МО, г. Люберцы, Октябрьский проспект 181</span>
                      </a>
                    </Link>
                  </Sections_item>
                </Sections_content>
              </Sections_wrapper>
              <Sections_wrapper>
                <Sections_header>Способы оплаты</Sections_header>
                <Sections_content>
                  <Sections_item>
                    <Image width="100" height="30" src="/icons/cart-visa.png" />
                    <Image
                      width="54"
                      height="33"
                      src="/icons/cart-master.png"
                    />
                    <Image width="110" height="35" src="/icons/cart-mir.png" />
                  </Sections_item>
                  <Sections_item>
                    <span style={{ padding: '5px 0' }}>
                      Вы также можете оплатить покупки наличными при получении
                    </span>
                  </Sections_item>
                  <SocialWrapper>
                    <Link href="https://vk.com/wuluxe">
                      <a target="_blank" rel="noopener noreferrer">
                        <span>
                          <VKSVG />
                        </span>
                      </a>
                    </Link>
                    <Link href="https://t.me/wuluxe">
                      <a target="_blank" rel="noopener noreferrer">
                        <span>
                          <TelegraSVG />
                        </span>
                      </a>
                    </Link>
                    <Link href="https://wa.me/+79855675947">
                      <a target="_blank" rel="noopener noreferrer">
                        <span>
                          <WhatsappSVG />
                        </span>
                      </a>
                    </Link>
                  </SocialWrapper>
                  <Link href="/copyright-terms">
                    <a id="copyright">
                      © {copyRighYear} ООО «Интернет Решения». Все права
                      защищены.
                    </a>
                  </Link>
                </Sections_content>
              </Sections_wrapper>
            </Grid>
          </Content>
        </Wrapper>
      </Container>
      <CookiesNotification style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="close-cookies">
          <span
            onClick={() => {
              setOpen(false);
              localStorage.setItem('agree-cookies', '0');
            }}
          >
            <CloseSVg />
          </span>
        </div>
        <div className="notification-cookies">
          <span>
            Нажимая «Принять все файлы cookie», вы соглашаетесь, что Wuluxe
            может сохранять файлы cookie на вашем устройстве и раскрывать
            информацию в соответствии с нашей{' '}
            <Link href="/privacy#cookies">
              <a style={{ color: color.yellow }}>
                Политикой использования файлов cookie.
              </a>
            </Link>
          </span>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={variants.boxShadow}
            className="accept-cookies"
            onClick={() => handleCookiesClick(setOpen)}
          >
            Принять все файлы cookie
          </motion.button>
        </div>
      </CookiesNotification>
    </>
  );
};

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  align-items: flex-start;

  @media ${devices.mobileL} {
    gap: 15px;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Sections_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: space-between;
  gap: 15px;
`;

const Sections_header = styled.h3`
  font-size: 1.1rem;
  display: inline-block;
`;

const Sections_content = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  place-items: space-between;
  gap: 5px;
  #copyright {
    color: ${color.textSecondary}!important;
    &:hover {
      color: ${color.hover}!important;
    }
  }
`;

const Sections_item = styled.li`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-self: flex-start;
  a {
    padding: 5px 5px 5px 0;
  }
  a:hover {
    color: ${color.hover};
  }
`;

const SocialWrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    span {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

const CookiesNotification = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${color.textPrimary};
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 99999;
  box-shadow: 0 -1px 3px -2px #000;
  .close-cookies {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    span {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px;
      cursor: pointer;
    }
  }
  .notification-cookies {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    .accept-cookies {
      cursor: pointer;
      padding: 15px;
      border-radius: 10px;
      background-color: ${color.btnPrimary};
      color: ${color.textPrimary};
    }
  }
`;

export default Footer;
