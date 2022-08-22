import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Btns, Container, Content, Wrapper } from './common';
import AuthComp from './utils/HeaderAuth/index';
import HeaderCart from './utils/HeaderCart';
import SearchBar from './utils/SearchBar/SearchBar';
import variants from '../lib/variants';
import color from '../lib/ui.colors';
import Pointer from '../../../assets/pointer.svg';
import Order from '../../../assets/order.svg';
import WishList from '../../../assets/wishlist.svg';
import HeaderCatalog from './utils/HeaderCatalog/index';
import { devices } from '../lib/Devices';
import { useEffect, useState } from 'react';
import { PathCircle } from './utils/paths';
import NavWrapMobile from './NavWrapMobile';

const Header = () => {
  const [boxShadow, setBoxShadow] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', function () {
      let scroll = this.scrollY;

      if (scroll) {
        setBoxShadow('0px 2px 6px #00000017');

        return;
      }
      setBoxShadow('');
    });
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AnimatePresence>
        <Container
          variants={variants.fadInOut}
          key="header"
          initial="start"
          animate="middle"
          exit="end"
          flex_direction="column"
          justify_content="center"
          padding="10px 0 20px 0"
          position="fixed"
          top="0"
          z_index="20"
          bg_color={color.textPrimary}
          box_shadow={boxShadow}
        >
          <Wrapper>
            <Content
              flex_direction="row"
              justify_content="space-between"
              align_items="center"
              style={{ alignItems: 'end' }}
            >
              <LogoWrapper>
                <LocationBtn
                  whileHover="hover"
                  whileTap="tap"
                  custom={1.05}
                  variants={variants.grow}
                >
                  <span>
                    <Pointer />
                  </span>
                  <span style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                    Выберите ваш город
                  </span>
                </LocationBtn>
                <Link href="/">
                  <a>
                    <img
                      style={{
                        marginTop: '-24px',
                        width: '150px',
                        height: '35px',
                      }}
                      src="/wuluxe.svg"
                      alt="wuluxe logo"
                    />
                    {/* <LogoSVG /> */}
                  </a>
                </Link>
              </LogoWrapper>
              <HeaderCatalog />
              <SearchBar />
              <NavWrap>
                <RelativeContainer id="auth-container">
                  <AuthComp />
                </RelativeContainer>
                <Link href="/orders">
                  <a style={{ alignSelf: 'flex-end' }}>
                    <Btns>
                      <span>
                        <Order />
                      </span>
                      <span> Заказы</span>
                    </Btns>
                  </a>
                </Link>
                <Link href="/wishlist">
                  <a style={{ alignSelf: 'flex-end' }}>
                    <Btns>
                      <span>
                        <WishList />
                      </span>
                      <span>Избранное</span>
                    </Btns>
                  </a>
                </Link>
                <RelativeContainer>
                  <HeaderCart />
                </RelativeContainer>
              </NavWrap>
            </Content>
          </Wrapper>
        </Container>
        <NavWrapMobile />
      </AnimatePresence>
    </>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 29px;
  justify-self: flex-start;

  @media ${devices.laptopS} {
    gap: 47px;
  }

  @media ${devices.mobileL} {
    gap: 55px;
    flex-direction: column-reverse;
    margin-top: 15px;
    margin-bottom: -15px;
  }

  img {
    width: 125px !important;
  }
`;

const LocationBtn = styled(motion.button)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: none;
  padding: 5px 5px 5px 0;
  gap: 5px;
`;

const RelativeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  position: relative;
`;

const NavWrap = styled.div`
  display: flex;
  width: 294px;
  justify-content: space-between;

  @media ${devices.mobileL} {
    display: none;
  }
`;

export default Header;
